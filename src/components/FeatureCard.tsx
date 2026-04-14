import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  variant?: "primary" | "warm" | "danger" | "sky" | "earth";
}

const variantStyles = {
  primary: "gradient-hero text-primary-foreground",
  warm: "gradient-warm text-warning-foreground",
  danger: "gradient-danger text-danger-foreground",
  sky: "gradient-sky text-sky-foreground",
  earth: "bg-earth text-earth-foreground",
};

export default function FeatureCard({ icon: Icon, title, description, to, variant = "primary" }: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => navigate(to)}
      className={`w-full rounded-2xl p-4 text-left shadow-card backdrop-blur-sm ${variantStyles[variant]} relative overflow-hidden`}
    >
      <div className="absolute -top-4 -right-4 text-4xl opacity-[0.08] pointer-events-none select-none">🌿</div>
      <Icon className="w-8 h-8 mb-2 opacity-90" />
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-xs opacity-80 mt-0.5 line-clamp-2">{description}</p>
    </motion.button>
  );
}
