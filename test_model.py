from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification

MODEL_NAME = "asafe51/plantvillage-disease-classifier"
IMAGE_PATH = "leaf.jpg"

print("Loading image...")

image = Image.open(IMAGE_PATH).convert("RGB")

print("Loading ML model...")
print("First download may take some time...")

processor = AutoImageProcessor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)

print("Model loaded successfully!")

inputs = processor(images=image, return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)

probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)

top_probabilities, top_indices = torch.topk(probabilities, 5)

print("\n==============================")
print("AGISENSE AI - ML PREDICTION")
print("==============================")

for probability, index in zip(top_probabilities[0], top_indices[0]):
    label = model.config.id2label[index.item()]
    confidence = probability.item() * 100

    print(f"{label}: {confidence:.2f}%")