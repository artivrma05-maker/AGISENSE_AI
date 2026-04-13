import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";

interface Message {
  role: "user" | "ai" | "expert";
  content: string;
  time: string;
}

const initialMessages: Message[] = [
  { role: "ai", content: "Namaste! 🙏 I'm KisanMitra AI. Ask me anything about farming — crops, weather, diseases, or government schemes.", time: "9:00 AM" },
  { role: "user", content: "My tomato leaves are turning yellow", time: "9:01 AM" },
  { role: "ai", content: "Yellow leaves in tomatoes can indicate:\n\n1. **Nitrogen deficiency** — Apply urea 46% @ 1g/L\n2. **Overwatering** — Check soil drainage\n3. **Early blight** — Look for brown spots\n\nCan you share a photo? I can detect the exact issue! 📸", time: "9:01 AM" },
  { role: "expert", content: "Hi, I'm Dr. Sharma from KVK. Based on the description, check for magnesium deficiency too — try Epsom salt spray (2g/L) 🌿", time: "9:05 AM" },
];

export default function Community() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", content: input, time: now }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "I understand your question. Let me analyze this and provide the best advice for your specific region and soil type. 🌱",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto">
      <PageHeader title={t.chatTitle} subtitle={t.chatSubtitle} />
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role !== "user" && (
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                msg.role === "ai" ? "gradient-hero" : "gradient-warm"
              }`}>
                {msg.role === "ai" ? <Bot className="w-4 h-4 text-primary-foreground" /> : <Sparkles className="w-4 h-4 text-warning-foreground" />}
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
              msg.role === "user" ? "gradient-hero text-primary-foreground rounded-br-md"
                : msg.role === "ai" ? "bg-card shadow-card rounded-bl-md"
                : "bg-warning/15 border border-warning/30 rounded-bl-md"
            }`}>
              {msg.role === "expert" && <p className="text-[10px] font-bold text-warning mb-1">{t.expert}</p>}
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-3 border-t border-border bg-background/90 backdrop-blur-md">
        <div className="flex gap-2 max-w-lg mx-auto">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t.typeQuestion}
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground" />
          <button onClick={handleSend} className="gradient-hero rounded-xl px-4 flex items-center justify-center">
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
