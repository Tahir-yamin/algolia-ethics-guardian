'use client';

import { useState } from "react";
import { Shield, Activity, Search, MessageSquare, Settings, LogOut, ExternalLink, Terminal } from "lucide-react";
import { SearchDashboard } from "@/components/SearchDashboard";
import { AuditForm } from "@/components/AuditForm";
import { AgentChat } from "@/components/AgentChat";
import { SidePanel } from "@/components/SidePanel";

export default function Home() {
    const [activeSection, setActiveSection] = useState('audit-section');

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className="relative h-screen p-4 bg-gradient-to-br from-slate-950 to-blue-950 overflow-hidden flex flex-col font-sans">
            {/* HUD Background Scanline */}
            <div className="absolute inset-0 hud-scanline pointer-events-none opacity-20" />

            {/* HUD Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-blue/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-4 h-full w-full flex-1 min-h-0">
                {/* Sidebar */}
                <nav className="col-span-1 glass-card flex flex-col items-center py-8 justify-between border-white/5">
                    <div className="flex flex-col items-center gap-10 w-full">
                        <a
                            href="https://www.algolia.com/products/ai-search/agent-studio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-electric-blue/20 hover:bg-electric-blue/30 transition-all hover:scale-110 relative group"
                            title="Open Algolia Agent Studio"
                        >
                            <Shield className="w-10 h-10 text-electric-blue filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            <ExternalLink className="absolute -top-1 -right-1 w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <div className="flex flex-col gap-6 w-full items-center">
                            <button
                                onClick={() => scrollToSection('audit-section')}
                                className={`p-3 rounded-xl transition-all hover:scale-110 relative group ${activeSection === 'audit-section'
                                    ? 'bg-electric-blue/20 text-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                    }`}
                                title="Mission Home"
                            >
                                <Terminal className="w-6 h-6" />
                                {activeSection === 'audit-section' && (
                                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-electric-blue rounded-l-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                )}
                            </button>
                            <button
                                onClick={() => scrollToSection('audit-section')}
                                className="p-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all hover:scale-110"
                                title="Proactive Ethics Guard"
                            >
                                <Activity className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scrollToSection('search-section')}
                                className={`p-3 rounded-xl transition-all hover:scale-110 relative group ${activeSection === 'search-section'
                                    ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                    }`}
                                title="Knowledge Repo"
                            >
                                <Search className="w-6 h-6" />
                                {activeSection === 'search-section' && (
                                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-l-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                )}
                            </button>
                            <button
                                onClick={() => scrollToSection('chat-section')}
                                className={`p-3 rounded-xl transition-all hover:scale-110 relative group ${activeSection === 'chat-section'
                                    ? 'bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                    }`}
                                title="Advisor Relay"
                            >
                                <MessageSquare className="w-6 h-6" />
                                {activeSection === 'chat-section' && (
                                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 rounded-l-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 items-center w-full">
                        <a
                            href="https://www.algolia.com/doc/api-reference/rest/agent-studio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                            title="API Documentation"
                        >
                            <Settings className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-red-400/5 rounded-lg border border-transparent hover:border-red-400/20"
                            title="Reset Session"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </nav>

                {/* Central Dashboard */}
                <section className="col-span-8 flex flex-col gap-3 overflow-hidden">
                    <header className="flex justify-between items-center mb-1 shrink-0 px-2 lg:px-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white italic underline decoration-electric-blue/30 underline-offset-4">Guardian Agent Studio</h1>
                            <p className="text-slate-400 font-mono text-[9px] uppercase tracking-[0.3em] mt-1">Algolia Search Infrastructure // Protocol: VIBE-ETHICS</p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-1.5 glass-card border-electric-blue/30 bg-electric-blue/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-[9px] font-black text-green-500 tracking-tighter uppercase font-mono">Agent Active</span>
                        </div>
                    </header>

                    {/* Unified Scrollable Container for Navigation */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 flex flex-col gap-10 pb-20">
                        {/* Audit Submission Area */}
                        <div id="audit-section" className="scroll-mt-10">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-2 mb-2 flex items-center gap-2">
                                <div className="w-2 h-[1px] bg-slate-500" /> Proactive Ethics Guard
                            </h3>
                            <div className="glass-card p-1">
                                <AuditForm />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[500px]">
                            {/* Search Area */}
                            <div id="search-section" className="flex flex-col gap-2 scroll-mt-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500 px-2 flex items-center gap-2">
                                    <div className="w-2 h-[1px] bg-cyan-500" /> Knowledge Repo
                                </h3>
                                <div className="flex-1 glass-card overflow-hidden min-h-[400px]">
                                    <SearchDashboard />
                                </div>
                            </div>

                            {/* Agent Chat Area */}
                            <div id="chat-section" className="flex flex-col gap-2 scroll-mt-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500 px-2 flex items-center gap-2">
                                    <div className="w-2 h-[1px] bg-purple-500" /> Advisor Relay
                                </h3>
                                <div className="flex-1 glass-card overflow-hidden min-h-[400px]">
                                    <AgentChat />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SidePanel />
            </div>
        </main>
    );
}
