import { Home, Camera, Mic, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BottomNav() {
  const { t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, label: t.navHome },
    { to: "/detect", icon: Camera, label: t.navDetect },
    { to: "/voice", icon: Mic, label: t.navVoice || "Voice" },
    { to: "/community", icon: MessageCircle, label: t.navChat },
    { to: "/profile", icon: User, label: t.navProfile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border/50">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
