import cv2
import easyocr
import re
from ultralytics import YOLO

# ================= CONFIG =================
TARGET_PLATE = "MH14BV3421"
VIDEO_SOURCE = "video4.mp4"   # change if needed
# ==========================================

# load models
plate_model = YOLO("license_plate_detector.pt")
reader = easyocr.Reader(['en'], download_enabled=False)

# ---------- CLEAN TEXT ----------
def clean_text(text):
    text = re.sub(r'[^A-Z0-9]', '', text.upper())
    return text

# ---------- MATCH (STRICT + FUZZY) ----------
def is_target(text):
    target = TARGET_PLATE

    if len(text) != len(target):
        return False

    match = sum(1 for a, b in zip(text, target) if a == b)

    return match >= len(target) - 2  # allow 2 mistakes

# ---------- START VIDEO ----------
cap = cv2.VideoCapture(VIDEO_SOURCE)

print("🚀 Scanning started...")

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Plate not found")
        break

    # detect plates
    results = plate_model(frame)[0]

    for box in results.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        plate_crop = frame[y1:y2, x1:x2]

        if plate_crop.size == 0:
            continue

        # OCR
        ocr_results = reader.readtext(plate_crop)

        for (_, text, conf) in ocr_results:
            cleaned = clean_text(text)

            print("OCR:", cleaned)

            if len(cleaned) < 6:
                continue

            # 🎯 MATCH
            if is_target(cleaned):
                print("\n🚨 NUMBER PLATE DETECTED:", TARGET_PLATE)

                # draw box
                cv2.rectangle(frame, (x1,y1),(x2,y2),(0,0,255),3)

                # show correct plate (not OCR mistake)
                cv2.putText(frame, TARGET_PLATE, (x1,y1-10),
                            cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,255),2)

                cv2.imshow("Detected", frame)
                cv2.waitKey(3000)

                cap.release()
                cv2.destroyAllWindows()
                exit()

    cv2.imshow("Scanning", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()