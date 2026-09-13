import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Scan,
  IndianRupee,
  TrendingUp,
  CloudSun,
   MessageCircle,
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

type Expense = {
  id: number;
  category: string;
  amount: number;
  note: string;
};

export default function Dashboard() {
  const [weatherRisk, setWeatherRisk] = useState(
    "Checking weather conditions..."
  );

  const getWeatherRisk = async () => {
    try {
      const savedLocation =
        localStorage.getItem("farmerLocation") ||
        "Lucknow, Uttar Pradesh";

      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          savedLocation
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Location search failed");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results?.length) {
        throw new Error("Location not found");
      }

      const { latitude, longitude } = locationData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m,temperature_2m&daily=precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=3`
      );

      if (!weatherResponse.ok) {
        throw new Error("Weather unavailable");
      }

      const weatherData = await weatherResponse.json();

      const humidity =
        weatherData.current.relative_humidity_2m;

      const temperature =
        weatherData.current.temperature_2m;

      const rainTomorrow =
        weatherData.daily.precipitation_probability_max[1];

      if (humidity >= 80 && rainTomorrow >= 50) {
        return "High fungal disease risk due to high humidity and rainfall forecast.";
      }

      if (temperature >= 35) {
        return "Heat stress risk detected. Maintain adequate soil moisture.";
      }

      if (rainTomorrow >= 70) {
        return "Heavy rainfall risk detected. Protect crops and avoid unnecessary irrigation.";
      }

      return "No major weather-related crop risk detected currently.";
    } catch (error) {
      console.error("Weather risk error:", error);
      return "Weather risk information is currently unavailable.";
    }
  };

  useEffect(() => {
    getWeatherRisk().then((risk) => {
      setWeatherRisk(risk);
    });
  }, []);

  const savedScans = localStorage.getItem("scanHistory");

  const scans: ScanRecord[] = savedScans
    ? JSON.parse(savedScans)
    : [];

  const savedExpenses = localStorage.getItem("farmExpenses");

  const expenses: Expense[] = savedExpenses
    ? JSON.parse(savedExpenses)
    : [];

  const totalScans = scans.length;

  const healthyScans = scans.filter(
    (scan) => scan.status === "Healthy"
  ).length;

  const diseaseScans = scans.filter(
    (scan) => scan.status === "Disease Detected"
  ).length;

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const averageConfidence =
    totalScans > 0
      ? Math.round(
          scans.reduce(
            (sum, scan) => sum + scan.confidence,
            0
          ) / totalScans
        )
      : 0;

  const categoryTotals = expenses.reduce(
    (result: Record<string, number>, expense) => {
      result[expense.category] =
        (result[expense.category] || 0) + expense.amount;

      return result;
    },
    {}
  );

  const mostSpentCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "None";

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="Farmer Dashboard"
        subtitle="Your farming activity at a glance"
        back={false}
      />

      <div className="px-4 space-y-4">

        {/* Overview */}
        <div className="grid grid-cols-2 gap-3">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <Scan className="w-6 h-6 text-primary mb-2" />

            <p className="text-2xl font-black">
              {totalScans}
            </p>

            <p className="text-xs text-muted-foreground">
              Total Scans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />

            <p className="text-2xl font-black">
              {averageConfidence}%
            </p>

            <p className="text-xs text-muted-foreground">
              AI Confidence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />

            <p className="text-2xl font-black text-green-600">
              {healthyScans}
            </p>

            <p className="text-xs text-muted-foreground">
              Healthy Crops
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <AlertTriangle className="w-6 h-6 text-red-500 mb-2" />

            <p className="text-2xl font-black text-red-600">
              {diseaseScans}
            </p>

            <p className="text-xs text-muted-foreground">
              Disease Detected
            </p>
          </motion.div>

        </div>

        {/* Expense Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-5 text-primary-foreground shadow-elevated"
        >
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />

            <p className="text-sm opacity-80">
              Total Farming Expense
            </p>
          </div>

          <p className="text-3xl font-black mt-1">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>

          <p className="text-xs opacity-70 mt-1">
            Highest spending: {mostSpentCategory}
          </p>
        </motion.div>

        {/* Weather Risk */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <CloudSun className="w-5 h-5 text-blue-500" />

            <h3 className="font-bold">
              Weather Risk
            </h3>
          </div>

          <p className="text-sm text-muted-foreground">
            {weatherRisk}
          </p>
        </motion.div>
        {/* AI Crop Assistant */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-card border border-primary/20 rounded-2xl p-4"
>
  <div className="flex items-center gap-3">
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
      <MessageCircle className="w-5 h-5 text-primary" />
    </div>

    <div className="flex-1">
      <h3 className="font-bold">
        AI Crop Assistant
      </h3>

      <p className="text-xs text-muted-foreground">
        Ask questions about crops and diseases
      </p>
    </div>

    <button
      onClick={() => {
        window.location.href = "/ai-chat";
      }}
      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
    >
      Chat
    </button>
  </div>
</motion.div>

        {/* Health Insight */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-primary" />

            <h3 className="font-bold">
              Crop Health Insight
            </h3>
          </div>

          {totalScans === 0 ? (
            <p className="text-sm text-muted-foreground">
              Start scanning your crops to see health insights.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              You have completed{" "}
              <span className="font-bold text-foreground">
                {totalScans}
              </span>{" "}
              crop scan{totalScans > 1 ? "s" : ""}.{" "}
              {diseaseScans > 0
                ? `${diseaseScans} scan${
                    diseaseScans > 1 ? "s" : ""
                  } detected possible disease.`
                : "No disease was detected in your scans."}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}