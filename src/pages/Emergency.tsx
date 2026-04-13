import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Droplets, Bug, Sun } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

const survivalSteps: Record<string, string[]> = {
  flood: [
    "Move livestock to higher ground immediately",
    "Protect grain storage with plastic sheets",
    "Dig drainage channels around fields",
    "Contact Disaster Management: 1078",
    "Document damage with photos for insurance claims",
    "After water recedes, apply fungicide to prevent root rot",
  ],
  pest: [
    "Identify the pest — take clear photos",
    "Isolate affected area if possible",
    "Apply neem oil (5ml/L) as immediate organic remedy",
    "Remove heavily infested plants to prevent spread",
    "Set up pheromone traps around field borders",
    "Contact local Krishi Vigyan Kendra for lab diagnosis",
  ],
  drought: [
    "Switch to drip irrigation immediately to save water",
    "Apply mulch (straw/leaves) to reduce evaporation",
    "Prioritize watering to most valuable crops",
    "Prune lower leaves to reduce water demand",
    "Consider short-duration drought-resistant varieties for next cycle",
    "Check PMFBY crop insurance eligibility",
  ],
};

export default function Emergency() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const emergencies = [
    { id: "flood", label: `🌊 ${t.flood}`, icon: Droplets, color: "gradient-sky" },
    { id: "pest", label: `🐛 ${t.pestAttack}`, icon: Bug, color: "gradient-warm" },
    { id: "drought", label: `☀️ ${t.drought}`, icon: Sun, color: "gradient-danger" },
  ];

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.emergencyTitle} subtitle={t.emergencySubtitle} />
      <div className="px-4 space-y-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-sm font-semibold text-foreground">{t.selectEmergency}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {emergencies.map((e) => (
            <motion.button key={e.id} whileTap={{ scale: 0.93 }} onClick={() => setSelected(e.id)}
              className={`rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-card ${
                selected === e.id ? e.color + " text-primary-foreground" : "bg-card"
              }`}>
              <span className="text-3xl">{e.label.split(" ")[0]}</span>
              <span className="text-xs font-bold">{e.label.split(" ").slice(1).join(" ")}</span>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} className="bg-card rounded-2xl p-4 shadow-card">
              <h3 className="font-bold text-base mb-3">{t.immediateSteps}</h3>
              <ol className="space-y-3">
                {survivalSteps[selected].map((step, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full gradient-hero text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{step}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
