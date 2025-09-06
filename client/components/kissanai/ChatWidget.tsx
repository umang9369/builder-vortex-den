import { useEffect, useRef, useState } from "react";
import { Bot, Send, MessageCircle } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "नमस्ते! मैं Kissan सहायक हूँ। मौसम, मंडी भाव या फसल रोग से जुड़े सवाल पूछें।" },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.answer as string }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "क्षमा करें, अभी जवाब नहीं दे सका। कृपया दोबारा प्रयास करें।" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:brightness-110"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </motion.button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85svh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> Kissan चैट</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto space-y-3 max-h-[55svh]">
            {messages.map((m, i) => (
              <div key={i} className={`rounded-xl px-3 py-2 text-sm max-w-[85%] ${m.role === "user" ? "ml-auto bg-primary text-white" : "bg-muted"}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">सोच रहा हूँ…</div>}
            <div ref={endRef} />
          </div>
          <div className="px-4 pb-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="सवाल लिखें…"
            />
            <Button onClick={send} disabled={loading || !input.trim()} className="bg-primary hover:bg-secondary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
