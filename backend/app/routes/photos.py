from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional, List, Dict, Any
from app.database import db
from app.models import Photo
from app.services.cloudinary_service import cloudinary_service
from app.services.face_service import face_engine
from app.services.ocr_service import bib_ocr_engine

router = APIRouter(prefix="/api", tags=["photos"])

@router.get("/photos/{photo_id}", response_model=Photo)
def get_photo(photo_id: str):
    photo = db.get_photo(photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    return photo

@router.post("/events/{event_id}/photos", response_model=Photo, status_code=201)
async def upload_event_photo(
    event_id: str,
    file: UploadFile = File(...),
    captured_time: str = Form("12:00 PM"),
    location: str = Form("Event Venue"),
    photographer: str = Form("Staff Photographer"),
    camera_meta: str = Form("Sony A7 IV • 85mm f/1.4"),
    bib_numbers_str: Optional[str] = Form(None)
):
    event = db.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty photo file provided")
    
    # 1. Detect ALL faces in the photo (handles multiple people)
    detected_faces = face_engine.detect_faces(file_bytes)
    
    # 2. Upload media to Cloudinary
    upload_res = cloudinary_service.upload_photo(file_bytes, event_id, file.filename or "photo.jpg")
    
    # 3. Extract OCR bibs if provided
    bibs = []
    if bib_numbers_str:
        bibs = bib_ocr_engine.extract_bib_numbers(bib_numbers_str)
    
    # 4. Save to database with real Cloudinary identifiers and index ALL detected faces
    photo = db.add_photo(
        event_id=event_id,
        original_url=upload_res["original_url"],
        captured_time=captured_time,
        location=location,
        photographer=photographer,
        camera_meta=camera_meta,
        bib_numbers=bibs,
        detected_faces=detected_faces,
        cloudinary_public_id=upload_res.get("public_id"),
        thumbnail_url=upload_res.get("thumbnail_url"),
        watermarked_url=upload_res.get("watermarked_url")
    )
    return photo

@router.get("/events/{event_id}/face-index")
def get_event_face_index(event_id: str):
    """Returns indexing summary for the event: total photos, indexed faces, and detected bboxes"""
    event = db.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    event_faces = db.get_event_faces(event_id)
    return {
        "event_id": event_id,
        "event_title": event.title,
        "total_photos": len(db.get_photos_for_event(event_id)),
        "total_indexed_faces": len(event_faces),
        "faces": [
            {
                "face_id": f["face_id"],
                "photo_id": f["photo_id"],
                "bbox": f["bbox"],
                "score": f["score"],
                "cloudinary_public_id": f["cloudinary_public_id"]
            }
            for f in event_faces
        ]
    }

@router.post("/events/{event_id}/index-photos")
def index_event_photos(event_id: str):
    """Explicit endpoint to index or check indexing status of event photos"""
    event = db.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    event_faces = db.get_event_faces(event_id)
    return {
        "event_id": event_id,
        "status": "indexed",
        "photos_count": len(db.get_photos_for_event(event_id)),
        "indexed_faces_count": len(event_faces)
    }

@router.post("/photos/{photo_id}/like")
def toggle_like(photo_id: str):
    photo = db.get_photo(photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")
    photo.likes += 1
    return {"id": photo_id, "likes": photo.likes}
