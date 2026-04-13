import { Home, Camera, CloudSun, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/detect", icon: Camera, label: "Detect" },
  { to: "/weather", icon: CloudSun, label: "Weather" },
  { to: "/community", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
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
