from app.database import db
from app.models import Event, DemoPersona

def load_seed_data():
    if len(db.events) > 0:
        return  # Already seeded

    # 1. Hyderabad Marathon 2026
    e1 = Event(
        id="hyderabad-marathon-2026",
        title="Hyderabad Marathon 2026",
        type="Sports",
        date="February 15, 2026",
        location="Gachibowli Stadium & HITEC City, Hyderabad",
        description="The city's biggest endurance spectacle featuring over 15,000 runners across Full Marathon, Half Marathon, and 10K tracks.",
        cover_url="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&auto=format&fit=crop&q=80",
        total_photos=5420,
        views=630,
        searches=1284,
        photographer_name="Rajesh Sharma Sports Pix"
    )
    db.events[e1.id] = e1
    db.event_photos[e1.id] = []

    # 2. NIAT Tech Fest 2026
    e2 = Event(
        id="niat-tech-fest-2026",
        title="NIAT College Fest 2026",
        type="College",
        date="March 20-22, 2026",
        location="NIAT University Campus, Hyderabad",
        description="Annual national college extravaganza: 36-hour hackathons, robotics arenas, EDM concert nights, and cultural showcases.",
        cover_url="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80",
        total_photos=2180,
        views=321,
        searches=642,
        photographer_name="Campus Lens Collective"
    )
    db.events[e2.id] = e2
    db.event_photos[e2.id] = []

    # 3. Aarav & Priya Wedding
    e3 = Event(
        id="aarav-priya-wedding",
        title="Wedding — Aarav & Priya",
        type="Wedding",
        date="January 18, 2026",
        location="Taj Falaknuma Palace, Hyderabad",
        description="A royal Nizam-inspired palace celebration featuring royal Baraat, Mehendi lanterns, Sangeet choreography, and heritage Mandap.",
        cover_url="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80",
        total_photos=8640,
        views=790,
        searches=1102,
        photographer_name="Arjun Rao Luxury Weddings"
    )
    db.events[e3.id] = e3
    db.event_photos[e3.id] = []

    # 4. Hyderabad Tech Conference 2026
    e4 = Event(
        id="hyderabad-tech-conf-2026",
        title="Tech Conference Hyderabad 2026",
        type="Conference",
        date="April 10-11, 2026",
        location="Hyderabad International Convention Centre (HICC)",
        description="South Asia's premier AI & Cloud summit gathering 3,500 engineers, CTOs, venture capitalists, and product founders.",
        cover_url="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
        total_photos=3210,
        views=512,
        searches=890,
        photographer_name="PixelCorp Event Media"
    )
    db.events[e4.id] = e4
    db.event_photos[e4.id] = []

    # Photos for Hyderabad Marathon 2026
    marathon_photos = [
        ("https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1600&auto=format&fit=crop&q=85", "06:45 AM", "HITEC City Flyover", "Sony A7 IV • 24-70mm f/2.8", ["482", "1024"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&auto=format&fit=crop&q=85", "07:15 AM", "Durgam Cheruvu Bridge", "Canon EOS R5 • 70-200mm f/2.8", ["482"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=85", "07:50 AM", "Jubilee Hills Checkpost", "Nikon Z9 • 85mm f/1.4", ["482", "3110"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1486218119243-13883505764c?w=1600&auto=format&fit=crop&q=85", "08:12 AM", "Gachibowli Outer Ring", "Sony A1 • 135mm f/1.8", ["482"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1600&auto=format&fit=crop&q=85", "08:42 AM", "Finish Line Arena", "Sony A7 IV • 85mm f/1.4", ["482", "7891"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1600&auto=format&fit=crop&q=85", "09:05 AM", "Medal Ceremony Podium", "Canon EOS R3 • 50mm f/1.2", ["482"], "alex_marathon"),
        ("https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1600&auto=format&fit=crop&q=85", "07:30 AM", "Hydration Zone 3", "Sony A7 IV • 35mm f/1.4", ["1024", "2055"], None),
        ("https://images.unsplash.com/photo-1594882645126-14020914d58d?w=1600&auto=format&fit=crop&q=85", "08:25 AM", "Heartbreak Hill Climb", "Nikon Z8 • 70-200mm f/2.8", ["1024"], None),
        ("https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1600&auto=format&fit=crop&q=85", "08:50 AM", "Recovery Zone Lounge", "Canon EOS R5 • 85mm f/1.4", ["7891"], None),
    ]
    for url, t, loc, cam, bibs, persona in marathon_photos:
        db.add_photo(e1.id, url, t, loc, e1.photographer_name, cam, bibs, persona)

    # Photos for NIAT Tech Fest 2026
    techfest_photos = [
        ("https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop&q=85", "10:30 AM", "Main Auditorium Hall A", "Sony A7 IV • 50mm f/1.2", [], "neha_dance"),
        ("https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=85", "02:15 PM", "Robotics Arena Arena", "Canon EOS R5 • 24-70mm f/2.8", [], "neha_dance"),
        ("https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&fit=crop&q=85", "05:00 PM", "Hackathon Coding Hub", "Sony A7 IV • 35mm f/1.4", [], "neha_dance"),
        ("https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1600&auto=format&fit=crop&q=85", "08:30 PM", "EDM Concert Arena", "Nikon Z9 • 85mm f/1.4", [], "neha_dance"),
        ("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=85", "09:45 PM", "Main Stage Lights", "Sony A1 • 70-200mm f/2.8", [], None),
        ("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&auto=format&fit=crop&q=85", "03:40 PM", "Paper Presentation Hall", "Canon EOS R6 • 50mm f/1.4", [], None),
    ]
    for url, t, loc, cam, bibs, persona in techfest_photos:
        db.add_photo(e2.id, url, t, loc, e2.photographer_name, cam, bibs, persona)

    # Photos for Aarav & Priya Wedding
    wedding_photos = [
        ("https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&auto=format&fit=crop&q=85", "11:00 AM", "Falaknuma Durbar Hall", "Sony A7 IV • 85mm f/1.2", [], "priya_bride"),
        ("https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=85", "12:30 PM", "Palace Courtyard Mandap", "Canon EOS R5 • 50mm f/1.2", [], "priya_bride"),
        ("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&auto=format&fit=crop&q=85", "03:45 PM", "Baraat Procession Terrace", "Nikon Z9 • 70-200mm f/2.8", [], "aarav_groom"),
        ("https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1600&auto=format&fit=crop&q=85", "06:15 PM", "Sangeet Dance Pavilion", "Sony A1 • 35mm f/1.4", [], "ananya_wedding"),
        ("https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&auto=format&fit=crop&q=85", "07:30 PM", "Grand Staircase Portraits", "Canon EOS R3 • 85mm f/1.2", [], "ananya_wedding"),
        ("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&auto=format&fit=crop&q=85", "09:00 PM", "Royal Banquet Gala", "Sony A7 IV • 50mm f/1.4", [], "ananya_wedding"),
    ]
    for url, t, loc, cam, bibs, persona in wedding_photos:
        db.add_photo(e3.id, url, t, loc, e3.photographer_name, cam, bibs, persona)

    # Photos for Hyderabad Tech Conference 2026
    conf_photos = [
        ("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=85", "09:30 AM", "HICC Plenary Keynote Hall", "Sony A7 IV • 70-200mm f/2.8", [], "kabir_speaker"),
        ("https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&auto=format&fit=crop&q=85", "11:15 AM", "AI & Robotics Track Stage", "Canon EOS R5 • 85mm f/1.4", [], "kabir_speaker"),
        ("https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&fit=crop&q=85", "02:00 PM", "Executive VIP Roundtable", "Nikon Z9 • 35mm f/1.4", [], "kabir_speaker"),
        ("https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&auto=format&fit=crop&q=85", "04:30 PM", "Startup Pitch Arena", "Sony A1 • 50mm f/1.2", [], "kabir_speaker"),
        ("https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1600&auto=format&fit=crop&q=85", "06:00 PM", "Networking Cocktail Lounge", "Canon EOS R6 • 24-70mm f/2.8", [], None),
    ]
    for url, t, loc, cam, bibs, persona in conf_photos:
        db.add_photo(e4.id, url, t, loc, e4.photographer_name, cam, bibs, persona)

    # Demo Personas for 1-click test in HackIndia Judge / User evaluation
    db.demo_personas = [
        DemoPersona(
            id="alex_marathon",
            name="Alex Rivera",
            event_id=e1.id,
            event_name=e1.title,
            role_description="Marathon Finisher • Bib #482",
            selfie_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
            bib_number="482"
        ),
        DemoPersona(
            id="ananya_wedding",
            name="Ananya Sen",
            event_id=e3.id,
            event_name=e3.title,
            role_description="Bridesmaid • Sangeet Dancer",
            selfie_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
            bib_number=None
        ),
        DemoPersona(
            id="kabir_speaker",
            name="Dr. Kabir Mehta",
            event_id=e4.id,
            event_name=e4.title,
            role_description="Keynote Speaker • AI Architecture",
            selfie_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
            bib_number=None
        ),
        DemoPersona(
            id="priya_bride",
            name="Priya Sharma",
            event_id=e3.id,
            event_name=e3.title,
            role_description="The Bride",
            selfie_url="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
            bib_number=None
        ),
    ]
