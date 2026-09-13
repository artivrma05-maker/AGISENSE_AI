import { motion } from "framer-motion";
import {
  History,
  Leaf,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  Trash2,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

export type ScanRecord = {
  id: number;
  crop: string;
  disease: string;
  confidence: number;
  image?: string;
  date: string;
  status: "Disease Detected" | "Healthy";
};

export default function ScanHistory() {
  const savedHistory = localStorage.getItem("scanHistory");

  const scanHistory: ScanRecord[] = savedHistory
    ? JSON.parse(savedHistory)
    : [];
    const deleteScan = (id: number) => {
  const updatedHistory = scanHistory.filter(
    (scan) => scan.id !== id
  );

  localStorage.setItem(
    "scanHistory",
    JSON.stringify(updatedHistory)
  );

  window.location.reload();
};

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Scan History"
        subtitle="View your previous crop disease scans"
      />

      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 p-4">
  <div>
    <p className="text-xs text-muted-foreground">Total Scans</p>
    <p className="text-2xl font-black text-primary">
      {scanHistory.length}
    </p>
  </div>

  {scanHistory.length > 0 && (
    <button
      onClick={() => {
  const confirmClear = window.confirm(
    "Are you sure you want to clear all scan history?"
  );

  if (confirmClear) {
    localStorage.removeItem("scanHistory");
    window.location.reload();
  }
}}
      className="text-sm font-semibold text-destructive"
    >
      Clear History
    </button>
  )}
</div>
        {scanHistory.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12 text-muted-foreground">
            <History className="w-12 h-12 mb-3 opacity-40" />

            <h3 className="font-bold text-lg text-foreground">
              No scans yet
            </h3>

            <p className="text-sm mt-1">
              Your crop scans will appear here after analysis.
            </p>
          </div>
        ) : (
          scanHistory.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl bg-card border border-border p-5 shadow-sm"
            >
              {scan.image && (
  <div className="mb-4 overflow-hidden rounded-2xl">
    <img
      src={scan.image}
      alt={`${scan.crop} scan`}
      className="w-full h-48 object-cover"
    />
  </div>
)}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Crop
                    </p>

                    <h3 className="font-bold text-lg">
                      {scan.crop}
                    </h3>
                  </div>
                </div>

                {scan.status === "Healthy" ? (
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-500/10 text-green-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Healthy
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-destructive/10 text-destructive">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Disease Detected
                  </span>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1">
                  Detection Result
                </p>

                <p className="font-semibold">
                  {scan.disease}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    AI Confidence
                  </span>

                  <span className="text-sm font-bold text-primary">
                    {scan.confidence}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${scan.confidence}%`,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                    }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span>{scan.date}</span>
              </div>
              <button
  onClick={() => deleteScan(scan.id)}
  className="mt-4 flex items-center gap-2 text-sm font-semibold text-destructive hover:opacity-80"
>
  <Trash2 className="w-4 h-4" />
  Delete Scan
</button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}