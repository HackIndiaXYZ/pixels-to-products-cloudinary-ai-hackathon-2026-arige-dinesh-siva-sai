from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.database import db
from app.models import Event, Photo, CreateEventRequest

router = APIRouter(prefix="/api/events", tags=["events"])

@router.get("", response_model=List[Event])
def list_events(category: Optional[str] = None):
    events = db.get_all_events()
    if category and category.lower() != "all":
        events = [e for e in events if e.type.lower() == category.lower()]
    return events

@router.get("/{event_id}")
def get_event_detail(event_id: str):
    event = db.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail=f"Event '{event_id}' not found.")
    photos = db.get_photos_for_event(event_id)
    return {
        "event": event,
        "photos": photos
    }

@router.post("", response_model=Event, status_code=201)
def create_event(req: CreateEventRequest):
    if not req.title.strip():
        raise HTTPException(status_code=400, detail="Event title is required.")
    return db.create_event(req)

@router.delete("/{event_id}/photos")
def clear_event_photos(event_id: str):
    """Safely clears photos and indexed faces for a specific event."""
    event = db.get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail=f"Event '{event_id}' not found.")
    cleared = db.clear_event_photos(event_id)
    return {
        "status": "success",
        "event_id": event_id,
        "cleared_photos": cleared,
        "total_photos": 0,
        "total_indexed_faces": len(db.get_event_faces(event_id))
    }

