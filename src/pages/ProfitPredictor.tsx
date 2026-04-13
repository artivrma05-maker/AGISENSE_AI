import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, BarChart3, Lightbulb } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const crops = [
  { name: "🌾 Wheat", profit: "₹42,000", cost: "₹18,000", roi: "133%", verdict: "✅ Recommended" },
  { name: "🍅 Tomato", profit: "₹65,000", cost: "₹28,000", roi: "132%", verdict: "⚠️ High Risk" },
  { name: "🧅 Onion", profit: "₹38,000", cost: "₹15,000", roi: "153%", verdict: "✅ Best ROI" },
  { name: "🌽 Maize", profit: "₹25,000", cost: "₹12,000", roi: "108%", verdict: "✅ Safe Bet" },
];

export default function ProfitPredictor() {
  const { t } = useLanguage();

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.profitPredictorTitle} subtitle={t.profitPredictorSubtitle} />
      <div className="px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-warm rounded-2xl p-5 text-warning-foreground shadow-elevated">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Lightbulb className="w-5 h-5" /> {t.aiRecommendation}
          </h3>
          <p className="text-sm opacity-90 mt-2 leading-relaxed">
            Based on your soil type, weather forecast, and market trends — <strong>Onion</strong> gives the best ROI this season.
          </p>
        </motion.div>
        <div className="space-y-3">
          {crops.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} className="bg-card rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-foreground">{c.name}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  c.verdict.includes("Best") ? "bg-success/15 text-success" :
                  c.verdict.includes("High") ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"
                }`}>{c.verdict}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-[10px] text-muted-foreground">{t.revenue}</p>
                  <p className="text-sm font-bold text-success">{c.profit}</p>
                </div>
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-[10px] text-muted-foreground">{t.cost}</p>
                  <p className="text-sm font-bold text-foreground">{c.cost}</p>
                </div>
                <div className="bg-muted rounded-xl p-2">
                  <p className="text-[10px] text-muted-foreground">{t.roi}</p>
                  <p className="text-sm font-bold text-primary">{c.roi}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
