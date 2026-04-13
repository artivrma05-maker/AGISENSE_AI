import { motion } from "framer-motion";
import { Brain, MapPin, Sprout, TrendingUp, Calendar, Award, History, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const memoryItems = [
  { icon: "🌾", label: "Primary Crop", value: "Wheat, Tomato, Rice" },
  { icon: "📏", label: "Land Size", value: "2.5 Acres" },
  { icon: "🏔️", label: "Soil Type", value: "Black Cotton Soil" },
  { icon: "💧", label: "Irrigation", value: "Drip + Borewell" },
  { icon: "📅", label: "Last Harvest", value: "March 2026" },
  { icon: "💰", label: "Avg Revenue", value: "₹1.2L / season" },
];

const learnings = [
  { date: "Apr 10", text: "Switched to organic pest control — 30% cost reduction noted" },
  { date: "Mar 25", text: "Late blight detected early, saved 80% of tomato crop" },
  { date: "Feb 15", text: "Applied mulching technique — soil moisture improved 40%" },
  { date: "Jan 08", text: "PM-KISAN benefit received — ₹6,000 credited" },
];

export default function Profile() {
  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title="🧠 Farmer Memory" subtitle="Your personalized AI learning system" back={false} />

      <div className="px-4 space-y-4">
        {/* Farmer Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-5 text-primary-foreground shadow-elevated"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl">
              👨‍🌾
            </div>
            <div>
              <h2 className="font-bold text-lg">Ramesh Kumar</h2>
              <p className="text-xs opacity-70 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Wardha, Maharashtra
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">⭐ Level 12 Farmer</span>
            <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">🎯 85% AI Accuracy</span>
          </div>
        </motion.div>

        {/* Memory Data */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-primary" /> AI Remembers About You
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {memoryItems.map((item, i) => (
              <div key={i} className="bg-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{item.icon} {item.label}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Timeline */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-primary" /> Learning Timeline
          </h3>
          <div className="space-y-3">
            {learnings.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 items-start"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">{l.date}</p>
                  <p className="text-sm text-foreground">{l.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
