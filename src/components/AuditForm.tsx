'use client';

import { useState, useEffect } from 'react';
import { Send, Loader2, Info, AlertTriangle, ShieldCheck, Activity, Search, RefreshCw, X, ExternalLink } from 'lucide-react';

const ALL_SUGGESTIONS = [
    {
        id: 1,
        type: 'risk',
        text: "Potential GDPR violation: Biometric data collection detected. Ensure 'Explicit Consent' is documented (Art. 9).",
        source: "EU GDPR",
        tag: "HIGH RISK",
        url: "https://gdpr-info.eu/art-9-gdpr/"
    },
    {
        id: 2,
        type: 'best-practice',
        text: "NIST Risk Management: Implement 'Differential Privacy' to prevent re-identification of user records.",
        source: "NIST AI RMF",
        tag: "GOVERNANCE",
        url: "https://www.nist.gov/itl/ai-risk-management-framework"
    },
    {
        id: 3,
        type: 'risk',
        text: "AI Transparency Gap: High-risk system profiling identified. Cross-reference EU AI Act Art. 13 for documentation compliance.",
        source: "EU AI ACT",
        tag: "CRITICAL",
        url: "https://artificialintelligenceact.eu/article/13/"
    },
    {
        id: 4,
        type: 'best-practice',
        text: "ISO 42001 Alignment: Establish an AI Management System (AIMS) dashboard to monitor algorithmic drift.",
        source: "ISO/IEC 42001",
        tag: "MANAGEMENT",
        url: "https://www.iso.org/standard/81230.html"
    },
    {
        id: 5,
        type: 'risk',
        text: "Data Poisoning Threat: Input sanitization for LLM training data is insufficient. Recommend adversarial training.",
        source: "OWASP AI 10",
        tag: "SECURITY",
        url: "https://owasp.org/www-project-ai-security-and-privacy-guide/"
    },
    {
        id: 6,
        type: 'best-practice',
        text: "Human-in-the-loop: Implement a manual override trigger for automated decision paths per OECD Principle 1.2.",
        source: "OECD AI Principles",
        tag: "HUMAN-CENTRIC",
        url: "https://oecd.ai/en/ai-principles"
    }
];

export function AuditForm() {
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [content, setContent] = useState('');
    const [scanProgress, setScanProgress] = useState(0);
    const [result, setResult] = useState('');
    const [currentSuggestions, setCurrentSuggestions] = useState(ALL_SUGGESTIONS.slice(0, 2));

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading) {
            interval = setInterval(() => {
                setScanProgress((prev: number) => (prev < 100 ? prev + 4 : 100));
            }, 50);
        } else {
            setScanProgress(0);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const pulseAudit = async () => {
        if (!content.trim() || loading) return;

        setLoading(true);
        setResult(''); // Clear previous results

        try {
            const response = await fetch('/api/agent/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: `Perform a comprehensive ethics audit on the following product specification: \n\n${content}` }
                    ]
                }),
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            setResult(data.content || "Agent was unable to provide an audit result.");
        } catch (error) {
            console.error('Audit Error:', error);
            setResult("System Error: Ethical Analysis Engine unavailable. Please verify your Algolia keys.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);

        // Pick 2 random suggestions from the larger pool
        const shuffled = [...ALL_SUGGESTIONS].sort(() => 0.5 - Math.random());
        setCurrentSuggestions(shuffled.slice(0, 2));

        await pulseAudit();
        setShowSuggestions(true);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="relative group">
                {/* Decorative Corner Borders */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-electric-blue/40 rounded-tl-md" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-electric-blue/40 rounded-br-md" />

                <form onSubmit={handleSubmit} className="relative z-10 backdrop-blur-xl bg-slate-950/40 rounded-2xl overflow-hidden border border-white/5">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste product spec for audit (e.g. 'Biometric auth logic for banking app...')"
                        className="w-full h-32 bg-transparent p-6 text-[13px] text-white placeholder:text-slate-600 focus:outline-none transition-all resize-none font-mono leading-relaxed"
                    />

                    {loading && (
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-slate-800 overflow-hidden">
                            <div
                                className="h-full bg-electric-blue shadow-[0_0_10px_var(--color-electric-blue)] transition-all duration-75"
                                style={{ width: `${scanProgress}%` }}
                            />
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950/80 to-transparent flex items-center justify-between border-t border-white/5">
                        <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${content.length > 0 ? 'bg-green-500' : 'bg-slate-700'}`} />
                                Input: {content.length} chars
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Search className="w-3 h-3" />
                                Algolia RAG: Active
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !content}
                            className="group/btn relative px-6 py-2 rounded-lg bg-electric-blue overflow-hidden transition-all active:scale-95 disabled:opacity-20 flex items-center gap-2"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" /> : <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />}
                            <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.1em]">
                                {loading ? 'Analyzing Vector' : 'Audit Spec'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {showSuggestions && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Live Result Summary */}
                    {result && (
                        <div className="glass-card p-4 border-electric-blue/20 bg-electric-blue/5 max-h-48 overflow-y-auto scrollbar-hide">
                            <div className="flex items-center gap-3 mb-2 sticky top-0 bg-slate-950/60 backdrop-blur-md pb-2">
                                <Activity className="w-3 h-3 text-electric-blue" />
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-white">Consolidated Agent Analysis</h4>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                                {result}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.2em] relative">
                            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            Agent Studio Feed
                        </div>
                        <button
                            onClick={() => {
                                setShowSuggestions(false);
                                setResult('');
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group/close"
                            title="Close Intelligence Feed"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Terminate Feed</span>
                            <X className="w-4 h-4 group-hover/close:rotate-90 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentSuggestions.map((s) => (
                            <div key={s.id} className="glass-card p-5 group/card transition-all hover:bg-white/[0.04]">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-lg ${s.type === 'risk' ? 'bg-red-500/10 text-red-500' : 'bg-electric-blue/10 text-electric-blue'
                                        }`}>
                                        {s.type === 'risk' ? <AlertTriangle className="w-4 h-4 italic" /> : <Info className="w-4 h-4" />}
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <p className="text-[12px] text-slate-300 leading-relaxed group-hover/card:text-white transition-colors">
                                            {s.text}
                                        </p>
                                        <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] font-bold text-slate-600 uppercase">Framework:</span>
                                                <a
                                                    href={(s as any).url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[9px] font-black text-electric-blue/80 bg-electric-blue/5 border border-electric-blue/10 px-2 py-0.5 rounded hover:bg-electric-blue/10 hover:border-electric-blue/30 transition-all flex items-center gap-1 group/link"
                                                >
                                                    {s.source}
                                                    <ExternalLink className="w-2 h-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                </a>
                                            </div>
                                            <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded ${s.type === 'risk' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                {s.tag}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
