import React, { useState } from 'react';
import { Sparkles, Scan, CheckCircle2, ArrowRight, Play, Eye, Trophy, Heart, Mic, RefreshCw } from 'lucide-react';
import { Photo, DemoPersona } from '../types';

interface InteractiveDemoProps {
  onPhotoClick: (photo: Photo) => void;
  onFullSearchClick: (eventId: string, personaId?: string) => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  onPhotoClick,
  onFullSearchClick
}) => {
  const personas = [
    {
      id: 'alex_marathon',
      name: 'Alex Rivera',
      event: 'Hyderabad Marathon 2026',
      eventId: 'hyderabad-marathon-2026',
      badge: 'Bib #482 • Full Marathon',
      icon: Trophy,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      matches: [
        {
          id: 'ph_demo_1',
          url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=85',
          score: 98.9,
          time: '06:45 AM',
          location: 'HITEC Flyover'
        },
        {
          id: 'ph_demo_2',
          url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=85',
          score: 96.5,
          time: '07:15 AM',
          location: 'Durgam Cheruvu'
        },
        {
          id: 'ph_demo_3',
          url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=85',
          score: 95.2,
          time: '08:42 AM',
          location: 'Finish Line Arena'
        },
        {
          id: 'ph_demo_4',
          url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=85',
          score: 94.1,
          time: '09:05 AM',
          location: 'Medal Podium'
        }
      ]
    },
    {
      id: 'priya_bride',
      name: 'Priya Sharma',
      event: 'Aarav & Priya Wedding',
      eventId: 'aarav-priya-wedding',
      badge: 'The Royal Bride',
      icon: Heart,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      matches: [
        {
          id: 'ph_demo_5',
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=85',
          score: 99.2,
          time: '11:00 AM',
          location: 'Durbar Hall'
        },
        {
          id: 'ph_demo_6',
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=85',
          score: 97.4,
          time: '12:30 PM',
          location: 'Palace Mandap'
        }
      ]
    },
    {
      id: 'kabir_speaker',
      name: 'Dr. Kabir Mehta',
      event: 'Tech Conference Hyderabad',
      eventId: 'hyderabad-tech-conf-2026',
      badge: 'AI Keynote Speaker',
      icon: Mic,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      matches: [
        {
          id: 'ph_demo_7',
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=85',
          score: 98.4,
          time: '09:30 AM',
          location: 'Plenary Keynote Hall'
        },
        {
          id: 'ph_demo_8',
          url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=85',
          score: 96.1,
          time: '11:15 AM',
          location: 'Robotics Stage'
        }
      ]
    }
  ];

  const [activePersonaIdx, setActivePersonaIdx] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const activePersona = personas[activePersonaIdx];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanProgress(15);

    const t1 = setTimeout(() => setScanProgress(55), 300);
    const t2 = setTimeout(() => setScanProgress(85), 650);
    const t3 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
    }, 1100);
  };

  const handleSelectPersona = (index: number) => {
    setActivePersonaIdx(index);
    handleSimulateScan();
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#06070a] via-[#090b14] to-[#06070a] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-400 mb-3">
            <Play className="w-3 h-3 fill-sky-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See EventSnap in action
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Experience the facial embedding pipeline right here. Select a demo persona below to watch the AI match photos from thousands of event captures.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {personas.map((p, idx) => {
            const isSelected = activePersonaIdx === idx;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPersona(idx)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 border border-sky-400/50 shadow-lg shadow-sky-500/10'
                    : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-slate-400'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <div className="text-left">
                  <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {p.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {p.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Demo Stage Container */}
        <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Input Selfie Card */}
            <div className="lg:col-span-4 bg-black/40 rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center">
              <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-2">
                1. Input Selfie
              </span>

              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-xl mb-4 group">
                <img
                  src={activePersona.avatar}
                  alt={activePersona.name}
                  className="w-full h-full object-cover"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-[1px] flex flex-col items-center justify-center">
                    <Scan className="w-8 h-8 text-sky-300 animate-spin" />
                    <span className="text-[10px] text-white font-mono mt-1">Scanning...</span>
                  </div>
                )}
                <div className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-[0_0_10px_#38bdf8] animate-scanline"></div>
              </div>

              <h4 className="text-base font-bold text-white">{activePersona.name}</h4>
              <p className="text-xs text-slate-400 mb-1">{activePersona.event}</p>
              <span className="inline-block text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 mb-4">
                {activePersona.badge}
              </span>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Matching Features...' : 'Re-Run AI Matching'}</span>
              </button>
            </div>

            {/* Right: Matches Showcase */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">
                    2. Discovered Moments
                  </span>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Found {activePersona.matches.length} matching moments</span>
                  </h3>
                </div>
                <button
                  onClick={() => onFullSearchClick(activePersona.eventId, activePersona.id)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center space-x-1"
                >
                  <span>Open Full Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Matched Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {activePersona.matches.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      onPhotoClick({
                        id: item.id,
                        event_id: activePersona.eventId,
                        original_url: item.url,
                        cloudinary_public_id: `eventsnap/${item.id}`,
                        thumbnail_url: item.url,
                        watermarked_url: item.url,
                        captured_time: item.time,
                        location: item.location,
                        photographer: 'Verified Studio',
                        camera_meta: 'Sony A7 IV • 85mm f/1.4',
                        bib_numbers: activePersona.badge.includes('482') ? ['482'] : [],
                        width: 1920,
                        height: 1080,
                        likes: 12
                      })
                    }
                    className="group relative rounded-xl overflow-hidden glass-panel border border-white/10 aspect-[4/3] cursor-pointer hover:border-sky-400/50 transition-all shadow-md"
                  >
                    <img
                      src={item.url}
                      alt="Moment"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop&q=85';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Match Score Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-emerald-400 flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{item.score}% Match</span>
                    </div>

                    {/* Dark gradient on hover with View Photo CTA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <p className="text-xs font-semibold text-white">{item.location}</p>
                      <p className="text-[10px] text-slate-300 font-mono">{item.time}</p>
                      <div className="mt-1 inline-flex items-center text-[10px] text-sky-400 font-medium">
                        <Eye className="w-3 h-3 mr-1" /> View in Lightbox &rarr;
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
