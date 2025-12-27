import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSubmitReport: (messages: Message[]) => void;
}

const initialMessage: Message = {
  id: "1",
  role: "assistant",
  content: "Hello! I'm CyberShield AI. I'm here to help you report a cyber crime. Please describe what happened - tell me about the scam, when it occurred, and any details you remember. Don't worry, I'll help organize everything for the authorities.",
  timestamp: new Date(),
};

export function ChatInterface({ onSubmitReport }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand. Can you tell me approximately how much money was involved, if any?",
        "Thank you for sharing that. Do you have any screenshots, phone numbers, or account details of the scammer?",
        "I've noted that down. When did this incident first occur?",
        "I have enough information to generate your report. Click 'Generate Report' when you're ready to proceed.",
      ];

      const responseIndex = Math.min(messages.length - 1, responses.length - 1);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[responseIndex],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] rounded-xl border border-border bg-card/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-secondary/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">CyberShield AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Secure & Encrypted</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 slide-up",
              message.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === "assistant" 
                  ? "bg-primary/20" 
                  : "bg-secondary"
              )}
            >
              {message.role === "assistant" ? (
                <Shield className="w-4 h-4 text-primary" />
              ) : (
                <span className="text-sm">👤</span>
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] p-3 rounded-lg",
                message.role === "assistant"
                  ? "bg-secondary/50 rounded-tl-none"
                  : "bg-primary/20 rounded-tr-none"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-secondary/20">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={cn(
              "p-3 rounded-lg transition-all",
              isListening 
                ? "bg-destructive text-destructive-foreground" 
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe what happened..."
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary/50 focus:outline-none"
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {messages.length >= 4 && (
          <Button 
            variant="glow" 
            className="w-full mt-3"
            onClick={() => onSubmitReport(messages)}
          >
            Generate Report for Authorities
          </Button>
        )}
      </div>
    </div>
  );
}
