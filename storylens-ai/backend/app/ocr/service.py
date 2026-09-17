"""
Tesseract OCR service.

Extracts text from image files (PNG, JPG, JPEG, WEBP, TIFF, BMP)
using pytesseract with optional pre-processing via Pillow.
"""
import logging
from io import BytesIO
from typing import Optional, Tuple

from PIL import Image, ImageOps

from app.core.config import settings

logger = logging.getLogger(__name__)


class OCRService:
    """Wrapper around pytesseract with image pre-processing helpers."""

    SUPPORTED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "tiff", "bmp"}

    def __init__(self) -> None:
        # Allow override for systems where tesseract lives elsewhere
        try:
            import pytesseract

            if settings.TESSERACT_CMD:
                pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_CMD
            self._pytesseract = pytesseract
        except ImportError as exc:  # pragma: no cover
            logger.error("pytesseract is not installed: %s", exc)
            self._pytesseract = None

    # ------------------------------------------------------------------
    def is_available(self) -> bool:
        """Whether pytesseract is importable."""
        return self._pytesseract is not None

    # ------------------------------------------------------------------
    def extract_text_from_bytes(self, data: bytes) -> str:
        """
        Run OCR on raw image bytes.

        Returns the extracted text (possibly empty if the image had none).
        """
        if not self.is_available():
            raise RuntimeError("Tesseract OCR is not available on this system.")

        image = Image.open(BytesIO(data))
        # Convert to grayscale + increase contrast for better accuracy
        processed = ImageOps.grayscale(image)
        processed = ImageOps.autocontrast(processed)

        text = self._pytesseract.image_to_string(processed)
        return text.strip()

    # ------------------------------------------------------------------
    def extract_text(self, file_path: str) -> str:
        """Run OCR on an image file on disk."""
        with open(file_path, "rb") as fh:
            return self.extract_text_from_bytes(fh.read())


ocr_service = OCRService()

