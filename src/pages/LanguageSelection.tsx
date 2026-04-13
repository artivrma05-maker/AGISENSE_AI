import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages, LangCode } from "@/i18n/translations";
import { Button } from "@/components/ui/button";

export default function LanguageSelection() {
  const { lang, setLang, t, completeOnboarding } = useLanguage();
  const [selected, setSelected] = useState<LangCode>(lang);

  const handleContinue = () => {
    setLang(selected);
    completeOnboarding();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <div className="flex-1 px-4 pt-12 pb-6 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            {t.selectLanguage}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your preferred language / अपनी भाषा चुनें
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5">
          {languages.map((l, i) => (
            <motion.button
              key={l.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(l.code)}
              className={`relative rounded-2xl p-3.5 text-left transition-all duration-200 border-2 ${
                selected === l.code
                  ? "border-primary bg-primary/10 shadow-card"
                  : "border-transparent bg-card shadow-card hover:border-primary/30"
              }`}
            >
              {selected === l.code && (
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

      <div className="sticky bottom-0 p-4 bg-background/90 backdrop-blur-md border-t border-border">
        <Button
          onClick={handleContinue}
          className="w-full gradient-hero text-primary-foreground rounded-xl h-12 text-base font-bold"
        >
          {t.continueBtn} →
        </Button>
      </div>
    </div>
  );
}
