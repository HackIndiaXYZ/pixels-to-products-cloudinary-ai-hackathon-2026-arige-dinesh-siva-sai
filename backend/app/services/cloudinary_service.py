import os
import time
import urllib.parse
from pathlib import Path
from typing import Dict, Any, Optional
import cloudinary
import cloudinary.uploader
from app.config import settings

class CloudinaryService:
    def __init__(self):
        self.cloud_name = settings.CLOUDINARY_CLOUD_NAME
        self.api_key = settings.CLOUDINARY_API_KEY
        self.api_secret = settings.CLOUDINARY_API_SECRET
        self._configured = False
        self._init_client()

    def _init_client(self):
        if self.cloud_name and self.api_key and self.api_secret:
            cloudinary.config(
                cloud_name=self.cloud_name,
                api_key=self.api_key,
                api_secret=self.api_secret,
                secure=True
            )
            self._configured = True
        else:
            # Configure default public cloud for dynamic URL transforms
            cloudinary.config(
                cloud_name=self.cloud_name or "demo",
                secure=True
            )
            self._configured = False

    def update_credentials(self, cloud_name: str, api_key: str, api_secret: str):
        self.cloud_name = cloud_name
        self.api_key = api_key
        self.api_secret = api_secret
        self._init_client()

    def is_live_account_configured(self) -> bool:
        return bool(self.api_key and self.api_secret and len(self.api_key) > 4)

    def upload_photo(self, file_bytes: bytes, event_id: str, filename: str) -> Dict[str, Any]:
        """
        Uploads a photo to Cloudinary within the event's dedicated folder.
        Uses REAL Cloudinary API upload when live credentials are set.
        """
        folder = f"eventsnap/events/{event_id}"
        clean_name = Path(filename).stem.replace(' ', '_')
        public_id = f"photo_{int(time.time())}_{clean_name}"
        
        if self.is_live_account_configured():
            # Real Cloudinary API Upload
            res = cloudinary.uploader.upload(
                file_bytes,
                folder=folder,
                public_id=public_id,
                tags=["eventsnap", event_id],
                resource_type="image"
            )
            original_url = res.get("secure_url")
            cid = res.get("public_id")
            return {
                "public_id": cid,
                "original_url": original_url,
                "thumbnail_url": self.generate_face_crop_url(cid),
                "watermarked_url": self.generate_watermarked_url(cid),
                "optimized_url": self.generate_optimized_url(cid),
                "width": res.get("width", 1920),
                "height": res.get("height", 1080),
                "bytes": res.get("bytes", len(file_bytes))
            }

        # Dynamic fallback if not configured
        base_cloud = self.cloud_name or "demo"
        full_pid = f"{folder}/{public_id}"
        thumb_url = f"https://res.cloudinary.com/{base_cloud}/image/upload/c_thumb,g_face,w_450,h_450,z_0.8,f_auto,q_auto/{full_pid}"
        watermark_url = f"https://res.cloudinary.com/{base_cloud}/image/upload/l_text:helvetica_42_bold_letter_spacing_4:EVENTSNAP%20PREVIEW,o_38,a_-30,co_rgb:ffffff,g_center/f_auto,q_auto/{full_pid}"
        original_url = f"https://res.cloudinary.com/{base_cloud}/image/upload/f_auto,q_auto:best/{full_pid}"

        return {
            "public_id": full_pid,
            "original_url": original_url,
            "thumbnail_url": thumb_url,
            "watermarked_url": watermark_url,
            "optimized_url": original_url,
            "width": 1920,
            "height": 1080,
            "bytes": len(file_bytes)
        }

    def generate_face_crop_url(self, image_url_or_id: str) -> str:
        """
        Generates Cloudinary smart face auto-crop:
        c_thumb,g_face,w_500,h_500,z_0.85,f_auto,q_auto
        """
        cloud = self.cloud_name or "demo"
        if image_url_or_id.startswith("http://") or image_url_or_id.startswith("https://"):
            encoded = urllib.parse.quote(image_url_or_id, safe='')
            return f"https://res.cloudinary.com/{cloud}/image/fetch/c_thumb,g_face,w_500,h_500,z_0.85,f_auto,q_auto/{encoded}"
        return f"https://res.cloudinary.com/{cloud}/image/upload/c_thumb,g_face,w_500,h_500,z_0.85,f_auto,q_auto/{image_url_or_id}"

    def generate_watermarked_url(self, image_url_or_id: str) -> str:
        """
        Generates Cloudinary dynamic watermark overlay for unpurchased attendee previews:
        l_text:helvetica_42_bold:EVENTSNAP%20PREVIEW,o_38,a_-30,g_center
        """
        cloud = self.cloud_name or "demo"
        watermark_param = "l_text:helvetica_42_bold_letter_spacing_3:EVENTSNAP%20PREVIEW,o_38,a_-30,co_rgb:ffffff,g_center"
        if image_url_or_id.startswith("http://") or image_url_or_id.startswith("https://"):
            encoded = urllib.parse.quote(image_url_or_id, safe='')
            return f"https://res.cloudinary.com/{cloud}/image/fetch/{watermark_param},f_auto,q_auto/{encoded}"
        return f"https://res.cloudinary.com/{cloud}/image/upload/{watermark_param},f_auto,q_auto/{image_url_or_id}"

    def generate_optimized_url(self, image_url_or_id: str, width: int = 1600) -> str:
        """
        Generates Cloudinary responsive web delivery with format and quality auto-negotiation:
        f_auto,q_auto:best,w_{width}
        """
        cloud = self.cloud_name or "demo"
        if image_url_or_id.startswith("http://") or image_url_or_id.startswith("https://"):
            encoded = urllib.parse.quote(image_url_or_id, safe='')
            return f"https://res.cloudinary.com/{cloud}/image/fetch/w_{width},c_limit,f_auto,q_auto:good/{encoded}"
        return f"https://res.cloudinary.com/{cloud}/image/upload/w_{width},c_limit,f_auto,q_auto:good/{image_url_or_id}"

cloudinary_service = CloudinaryService()
