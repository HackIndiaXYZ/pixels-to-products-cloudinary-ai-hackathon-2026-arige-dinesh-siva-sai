import React, { useState } from 'react';
import { X, Download, Heart, Share2, Shield, Calendar, MapPin, Camera, Sparkles, Check, Lock, Unlock } from 'lucide-react';
import { Photo } from '../types';
import { cloudinaryHelper } from '../services/cloudinary';

interface LightboxViewerProps {
  photo: Photo;
  eventTitle: string;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onDeleteSearchData: () => void;
}

export const LightboxViewer: React.FC<LightboxViewerProps> = ({
  photo,
  eventTitle,
  onClose,
  isFavorite,
  onToggleFavorite,
  onDeleteSearchData
}) => {
  const [showWatermark, setShowWatermark] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute live Cloudinary dynamic URLs
  const displayUrl = showWatermark
    ? cloudinaryHelper.getWatermarkedUrl(photo.original_url)
    : photo.original_url;

  const handleDownload = () => {
    setDownloading(true);
    // Create temporary anchor to trigger real browser download
    const link = document.createElement('a');
    link.href = photo.original_url;
    link.download = `EventSnap_${photo.id}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1200);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 overflow-y-auto">
      {/* Lightbox Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[92vh] rounded-3xl glass-panel border border-white/20 shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Photo Stage */}
        <div className="lg:w-2/3 h-[50vh] lg:h-full relative bg-[#030407] flex items-center justify-center p-4 overflow-hidden">
          <img
            src={displayUrl}
            alt="Event capture"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
          />

          {/* Cloudinary dynamic watermark overlay indicator */}
          {showWatermark && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300 flex items-center space-x-1.5 shadow-lg">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Cloudinary Watermark Preview</span>
            </div>
          )}

          {/* Watermark Toggle Control Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full p-1 flex items-center space-x-1 shadow-2xl z-20">
            <button
              onClick={() => setShowWatermark(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                showWatermark
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Watermarked Preview</span>
            </button>
            <button
              onClick={() => setShowWatermark(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                !showWatermark
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Unlock className="w-3 h-3" />
              <span>Purchased Master (Clean)</span>
            </button>
          </div>
        </div>

        {/* Right Side: Information & Action Panel */}
        <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10 text-left bg-[#070912]">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-sky-400 mb-1">
                <span>Cloudinary CDN Delivered</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">f_auto,q_auto</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
                {eventTitle}
              </h2>
            </div>

            {/* Photo Metadata Details */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Captured</span>
                </span>
                <span className="font-bold text-white font-mono">{photo.captured_time}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Location</span>
                </span>
                <span className="font-semibold text-white">{photo.location}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                  <span>Photographer</span>
                </span>
                <span className="font-semibold text-sky-400">{photo.photographer}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Camera Specs</span>
                <span className="font-mono text-slate-300 text-[11px]">{photo.camera_meta}</span>
              </div>

              {photo.bib_numbers && photo.bib_numbers.length > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-slate-400">Detected Bib</span>
                  <span className="font-mono text-purple-300 font-bold">
                    #{photo.bib_numbers.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Actions: Download, Favorite, Share */}
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-xl shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                <span>{downloading ? 'Preparing Download...' : 'Download High-Res Photo'}</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onToggleFavorite(photo.id)}
                  className={`py-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    isFavorite
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Saved to Favs' : 'Save Photo'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share Moment'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Wipe Option */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Biometrics protected</span>
            </span>
            <button
              onClick={onDeleteSearchData}
              className="text-rose-400 hover:text-rose-300 underline font-medium"
            >
              Delete my search data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
