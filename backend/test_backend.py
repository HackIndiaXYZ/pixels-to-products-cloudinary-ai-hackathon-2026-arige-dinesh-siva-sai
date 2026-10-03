import sys
from fastapi.testclient import TestClient
from app.main import app
from app.database import db

client = TestClient(app)

def test_all():
    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("✓ Health check passed:", res.json())

    # 2. Events list
    res = client.get("/api/events")
    assert res.status_code == 200
    events = res.json()
    assert len(events) >= 4, f"Expected at least 4 events, got {len(events)}"
    print(f"✓ Events retrieved: {len(events)} events loaded.")

    # 3. Event detail
    event_id = events[0]["id"]
    res = client.get(f"/api/events/{event_id}")
    assert res.status_code == 200
    detail = res.json()
    assert "event" in detail and "photos" in detail
    print(f"✓ Event '{event_id}' has {len(detail['photos'])} photos.")

    # 4. Demo personas
    res = client.get("/api/demo-personas")
    assert res.status_code == 200
    personas = res.json()
    assert len(personas) >= 4
    print(f"✓ Demo personas retrieved: {[p['name'] for p in personas]}")

    # 5. Search by persona (Alex marathon runner)
    alex_persona = next(p for p in personas if p["id"] == "alex_marathon")
    res = client.post(
        f"/api/events/{alex_persona['event_id']}/search",
        data={"persona_id": alex_persona["id"]}
    )
    assert res.status_code == 200
    search_res = res.json()
    assert search_res["total_matches"] > 0
    print(f"✓ Face search for Alex found {search_res['total_matches']} photos (Match score: {search_res['results'][0]['confidence_score']})")

    # 6. Bib search (Marathon bib 482)
    res = client.post(
        f"/api/events/hyderabad-marathon-2026/bib-search",
        data={"bib_number": "482"}
    )
    assert res.status_code == 200
    bib_res = res.json()
    assert bib_res["total_matches"] > 0
    print(f"✓ Bib search for #482 found {bib_res['total_matches']} photos.")

    # 7. Privacy delete search data
    res = client.delete("/api/search-data")
    assert res.status_code == 200
    print("✓ Privacy delete search data verified.")

    # 8. Photographer stats
    res = client.get("/api/photographer/stats")
    assert res.status_code == 200
    stats = res.json()
    print("✓ Photographer stats:", stats)

    # 9. Cloudinary status
    res = client.get("/api/cloudinary/status")
    assert res.status_code == 200
    c_status = res.json()
    print("✓ Cloudinary status:", c_status["engine_mode"])

    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY! 🚀")

if __name__ == "__main__":
    test_all()
