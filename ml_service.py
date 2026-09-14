from flask import Flask, request, jsonify
from PIL import Image

import torch
from torchvision import transforms
from transformers import AutoModelForImageClassification


app = Flask(__name__)

MODEL_NAME = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"


print("Loading lightweight AI model...")

# Load MobileNetV2 model
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)
model.eval()

# Image preprocessing based on the model's configuration
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.5, 0.5, 0.5],
        std=[0.5, 0.5, 0.5]
    )
])

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

        # Open image
        image = Image.open(file).convert("RGB")

        # Preprocess image
        pixel_values = transform(image).unsqueeze(0)

        # Prediction
        with torch.no_grad():
            outputs = model(pixel_values=pixel_values)

        # Convert logits to probabilities
        probabilities = torch.nn.functional.softmax(
            outputs.logits,
            dim=-1
        )

        # Get top 5 predictions
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

            confidence = float(
                probability.item() * 100
            )

            predictions.append({
                "label": label,
                "confidence": round(confidence, 2)
            })

        # Best prediction
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
    import os

    port = int(os.environ.get("PORT", 8000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )