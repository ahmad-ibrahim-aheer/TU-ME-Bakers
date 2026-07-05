import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "Assalamu Alaikum! Welcome to **TU & ME MART AND BAKERS** in Sargodha Cantt! 🍰✨ I am your virtual bakery concierge. Ask me anything about our freshly baked pizza slices, fudge pastries, customized celebration cakes, grocery prices, or opening hours! How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ text: m.text, sender: m.sender }))
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: data.text,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        text: "I apologize, my baking oven is quite busy right now and I experienced a connection issue! 🍞 Please try asking again in a moment, or call us directly at +92 303 7041468.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="bg-white rounded-2xl shadow-2xl border border-stone-200/80 w-80 sm:w-96 h-[480px] flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#482015] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="p-1.5 bg-amber-500 rounded-lg text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#482015]" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm tracking-tight font-serif text-white">TU & ME AI Concierge</h4>
                  <span className="text-[10px] text-stone-300 font-medium">Online • Sargodha Cantt</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-stone-300 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm text-left leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-700 text-white rounded-br-none'
                        : 'bg-white text-stone-800 border border-stone-150 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {/* Render markdown bold tags nicely manually */}
                    {msg.text.split('**').map((chunk, index) => {
                      if (index % 2 === 1) {
                        return <strong key={index} className="font-extrabold">{chunk}</strong>;
                      }
                      return chunk;
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-stone-500 border border-stone-150 rounded-2xl rounded-bl-none p-3 shadow-xs flex items-center gap-2 text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    <span>AI Assistant is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="p-3 border-t border-stone-100 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pizzas, pastries, hours, cakes..."
                className="flex-1 bg-stone-50 text-xs sm:text-sm p-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 text-stone-800"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-[#482015] hover:bg-amber-800 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#482015] hover:bg-amber-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer group"
          >
            <MessageCircle className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
