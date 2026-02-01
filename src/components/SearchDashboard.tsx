'use client';

import { useState, useEffect } from 'react';
import { InstantSearch, SearchBox, Hits, Highlight, Configure, useInstantSearch } from 'react-instantsearch';
import { searchClient, ALGOLIA_INDEX_NAME } from '@/lib/algolia';
import { AlertCircle, Terminal, RefreshCw, ExternalLink, X, BookOpen, Shield, Globe, Scale, AlertTriangle } from 'lucide-react';

function HitDetails({ hit, onClose }: { hit: any, onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-2xl border-electric-blue/30 bg-slate-900/95 shadow-[0_0_80px_rgba(59,130,246,0.3)] flex flex-col h-auto max-h-[90vh] overflow-hidden relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-start shrink-0 bg-slate-900/50">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-electric-blue/20 rounded-xl border border-electric-blue/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <BookOpen className="w-6 h-6 text-electric-blue" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-electric-blue uppercase tracking-[0.3em] font-mono mb-1 block">Reg-Intelligence Node // {hit.category || 'REGULATION'}</span>
                            <h2 className="text-xl font-bold text-white tracking-tight leading-tight">{hit.name}</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10 group shadow-lg"
                        title="Close (ESC)"
                    >
                        <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-mono scrollbar-hide">
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                            <Shield className="w-3.5 h-3.5 text-electric-blue" />
                            <span className="text-[10px] font-bold text-white uppercase">Type: {hit.category || 'System'}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                            <Globe className="w-3.5 h-3.5 text-cyan-500" />
                            <span className="text-[10px] font-bold text-white uppercase">Source: {hit.source || 'Official'}</span>
                        </div>
                        {hit.severity && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-safety-amber/10 border border-safety-amber/30 rounded-lg">
                                <AlertTriangle className="w-3.5 h-3.5 text-safety-amber" />
                                <span className="text-[10px] font-bold text-safety-amber uppercase">Severity: {hit.severity}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <div className="w-2 h-[1px] bg-slate-500" /> Executive Summary
                        </h4>
                        <p className="text-[13px] text-slate-300 leading-relaxed bg-white/5 p-5 rounded-xl border border-white/5 italic shadow-inner">
                            {hit.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <div className="w-2 h-[1px] bg-slate-500" /> Standard Context
                        </h4>
                        <div className="text-[12px] text-slate-400 space-y-4 leading-relaxed bg-slate-950/30 p-5 rounded-xl border border-white/5">
                            {hit.fullContent || hit.content || "This framework establishes core principles for AI ethics including transparency, accountability, and data protection. Key articles focus on risk management throughout the lifecycle and ensuring human-centric outcomes."}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Scale className="w-4 h-4 text-electric-blue" />
                            <span className="text-[10px] font-bold text-white uppercase">Source Verification ID: [ALG-{hit.objectID}]</span>
                        </div>
                        <button className="text-[10px] font-black text-electric-blue uppercase tracking-widest flex items-center gap-1 hover:underline">
                            View Official Docs <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Hit({ hit, onSelect }: { hit: any, onSelect: (h: any) => void }) {
    return (
        <div
            onClick={() => onSelect(hit)}
            className="p-3 glass-card border-white/5 hover:border-electric-blue/30 hover:bg-electric-blue/[0.02] cursor-pointer transition-all group animate-in slide-in-from-bottom-2"
        >
            <div className="flex justify-between items-start mb-1">
                <h4 className="text-[12px] text-white font-semibold group-hover:text-electric-blue transition-colors truncate">
                    <Highlight attribute="name" hit={hit} />
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 uppercase tracking-widest shrink-0">
                        {hit.category || 'Law'}
                    </span>
                </div>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed">
                <Highlight attribute="description" hit={hit} />
            </p>
            <div className="mt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] text-electric-blue font-bold uppercase tracking-tight">Open Intelligence Node</span>
                <Terminal className="w-3 h-3 text-electric-blue" />
            </div>
        </div>
    );
}

function SearchContent() {
    const { error, refresh } = useInstantSearch();
    const [selectedHit, setSelectedHit] = useState<any>(null);

    if (error && error.message.includes('not exist')) {
        return (
            <div className="glass-card p-6 border-safety-amber/30 bg-safety-amber/5 flex flex-col items-center text-center gap-3 h-full justify-center">
                <AlertCircle className="w-8 h-8 text-safety-amber" />
                <div>
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Index Initialization Failed</h3>
                    <p className="text-[9px] text-slate-400 mt-1 font-mono">
                        Missing: <span className="text-safety-amber">'{ALGOLIA_INDEX_NAME}'</span>
                    </p>
                </div>
                <div className="flex gap-2 w-full mt-2">
                    <a
                        href="https://dashboard.algolia.com"
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white hover:bg-white/10 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" /> Dashboard
                    </a>
                    <button
                        onClick={() => refresh()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 bg-safety-amber text-slate-950 rounded-lg text-[9px] font-black uppercase tracking-widest"
                    >
                        <RefreshCw className="w-3 h-3" /> Retry
                    </button>
                </div>
                <p className="text-[8px] text-slate-600 font-mono italic">Tip: Create the index in Algolia to enable Knowledge RAG.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="relative group shrink-0">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-electric-blue transition-colors">
                    <Terminal className="w-4 h-4" />
                </div>
                <SearchBox
                    placeholder="Search frameworks (e.g. 'NIST', 'GDPR', 'Bias')..."
                    classNames={{
                        root: 'relative w-full',
                        input: 'w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[12px] text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-blue/40 focus:ring-1 focus:ring-electric-blue/10 transition-all font-mono',
                        submitIcon: 'hidden',
                        resetIcon: 'hidden',
                        loadingIcon: 'hidden'
                    }}
                />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 relative">
                <Hits
                    hitComponent={(props) => <Hit {...props} onSelect={setSelectedHit} />}
                    classNames={{
                        root: 'w-full',
                        list: 'grid grid-cols-1 gap-2 pb-4',
                        item: 'list-none'
                    }}
                />
            </div>

            {selectedHit && <HitDetails hit={selectedHit} onClose={() => setSelectedHit(null)} />}
        </div>
    );
}

export function SearchDashboard() {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={ALGOLIA_INDEX_NAME}
            future={{ preserveSharedStateOnUnmount: true }}
        >
            <Configure hitsPerPage={8} />
            <SearchContent />
        </InstantSearch>
    );
}
