import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Loader2,
  Leaf,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  RefreshCw,
  Sprout,
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

  const handleCapture = () => {
    setImage(
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop"
    );
    setSelectedFile(null);
    setResult(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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

  const handleScanAgain = () => {
    setImage(null);
    setSelectedFile(null);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title={t.diseaseDetectionTitle}
        subtitle={t.scanCropCamera}
      />

      <div className="px-4 space-y-5">

        {/* Upload Section */}
        {!image ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary/10 p-6 shadow-sm"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative flex flex-col items-center justify-center min-h-64 text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                <Leaf className="w-10 h-10 text-primary" />
              </div>

              <h2 className="text-lg font-bold mb-1">
                Scan Your Crop
              </h2>

              <p className="text-sm text-muted-foreground max-w-xs mb-5">
                Upload a clear leaf image and let AGISENSE AI analyze possible
                crop diseases.
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={handleCapture}
                  className="gradient-hero text-primary-foreground rounded-xl px-5"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t.capture}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleUploadClick}
                  className="rounded-xl px-5"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t.upload}
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Image Preview */}
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-sm">
              <img
                src={image}
                alt="Selected crop"
                className="w-full h-64 object-cover"
              />

              {!result && (
                <div className="absolute bottom-3 left-3 right-3">
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full gradient-hero text-primary-foreground rounded-xl h-12 text-base font-bold shadow-lg"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Stethoscope className="w-5 h-5 mr-2" />
                        Analyze Disease
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >

            {/* Main Result Card */}
            <div className="relative overflow-hidden rounded-3xl border border-destructive/20 bg-gradient-to-br from-destructive/10 via-card to-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    AI Detection Result
                  </p>

                  <h2 className="text-xl font-bold leading-tight">
                    {result.disease}
                  </h2>
                </div>

                <span className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-destructive/10 text-destructive">
                  {result.severity}
                </span>
              </div>

              {/* Crop */}
              <div className="flex items-center gap-2 mt-4 text-sm">
                <Sprout className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Crop:</span>
                <span className="font-semibold">{result.crop}</span>
              </div>

              {/* Confidence */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">
                    AI Confidence
                  </span>

                  <span className="text-sm font-bold text-primary">
                    {result.confidence}%
                  </span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>

                <div>
                  <h3 className="font-bold">Symptoms</h3>
                  <p className="text-xs text-muted-foreground">
                    Common signs detected
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {result.symptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment */}
            <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold">Treatment / Advisory</h3>
                  <p className="text-xs text-muted-foreground">
                    Recommended next steps
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-7">
                {result.remedy}
              </p>
            </div>

            {/* Prevention */}
            <div className="rounded-3xl bg-card border border-border p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>

                <div>
                  <h3 className="font-bold">Prevention</h3>
                  <p className="text-xs text-muted-foreground">
                    Protect your crop
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-7">
                {result.prevention}
              </p>
            </div>

            {/* Scan Again */}
            <Button
              variant="outline"
              onClick={handleScanAgain}
              className="w-full rounded-xl h-12 font-semibold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Scan Another Plant
            </Button>

            <p className="text-center text-xs text-muted-foreground px-4">
              AI-powered classification result. For important crop-management
              decisions, verify the diagnosis with a local agricultural expert.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}