from flask import Flask, request, jsonify
from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification

app = Flask(__name__)

MODEL_NAME = "asafe51/plantvillage-disease-classifier"

print("Loading AI model...")
processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()

print("AI model loaded successfully!")


@app.route("/")
def home():
    return jsonify({
        "message": "AGISENSE AI ML Service is running!"
    })


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    try:
        file = request.files["image"]

        image = Image.open(file).convert("RGB")

        inputs = processor(
            images=image,
            return_tensors="pt"
        )

        with torch.no_grad():
            outputs = model(**inputs)

        probabilities = torch.nn.functional.softmax(
            outputs.logits,
            dim=-1
        )

        top_probabilities, top_indices = torch.topk(
            probabilities,
            5
        )

        predictions = []

        for probability, index in zip(
            top_probabilities[0],
            top_indices[0]
        ):
            label = model.config.id2label[index.item()]
            confidence = float(probability.item() * 100)

            predictions.append({
                "label": label,
                "confidence": round(confidence, 2)
            })

        best_prediction = predictions[0]

        return jsonify({
            "success": True,
            "disease": best_prediction["label"],
            "confidence": best_prediction["confidence"],
            "predictions": predictions
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "success": False,
            "message": "Prediction failed",
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8000,
        debug=False
    )