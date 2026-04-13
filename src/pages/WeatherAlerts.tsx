import { motion } from "framer-motion";
import { CloudRain, Thermometer, Wind, Droplets, Bell } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

export default function WeatherAlerts() {
  const { t } = useLanguage();

  const alerts = [
    { type: "warning", msg: "Heavy rain expected in 2 days — harvest wheat early", icon: CloudRain },
    { type: "info", msg: "Best time to apply fertilizer: Tomorrow morning", icon: Droplets },
  ];

  const forecast = [
    { day: t.today, temp: "32°C", icon: "☀️", rain: "5%" },
    { day: t.tomorrow, temp: "30°C", icon: "⛅", rain: "25%" },
    { day: "Wed", temp: "27°C", icon: "🌧️", rain: "80%" },
    { day: "Thu", temp: "26°C", icon: "🌧️", rain: "90%" },
    { day: "Fri", temp: "29°C", icon: "⛅", rain: "30%" },
  ];

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <PageHeader title={t.weatherTitle} subtitle={t.weatherSubtitle} />
      <div className="px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="gradient-sky rounded-2xl p-5 text-sky-foreground shadow-elevated">
          <p className="text-xs opacity-70 mb-1">{t.yourVillage}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-4xl font-black">32°C</span>
              <p className="text-sm opacity-80 mt-1">{t.partlyCloudy}</p>
            </div>
            <div className="text-6xl">⛅</div>
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" /> {t.feels} 35°C</span>
            <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> 12 km/h</span>
            <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5" /> 65%</span>
          </div>
        </motion.div>
        {alerts.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-3.5 flex items-start gap-3 ${
              a.type === "warning" ? "bg-warning/15 border border-warning/30" : "bg-primary/10 border border-primary/20"
            }`}>
            <Bell className={`w-5 h-5 mt-0.5 flex-shrink-0 ${a.type === "warning" ? "text-warning" : "text-primary"}`} />
            <p className="text-sm font-medium text-foreground">{a.msg}</p>
          </motion.div>
        ))}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-bold text-sm mb-3">{t.fiveDayForecast}</h3>
          <div className="space-y-2.5">
            {forecast.map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="w-16 font-semibold text-foreground">{f.day}</span>
                <span className="text-xl">{f.icon}</span>
                <span className="font-bold text-foreground">{f.temp}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Droplets className="w-3 h-3" />{f.rain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
