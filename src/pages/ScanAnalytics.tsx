import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  Leaf,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Clock,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";

type ScanRecord = {
  id: number;
  crop: string;
  disease: string;
  confidence: number;
  date: string;
  status: "Disease Detected" | "Healthy";
};

export default function ScanAnalytics() {
  const savedHistory = localStorage.getItem("scanHistory");

  const scanHistory: ScanRecord[] = savedHistory
    ? JSON.parse(savedHistory)
    : [];

  const totalScans = scanHistory.length;

  const healthyScans = scanHistory.filter(
    (scan) => scan.status === "Healthy"
  ).length;

  const diseaseScans = scanHistory.filter(
    (scan) => scan.status === "Disease Detected"
  ).length;

  const healthyPercentage =
    totalScans > 0 ? Math.round((healthyScans / totalScans) * 100) : 0;

  const diseasePercentage =
    totalScans > 0 ? Math.round((diseaseScans / totalScans) * 100) : 0;

  const diseaseCounts: Record<string, number> = {};

  scanHistory
    .filter((scan) => scan.status === "Disease Detected")
    .forEach((scan) => {
      diseaseCounts[scan.disease] =
        (diseaseCounts[scan.disease] || 0) + 1;
    });

  const mostDetectedDisease =
    Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No disease detected yet";
    const diseaseChartData = Object.entries(diseaseCounts)
  .map(([disease, count]) => ({
    disease,
    count,
  }))
  .sort((a, b) => b.count - a.count);

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Scan Analytics"
        subtitle="Understand your crop health through scan data"
      />

      <div className="px-4 space-y-5">
        {/* Total Scans */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20 p-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Crop Scans
              </p>

              <h2 className="text-3xl font-black">
                {totalScans}
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Health Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-card border border-border p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-2xl bg-green-500/10 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>

            <p className="text-xs text-muted-foreground">
              Healthy
            </p>

            <p className="text-2xl font-black text-green-600">
              {healthyScans}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              {healthyPercentage}% of scans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-card border border-border p-5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-2xl bg-destructive/10 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>

            <p className="text-xs text-muted-foreground">
              Disease Detected
            </p>

            <p className="text-2xl font-black text-destructive">
              {diseaseScans}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              {diseasePercentage}% of scans
            </p>
          </motion.div>
        </div>

        {/* Most Detected Disease */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-card border border-border p-5 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h3 className="font-bold">
                Most Detected Disease
              </h3>

              <p className="text-xs text-muted-foreground">
                Based on your scan history
              </p>
            </div>
          </div>

          <p className="font-semibold text-lg">
            {mostDetectedDisease}
          </p>
        </motion.div>
        {/* Disease Distribution Chart */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white rounded-2xl p-5 shadow-sm border"
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-xl bg-blue-100">
      <BarChart3 className="w-5 h-5 text-blue-600" />
    </div>

    <div>
      <h2 className="font-semibold text-lg">
        Disease Distribution
      </h2>
      <p className="text-sm text-gray-500">
        Diseases detected in your scans
      </p>
    </div>
  </div>

  {diseaseChartData.length > 0 ? (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={diseaseChartData}>
          <XAxis
            dataKey="disease"
            tick={{ fontSize: 10 }}
            angle={-25}
            textAnchor="end"
            height={70}
          />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            name="Scans"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">
      <Leaf className="w-10 h-10 mx-auto mb-2 opacity-50" />

      <p>No disease data available yet.</p>

      <p className="text-sm">
        Analyze some plants to see the chart.
      </p>
    </div>
  )}
</motion.div>

        {/* Crop Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-card border border-border p-5 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h3 className="font-bold">
                Crop Scan Summary
              </h3>

              <p className="text-xs text-muted-foreground">
                Recent crop health activity
              </p>
            </div>
          </div>

          {totalScans === 0 ? (
            <p className="text-sm text-muted-foreground">
              Start scanning crops to see analytics here.
            </p>
          ) : (
            <div className="space-y-3">
              {Array.from(
                new Set(scanHistory.map((scan) => scan.crop))
              ).map((crop) => {
                const cropCount = scanHistory.filter(
                  (scan) => scan.crop === crop
                ).length;

                return (
                  <div
                    key={crop}
                    className="flex items-center justify-between rounded-2xl bg-muted p-3"
                  >
                    <span className="font-medium">
                      {crop}
                    </span>

                    <span className="text-sm font-bold text-primary">
                      {cropCount} scan{cropCount > 1 ? "s" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
        {/* Recent Scan Activity */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white rounded-2xl p-5 shadow-sm border"
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-xl bg-purple-100">
      <Clock className="w-5 h-5 text-purple-600" />
    </div>

    <div>
      <h2 className="font-semibold text-lg">
        Recent Scan Activity
      </h2>
      <p className="text-sm text-gray-500">
        Your latest crop scans
      </p>
    </div>
  </div>

  {scanHistory.length > 0 ? (
    <div className="space-y-3">
      {scanHistory
        .slice()
        .reverse()
        .slice(0, 5)
        .map((scan) => (
          <div
            key={scan.id}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
          >
            <div>
              <p className="font-medium">
                {scan.crop}
              </p>

              <p className="text-sm text-gray-500">
                {scan.disease}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {scan.date}
              </p>
            </div>

            <div className="text-right">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  scan.status === "Healthy"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {scan.status}
              </span>

              <p className="text-xs text-gray-500 mt-2">
                {scan.confidence}% confidence
              </p>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500">
      <p>No recent scans available.</p>
    </div>
  )}
</motion.div>
      </div>
    </div>
  );
}