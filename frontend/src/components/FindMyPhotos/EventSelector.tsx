import React, { useState } from 'react';
import { Search, Calendar, MapPin, Camera, ArrowRight, Trophy, Heart, GraduationCap, Mic } from 'lucide-react';
import { Event } from '../../types';

interface EventSelectorProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  selectedEventId?: string;
}

export const EventSelector: React.FC<EventSelectorProps> = ({
  events,
  onSelectEvent,
  selectedEventId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Sports', 'Wedding', 'College', 'Conference'];

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || ev.type.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const getCategoryIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sports':
        return <Trophy className="w-3.5 h-3.5 text-amber-400" />;
      case 'wedding':
        return <Heart className="w-3.5 h-3.5 text-rose-400" />;
      case 'college':
        return <GraduationCap className="w-3.5 h-3.5 text-sky-400" />;
      case 'conference':
        return <Mic className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Camera className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <section id="events" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>Step 1 — Choose Your Event</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Select the event you attended
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Choose an event below to search its gallery using your selfie or race bib number.
            </p>
          </div>

          {/* Search bar & filter tabs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search marathon, wedding, fest..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors w-full sm:w-64"
              />
            </div>

            <div className="flex space-x-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-sky-500 text-black font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => {
            const isSelected = selectedEventId === event.id;
            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className={`group relative rounded-2xl overflow-hidden glass-panel border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-2xl shadow-sky-500/20'
                    : 'border-white/10 hover:border-sky-400/40 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Event Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={event.cover_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-transparent to-transparent"></div>

                    {/* Category pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-medium text-slate-200 flex items-center space-x-1.5">
                      {getCategoryIcon(event.type)}
                      <span>{event.type}</span>
                    </div>

                    {/* Photo count badge */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-sky-300">
                      {(event.total_photos ?? 0).toLocaleString()} photos
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {event.title}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 pb-5 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[120px]">
                    {event.photographer_name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-black font-semibold text-xs border border-sky-400/30 hover:border-sky-400 transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-sky-500/10 hover:scale-105 active:scale-95"
                  >
                    <span>Select Event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
