# EventSnap — AI Event Photo Finder

> **Find the moments you're in.**

EventSnap is an AI-powered event photo discovery platform that helps attendees quickly find photos they appear in. Instead of manually searching through thousands of event photos, users can select an event and upload a selfie to discover their matching moments, including group photos.

---

## 🚀 Live Demo

### 🌐 Live Application
**https://eventsnap-taupe.vercel.app/**

### 🎥 Demo Video
**https://youtu.be/ZyJcdkEIcH4**

### ⚙️ Backend API
**https://eventsnap-n75y.onrender.com/**

EventSnap is deployed with the frontend on **Vercel** and the backend on **Render**.

> **For evaluation, please use the live application above. No localhost or local URLs are required.**

---

## 🎯 Hackathon

**HackIndia — Pixels to Products: Cloudinary AI Hackathon 2026**

### Track
**PS-03 — Your Media-Savvy Startup**

---

## 🧩 Problem

Event photographers can capture thousands of photos during weddings, sports events, college events, conferences, festivals, and other occasions.

Finding the photos in which a particular person appears can be difficult and time-consuming.

### Our Solution

EventSnap allows attendees to:

1. Select an event.
2. Upload a selfie.
3. Let the system detect and recognize their face.
4. Search the selected event's indexed photos.
5. View the matching photos, including group photos where they appear.

---

## 💡 How EventSnap Works

```text
Photographer
     │
     ▼
Upload Event Photos
     │
     ▼
   Cloudinary
     │
     ├── Media Management
     ├── Transformations
     ├── Optimization
     └── Delivery
     │
     ▼
Face Detection — YuNet
     │
     ▼
Face Recognition — SFace
     │
     ▼
Event Face Index
     │
     │
     ▼
Attendee Uploads Selfie
     │
     ▼
Face Detection + Recognition
     │
     ▼
Search Selected Event
     │
     ▼
Matching Event Photos

# EventSnap 📸

> **HackIndia 2026 — Pixels to Products (Track PS-03: Cloudinary AI Hackathon)**  
> **Team Repository**: [pixels-to-products-cloudinary-ai-hackathon-2026-arige-dinesh-siva-sai](https://github.com/HackIndiaXYZ/pixels-to-products-cloudinary-ai-hackathon-2026-arige-dinesh-siva-sai)  
> **Author**: Arige Dinesh Siva Sai (`arigedineshsivasai123-sys`)

---

## 📌 Executive Summary

**EventSnap** is an AI-powered event photography discovery and delivery platform built for marathons, weddings, conferences, and festivals. By combining **deep on-device face recognition (YuNet + SFace)** with **Cloudinary's media optimization, dynamic face-crop transformations, watermarking, and global CDN delivery**, EventSnap transforms the chaotic experience of searching through thousands of event photos into an instantaneous 1-click personal moment retrieval.

---

## 🎯 The Problem

1. **Massive Photo Volumes**: Event photographers upload thousands of high-resolution photos (marathons, weddings, galas). Attendees must spend hours manually scrolling through endless galleries.
2. **Privacy Concerns**: Attendees do not want their personal biometric data stored permanently or exposed across public galleries.
3. **Bandwidth & Storage Overhead**: Loading raw multi-megabyte camera files directly on mobile devices drains user data, stalls browser rendering, and overwhelms standard web servers.
4. **Group Photo Blindspots**: Traditional tagging tools fail when a user appears as one of many faces in a large group photo or crowd shot.

---

## 💡 The Solution

EventSnap provides an end-to-end intelligent pipeline:
- **Instant Attendee Discovery ("Find My Photos")**: Attendees upload a single selfie. The system runs deep facial feature extraction and returns all event photos containing that attendee — whether they are front-and-center or in a group photo — within milliseconds.
- **Photographer Studio & Event Isolation**: Photographers can create events, upload batches of photos, track face indexing counts, and manage galleries. Strict event isolation ensures face search queries are restricted solely to the selected event.
- **Smart Edge & Usability Validation**: Rejects multi-face selfies, non-faces, and spurious torso/shoulder artifacts, ensuring pristine recognition accuracy.
- **Privacy First**: Attendee search selfies are strictly transient; biometric embeddings from search selfies are never stored or shared.

---

## ☁️ Cloudinary Architecture & Real Usage

EventSnap leverages Cloudinary as its central media processing engine:

| Feature | Cloudinary Implementation | Purpose |
| :--- | :--- | :--- |
| **Secure Asset Uploads** | `cloudinary.uploader.upload()` via Python SDK | Seamlessly offloads original high-res event photography to Cloudinary cloud storage. |
| **Smart Face-Crop Avatars** | `c_thumb,g_face,w_240,h_240,z_0.8` | Generates dynamic, centered face crops for attendee thumbnails and persona previews. |
| **Protected Watermarked Previews** | `w_1200,c_limit,q_auto,f_auto` with text/logo overlays | Delivers fast, watermarked proofs for public viewing while preserving original quality for photographers. |
| **Bandwidth & Format Optimization** | `f_auto,q_auto` | Automatically negotiates next-gen WebP/AVIF formats and responsive quality based on client device. |
| **Dynamic Responsive Delivery** | Cloudinary Global CDN | Ensures instant photo viewing globally with minimal latency. |

---

## 🧠 Face Recognition Pipeline (YuNet + SFace)

EventSnap uses a specialized, two-stage deep computer vision pipeline running locally on the server (no third-party biometric SaaS or external Gemini/AWS vision dependencies required):

1. **Face Detection (YuNet ONNX)**:
   - Ultra-lightweight, high-accuracy deep face detector (`face_detection_yunet_2023mar.onnx`).
   - Multi-scale image resolution adaptation (320px – 1024px) for 4K/8K DSLR event photography.
   - Detects all human faces in complex group photos along with 5 facial landmark keypoints (eyes, nose tip, mouth corners).
2. **Canonical Alignment & Embedding (SFace ONNX)**:
   - Deep face recognition model (`face_recognition_sface_2021dec.onnx`) loaded natively via OpenCV (`cv2.FaceRecognizerSF`).
   - Aligns and crops faces into canonical 112×112 frames based on eye coordinates.
   - Extracts a unit-normalized 128-dimensional deep feature representation.
3. **Calibrated Similarity Matching**:
   - Compares query selfie embeddings against indexed event faces using cosine similarity with the benchmark threshold ($0.363$).
   - Returns complete original Cloudinary event photos whenever an attendee's face matches in solo or group shots.

---

## 🏗️ Project Architecture

```
eventsnap/
├── backend/
│   ├── app/
│   │   ├── data/                           # ONNX Deep Learning Models
│   │   │   ├── face_detection_yunet_2023mar.onnx
│   │   │   └── face_recognition_sface_2021dec.onnx
│   │   ├── routes/                         # FastAPI Modular Endpoints
│   │   │   ├── events.py                   # Event management & galleries
│   │   │   ├── photos.py                   # Photo upload & Cloudinary indexing
│   │   │   ├── search.py                   # AI Selfie & Bib search
│   │   │   ├── privacy.py                  # Privacy compliance & data purge
│   │   │   └── stats.py                    # Photographer analytics
│   │   ├── services/
│   │   │   ├── cloudinary_service.py       # Real Cloudinary SDK integration
│   │   │   ├── face_service.py             # YuNet + SFace matching engine
│   │   │   └── ocr_service.py              # Bib number extraction engine
│   │   ├── config.py                       # Settings & CORS configuration
│   │   ├── database.py                     # In-memory event & photo store
│   │   ├── main.py                         # FastAPI application entrypoint
│   │   ├── models.py                       # Pydantic data schemas
│   │   └── seed_data.py                    # Initial demo events & personas
│   ├── .env.example                        # Backend environment variable template
│   ├── Procfile                            # Cloud deployment start command
│   └── requirements.txt                    # Production Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FindMyPhotos/               # Attendee face search & results gallery
│   │   │   └── PhotographerDashboard/      # Event creation, uploads, indexing status
│   │   ├── services/
│   │   │   ├── api.ts                      # Backend API client (dynamic VITE_API_URL)
│   │   │   └── cloudinary.ts               # Client-side Cloudinary URL helpers
│   │   ├── types/                          # TypeScript interfaces
│   │   ├── App.tsx                         # Main SPA router & navigation
│   │   └── main.tsx                        # React application bootstrap
│   ├── .env.example                        # Frontend environment variable template
│   ├── package.json                        # Frontend dependencies (React, Vite, Tailwind)
│   └── vite.config.ts                      # Vite configuration & dev proxy
│
├── .gitignore                              # Comprehensive secret & cache exclusion
├── LICENSE                                 # MIT License (HackIndia 2026)
└── README.md                               # Project documentation
```

---

## 🚀 Setup & Local Development

### Prerequisites
- **Node.js** 18+ and **npm**
- **Python** 3.10+
- A free **Cloudinary** account ([cloudinary.com](https://cloudinary.com))

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env from template
cp .env.example .env
```

Configure your `.env` with your Cloudinary credentials:
```ini
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

HOST=0.0.0.0
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Start the backend:
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive API documentation is available at `http://127.0.0.1:8000/docs`.

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 🌐 Production Deployment

- **Frontend Deployment** (e.g., Vercel / Netlify / Cloudflare Pages):
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_URL=https://your-backend-api.onrender.com`
- **Backend Deployment** (e.g., Render / Railway / Docker / VM):
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}` (or via `Procfile`)
  - Environment variables: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ALLOWED_ORIGINS`

---

## 🔒 Security & Privacy Compliance

- **No Secrets in Source**: All API secrets are loaded exclusively via environment variables. `.env` files are strictly excluded from source control.
- **Biometric Ephemerality**: Attendee search selfies are evaluated purely in memory and immediately discarded. Biometric embeddings from search queries are never persisted.
- **Data Purge Capability**: A dedicated privacy endpoint (`DELETE /api/search-data`) enables instant erasure of all transient search activity logs upon request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
