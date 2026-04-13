import { motion } from "framer-motion";
import { Brain, MapPin, Globe, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";

export default function Profile() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const currentLang = languages.find((l) => l.code === lang);

  const memoryItems = [
    { icon: "🌾", label: t.primaryCrop, value: "Wheat, Tomato, Rice" },
    { icon: "📏", label: t.landSize, value: "2.5 Acres" },
    { icon: "🏔️", label: t.soilType, value: "Black Cotton Soil" },
    { icon: "💧", label: t.irrigation, value: "Drip + Borewell" },
    { icon: "📅", label: t.lastHarvest, value: "March 2026" },
    { icon: "💰", label: t.avgRevenue, value: "₹1.2L / season" },
  ];

  const learnings = [
    { date: "Apr 10", text: "Switched to organic pest control — 30% cost reduction noted" },
    { date: "Mar 25", text: "Late blight detected early, saved 80% of tomato crop" },
    { date: "Feb 15", text: "Applied mulching technique — soil moisture improved 40%" },
    { date: "Jan 08", text: "PM-KISAN benefit received — ₹6,000 credited" },
  ];

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.farmerMemoryTitle} subtitle={t.farmerMemorySubtitle} back={false} />
      <div className="px-4 space-y-4">
        {/* Farmer Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-5 text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl">👨‍🌾</div>
            <div>
              <h2 className="font-bold text-lg">Ramesh Kumar</h2>
              <p className="text-xs opacity-70 flex items-center gap-1"><MapPin className="w-3 h-3" /> Wardha, Maharashtra</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">⭐ Level 12 Farmer</span>
            <span className="bg-primary-foreground/15 px-3 py-1 rounded-full">🎯 85% AI Accuracy</span>
          </div>
        </motion.div>

        {/* Language Setting */}
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/language")}
          className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">{t.changeLanguage}</p>
            <p className="text-xs text-muted-foreground">{currentLang?.flag} {currentLang?.nativeName} ({currentLang?.name})</p>
          </div>
        </motion.button>

        {/* Memory */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-primary" /> {t.aiRemembers}
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
            <BookOpen className="w-4 h-4 text-primary" /> {t.learningTimeline}
          </h3>
          <div className="space-y-3">
            {learnings.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }} className="flex gap-3 items-start">
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
