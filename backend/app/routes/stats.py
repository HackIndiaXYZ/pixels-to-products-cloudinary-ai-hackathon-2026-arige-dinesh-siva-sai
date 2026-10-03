from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.database import db
from app.models import PhotographerStats
from app.services.cloudinary_service import cloudinary_service

router = APIRouter(prefix="/api", tags=["stats"])

class CloudinaryConfigReq(BaseModel):
    cloud_name: str
    api_key: Optional[str] = ""
    api_secret: Optional[str] = ""

@router.get("/photographer/stats", response_model=PhotographerStats)
def get_photographer_stats():
    return db.get_photographer_stats()

@router.get("/cloudinary/status")
def get_cloudinary_status():
    is_live = cloudinary_service.is_live_account_configured()
    return {
        "cloud_name": cloudinary_service.cloud_name or "eventsnap-hackindia",
        "is_live_connected": is_live,
        "engine_mode": "Cloudinary Live API" if is_live else "Cloudinary Dynamic Media Engine",
        "transformations_active": [
            "c_thumb,g_face,w_500,h_500,z_0.85 (AI Face-Crop Thumbnail)",
            "l_text:helvetica_42_bold (Dynamic Watermarked Preview)",
            "f_auto,q_auto:best (Responsive Format Negotiation)",
            "w_1600,c_limit (High-Res CDN Delivery)"
        ],
        "hackathon_track": "HackIndia PS-03 — Your Media-Savvy Startup"
    }

@router.post("/cloudinary/config")
def update_cloudinary_config(req: CloudinaryConfigReq):
    cloudinary_service.update_credentials(
        cloud_name=req.cloud_name.strip(),
        api_key=(req.api_key or "").strip(),
        api_secret=(req.api_secret or "").strip()
    )
    return {
        "status": "success",
        "cloud_name": cloudinary_service.cloud_name,
        "is_live": cloudinary_service.is_live_account_configured()
    }
