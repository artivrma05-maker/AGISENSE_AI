import { useState } from "react";
import { motion } from "framer-motion";
import { Scan, Camera, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const mockSoilResult = {
  type: "Black Cotton Soil (Vertisol)",
  ph: "7.2", nitrogen: "Medium", phosphorus: "Low", potassium: "High", organic: "2.1%",
  recommendations: [
    "Apply DAP fertilizer 50kg/acre for phosphorus boost",
    "Add vermicompost 2T/acre to improve organic matter",
    "Ideal for wheat, soybean, and cotton this season",
    "Avoid waterlogging — add drainage channels",
  ],
};

export default function SoilScanner() {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<typeof mockSoilResult | null>(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => { setResult(mockSoilResult); setScanning(false); }, 2500);
  };

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.soilScannerTitle} subtitle={t.soilScannerSubtitle} />
      <div className="px-4 space-y-4">
        {!result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="border-2 border-dashed border-primary/30 rounded-2xl h-56 flex flex-col items-center justify-center gap-3">
              <Scan className="w-12 h-12 text-primary/50" />
              <p className="text-sm text-muted-foreground text-center px-8">{t.pointCamera}</p>
            </div>
            <Button onClick={handleScan} disabled={scanning}
              className="w-full gradient-hero text-primary-foreground rounded-xl h-12 text-base font-bold">
              {scanning ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {t.scanningSoil}</> : <><Camera className="w-5 h-5 mr-2" /> {t.scanSoil}</>}
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-base text-foreground mb-3">🏔️ {result.type}</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: t.phLevel, value: result.ph, color: "text-primary" },
                  { label: t.nitrogen, value: result.nitrogen, color: "text-success" },
                  { label: t.phosphorus, value: result.phosphorus, color: "text-destructive" },
                  { label: t.potassium, value: result.potassium, color: "text-success" },
                  { label: t.organicMatter, value: result.organic, color: "text-primary" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted rounded-xl p-3">
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-sm mb-3">{t.recommendations}</h3>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full gradient-hero text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="outline" onClick={() => setResult(null)} className="w-full rounded-xl">{t.scanAgain}</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
