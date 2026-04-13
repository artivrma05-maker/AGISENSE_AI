import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmergencyButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate("/emergency")}
      className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full gradient-danger flex items-center justify-center shadow-elevated animate-pulse-glow"
      aria-label="Emergency Help"
    >
      <AlertTriangle className="w-6 h-6 text-danger-foreground" />
    </motion.button>
  );
}
