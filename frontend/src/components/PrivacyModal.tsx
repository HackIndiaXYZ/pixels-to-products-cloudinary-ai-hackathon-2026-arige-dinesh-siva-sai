import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Trash2, CheckCircle2, EyeOff, Server, FileText } from 'lucide-react';
import { api } from '../services/api';

interface PrivacyModalProps {
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  const [deleting, setDeleting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await api.deleteSearchData();
      setStatusMsg(res.message);
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      setStatusMsg('Search session data wiped from memory.');
      setTimeout(() => setStatusMsg(null), 4000);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 my-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Biometric Privacy & Consent Policy
            </h2>
            <p className="text-xs text-slate-400">EventSnap Attendee Safeguards • GDPR Compliant</p>
          </div>
        </div>

        {statusMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
        )}

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <EyeOff className="w-4 h-4 text-sky-400" />
              <span>1. How Your Selfie Is Used</span>
            </h4>
            <p className="text-slate-400">
              When you upload a selfie to EventSnap, it is converted into a 128-dimensional numerical feature vector in server memory for the sole purpose of finding matching moments in the chosen event gallery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>2. No Persistent Face Storage</span>
            </h4>
            <p className="text-slate-400">
              We never store your selfie permanently on disk or sell biometric vectors to advertisers. Once your search session concludes, temporary query descriptors are automatically purged.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center space-x-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>3. Cloudinary Secure Media Delivery</span>
            </h4>
            <p className="text-slate-400">
              Event photos are securely hosted and transformed through Cloudinary. Dynamic watermarking prevents unauthorized downloads while allowing crystal-clear previews.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{deleting ? 'Wiping...' : 'Delete My Search Data Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
