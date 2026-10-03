import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Scan, CheckCircle2, ShieldCheck, Zap, Search, Camera } from 'lucide-react';

interface HeroProps {
  onFindPhotosClick: () => void;
  onPhotographerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onFindPhotosClick, onPhotographerClick }) => {
  const [scanState, setScanState] = useState<'scanning' | 'matched'>('scanning');

  useEffect(() => {
    const interval = setInterval(() => {
      setScanState((prev) => (prev === 'scanning' ? 'matched' : 'scanning'));
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grain">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-600/20 via-indigo-600/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* HackIndia Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                HackIndia 2026 <span className="text-slate-500">•</span> Cloudinary AI Track (PS-03)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Find the moments <br />
              you're in.{' '}
              <span className="block mt-1 bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent glow-text-blue">
                in seconds.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
              Thousands of event photos. One simple selfie. EventSnap uses facial biometric AI and Cloudinary's intelligent media engine to discover the moments you were part of.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onFindPhotosClick}
                className="group relative inline-flex items-center justify-center px-7 py-4 text-sm font-semibold text-white rounded-xl shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 group-hover:opacity-95 transition-opacity"></span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center space-x-2">
                  <Search className="w-4 h-4 text-sky-200" />
                  <span>Find My Photos</span>
                  <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={onPhotographerClick}
                className="inline-flex items-center justify-center px-6 py-4 text-sm font-medium text-slate-300 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/40 transition-all backdrop-blur-md"
              >
                <Camera className="w-4 h-4 mr-2 text-purple-400" />
                <span>I'm a Photographer</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">19,400+</p>
                <p className="text-xs text-slate-500 font-medium">Moments Indexed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-400 tracking-tight">&lt; 0.4s</p>
                <p className="text-xs text-slate-500 font-medium">Match Latency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400 tracking-tight">100%</p>
                <p className="text-xs text-slate-500 font-medium">Privacy Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Overlapping Gallery Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Back Card: Tech Conference */}
              <div className="absolute -top-6 -right-4 w-72 h-80 rounded-2xl overflow-hidden glass-panel rotate-6 shadow-2xl opacity-60 border border-white/10 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80"
                  alt="Tech Conference"
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent"></div>
              </div>

              {/* Back Card: Wedding */}
              <div className="absolute -bottom-8 -left-6 w-64 h-72 rounded-2xl overflow-hidden glass-panel -rotate-6 shadow-2xl opacity-50 border border-white/10 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80"
                  alt="Wedding celebration"
                  className="w-full h-full object-cover filter brightness-75"
                />
              </div>

              {/* Main Center Card: Hyderabad Marathon */}
              <div className="relative z-20 rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=85"
                    alt="Hyderabad Marathon Runners"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Scanning Radar Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-scanline pointer-events-none"></div>

                  {/* Face Detection Bounding Box Overlay */}
                  <div className="absolute top-[28%] left-[45%] w-20 h-20 border-2 border-sky-400/80 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-start justify-end p-1 backdrop-blur-[1px]">
                    <span className="text-[9px] font-bold bg-sky-500 text-black px-1 rounded shadow">
                      98.9%
                    </span>
                  </div>

                  {/* Bib OCR Box Overlay */}
                  <div className="absolute bottom-[28%] left-[46%] px-2 py-0.5 border border-purple-400/80 rounded bg-purple-950/80 backdrop-blur-sm text-[10px] font-mono font-bold text-purple-200">
                    BIB #482
                  </div>

                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-transparent to-black/20"></div>

                  {/* Image Meta Bar */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                    <div>
                      <span className="font-semibold text-white block">Hyderabad Marathon 2026</span>
                      <span className="text-[11px] text-slate-400">Captured at 08:42 AM • Gachibowli</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] text-sky-400 font-mono">
                      Cloudinary AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Match Result Card */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 z-30 w-72 rounded-xl p-3.5 glass-panel border border-sky-500/30 shadow-2xl transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center">
                      <Scan className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span className="text-xs font-semibold text-white">AI Photo Match</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Live Engine</span>
                </div>

                {scanState === 'scanning' ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping mr-2"></span>
                        Scanning 2,438 photos...
                      </span>
                      <span className="text-sky-400 font-mono font-bold">78%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full w-[78%] animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2.5 py-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Moments discovered</p>
                      <p className="text-[10px] text-slate-400">Hyderabad Marathon 2026</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
