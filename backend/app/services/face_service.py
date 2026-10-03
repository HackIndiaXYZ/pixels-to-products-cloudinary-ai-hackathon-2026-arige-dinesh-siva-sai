import os
import io
import cv2
import numpy as np
from typing import List, Tuple, Dict, Any, Optional
from PIL import Image

class FaceValidationError(Exception):
    def __init__(self, code: str, message: str):
        self.code = code
        self.message = message
        super().__init__(message)

class FaceMatchingEngine:
    def __init__(self):
        # Path to YuNet detector & SFace recognizer ONNX models
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.model_path = os.path.join(base_dir, "data", "face_detection_yunet_2023mar.onnx")
        self.sface_path = os.path.join(base_dir, "data", "face_recognition_sface_2021dec.onnx")
        
        self.detector = None
        self.recognizer = None
        self._init_detector()
        self._init_recognizer()

        # Seed demo persona reference embeddings (128-d)
        self._persona_embeddings: Dict[str, np.ndarray] = {
            "alex_marathon": self._generate_stable_embedding(seed=482),
            "ananya_wedding": self._generate_stable_embedding(seed=771),
            "aarav_groom": self._generate_stable_embedding(seed=912),
            "priya_bride": self._generate_stable_embedding(seed=354),
            "kabir_speaker": self._generate_stable_embedding(seed=1024),
            "neha_dance": self._generate_stable_embedding(seed=650),
        }

    def _init_detector(self):
        try:
            if os.path.exists(self.model_path):
                self.detector = cv2.FaceDetectorYN_create(
                    self.model_path,
                    "",
                    (320, 320),
                    score_threshold=0.35,
                    nms_threshold=0.3,
                    top_k=50
                )
                print(f"[FaceMatchingEngine] YuNet deep face detector initialized from {self.model_path}")
            else:
                print(f"[FaceMatchingEngine] Warning: YuNet model not found at {self.model_path}")
        except Exception as e:
            print(f"[FaceMatchingEngine] Error initializing detector: {e}")

    def _init_recognizer(self):
        try:
            if os.path.exists(self.sface_path):
                self.recognizer = cv2.FaceRecognizerSF_create(
                    self.sface_path,
                    ""
                )
                print(f"[FaceMatchingEngine] SFace deep face recognizer initialized from {self.sface_path}")
            else:
                print(f"[FaceMatchingEngine] Warning: SFace model not found at {self.sface_path}")
        except Exception as e:
            print(f"[FaceMatchingEngine] Error initializing SFace recognizer: {e}")

    def _generate_stable_embedding(self, seed: int, dim: int = 128) -> np.ndarray:
        rng = np.random.default_rng(seed)
        vec = rng.normal(0, 1, dim).astype(np.float32)
        norm = np.linalg.norm(vec)
        return vec / norm if norm > 0 else vec

    def decode_image(self, image_bytes: bytes) -> Optional[np.ndarray]:
        try:
            arr = np.frombuffer(image_bytes, dtype=np.uint8)
            img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
            return img
        except Exception as e:
            print(f"[FaceMatchingEngine] Image decode error: {e}")
            return None

    def compute_facial_embedding(self, img: np.ndarray, face_info: np.ndarray) -> np.ndarray:
        """
        Extracts a canonical 128-dimensional deep facial recognition embedding using SFace
        (cv2.FaceRecognizerSF from backend/app/data/face_recognition_sface_2021dec.onnx).
        Aligns and crops the face from img using YuNet landmark geometry,
        then feeds the 112x112 canonical aligned face to SFace to produce a 128-d unit vector.
        """
        if self.recognizer is None:
            self._init_recognizer()

        if self.recognizer is not None and img is not None:
            try:
                face_arr = np.array(face_info, dtype=np.float32)
                aligned = self.recognizer.alignCrop(img, face_arr)
                feat = self.recognizer.feature(aligned)
                vec = feat.flatten().astype(np.float32)
                norm = float(np.linalg.norm(vec))
                if norm > 0:
                    return (vec / norm).astype(np.float32)
                return vec
            except Exception as e:
                print(f"[FaceMatchingEngine] SFace embedding extraction error: {e}")

        # Fallback unit vector if SFace recognizer fails
        return np.zeros((128,), dtype=np.float32)

    def detect_faces(self, image_bytes: bytes) -> List[Dict[str, Any]]:
        """
        Detects all faces in an image using YuNet with multi-scale canonical support for high-res photos.
        Returns list of detected face dictionaries containing:
        - bbox: [x, y, w, h]
        - score: float
        - landmarks: 5 keypoint coordinates
        - embedding: 128-d unit-normalized numpy vector
        """
        img = self.decode_image(image_bytes)
        if img is None:
            return []

        orig_h, orig_w = img.shape[:2]
        if self.detector is None:
            self._init_detector()

        if self.detector is None:
            return []

        # YuNet anchors operate optimally at standard resolutions (around 320 to 1024 px).
        # For large images (e.g. 4K, 8K, high-res smartphone/camera shots), evaluate canonical scales.
        max_dim = max(orig_w, orig_h)
        scales_to_try = []
        if max_dim > 1024:
            scales_to_try.append(1024)
            scales_to_try.append(800)
        else:
            scales_to_try.append(max_dim)
        if 800 not in scales_to_try and max_dim > 800:
            scales_to_try.append(800)

        for target_dim in scales_to_try:
            if target_dim >= max_dim:
                det_img = img
                det_w, det_h = orig_w, orig_h
                scale_x, scale_y = 1.0, 1.0
            else:
                scale = target_dim / max_dim
                det_w = int(orig_w * scale)
                det_h = int(orig_h * scale)
                det_img = cv2.resize(img, (det_w, det_h))
                scale_x = orig_w / det_w
                scale_y = orig_h / det_h

            self.detector.setInputSize((det_w, det_h))
            retval, raw_faces = self.detector.detect(det_img)

            if raw_faces is not None and len(raw_faces) > 0:
                results = []
                for face_arr in raw_faces:
                    sf = face_arr.copy()
                    sf[0] *= scale_x
                    sf[1] *= scale_y
                    sf[2] *= scale_x
                    sf[3] *= scale_y
                    for k in range(4, 14, 2):
                        sf[k] *= scale_x
                        sf[k + 1] *= scale_y

                    score = float(sf[-1])
                    bbox = [
                        int(max(0, sf[0])),
                        int(max(0, sf[1])),
                        int(sf[2]),
                        int(sf[3])
                    ]
                    landmarks = sf[4:14].tolist()
                    emb = self.compute_facial_embedding(img, sf)

                    results.append({
                        "bbox": bbox,
                        "score": round(score, 4),
                        "landmarks": landmarks,
                        "embedding": emb
                    })
                return results

        return []

    def filter_usable_selfie_faces(
        self,
        raw_faces: List[Dict[str, Any]],
        img_w: int = 0,
        img_h: int = 0
    ) -> List[Dict[str, Any]]:
        """
        Filters detected faces to keep only usable, recognizable selfie faces:
        1. Minimum Usable Size: Excludes tiny noise/distant background boxes (w < 35 or h < 35).
        2. Boundary / Edge Proximity: Excludes truncated, partial detections touching or near the
           outer frame boundary unless they are full, high-confidence faces.
        3. Torso / Shoulder / Clothing / Hand Artifacts: Excludes false-positive detections
           located below or overlapping the body column of a higher-confidence face.
        4. Secondary Face Usability: When a dominant primary face exists (score >= 0.70), secondary
           detections must meet a solid recognition confidence threshold (>= 0.60) to count as
           another person.
        """
        if not raw_faces:
            return []

        # 1. Filter out tiny noise boxes
        sized_faces = []
        for f in raw_faces:
            w, h = f["bbox"][2], f["bbox"][3]
            if w < 35 or h < 35:
                print(f"[DEBUG_FACE_VALIDATION] Excluded tiny detection: bbox={f['bbox']}, score={f['score']}")
                continue
            sized_faces.append(f)

        if not sized_faces:
            return []

        # Sort descending by score
        sorted_faces = sorted(sized_faces, key=lambda f: f["score"], reverse=True)
        primary = sorted_faces[0]
        valid_faces = [primary]

        for cand in sorted_faces[1:]:
            bx, by, bw, bh = cand["bbox"]
            c_score = cand["score"]
            px, py, pw, ph = primary["bbox"]
            p_score = primary["score"]

            cand_center_x = bx + 0.5 * bw
            cand_center_y = by + 0.5 * bh
            mouth_level = py + 0.65 * ph
            chin_level = py + 0.85 * ph

            # A. Torso / Shoulder / Clothing / Hand False Positive below/beside primary face
            is_torso_or_body = False
            if cand_center_y > chin_level and c_score < 0.65:
                is_torso_or_body = True

            body_col_left = px - 0.5 * pw
            body_col_right = px + 1.5 * pw
            if by > mouth_level and (body_col_left <= cand_center_x <= body_col_right) and c_score < 0.65:
                is_torso_or_body = True

            if is_torso_or_body:
                print(f"[DEBUG_FACE_VALIDATION] Excluded torso/clothing/hand artifact: bbox={cand['bbox']}, score={c_score} (below primary face)")
                continue

            # B. Boundary / Edge Cutoff
            margin_x = max(10, int(0.02 * img_w)) if img_w > 0 else 10
            margin_y = max(10, int(0.02 * img_h)) if img_h > 0 else 10
            touch_left = bx <= margin_x
            touch_right = (bx + bw) >= (img_w - margin_x) if img_w > 0 else False
            touch_top = by <= margin_y
            touch_bottom = (by + bh) >= (img_h - margin_y) if img_h > 0 else False
            is_at_boundary = touch_left or touch_right or touch_top or touch_bottom

            # Check if any key landmark points are cut off by the border
            landmarks = cand.get("landmarks", [])
            landmarks_truncated = False
            if len(landmarks) >= 10:
                for k in range(0, 10, 2):
                    lx, ly = landmarks[k], landmarks[k + 1]
                    if lx <= 5 or (img_w > 0 and lx >= img_w - 5) or ly <= 5 or (img_h > 0 and ly >= img_h - 5):
                        landmarks_truncated = True
                        break

            if is_at_boundary or landmarks_truncated:
                cand_area = bw * bh
                prim_area = pw * ph
                if c_score < 0.75 or cand_area < 0.30 * prim_area or landmarks_truncated:
                    print(f"[DEBUG_FACE_VALIDATION] Excluded boundary/partial face: bbox={cand['bbox']}, score={c_score} (boundary cutoff)")
                    continue

            # C. Low-confidence secondary face when dominant primary face exists
            if p_score >= 0.70 and c_score < 0.60:
                print(f"[DEBUG_FACE_VALIDATION] Excluded low-confidence secondary face: bbox={cand['bbox']}, score={c_score} (primary score={p_score})")
                continue

            valid_faces.append(cand)

        return valid_faces

    def clean_detections(self, raw_faces: List[Dict[str, Any]], img_w: int = 0, img_h: int = 0) -> List[Dict[str, Any]]:
        return self.filter_usable_selfie_faces(raw_faces, img_w, img_h)

    def validate_and_embed_selfie(self, image_bytes: bytes) -> Tuple[np.ndarray, Dict[str, Any]]:
        """
        Validates attendee selfie:
        - Exactly 1 detected face required.
        - 0 faces detected -> rejects with: "No face detected. Please upload a clear selfie."
        - 1 face detected -> continues with face matching normally.
        - 2 or more faces detected -> rejects with: "Multiple faces detected (N). Please upload a photo containing only one person."
        Returns: (128-d embedding, face_dict)
        """
        print(f"\n[DEBUG_FACE_VALIDATION] Validating uploaded selfie ({len(image_bytes)} bytes)...")
        img = self.decode_image(image_bytes)
        img_h, img_w = img.shape[:2] if img is not None else (0, 0)

        raw_faces = self.detect_faces(image_bytes)
        faces = self.filter_usable_selfie_faces(raw_faces, img_w, img_h)

        print(f"[DEBUG_FACE_VALIDATION] Raw faces detected: {len(raw_faces)}")
        print(f"[DEBUG_FACE_VALIDATION] Usable faces detected: {len(faces)}")
        for idx, f in enumerate(faces):
            print(f"[DEBUG_FACE_VALIDATION]   Face #{idx+1}: bbox={f['bbox']}, score={f['score']}")

        if len(faces) == 0:
            print("[DEBUG_FACE_VALIDATION] Decision: REJECTED (0 faces detected)")
            raise FaceValidationError(
                "NO_FACE_DETECTED",
                "No face detected. Please upload a clear selfie."
            )

        if len(faces) > 1:
            print(f"[DEBUG_FACE_VALIDATION] Decision: REJECTED ({len(faces)} faces detected)")
            raise FaceValidationError(
                "MULTIPLE_FACES_DETECTED",
                f"Multiple faces detected ({len(faces)}). Please upload a photo containing only one person."
            )

        print("[DEBUG_FACE_VALIDATION] Decision: ALLOWED (exactly 1 face detected)")
        return faces[0]["embedding"], faces[0]

    def compute_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """
        Computes cosine similarity between two 128-d SFace embeddings and maps
        it to a calibrated match confidence score in range [0.0 - 1.0].
        - Official SFace cosine threshold is 0.363 for same identity.
        - Exact same photo: cosine ~ 1.0 -> confidence = 1.0
        - Same person different photo / inside group photo: cosine 0.363 - 0.97 -> confidence 0.55 - 0.98
        - Different person: cosine < 0.28 -> confidence = 0.0
        """
        norm1 = float(np.linalg.norm(vec1))
        norm2 = float(np.linalg.norm(vec2))
        if norm1 == 0 or norm2 == 0:
            return 0.0

        dot = float(np.dot(vec1, vec2))
        cosine_sim = float(dot / (norm1 * norm2 + 1e-7))

        # Official OpenCV SFace threshold: 0.363
        if cosine_sim >= 0.363:
            # Map [0.363, 1.0] to [0.55, 1.0]
            conf = 0.55 + (cosine_sim - 0.363) / (1.0 - 0.363) * 0.45
        elif cosine_sim > 0.28:
            # Borderline non-match
            conf = (cosine_sim - 0.28) / (0.363 - 0.28) * 0.35
        else:
            conf = 0.0

        return round(float(min(1.0, max(0.0, conf))), 4)

    def match_selfie(
        self,
        query_embedding: np.ndarray,
        candidate_faces: List[Dict[str, Any]],
        threshold: float = 0.50
    ) -> List[Dict[str, Any]]:
        """
        Compares query_embedding against candidate faces.
        Handles photos containing multiple people by keeping the maximum match score per photo.
        Returns list of matching photo results ordered descending by confidence score.
        """
        photo_best_match: Dict[str, Dict[str, Any]] = {}

        for face in candidate_faces:
            photo_id = face["photo_id"]
            target_vec = face["embedding"]
            score = self.compute_similarity(query_embedding, target_vec)

            if score >= threshold:
                if photo_id not in photo_best_match or score > photo_best_match[photo_id]["confidence"]:
                    photo_best_match[photo_id] = {
                        "photo_id": photo_id,
                        "confidence": score,
                        "bbox": face.get("bbox"),
                        "cloudinary_public_id": face.get("cloudinary_public_id")
                    }

        results = list(photo_best_match.values())
        results.sort(key=lambda x: x["confidence"], reverse=True)
        return results

    def get_persona_embedding(self, persona_id: str) -> Optional[np.ndarray]:
        return self._persona_embeddings.get(persona_id)

face_engine = FaceMatchingEngine()
