import React from 'react';
import { Calendar, UserCheck, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose your event',
      description: 'Select the event you attended from our verified photographer network.',
      icon: Calendar,
      detail: 'Marathons, college fests, royal weddings, tech summits & more.',
      gradient: 'from-sky-500/20 to-sky-600/5',
      borderGlow: 'group-hover:border-sky-500/40',
      iconColor: 'text-sky-400'
    },
    {
      step: '02',
      title: 'Show us your face',
      description: 'Upload a selfie and let EventSnap search the event gallery with AI.',
      icon: UserCheck,
      detail: 'Encrypted biometric embedding matching or sports bib OCR lookup.',
      gradient: 'from-indigo-500/20 to-indigo-600/5',
      borderGlow: 'group-hover:border-indigo-500/40',
      iconColor: 'text-indigo-400'
    },
    {
      step: '03',
      title: 'Find your moments',
      description: "Get the photos you're in, instantly with Cloudinary high-res delivery.",
      icon: Sparkles,
      detail: 'Preview watermarked photos, high-res downloads & one-tap social share.',
      gradient: 'from-purple-500/20 to-purple-600/5',
      borderGlow: 'group-hover:border-purple-500/40',
      iconColor: 'text-purple-400'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#06070a]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-500/5 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-sky-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Effortless Attendee Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How EventSnap Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Three simple steps to unlock your memories from thousands of raw event photos.
          </p>
        </div>

        {/* 3-Step Cards with connecting lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Animated Connecting Line (visible on desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] -translate-y-8 bg-gradient-to-r from-sky-500/40 via-indigo-500/40 to-purple-500/40 z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-pulse"></div>
          </div>

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`group relative z-10 rounded-2xl glass-panel border border-white/10 p-8 transition-all duration-300 ${item.borderGlow} hover:-translate-y-1.5`}
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <span className="text-3xl font-mono font-extrabold text-slate-700 group-hover:text-slate-500 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400 font-medium">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Note Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-slate-400 bg-white/[0.02] border border-white/10 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Your selfie is processed ephemerally in RAM and never shared or sold. Zero persistent biometric tracking.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
