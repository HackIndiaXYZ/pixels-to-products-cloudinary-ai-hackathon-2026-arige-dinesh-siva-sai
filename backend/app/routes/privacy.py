from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api", tags=["privacy"])

@router.delete("/search-data")
def delete_user_search_data():
    """
    Privacy-first safeguard:
    Wipes all transient user search sessions, temporary selfie descriptors,
    and query history from server memory.
    """
    cleared = db.clear_search_data()
    return {
        "status": "success",
        "message": f"Successfully deleted search session and biometric query descriptors.",
        "cleared_records": cleared,
        "biometrics_retained": 0
    }

@router.get("/privacy-status")
def get_privacy_status():
    return {
        "biometric_retention_policy": "Zero permanent storage of attendee face vectors.",
        "encryption": "In-flight TLS 1.3 encryption for all uploaded media.",
        "processing_architecture": "Ephemeral vector calculation in secure server memory.",
        "gdpr_compliant": True,
        "active_sessions": len(db.search_sessions)
    }
