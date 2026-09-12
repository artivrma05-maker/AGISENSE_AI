import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Loader2,
  Leaf,
  AlertCircle,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

type DiseaseResult = {
  success: boolean;
  disease: string;
  confidence: number;
  crop: string;
  severity: string;
  symptoms: string[];
  remedy: string;
  prevention: string;
};

export default function DiseaseDetection() {
  const { t } = useLanguage();

  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Capture button
  const handleCapture = () => {
    setImage(
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"
    );

    setSelectedFile(null);
    setResult(null);
  };

  // Open gallery/file picker
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // When user selects an image
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setSelectedFile(file);
    setResult(null);
  };

  // Send image to backend
  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please upload an image first.");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/detect-disease",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data: DiseaseResult = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Disease detection error:", error);

      alert(
        "Unable to connect to the AI backend. Please make sure the backend server is running."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // Reset everything
  const handleScanAgain = () => {
    setImage(null);
    setSelectedFile(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader
        title={t.diseaseDetectionTitle}
        subtitle={t.scanCropCamera}
      />

      <div className="px-4 space-y-4">
        {!image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-primary/30 rounded-2xl h-64 flex flex-col items-center justify-center gap-3"
          >
            <Camera className="w-12 h-12 text-primary/50" />

            <p className="text-sm text-muted-foreground">
              {t.takePhotoAffected}
            </p>

            <div className="flex gap-2">
              {/* Capture */}
              <Button
                onClick={handleCapture}
                className="gradient-hero text-primary-foreground rounded-xl"
              >
                <Camera className="w-4 h-4 mr-2" />
                {t.capture}
              </Button>

              {/* Upload */}
              <Button
                variant="outline"
                onClick={handleUploadClick}
                className="rounded-xl"
              >
                <Upload className="w-4 h-4 mr-2" />
                {t.upload}
              </Button>

              {/* Hidden file picker */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Uploaded image */}
            <img
              src={image}
              alt="Selected crop"
              className="w-full h-56 object-cover rounded-2xl"
            />

            {/* Analyze */}
            {!result && (
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full mt-3 gradient-hero text-primary-foreground rounded-xl h-12 text-base font-bold"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Disease"
                )}
              </Button>
            )}
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* Disease + Confidence */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-destructive" />

                <span className="font-bold text-destructive">
                  {result.disease}
                </span>

                <span className="ml-auto text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full font-bold">
                  {result.confidence}% Confidence
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Crop: {result.crop}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                Severity:{" "}
                <span className="font-semibold">
                  {result.severity}
                </span>
              </p>
            </div>

            {/* Symptoms */}
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm mb-2">
                🔍 Symptoms
              </h3>

              <ul className="text-sm text-muted-foreground space-y-1">
                {result.symptoms.map((symptom, index) => (
                  <li key={index}>• {symptom}</li>
                ))}
              </ul>
            </div>

            {/* Remedy */}
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm flex items-center gap-1.5 mb-2">
                <Leaf className="w-4 h-4 text-primary" />
                Treatment / Advisory
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.remedy}
              </p>
            </div>

            {/* Prevention */}
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm mb-2">
                🛡️ Prevention
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.prevention}
              </p>
            </div>

            {/* Scan again */}
            <Button
              variant="outline"
              onClick={handleScanAgain}
              className="w-full rounded-xl"
            >
              Scan Another Plant
            </Button>

            {/* Demo notice */}
            <p className="text-center text-xs text-muted-foreground">
              ⚠️ Demo analysis — actual ML model integration will be added later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}