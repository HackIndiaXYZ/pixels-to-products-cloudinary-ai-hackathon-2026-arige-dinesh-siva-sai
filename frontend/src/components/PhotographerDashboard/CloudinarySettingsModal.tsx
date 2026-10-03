import React, { useState, useEffect } from 'react';
import { X, Layers, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, Key, Lock } from 'lucide-react';
import { api } from '../../services/api';

interface CloudinarySettingsModalProps {
  onClose: () => void;
}

export const CloudinarySettingsModal: React.FC<CloudinarySettingsModalProps> = ({ onClose }) => {
  const [cloudName, setCloudName] = useState('eventsnap-hackindia');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getCloudinaryStatus().then((res) => {
      setStatus(res);
      setCloudName(res.cloud_name);
    }).catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateCloudinaryConfig({
        cloud_name: cloudName.trim(),
        api_key: apiKey.trim(),
        api_secret: apiSecret.trim()
      });
      const updated = await api.getCloudinaryStatus();
      setStatus(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 my-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>HackIndia Track PS-03 • Media Pipeline</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Cloudinary Media Integration
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Configure your Cloudinary credentials or inspect active dynamic transformations.
          </p>
        </div>

        {/* Status banner */}
        {status && (
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Current Engine:</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{status.engine_mode}</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Active Cloud Name:</span>
              <span className="text-white font-mono">{status.cloud_name}</span>
            </div>
            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">
                Supported Transformations:
              </span>
              <div className="space-y-1 text-[11px] font-mono text-sky-300">
                {status.transformations_active?.map((t: string) => (
                  <div key={t} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span className="truncate">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {saved && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Cloudinary configuration updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Cloudinary Cloud Name
            </label>
            <input
              type="text"
              required
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Cloudinary API Key (Optional for live uploads)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. 98124872138129"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Cloudinary API Secret (Kept strictly on backend)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••••••••••"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Never exposed to browser client. Stored securely on backend memory.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-300 text-xs font-semibold"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold shadow-lg shadow-sky-500/20 transition-all"
            >
              {loading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
