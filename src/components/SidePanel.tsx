'use client';

import { useState, useEffect } from 'react';
import { Shield, Activity } from 'lucide-react';

export function SidePanel() {
    const [score, setScore] = useState(92);
    const [latency, setLatency] = useState(12);
    const [threads, setThreads] = useState(80);
    const [barHeights, setBarHeights] = useState([40, 60, 45, 70, 55, 80]);

    // Dynamic Fluctuations for "Live" feel
    useEffect(() => {
        const interval = setInterval(() => {
            setScore(s => {
                const delta = (Math.random() - 0.5) * 0.1;
                return Math.min(94, Math.max(89, s + delta));
            });
            setLatency(l => {
                const delta = (Math.random() - 0.5) * 0.5;
                return Math.min(18, Math.max(10, l + delta));
            });
            setThreads(t => {
                const delta = (Math.random() - 0.5) * 2;
                return Math.min(88, Math.max(72, t + delta));
            });
            setBarHeights(h => h.map(() => 20 + Math.random() * 80));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <aside className="col-span-3 flex flex-col gap-6 overflow-y-auto scrollbar-hide pr-2 h-full">
            {/* Main Hero Gauge Area */}
            <div className="glass-card flex flex-col items-center justify-center p-8 relative overflow-hidden group border-electric-blue/20 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />

                {/* Advanced SVG Gauge */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-electric-blue/5 animate-[pulse_4s_ease-in-out_infinite]" />
                    <svg className="absolute inset-0 w-full h-full -rotate-90 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                        {/* Background Track */}
                        <circle
                            cx="80" cy="80" r="72"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-slate-900"
                        />
                        {/* Progressive Fill */}
                        <circle
                            cx="80" cy="80" r="72"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={452}
                            strokeDashoffset={452 - (452 * score) / 100}
                            strokeLinecap="round"
                            className="text-electric-blue transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        />
                    </svg>

                    <div className="text-center z-10">
                        <span className="text-4xl font-black text-white tabular-nums">
                            {Math.round(score)}<span className="text-sm text-slate-500">%</span>
                        </span>
                        <p className="text-[9px] font-black text-electric-blue tracking-[0.2em] uppercase mt-1">Safe Score</p>
                    </div>

                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full border border-electric-blue/20 scale-110 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-4 w-full mt-8 relative z-10 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500 uppercase tracking-widest">Index Records</span>
                        <span className="font-bold text-white tracking-widest">14.2M</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500 uppercase tracking-widest">Latency</span>
                        <span className="font-bold text-green-400 tabular-nums">{latency.toFixed(1)}ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500 uppercase tracking-widest">Global Uptime</span>
                        <span className="font-bold text-white">99.99%</span>
                    </div>
                </div>
            </div>

            {/* Framework Status Grid */}
            <div className="glass-card p-6 flex flex-col gap-5 border-white/5 bg-slate-900/40 shrink-0">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Law & Frameworks</h3>
                    <div className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-[8px] text-green-500 font-bold uppercase">Compliance: High</div>
                </div>

                <div className="space-y-4 font-mono">
                    {[
                        { name: 'NIST AI RMF', status: 'PASS', score: '98' },
                        { name: 'EU AI ACT (Art. 9)', status: 'PASS', score: '100' },
                        { name: 'ISO/IEC 42001', status: 'WARN', score: '82' }
                    ].map((std) => (
                        <div key={std.name} className="group/item">
                            <div className="flex items-center justify-between mb-1.5 cursor-help">
                                <span className="text-[11px] font-bold text-slate-400 group-hover/item:text-white transition-colors">{std.name}</span>
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${std.status === 'PASS'
                                    ? 'text-green-500 bg-green-500/10 border-green-500/20'
                                    : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                                    }`}>
                                    {std.status}
                                </span>
                            </div>
                            <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${std.status === 'PASS' ? 'bg-electric-blue' : 'bg-amber-500'}`}
                                    style={{ width: `${std.score}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compute Threads Status */}
            <div className="glass-card p-5 border-white/5 bg-slate-950/40 mt-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Neural Load</span>
                        <span className="text-[9px] font-mono text-electric-blue/70">Algolia Agent Threads // Active</span>
                    </div>
                    <div className="flex gap-1.5 items-end h-4">
                        {barHeights.map((h, i) => (
                            <div
                                key={i}
                                className={`w-1 rounded-sm transition-all duration-500 ${i + 1 <= (threads / 15) ? 'bg-electric-blue shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-800'
                                    }`}
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-1 w-full bg-slate-800 overflow-hidden relative rounded-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-electric-blue transition-all duration-700 ease-in-out"
                            style={{ width: `${threads}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-600 uppercase">
                        <span>Utilization</span>
                        <span className="tabular-nums">{Math.round(threads)}%</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
