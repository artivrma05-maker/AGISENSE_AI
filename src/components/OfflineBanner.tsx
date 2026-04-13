import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);
  const { t } = useLanguage();

  useEffect(() => {
    const goOff = () => setOffline(true);
    const goOn = () => setOffline(false);
    window.addEventListener("offline", goOff);
    window.addEventListener("online", goOn);
    return () => {
      window.removeEventListener("offline", goOff);
      window.removeEventListener("online", goOn);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="bg-warning text-warning-foreground text-xs font-semibold flex items-center justify-center gap-1.5 py-1.5 px-3">
      <WifiOff className="w-3.5 h-3.5" />
      {t.offlineMode}
    </div>
  );
}
