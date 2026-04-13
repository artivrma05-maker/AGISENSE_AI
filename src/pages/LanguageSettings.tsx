import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages, LangCode } from "@/i18n/translations";
import { useNavigate } from "react-router-dom";

export default function LanguageSettings() {
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pb-24 max-w-lg mx-auto">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md px-4 pt-3 pb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 rounded-xl hover:bg-muted">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold text-foreground leading-tight">🌐 {t.languageSettings}</h1>
            <p className="text-xs text-muted-foreground">{t.changeLanguage}</p>
          </div>
        </div>
      </header>

      <div className="px-4">
        <div className="grid grid-cols-2 gap-2.5 mt-2">
          {languages.map((l) => (
            <motion.button
              key={l.code}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLang(l.code)}
              className={`relative rounded-2xl p-3.5 text-left transition-all duration-200 border-2 ${
                lang === l.code
                  ? "border-primary bg-primary/10 shadow-card"
                  : "border-transparent bg-card shadow-card hover:border-primary/30"
              }`}
            >
              {lang === l.code && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full gradient-hero flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <span className="text-lg mb-1 block">{l.flag}</span>
              <p className="font-bold text-sm text-foreground">{l.nativeName}</p>
              <p className="text-[10px] text-muted-foreground">{l.name}</p>
              <p className="text-[10px] text-primary mt-0.5">{l.greeting}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
