import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ShoppingCart, Sparkles, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const prices = [
  { crop: "🌾 Wheat", price: "₹2,450/q", trend: "up", change: "+₹120", market: "Wardha Mandi" },
  { crop: "🍅 Tomato", price: "₹32/kg", trend: "down", change: "-₹8", market: "Nagpur APMC" },
  { crop: "🌽 Maize", price: "₹1,890/q", trend: "up", change: "+₹65", market: "Amravati" },
  { crop: "🧅 Onion", price: "₹18/kg", trend: "up", change: "+₹3", market: "Lasalgaon" },
  { crop: "🌶️ Chili", price: "₹95/kg", trend: "down", change: "-₹12", market: "Guntur" },
];

const aiTips = [
  "Hold wheat for 2 more weeks — prices expected to rise 8% due to export demand",
  "Sell tomatoes now — oversupply predicted next week from Karnataka",
  "Consider selling onion in Lasalgaon market — ₹3/kg higher than local mandi",
];

export default function Marketplace() {
  const { t } = useLanguage();

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.marketplaceTitle} subtitle={t.marketplaceSubtitle} />
      <div className="px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-warm rounded-2xl p-4 shadow-elevated">
          <h3 className="font-bold text-sm flex items-center gap-1.5 mb-2 text-warning-foreground">
            <Sparkles className="w-4 h-4" /> {t.aiSellingTips}
          </h3>
          <ul className="space-y-2">
            {aiTips.map((tip, i) => (
              <li key={i} className="text-xs text-warning-foreground/90 flex items-start gap-2">
                <span className="font-bold">•</span>{tip}
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="space-y-2.5">
          {prices.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">{p.crop}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {p.market}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{p.price}</p>
                <p className={`text-xs font-semibold flex items-center gap-0.5 justify-end ${
                  p.trend === "up" ? "text-success" : "text-destructive"
                }`}>
                  {p.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {p.change}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
