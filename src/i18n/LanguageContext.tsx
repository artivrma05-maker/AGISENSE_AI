import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, languages, LangCode } from "./translations";

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: typeof translations["en"];
  isFirstLaunch: boolean;
  completeOnboarding: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectDefaultLanguage(): LangCode {
  const saved = localStorage.getItem("kisanmitra-lang");
  if (saved && saved in translations) return saved as LangCode;

  const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
  const langMap: Record<string, LangCode> = {
    hi: "hi", bn: "bn", te: "te", mr: "mr", ta: "ta",
    gu: "gu", kn: "kn", ml: "ml", pa: "pa", or: "or", ur: "ur",
  };
  if (browserLang && langMap[browserLang]) return langMap[browserLang];
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectDefaultLanguage);
  const [isFirstLaunch, setIsFirstLaunch] = useState(
    () => !localStorage.getItem("kisanmitra-lang-set")
  );

  const setLang = (newLang: LangCode) => {
    setLangState(newLang);
    localStorage.setItem("kisanmitra-lang", newLang);
  };

  const completeOnboarding = () => {
    localStorage.setItem("kisanmitra-lang-set", "true");
    setIsFirstLaunch(false);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isFirstLaunch, completeOnboarding }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
