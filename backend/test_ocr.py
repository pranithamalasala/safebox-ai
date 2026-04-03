import easyocr
import cv2

# Tell EasyOCR not to download anything - use local files only
reader = easyocr.Reader(['en'], download_enabled=False)

img_path = "test.jpeg"  # <- your actual image name
img = cv2.imread(img_path)

results = reader.readtext(img, allowlist='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

print("=== EasyOCR Results ===")
for (bbox, text, confidence) in results:
    print(f"Text: {text}  |  Confidence: {confidence:.2f}")