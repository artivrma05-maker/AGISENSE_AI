import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Loader2, Leaf, AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const mockResult = {
  disease: "Late Blight",
  confidence: 92,
  crop: "Tomato",
  remedy: "Apply Mancozeb 75% WP @ 2.5g/L. Remove infected leaves immediately. Ensure proper spacing for air circulation.",
  prevention: "Use resistant varieties. Avoid overhead irrigation. Apply preventive fungicide during humid weather.",
};

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleCapture = () => {
    // Simulate camera capture
    setImage("https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop");
    setResult(null);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockResult);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title="🔬 Disease Detection" subtitle="Scan your crop with camera" />

      <div className="px-4 space-y-4">
        {!image ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-primary/30 rounded-2xl h-64 flex flex-col items-center justify-center gap-3"
          >
            <Camera className="w-12 h-12 text-primary/50" />
            <p className="text-sm text-muted-foreground">Take a photo of the affected plant</p>
            <div className="flex gap-2">
              <Button onClick={handleCapture} className="gradient-hero text-primary-foreground rounded-xl">
                <Camera className="w-4 h-4 mr-2" /> Capture
              </Button>
              <Button variant="outline" onClick={handleCapture} className="rounded-xl">
                <Upload className="w-4 h-4 mr-2" /> Upload
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <img src={image} alt="Captured crop" className="w-full h-56 object-cover rounded-2xl" />
            {!result && (
              <Button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full mt-3 gradient-hero text-primary-foreground rounded-xl h-12 text-base font-bold"
              >
                {analyzing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : "🔍 Analyze Disease"}
              </Button>
            )}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="font-bold text-destructive">{result.disease}</span>
                <span className="ml-auto text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full font-bold">
                  {result.confidence}% match
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Detected on: {result.crop}</p>
            </div>

            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm flex items-center gap-1.5 mb-2">
                <Leaf className="w-4 h-4 text-primary" /> Remedy
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.remedy}</p>
            </div>

            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm mb-2">🛡️ Prevention</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.prevention}</p>
            </div>

            <Button
              variant="outline"
              onClick={() => { setImage(null); setResult(null); }}
              className="w-full rounded-xl"
            >
              Scan Another Plant
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
