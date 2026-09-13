import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  User,
  Leaf,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const getAIResponse = (message: string) => {
  const text = message.toLowerCase();

  if (text.includes("tomato")) {
    return "For tomato crops, common problems include Late Blight, Early Blight and Leaf Mold. Keep leaves dry, provide proper spacing and regularly inspect the lower leaves for spots or discoloration.";
  }

  if (text.includes("potato")) {
    return "For potato crops, monitor for Late Blight and Early Blight. Avoid excessive leaf wetness, maintain good field drainage and remove severely infected plant material.";
  }

  if (text.includes("apple")) {
    return "For apple crops, common diseases include Apple Scab and Black Rot. Maintain orchard sanitation, remove infected leaves/fruits and ensure good air circulation.";
  }

  if (text.includes("corn") || text.includes("maize")) {
    return "For maize, regularly check leaves for spots, streaks and fungal growth. Maintain balanced irrigation, avoid excessive moisture and remove heavily infected plant material.";
  }

  if (
    text.includes("disease") ||
    text.includes("leaf") ||
    text.includes("plant")
  ) {
    return "I can help you understand possible crop diseases. You can upload a leaf image in the Disease Detection section for AI-based classification, or tell me the crop name and visible symptoms.";
  }

  if (
    text.includes("fertilizer") ||
    text.includes("fertiliser")
  ) {
    return "Use fertilizer according to the crop's growth stage and soil condition. Avoid excessive nitrogen because it can encourage weak, disease-prone growth. A soil test is recommended for accurate fertilizer planning.";
  }

  if (
    text.includes("water") ||
    text.includes("irrigation")
  ) {
    return "Irrigation should depend on crop type, soil and weather. Avoid overwatering because excess moisture can increase fungal disease risk. Prefer watering near the soil rather than keeping leaves wet.";
  }

  if (text.includes("weather") || text.includes("rain")) {
    return "Rainy and highly humid conditions can increase the risk of several fungal and bacterial crop diseases. During such periods, improve air circulation, avoid unnecessary irrigation and inspect crops frequently.";
  }

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("namaste")
  ) {
    return "Hello! 🌱 I am AGISENSE AI. Ask me about crops, diseases, symptoms, irrigation, fertilizer or prevention.";
  }

  return "I can help with crop diseases, symptoms, irrigation, fertilizer and prevention. Tell me your crop name and the problem you are seeing.";
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hello! 🌱 I am AGISENSE AI. Tell me about your crop or plant problem and I will help you with possible causes and preventive steps.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(message);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      <PageHeader
        title="AI Crop Assistant"
        subtitle="Ask questions about your crops"
      />

      <div className="px-4">
        <div className="rounded-3xl border border-primary/20 bg-card shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-br from-primary/10 via-card to-primary/5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  AGISENSE AI Assistant
                </h2>
                <p className="text-xs text-muted-foreground">
                  Crop & disease guidance
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[480px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.text}
                </div>

                {message.role === "user" && (
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>

                <div className="rounded-2xl bg-muted px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your crop..."
                className="flex-1 h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground text-center mt-3">
              AI guidance is advisory. Verify important crop-management
              decisions with an agricultural expert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}