import { motion } from "framer-motion";
import { Landmark, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const schemes = [
  { name: "PM-KISAN", benefit: "₹6,000/year direct transfer", status: "active",
    desc: "Income support of ₹6,000 per year in 3 installments for all landholding farmer families." },
  { name: "PMFBY — Crop Insurance", benefit: "Up to ₹2L crop protection", status: "apply",
    desc: "Comprehensive crop insurance against natural calamities, pests & diseases at low premium." },
  { name: "Kisan Credit Card", benefit: "Up to ₹3L @ 4% interest", status: "apply",
    desc: "Short-term credit for crop production needs at subsidized interest rates." },
  { name: "Soil Health Card Scheme", benefit: "Free soil testing + recommendations", status: "active",
    desc: "Get soil nutrient status and fertilizer recommendations for your specific field." },
];

export default function Schemes() {
  const { t } = useLanguage();

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.schemesTitle} subtitle={t.schemesSubtitle} />
      <div className="px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground">
            <span className="font-bold">{t.aiAutoMatched}</span> — Based on your profile, land size, and crop history, you qualify for these schemes.
          </p>
        </motion.div>
        {schemes.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }} className="bg-card rounded-2xl p-4 shadow-card">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm text-foreground">{s.name}</h3>
              </div>
              <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {t.eligible}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
            <p className="text-sm font-bold text-primary mb-3">💰 {s.benefit}</p>
            <Button className={`w-full rounded-xl text-sm h-10 font-bold ${
              s.status === "active" ? "bg-success/15 text-success hover:bg-success/25" : "gradient-hero text-primary-foreground"
            }`} variant={s.status === "active" ? "ghost" : "default"}>
              {s.status === "active" ? `✅ ${t.alreadyEnrolled}` : <>{t.applyNow} <ArrowRight className="w-4 h-4 ml-1" /></>}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
