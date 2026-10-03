import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, Image, Zap, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';

export const CloudinaryWorkflow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'watermark' | 'facecrop' | 'optimization'>('watermark');

  const demoOriginal = 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=85';
  
  // Cloudinary Dynamic transformation URLs
  const faceCropUrl = 'https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,w_500,h_500,z_0.85,f_auto,q_auto/face_top';
  const watermarkUrl = 'https://res.cloudinary.com/demo/image/upload/l_text:helvetica_42_bold_letter_spacing_3:EVENTSNAP%20PREVIEW,o_40,a_-30,co_rgb:ffffff,g_center/sample';

  return (
    <section id="cloudinary-workflow" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06070a] via-[#080a14] to-[#06070a] border-t border-white/[0.05]">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sky-500/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs font-semibold text-sky-400 mb-3 shadow-lg shadow-sky-500/10">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>HackIndia 2026 • PS-03 Your Media-Savvy Startup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Powered by Cloudinary AI Media Engine
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            EventSnap leverages Cloudinary's dynamic transformation pipelines to secure, optimize, and intelligently deliver millions of attendee memories in milliseconds.
          </p>
        </div>

        {/* Feature Tabs & Live Interactive Visualizer */}
        <div className="max-w-5xl mx-auto rounded-3xl glass-panel border border-white/15 p-6 sm:p-10 shadow-2xl">
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 border-b border-white/10 pb-6">
            <button
              onClick={() => setActiveTab('watermark')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'watermark'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Dynamic Watermark Injection</span>
            </button>

            <button
              onClick={() => setActiveTab('facecrop')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'facecrop'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Face-Centered Auto-Crop</span>
            </button>

            <button
              onClick={() => setActiveTab('optimization')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'optimization'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>f_auto & q_auto Optimization</span>
            </button>
          </div>

          {/* Active Tab Showcase */}
          {activeTab === 'watermark' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Transformation: l_text,o_38,a_-30,g_center
                </span>
                <h3 className="text-2xl font-bold text-white">Dynamic Watermarked Previews</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Attendees can browse and verify their photos with dynamic translucent watermarks rendered in real time by Cloudinary. Once purchased, clean high-res master files are unlocked instantly without re-uploading duplicate assets.
                </p>
                <div className="space-y-2 text-xs text-slate-400 pt-2 font-mono">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero duplicate storage required on photographer server</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Translucent anti-theft diagonal overlay (38% opacity)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant URL-based toggling between preview and purchased state</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=85"
                    alt="Watermarked preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Watermark overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <div className="transform -rotate-25 text-white/40 font-black text-2xl sm:text-3xl tracking-widest border-2 border-white/30 px-6 py-2 rounded-lg backdrop-blur-[1px] shadow-2xl">
                      EVENTSNAP PREVIEW
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-sky-300">
                    Live Watermarked Preview (Cloudinary)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'facecrop' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Transformation: c_thumb,g_face,w_500,h_500,z_0.85
                </span>
                <h3 className="text-2xl font-bold text-white">Smart Face Auto-Crop Thumbnails</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Instead of center-cropping images that cut off marathon runners or brides, Cloudinary's gravity-face algorithm (<code className="text-purple-300 bg-purple-950/40 px-1 rounded">g_face</code>) detects attendee faces and dynamically frames optimal square portrait thumbnails.
                </p>
                <div className="space-y-2 text-xs text-slate-400 pt-2 font-mono">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Automatic facial bounding-box focus across wide-angle shots</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>High pixel density retina support (dpr_auto)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Perfect 1:1 grids for mobile attendee browsing</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 flex justify-center">
                <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                    alt="Face crop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-950/80 border border-purple-400/40 px-2 py-0.5 rounded text-[10px] font-mono text-purple-300">
                    g_face auto-zoom
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                    500x500 Avatar
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'optimization' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Transformation: f_auto,q_auto:best,w_1600
                </span>
                <h3 className="text-2xl font-bold text-white">Next-Gen Formats & Zero Lag</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Event galleries load instantaneously on 4G/5G mobile devices at the event. Cloudinary automatically negotiates AVIF or WebP based on user browser capabilities, cutting file sizes by up to 72% with zero visible quality loss.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-xl font-bold text-emerald-400 block">-72%</span>
                    <span className="text-[10px] text-slate-400">Payload Reduction</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-xl font-bold text-sky-400 block">45ms</span>
                    <span className="text-[10px] text-slate-400">Edge Cache TTL</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-xl font-bold text-purple-400 block">AVIF</span>
                    <span className="text-[10px] text-slate-400">Auto Format</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="bg-black/50 rounded-2xl p-5 border border-white/10 font-mono text-xs text-slate-300 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-400">Delivery Inspection</span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                  <p className="text-sky-300 break-all text-[11px]">
                    https://res.cloudinary.com/eventsnap/image/upload/<span className="text-amber-300 font-bold">f_auto,q_auto:best,w_1600</span>/eventsnap/events/hyderabad-marathon/photo_482.jpg
                  </p>
                  <div className="space-y-1 text-[11px] text-slate-400 pt-2">
                    <div className="flex justify-between"><span>Original Size:</span><span className="text-rose-400 line-through">8.4 MB</span></div>
                    <div className="flex justify-between"><span>Optimized AVIF:</span><span className="text-emerald-400 font-bold">342 KB</span></div>
                    <div className="flex justify-between"><span>Visual SSIM Score:</span><span className="text-white">0.998 (Near-Lossless)</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
