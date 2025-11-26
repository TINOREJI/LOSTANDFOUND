# backend/src/ai/predict.py
import sys
import json
import os
from ultralytics import YOLO

# Correct model path (same folder as this script)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best.pt")

# Load model once — outside function
try:
    model = YOLO(MODEL_PATH)
    print("YOLO model loaded successfully", file=sys.stderr)
except Exception as e:
    print(f"Failed to load model: {e}", file=sys.stderr)
    sys.exit(1)

def predict(image_path):
    try:
        # verbose=False → no logs to stderr
        # Lower conf threshold → better detection
        results = model(image_path, conf=0.25, imgsz=640, verbose=False)[0]
        
        detections = []
        if results.boxes is not None and len(results.boxes) > 0:
            for box in results.boxes:
                cls_id = int(box.cls[0].item())  # .item() fixes tensor issue
                conf = float(box.conf[0].item())
                name = results.names[cls_id]
                detections.append({
                    "name": name,
                    "confidence": round(conf, 3)
                })
        
        # Sort by confidence
        detections.sort(key=lambda x: x["confidence"], reverse=True)
        
        # Print ONLY clean JSON — nothing else!
        print(json.dumps(detections[:5]))
        
    except Exception as e:
        # Always return valid JSON, never crash
        print(json.dumps([]))
        print(f"Detection error: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps([]))
        sys.exit(0)
    
    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(json.dumps([]))
        sys.exit(0)
    
    predict(image_path)