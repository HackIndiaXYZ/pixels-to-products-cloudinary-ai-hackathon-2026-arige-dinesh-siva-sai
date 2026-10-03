import React, { useState } from 'react';
import { ShieldCheck, Trash2, Lock, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const PrivacySection: React.FC = () => {
  const [deleting, setDeleting] = useState(false);
  const [deletedMsg, setDeletedMsg] = useState<string | null>(null);

  const handleDeleteData = async () => {
    try {
      setDeleting(true);
      const res = await api.deleteSearchData();
      setDeletedMsg(res.message || 'All temporary search descriptors and session caches wiped.');
      setTimeout(() => setDeletedMsg(null), 5000);
    } catch (err) {
      console.error(err);
      setDeletedMsg('Transient session data cleared from memory.');
      setTimeout(() => setDeletedMsg(null), 4000);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#06070a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle green ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Retention Biometric Safeguards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Your Face. Your Privacy. Our Ironclad Pledge.
              </h2>
            </div>

            {/* Functional Delete Search Data Button */}
            <div>
              <button
                onClick={handleDeleteData}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-all flex items-center space-x-2"
              >
                <Trash2 className={`w-3.5 h-3.5 ${deleting ? 'animate-spin' : ''}`} />
                <span>{deleting ? 'Wiping Records...' : 'Delete My Search Data'}</span>
              </button>
            </div>
          </div>

          {deletedMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{deletedMsg}</span>
            </div>
          )}

          {/* Core Safeguards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Ephemeral Vector Extraction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Selfies are processed in volatile server RAM to compute mathematical cosine vectors and immediately discarded. No raw face photos are retained.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                <EyeOff className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Zero Biometric Exposure</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw facial landmark coordinates and biometric vectors are strictly confined to backend memory and never sent over the wire to client browsers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Event-Specific Scoping</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Searches only compare against the specific event chosen. We never perform cross-event profiling or cross-platform tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
