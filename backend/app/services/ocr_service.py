import re
from typing import List, Dict, Any, Optional

class SportsBibOcrEngine:
    """
    OCR and numerical indexing engine for sports events.
    Enables marathon, triathlons, and cycling races to be searched by bib numbers.
    """
    def __init__(self):
        pass

    def extract_bib_numbers(self, text_or_tags: str) -> List[str]:
        """Extracts 2 to 6 digit numbers representing race bibs"""
        matches = re.findall(r'\b\d{2,6}\b', str(text_or_tags))
        return list(set(matches))

    def search_by_bib(self, query_bib: str, event_photos: List[Any]) -> List[Dict[str, Any]]:
        """
        Searches event photos for a matching bib number.
        Returns matching photos with confidence and detected bib.
        """
        clean_query = query_bib.strip()
        matched = []
        for photo in event_photos:
            bibs = photo.bib_numbers if hasattr(photo, 'bib_numbers') else photo.get('bib_numbers', [])
            for bib in bibs:
                if bib == clean_query:
                    matched.append({
                        "photo": photo,
                        "confidence_score": 0.99,
                        "match_type": "bib",
                        "detected_bib": bib
                    })
                    break
                elif clean_query in bib:
                    matched.append({
                        "photo": photo,
                        "confidence_score": 0.92,
                        "match_type": "bib",
                        "detected_bib": bib
                    })
                    break
        return matched

bib_ocr_engine = SportsBibOcrEngine()
