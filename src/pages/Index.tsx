import { motion } from "framer-motion";
import {
  Mic, Camera, CloudSun, ShoppingCart, Landmark,
  Brain, Scan, TrendingUp, Sprout
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Index() {
  return (
    <div className="pb-24 px-4 max-w-lg mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 pb-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sprout className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-black text-foreground tracking-tight">KisanMitra</h1>
        </div>
        <p className="text-sm text-muted-foreground">Your AI-powered farming companion 🌾</p>
      </motion.div>

      {/* Quick Voice */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {}}
        className="w-full rounded-2xl gradient-hero p-5 mb-5 flex items-center gap-4 shadow-elevated"
      >
        <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <Mic className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="text-left">
          <h2 className="font-bold text-primary-foreground text-base">Ask KisanMitra</h2>
          <p className="text-xs text-primary-foreground/70">Tap to speak in your language</p>
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
          <FeatureCard icon={Camera} title="Disease Detection" description="Scan crop with camera" to="/detect" variant="primary" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={CloudSun} title="Weather Alerts" description="Hyperlocal forecasts" to="/weather" variant="sky" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={TrendingUp} title="Profit Predictor" description="Smart selling decisions" to="/profit" variant="warm" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={ShoppingCart} title="Marketplace" description="Buy & sell with AI tips" to="/marketplace" variant="earth" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Scan} title="Soil Scanner" description="Camera-based analysis" to="/soil" variant="primary" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Landmark} title="Govt Schemes" description="Auto-matched benefits" to="/schemes" variant="sky" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Brain} title="Farmer Memory" description="Your personalized AI" to="/profile" variant="warm" />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard icon={Camera} title="Expense Tracker" description="Photo-based, no typing" to="/expenses" variant="earth" />
        </motion.div>
      </motion.div>
    </div>
  );
}
