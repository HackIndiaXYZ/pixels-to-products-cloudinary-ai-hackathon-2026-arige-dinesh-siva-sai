import React from 'react';
import { Heart, Trophy, GraduationCap, Mic, Music, Briefcase, ArrowUpRight } from 'lucide-react';

interface EventCategoriesProps {
  onCategorySelect?: (cat: string) => void;
}

export const EventCategories: React.FC<EventCategoriesProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      name: 'Weddings',
      tagline: 'Sangeet, Mandap & Royal Moments',
      count: '8,640+ photos',
      icon: Heart,
      iconColor: 'text-rose-400',
      bgGlow: 'hover:border-rose-500/30 hover:shadow-rose-500/10',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sports',
      tagline: 'Marathons, OCR Bibs & Finish Lines',
      count: '5,420+ photos',
      icon: Trophy,
      iconColor: 'text-amber-400',
      bgGlow: 'hover:border-amber-500/30 hover:shadow-amber-500/10',
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'College Events',
      tagline: 'Hackathons, Fests & Campus Stages',
      count: '2,180+ photos',
      icon: GraduationCap,
      iconColor: 'text-sky-400',
      bgGlow: 'hover:border-sky-500/30 hover:shadow-sky-500/10',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Conferences',
      tagline: 'Keynotes, Panels & Tech Summits',
      count: '3,210+ photos',
      icon: Mic,
      iconColor: 'text-indigo-400',
      bgGlow: 'hover:border-indigo-500/30 hover:shadow-indigo-500/10',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Concerts',
      tagline: 'Festivals, EDM Nights & Crowd Energy',
      count: '4,100+ photos',
      icon: Music,
      iconColor: 'text-purple-400',
      bgGlow: 'hover:border-purple-500/30 hover:shadow-purple-500/10',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Corporate Events',
      tagline: 'Galas, Annual Meets & Award Shows',
      count: '1,950+ photos',
      icon: Briefcase,
      iconColor: 'text-emerald-400',
      bgGlow: 'hover:border-emerald-500/30 hover:shadow-emerald-500/10',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-20 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2">
            Versatile Event Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for moments that matter.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            From royal palace weddings to grueling 42km marathons and 3,000-attendee tech conferences, EventSnap indexes every smile, stride, and spotlight.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => onCategorySelect && onCategorySelect(cat.name)}
                className={`group relative rounded-2xl overflow-hidden glass-panel border border-white/10 p-5 cursor-pointer transition-all duration-300 ${cat.bgGlow}`}
              >
                {/* Background Image Thumbnail with overlay */}
                <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/40 to-transparent"></div>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300 flex items-center space-x-1.5">
                    <Icon className={`w-3.5 h-3.5 ${cat.iconColor}`} />
                    <span>{cat.name}</span>
                  </div>

                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-300 font-medium">{cat.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-slate-400">{cat.count}</span>
                  <span className="text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Browse moments &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
