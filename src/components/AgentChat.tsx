'use client';

import { useState, useRef, useEffect } from 'react';
import { Shield, Sparkles, Send, Box, ExternalLink, Terminal } from 'lucide-react';
import { ALGOLIA_AGENT_ID } from '@/lib/algolia';

interface Message {
    role: 'user' | 'assistant';
    text: string;
    tool?: {
        name: string;
        label: string;
        result?: string;
    };
}

export function AgentChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            text: "Ethics Guardian Online. I am connected to the Algolia Knowledge Index. Reference ID: [ALGO-AGENT-2026]. How can I assist with your compliance framework today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        const newUserMessage: Message = { role: 'user', text: userMsg };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/agent/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, newUserMessage].map(m => ({
                        role: m.role,
                        content: m.text // Map text to content for the API
                    }))
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();

            const agentMessage: Message = {
                role: 'assistant',
                text: data.content || "I encountered an error while processing your request.",
            };

            setMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                text: "System Error: Unable to establish connection with Algolia Agent Studio. Please check your API keys and Agent ID.",
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const executeTool = async (index: number) => {
        const newMessages = [...messages];
        const msg = newMessages[index];
        if (!msg.tool) return;

        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        msg.tool.result = "REPORT_GENERATED: ETHICS_SUMMARY_V1.PDF (Citing ISO 42001 & NIST)";
        setMessages(newMessages);
        setIsTyping(false);
    };

    return (
        <div className="glass-card flex flex-col h-full border-electric-blue/20 bg-slate-950/60 relative overflow-hidden">
            {/* Background Grid Decoration */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--color-electric-blue) 1px, transparent 0)', backgroundSize: '20px 20px' }} />

            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Agent Studio Live</span>
                </div>
                <div className="flex items-center gap-2">
                    <Terminal className="w-3 h-3 text-slate-500" />
                    <span className="text-[9px] text-slate-500 font-mono tracking-tighter">PORT: 8080 // SECURE</span>
                </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scroll-smooth">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[11px] leading-relaxed relative ${msg.role === 'user'
                            ? 'bg-electric-blue text-slate-950 font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                            : 'bg-white/[0.03] border border-white/10 text-slate-300 backdrop-blur-md'
                            }`}>
                            {msg.text}
                            {msg.role === 'assistant' && <div className="absolute -left-1 top-4 w-2 h-2 bg-white/5 border-l border-t border-white/10 rotate-[-45deg]" />}
                        </div>

                        {msg.tool && (
                            <div className="ml-2 mt-1">
                                {!msg.tool.result ? (
                                    <button
                                        onClick={() => executeTool(i)}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-electric-blue/30 bg-electric-blue/5 text-electric-blue hover:bg-electric-blue hover:text-slate-950 transition-all text-[10px] font-bold uppercase tracking-wider"
                                    >
                                        <Box className="w-3 h-3" />
                                        {msg.tool.label}
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-mono italic">
                                        <Shield className="w-3 h-3" />
                                        {msg.tool.result}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                        <div className="w-1 h-1 bg-current rounded-full" />
                        <div className="w-1 h-1 bg-current rounded-full" />
                        <div className="w-1 h-1 bg-current rounded-full" />
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/5 bg-white/[0.01] relative z-10">
                <div className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask the advisor (e.g. 'Explain ISO 42001 Article 5')..."
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-[11px] text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/20 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-electric-blue hover:text-white transition-colors disabled:opacity-20"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="mt-2 flex justify-between items-center opacity-30">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-400">Knowledge-Grounded Agent</span>
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-400">Algolia v4.8</span>
                </div>
            </div>
        </div>
    );
}
