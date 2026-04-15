import { motion } from "framer-motion";
import {
  Mic, Camera, CloudSun, ShoppingCart, Landmark,
  Brain, Scan, TrendingUp, Sprout, Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Index() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const currentLang = languages.find((l) => l.code === lang);

  return (
    <div className="pb-24 px-4 max-w-lg mx-auto min-h-screen bg-farming-scene relative">
      {/* Animated sky scene */}
      <div className="cloud-layer">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>
      <div className="sun-glow" />

      {/* Animated grass field */}
      <div className="field-wave">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="grass-blade" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Subtle farming decorations */}
      <div className="absolute top-4 right-6 text-4xl opacity-[0.06] animate-sway pointer-events-none select-none">🌾</div>
      <div className="absolute top-20 left-4 text-3xl opacity-[0.05] animate-float pointer-events-none select-none">🌱</div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 pb-4 relative z-10"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Sprout className="w-7 h-7 text-primary animate-sway" />
            <h1 className="text-2xl font-black text-foreground tracking-tight">{t.appName}</h1>
          </div>
          <button
            onClick={() => navigate("/language")}
            className="flex items-center gap-1.5 bg-card/80 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-card text-sm"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground text-xs">{currentLang?.nativeName}</span>
          </button>
        </div>
        <p className="text-sm text-muted-foreground">{t.appTagline}</p>
      </motion.div>

      {/* Quick Voice */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => navigate("/voice")}
        className="w-full rounded-2xl gradient-hero p-5 mb-5 flex items-center gap-4 shadow-elevated relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary-foreground/5 animate-soft-glow pointer-events-none" />
        <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-mic-pulse">
          <Mic className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="text-left relative z-10">
          <h2 className="font-bold text-primary-foreground text-base">{t.askKisanMitra}</h2>
          <p className="text-xs text-primary-foreground/70">{t.tapToSpeak}</p>
        </div>
      </motion.button>

      {/* Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        <motion.div variants={item}>
          <FeatureCard icon={Camera} title={t.diseaseDetection} description={t.scanCropCamera} to="/detect" variant="primary" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={CloudSun} title={t.weatherAlerts} description={t.hyperlocalForecasts} to="/weather" variant="sky" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={TrendingUp} title={t.profitPredictor} description={t.smartSelling} to="/profit" variant="warm" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={ShoppingCart} title={t.marketplace} description={t.buySellAI} to="/marketplace" variant="earth" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Scan} title={t.soilScanner} description={t.cameraAnalysis} to="/soil" variant="primary" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Landmark} title={t.govtSchemes} description={t.autoMatchedBenefits} to="/schemes" variant="sky" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Brain} title={t.farmerMemory} description={t.personalizedAI} to="/profile" variant="warm" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Camera} title={t.expenseTracker} description={t.photoBasedNoTyping} to="/expenses" variant="earth" />
        </motion.div>
      </motion.div>
    </div>
  );
}
