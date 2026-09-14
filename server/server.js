const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ======================================================
// DISEASE INFORMATION
// ======================================================
const diseaseInfo = {

  "tomato - late blight": {
    symptoms: [
      "Dark brown to black irregular spots may appear on leaves.",
      "Leaves may develop water-soaked or rapidly spreading lesions.",
      "In humid conditions, affected areas can spread quickly."
    ],
    remedy:
      "Remove and safely dispose of severely affected plant parts where appropriate. Improve air circulation and avoid prolonged leaf wetness. Consult local agricultural guidance before using any fungicide.",
    prevention:
      "Avoid overhead irrigation, maintain proper spacing, remove infected plant debris, and regularly monitor nearby plants."
  },

  "tomato - early blight": {
    symptoms: [
      "Brown circular spots may appear on older leaves.",
      "Spots can develop concentric ring patterns.",
      "Severely affected leaves may turn yellow and fall."
    ],
    remedy:
      "Remove severely affected leaves and maintain good field sanitation. Follow recommended agricultural guidance for disease management.",
    prevention:
      "Avoid overhead watering, maintain adequate spacing, remove infected debris, and monitor plants regularly."
  },

  "tomato - bacterial spot": {
    symptoms: [
      "Small dark spots may appear on leaves.",
      "Lesions can become larger and irregular.",
      "Fruit may develop small raised or dark spots."
    ],
    remedy:
      "Remove heavily affected plant material and avoid working with plants when they are wet. Follow local agricultural recommendations for management.",
    prevention:
      "Use clean planting material, avoid overhead irrigation, maintain plant spacing, and sanitize tools."
  },

  "tomato - leaf mold": {
    symptoms: [
      "Yellowish patches may appear on the upper surface of leaves.",
      "Olive or grayish fungal growth may develop on the underside.",
      "Severely affected leaves can dry and fall."
    ],
    remedy:
      "Remove severely affected leaves and improve ventilation around plants. Avoid excessive humidity and follow local agricultural guidance for treatment.",
    prevention:
      "Maintain good air circulation, avoid excessive leaf wetness, provide adequate spacing, and monitor plants regularly."
  },

  "tomato - septoria leaf spot": {
    symptoms: [
      "Small circular spots may appear on older leaves.",
      "Spots may have gray centers with darker margins.",
      "Severe infection can cause leaves to yellow and fall."
    ],
    remedy:
      "Remove affected leaves and infected plant debris. Improve air circulation and avoid overhead watering.",
    prevention:
      "Keep foliage dry when possible, maintain plant spacing, remove infected debris, and monitor the crop regularly."
  },

  "tomato - tomato yellow leaf curl virus": {
    symptoms: [
      "Leaves may curl upward and become smaller.",
      "Leaves can develop yellowing around the margins.",
      "Plant growth may become stunted."
    ],
    remedy:
      "Remove severely affected plants where appropriate and manage insect vectors according to local agricultural recommendations.",
    prevention:
      "Monitor for whiteflies, remove infected plant material, maintain field hygiene, and use recommended vector-management practices."
  },

  "tomato - tomato mosaic virus": {
    symptoms: [
      "Leaves may show light and dark green mosaic patterns.",
      "Leaves can become distorted or curled.",
      "Plant growth may be reduced."
    ],
    remedy:
      "Remove severely affected plants where appropriate and sanitize tools after handling infected plants.",
    prevention:
      "Use clean planting material, sanitize tools, wash hands after handling plants, and avoid spreading plant sap between plants."
  },

  "tomato - healthy": {
    symptoms: [
      "No major disease symptoms were detected by the model.",
      "Leaves appear consistent with a healthy plant."
    ],
    remedy:
      "Continue normal crop care and monitor the plant regularly.",
    prevention:
      "Maintain proper watering, nutrition, spacing, and regular crop inspection."
  }

};
// ======================================================
// FILE UPLOAD SETUP
// ======================================================

const upload = multer({
  storage: multer.memoryStorage(),
});


// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.json({
    message: "AGISENSE AI Backend is running!",
  });
});


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Disease Detection API is ready",
  });
});


// ======================================================
// DISEASE DETECTION API
// ======================================================

app.post(
  "/api/detect-disease",
  upload.single("image"),
  async (req, res) => {

    try {

      // ----------------------------------------------
      // CHECK IMAGE
      // ----------------------------------------------

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });

      }


      console.log(
        "Image received:",
        req.file.originalname
      );


      // ----------------------------------------------
      // CREATE FORM DATA
      // ----------------------------------------------

      const form = new FormData();


      form.append(
        "image",
        req.file.buffer,
        {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        }
      );


      console.log(
        "Sending image to Python ML service..."
      );


      // ----------------------------------------------
      // SEND IMAGE TO PYTHON ML SERVICE
      // ----------------------------------------------

      const mlResponse = await axios.post(

        "https://agisense-ml-service.onrender.com/predict",

        form,

        {
          headers: {
            ...form.getHeaders(),
          },

          maxBodyLength: Infinity,
        }

      );


      // ----------------------------------------------
      // GET ML PREDICTION
      // ----------------------------------------------

      const prediction = mlResponse.data;


      console.log(
        "ML prediction:",
        prediction
      );


      // ----------------------------------------------
      // CHECK ML RESPONSE
      // ----------------------------------------------

      if (!prediction.success) {

        return res.status(500).json({
          success: false,
          message: "ML prediction failed",
        });

      }


      // ----------------------------------------------
      // DISEASE NAME
      // ----------------------------------------------

      const diseaseLabel =
        prediction.disease;


      const readableDisease =
        diseaseLabel
          .replace(/___/g, " - ")
          .replace(/_/g, " ");
          console.log("Disease Label:", diseaseLabel);
console.log("Readable Disease:", readableDisease);
console.log("Lookup Key:", readableDisease.toLowerCase());


      // ----------------------------------------------
      // DETECT CROP
      // ----------------------------------------------

      let crop = "Unknown";


      if (diseaseLabel.includes("Tomato")) {

        crop = "Tomato";

      }

      else if (diseaseLabel.includes("Potato")) {

        crop = "Potato";

      }

      else if (diseaseLabel.includes("Apple")) {

        crop = "Apple";

      }

      else if (diseaseLabel.includes("Corn")) {

        crop = "Corn";

      }

      else if (diseaseLabel.includes("Grape")) {

        crop = "Grape";

      }

      else if (diseaseLabel.includes("Pepper")) {

        crop = "Pepper";

      }

      else if (diseaseLabel.includes("Strawberry")) {

        crop = "Strawberry";

      }


      // ----------------------------------------------
      // DISEASE INFORMATION
      // ----------------------------------------------

      const info =
  diseaseInfo[readableDisease.toLowerCase()] || {

          symptoms: [
            "The image classification model detected a possible disease.",
            "Further field inspection is recommended.",
            "Check nearby plants for similar symptoms."
          ],

          remedy:
            "Remove severely affected plant parts where appropriate and follow local agricultural guidance before applying any treatment.",

          prevention:
            "Monitor the crop regularly, maintain good air circulation, avoid unnecessary leaf wetness, and follow recommended preventive practices."

        };


      // ----------------------------------------------
      // SEVERITY
      // ----------------------------------------------

      let severity;


      if (prediction.confidence >= 70) {

        severity = "Moderate";

      }

      else {

        severity =
          "Needs further inspection";

      }


      // ----------------------------------------------
      // SEND RESPONSE TO FRONTEND
      // ----------------------------------------------

      res.json({

        success: true,

        disease: readableDisease,

        confidence: prediction.confidence,

        crop: crop,

        severity: severity,

        symptoms: info.symptoms,

        remedy: info.remedy,

        prevention: info.prevention,

        predictions:
          prediction.predictions,

        analysisType: "ml"

      });


    }

    catch (error) {

      // ----------------------------------------------
      // ERROR HANDLING
      // ----------------------------------------------

      console.error(
        "Disease detection error:"
      );


      if (error.response) {

        console.error(
          error.response.data
        );

      }

      else {

        console.error(
          error.message
        );

      }


      res.status(500).json({

        success: false,

        message:
          "Unable to connect to the Python ML service. Make sure ml_service.py is running."

      });

    }

  }
);


// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `AGISENSE backend running on port ${PORT}`
    );

  }
);