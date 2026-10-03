import React from 'react';
import { Camera, UploadCloud, Users, BarChart3, Shield, ArrowRight, Zap, CheckCircle } from 'lucide-react';

interface PhotographerShowcaseProps {
  onPhotographerClick: () => void;
}

export const PhotographerShowcase: React.FC<PhotographerShowcaseProps> = ({ onPhotographerClick }) => {
  const perks = [
    {
      title: 'Bulk Upload to Cloudinary',
      description: 'Drag & drop thousands of high-res RAW/JPGs. Automatic responsive web formats (f_auto, q_auto:best) generated instantly on CDN.',
      icon: UploadCloud,
      color: 'text-sky-400'
    },
    {
      title: 'Automatic Face & Bib Indexing',
      description: 'Our backend scans every photo for attendee faces and sports bib numbers (OCR), indexing moments without manual tagging.',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      title: 'Dynamic Watermarked Previews',
      description: 'Cloudinary generates watermarked previews on-the-fly for attendees. High-res originals remain protected until authorized.',
      icon: Shield,
      color: 'text-emerald-400'
    },
    {
      title: 'Biometric Face Indexing',
      description: 'Automatically generate 128-dimensional facial embeddings for every attendee in high-resolution event photos.',
      icon: Users,
      color: 'text-amber-400'
    }
  ];

  return (
    <section id="for-photographers" className="py-24 relative overflow-hidden bg-[#06070a] border-t border-white/[0.05]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Value Props */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
              <Camera className="w-3 h-3 text-purple-400" />
              <span>For Professional Photographers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Turn 10,000 event photos into instant attendee joy.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              No more sending massive Google Drive folders or sorting photos for days. EventSnap automates face indexing, bib detection, and Cloudinary media delivery so your clients find their photos in seconds.
            </p>

            <div className="space-y-4 pt-2">
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className={`w-5 h-5 ${p.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onPhotographerClick}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white text-xs font-semibold shadow-xl transition-all"
              >
                <span>Launch Photographer Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual: Simulated Photographer Dashboard Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl glass-panel border border-white/15 p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">eventsnap.io/photographer-studio</span>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Cloudinary Connected
                </span>
              </div>

              {/* Event Stat Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-slate-400 block font-mono">Photos Uploaded</span>
                  <span className="text-lg font-bold text-white">19,476</span>
                </div>
                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-slate-400 block font-mono">Faces Indexed</span>
                  <span className="text-lg font-bold text-sky-400">24</span>
                </div>
                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-slate-400 block font-mono">Cloudinary</span>
                  <span className="text-lg font-bold text-emerald-400">Live API</span>
                </div>
              </div>

              {/* Event list rows */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=100&auto=format&fit=crop&q=80"
                      alt="Marathon"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Hyderabad Marathon 2026</p>
                      <p className="text-[10px] text-slate-400 font-mono">5,420 photos • 6 faces indexed</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
                    Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?w=100&auto=format&fit=crop&q=80"
                      alt="Wedding"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Wedding — Aarav & Priya</p>
                      <p className="text-[10px] text-slate-400 font-mono">8,640 photos • 12 faces indexed</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
                    Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&auto=format&fit=crop&q=80"
                      alt="College Fest"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">NIAT College Fest 2026</p>
                      <p className="text-[10px] text-slate-400 font-mono">2,180 photos • 8 faces indexed</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    Active
                  </span>
                </div>
              </div>

              {/* Simulated Cloudinary live processing bar */}
              <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  <span className="font-mono text-[11px]">Cloudinary AI auto-cropping thumbnails (c_thumb,g_face)</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400 font-bold">99.4% SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
