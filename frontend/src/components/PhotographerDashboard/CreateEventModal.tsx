import React, { useState } from 'react';
import { X, Calendar, MapPin, Tag, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CreateEventPayload } from '../../types';

interface CreateEventModalProps {
  onClose: () => void;
  onCreateEvent: (payload: CreateEventPayload) => Promise<void>;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, onCreateEvent }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Sports');
  const [date, setDate] = useState('March 15, 2026');
  const [location, setLocation] = useState('Hyderabad, Telangana');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Sports',
    'Wedding',
    'College',
    'Conference',
    'Concert',
    'Corporate',
    'Other'
  ];

  const presetCovers = [
    { label: 'Marathon / Sports', url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Wedding Palace', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Tech Summit', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80' },
    { label: 'College Fest', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop&q=80' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await onCreateEvent({
        title: title.trim(),
        type,
        date: date.trim(),
        location: location.trim(),
        description: description.trim() || 'Official event photo gallery powered by EventSnap.',
        cover_url: coverUrl || presetCovers[0].url,
        photographer_name: 'Studio Pro Photographer'
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 my-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-1">
            New Gallery Setup
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Event
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Fill in the event details to generate a Cloudinary asset folder and enable AI indexing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Event Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hyderabad Half Marathon 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          {/* Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
                Event Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0d18] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
                Event Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. April 15, 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Gachibowli Stadium, Hyderabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description for attendees searching this gallery..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors resize-none"
            />
          </div>

          {/* Cover Image Preset */}
          <div>
            <label className="block text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              Event Cover Image
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {presetCovers.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => setCoverUrl(preset.url)}
                  className={`p-1.5 rounded-xl border text-left transition-all ${
                    coverUrl === preset.url
                      ? 'border-purple-400 ring-2 ring-purple-400/40'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-12 object-cover rounded-lg mb-1" />
                  <span className="text-[10px] text-slate-300 font-mono block truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:opacity-95 text-white text-sm font-bold shadow-xl shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all mt-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Setting up Gallery...' : 'Create Event'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
