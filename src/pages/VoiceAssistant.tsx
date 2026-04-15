import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, WifiOff, Sprout, Droplets, Bug, CloudSun, HelpCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { LangCode } from "@/i18n/translations";

interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}

// Language code mapping for Web Speech API
const speechLangMap: Record<LangCode, string> = {
  en: "en-IN", hi: "hi-IN", bn: "bn-IN", te: "te-IN", mr: "mr-IN",
  ta: "ta-IN", gu: "gu-IN", kn: "kn-IN", ml: "ml-IN", pa: "pa-IN",
  or: "or-IN", bho: "hi-IN", ur: "ur-IN",
};

// Offline advice per language
const offlineAdvice: Record<string, string[]> = {
  hi: [
    "रोज़ सुबह पानी जांचें ☀️",
    "ज़्यादा पानी मत दें 💧",
    "फसल में कीड़ों की जांच करें 🐛",
    "खाद समय पर डालें 🌱",
  ],
  en: [
    "Check water every morning ☀️",
    "Don't overwater your crops 💧",
    "Inspect crops for pests regularly 🐛",
    "Apply fertilizer on time 🌱",
  ],
};

// Simple local AI response matching (keyword-based, farmer-friendly)
function getLocalAIResponse(input: string, lang: LangCode): string {
  const lower = input.toLowerCase();

  // Voice command routing hints
  if (/scan|स्कैन|camera|कैमरा|photo|फोटो/.test(lower)) {
    return lang === "hi"
      ? "आप कैमरा खोलकर फसल का फोटो ले सकते हैं। मैं रोग की पहचान कर दूंगा 📸"
      : "You can open the camera and take a photo of your crop. I'll detect the disease 📸";
  }
  if (/mausam|मौसम|weather|बारिश|rain/.test(lower)) {
    return lang === "hi"
      ? "आज मौसम साफ रहने की उम्मीद है। अगले 2 दिन हल्की बारिश हो सकती है 🌤️"
      : "Today the weather is expected to be clear. Light rain possible in the next 2 days 🌤️";
  }
  if (/madad|मदद|help|sahayata|सहायता/.test(lower)) {
    return lang === "hi"
      ? "मैं यहाँ हूँ आपकी मदद के लिए! आप पूछ सकते हैं:\n• फसल की बीमारी\n• मौसम\n• कौनसी फसल उगाएं\n• पानी कब दें"
      : "I'm here to help! You can ask about:\n• Crop diseases\n• Weather\n• Which crop to grow\n• When to water";
  }
  if (/kharab|खराब|disease|bimari|बीमारी|yellow|पीला|pila/.test(lower)) {
    return lang === "hi"
      ? "आपकी फसल को शायद खाद की ज़रूरत है। यूरिया 1 चम्मच प्रति लीटर पानी में मिलाकर डालें 🌿"
      : "Your crop may need fertilizer. Mix 1 spoon urea per liter of water and apply 🌿";
  }
  if (/pani|पानी|water|sinchai|सिंचाई/.test(lower)) {
    return lang === "hi"
      ? "सुबह जल्दी पानी दें, दोपहर में नहीं। मिट्टी को नम रखें लेकिन गीला नहीं 💧"
      : "Water early morning, not in afternoon. Keep soil moist but not wet 💧";
  }
  if (/fasal|फसल|crop|ugau|उगाऊं|kya ugaye/.test(lower)) {
    return lang === "hi"
      ? "इस मौसम में गेहूं, चना और सरसों अच्छी रहेगी। आपकी मिट्टी के हिसाब से गेहूं सबसे अच्छा है 🌾"
      : "Wheat, gram and mustard are good this season. Based on your soil, wheat is the best choice 🌾";
  }
  if (/khaad|खाद|fertilizer|urea|यूरिया/.test(lower)) {
    return lang === "hi"
      ? "हर 20 दिन में खाद डालें। DAP बोने के समय और यूरिया बाद में दें 🧪"
      : "Apply fertilizer every 20 days. Use DAP at sowing and urea later 🧪";
  }
  if (/keeda|कीड़ा|keet|कीट|pest|bug/.test(lower)) {
    return lang === "hi"
      ? "नीम का तेल 5ml प्रति लीटर पानी में मिलाकर छिड़कें। सुबह जल्दी छिड़काव करें 🐛"
      : "Spray neem oil 5ml per liter water. Spray early morning for best results 🐛";
  }

  // Default
  return lang === "hi"
    ? "मैं समझ गया। आपकी फसल और मिट्टी के हिसाब से सबसे अच्छी सलाह दे रहा हूँ। कुछ और पूछना है तो बोलें! 🌱"
    : "I understand. I'm giving you the best advice for your crop and soil. Feel free to ask more! 🌱";
}

export default function VoiceAssistant() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [transcript, setTranscript] = useState("");
  const transcriptRef = useRef("");
  const recognitionRef = useRef<any>(null);
  const msgIdRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isHindi = lang === "hi" || lang === "bho" || lang === "ur";

  useEffect(() => {
    const off = () => setIsOffline(true);
    const on = () => setIsOffline(false);
    window.addEventListener("offline", off);
    window.addEventListener("online", on);
    return () => { window.removeEventListener("offline", off); window.removeEventListener("online", on); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = speechLangMap[lang] || "hi-IN";
    utter.rate = 0.9;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [lang]);

  const handleAIResponse = useCallback((userText: string) => {
    // Check for voice command routing
    const lower = userText.toLowerCase();
    if (/scan crop|स्कैन|camera|कैमरा/.test(lower)) {
      setTimeout(() => navigate("/detect"), 1500);
    } else if (/mausam|मौसम|weather/.test(lower)) {
      setTimeout(() => navigate("/weather"), 1500);
    } else if (/madad|मदद|help/.test(lower)) {
      // Stay on page, show help
    }

    const aiText = isOffline
      ? (offlineAdvice[isHindi ? "hi" : "en"] || offlineAdvice.en)[Math.floor(Math.random() * 4)]
      : getLocalAIResponse(userText, isHindi ? "hi" : "en");

    const aiMsg: ChatMessage = { id: ++msgIdRef.current, role: "ai", text: aiText };
    setMessages(prev => [...prev, aiMsg]);
    speak(aiText);
  }, [isOffline, isHindi, speak, navigate]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const msg: ChatMessage = {
        id: ++msgIdRef.current, role: "ai",
        text: isHindi ? "माफ करें, आपका ब्राउज़र वॉइस सपोर्ट नहीं करता" : "Sorry, your browser doesn't support voice input"
      };
      setMessages(prev => [...prev, msg]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLangMap[lang] || "hi-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (e: any) => {
      let final = "";
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          final += e.results[i][0].transcript;
        } else {
          interim += e.results[i][0].transcript;
        }
      }
      const text = final || interim;
      setTranscript(text);
      transcriptRef.current = text;
    };

    recognition.onend = () => {
      setIsListening(false);
      const finalText = transcriptRef.current.trim();
      if (finalText) {
        const userMsg: ChatMessage = { id: ++msgIdRef.current, role: "user", text: finalText };
        setMessages(prev => [...prev, userMsg]);
        setTranscript("");
        transcriptRef.current = "";
        setTimeout(() => handleAIResponse(finalText), 800);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [lang, isHindi, transcript, handleAIResponse]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const quickActions = [
    { icon: Bug, label: isHindi ? "कीड़ा/रोग" : "Disease", query: isHindi ? "मेरी फसल में कीड़ा लगा है" : "My crop has pest attack" },
    { icon: Droplets, label: isHindi ? "पानी" : "Water", query: isHindi ? "पानी कब दें?" : "When to water?" },
    { icon: CloudSun, label: isHindi ? "मौसम" : "Weather", query: isHindi ? "मौसम बताओ" : "Tell weather" },
    { icon: Sprout, label: isHindi ? "फसल" : "Crop", query: isHindi ? "कौनसी फसल उगाऊं?" : "Which crop to grow?" },
  ];

  const handleQuickAction = (query: string) => {
    const userMsg: ChatMessage = { id: ++msgIdRef.current, role: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => handleAIResponse(query), 800);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto gradient-farming relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black text-foreground">
            {isHindi ? "🌾 किसान मित्र AI" : "🌾 KisanMitra AI"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {isHindi ? "बोलकर पूछें, लिखने की ज़रूरत नहीं" : "Speak to ask, no typing needed"}
          </p>
        </div>
        {isOffline && (
          <div className="flex items-center gap-1 bg-warning/20 px-2 py-1 rounded-lg">
            <WifiOff className="w-3.5 h-3.5 text-warning" />
            <span className="text-[10px] font-bold text-warning">Offline</span>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
            <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-elevated">
              <Mic className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-black text-foreground">
              {isHindi ? "नमस्ते! 🙏" : "Hello! 🙏"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isHindi
                ? "माइक दबाकर अपनी बात बोलें।\nमैं आपकी भाषा में जवाब दूंगा।"
                : "Press the mic and speak.\nI'll reply in your language."}
            </p>
            <p className="text-xs font-bold text-primary mt-2">
              {isHindi ? "👇 माइक दबाके बोलो" : "👇 Tap mic to speak"}
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              {quickActions.map((action) => (
                <motion.button key={action.label} whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-2 bg-card rounded-xl px-3 py-3 shadow-card text-left">
                  <action.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "gradient-hero text-primary-foreground rounded-br-md"
                : "bg-card shadow-card rounded-bl-md"
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              {msg.role === "ai" && (
                <button onClick={() => speak(msg.text)}
                  className="mt-2 flex items-center gap-1 text-xs text-primary font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  {isHindi ? "सुनें" : "Listen"}
                </button>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="mx-4 mb-2 bg-primary/10 border border-primary/30 rounded-2xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-bold text-primary">
                {isHindi ? "सुन रहा है…" : "Listening…"}
              </span>
            </div>
            {transcript && (
              <p className="text-xs text-muted-foreground mt-1 italic">"{transcript}"</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaking indicator with sound bars */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mx-4 mb-2 flex items-center justify-center gap-3 bg-accent/15 rounded-xl px-3 py-2.5">
            <div className="sound-bars">
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
            </div>
            <span className="text-xs font-semibold text-accent">
              {isHindi ? "बोल रहा है…" : "Speaking…"}
            </span>
            <div className="sound-bars">
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
              <div className="sound-bar" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic Button Area */}
      <div className="pb-6 pt-3 px-4 border-t border-border bg-background/90 backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {/* Ripple rings when listening */}
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full animate-mic-ripple border-2 border-danger/40 pointer-events-none" />
                <span className="absolute inset-0 rounded-full animate-mic-ripple border-2 border-danger/30 pointer-events-none" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            {/* Pulse ring when idle */}
            {!isListening && (
              <span className="absolute inset-[-6px] rounded-full animate-mic-pulse pointer-events-none" />
            )}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-elevated transition-all ${
                isListening
                  ? "gradient-danger"
                  : "gradient-hero"
              }`}
            >
              {isListening
                ? <MicOff className="w-9 h-9 text-primary-foreground" />
                : <Mic className="w-9 h-9 text-primary-foreground" />}
            </motion.button>
          </div>
          <p className="text-xs font-bold text-muted-foreground">
            {isListening
              ? (isHindi ? "रोकने के लिए दबाएं" : "Tap to stop")
              : (isHindi ? "🎤 माइक दबाके बोलो" : "🎤 Tap mic to speak")}
          </p>

          {/* Quick action row when chat has messages */}
          {messages.length > 0 && (
            <div className="flex gap-2 mt-1">
              {quickActions.map((action) => (
                <button key={action.label} onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-1 bg-muted rounded-lg px-2.5 py-1.5">
                  <action.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-semibold text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
