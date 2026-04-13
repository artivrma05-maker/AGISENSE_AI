import { motion } from "framer-motion";
import { Camera, IndianRupee, Calendar, Plus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const expenses = [
  { date: "Apr 12", item: "DAP Fertilizer 50kg", amount: "₹1,350", category: "🧪 Fertilizer", photo: true },
  { date: "Apr 10", item: "Diesel for pump", amount: "₹800", category: "⛽ Fuel", photo: true },
  { date: "Apr 08", item: "Labour (3 workers × 2 days)", amount: "₹3,600", category: "👷 Labour", photo: false },
  { date: "Apr 05", item: "Neem oil pesticide 1L", amount: "₹450", category: "🛡️ Pesticide", photo: true },
  { date: "Apr 02", item: "Seeds — Tomato hybrid", amount: "₹1,200", category: "🌱 Seeds", photo: true },
];

export default function Expenses() {
  const { t } = useLanguage();

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.expenseTrackerTitle} subtitle={t.expenseTrackerSubtitle} />
      <div className="px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-hero rounded-2xl p-5 text-primary-foreground shadow-elevated flex items-center justify-between">
          <div>
            <p className="text-xs opacity-70">{t.thisMonth}</p>
            <p className="text-3xl font-black">₹7,400</p>
            <p className="text-xs opacity-70 mt-1">12 {t.entries}</p>
          </div>
          <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-xl">
            <Camera className="w-5 h-5 mr-2" /> {t.addReceipt}
          </Button>
        </motion.div>
        <div className="space-y-2.5">
          {expenses.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }} className="bg-card rounded-2xl p-3.5 shadow-card flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg">
                {e.category.split(" ")[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{e.item}</p>
                <p className="text-xs text-muted-foreground">{e.date} • {e.category.split(" ").slice(1).join(" ")}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{e.amount}</p>
                {e.photo && <p className="text-[10px] text-primary">📎 Photo</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
