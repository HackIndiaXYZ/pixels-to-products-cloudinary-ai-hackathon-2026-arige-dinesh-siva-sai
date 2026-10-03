import React, { useState } from 'react';
import { Sparkles, Heart, Eye, Download, ArrowLeft, RefreshCw, Trophy, Filter, Share2 } from 'lucide-react';
import { SearchResponse, Photo, SearchResult } from '../../types';

interface ResultsGalleryProps {
  searchResponse: SearchResponse;
  onPhotoClick: (photo: Photo) => void;
  onBackToSearch: () => void;
  favorites: string[];
  onToggleFavorite: (photoId: string) => void;
}

export const ResultsGallery: React.FC<ResultsGalleryProps> = ({
  searchResponse,
  onPhotoClick,
  onBackToSearch,
  favorites,
  onToggleFavorite
}) => {
  const [filterFavsOnly, setFilterFavsOnly] = useState(false);

  const displayedResults = filterFavsOnly
    ? searchResponse.results.filter((r) => favorites.includes(r.photo.id))
    : searchResponse.results;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Top Navigation & Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToSearch}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Search / Change Event</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterFavsOnly(!filterFavsOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center space-x-1.5 ${
              filterFavsOnly
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${filterFavsOnly ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Header Results Banner */}
      <div className="mb-10 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-transparent blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {searchResponse.query_type === 'gallery'
                  ? 'Event Media Gallery'
                  : `AI Search Completed in ${searchResponse.processing_time_ms}ms`}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {searchResponse.query_type === 'gallery'
                ? `${searchResponse.total_matches} photos in ${searchResponse.event_title}`
                : `${searchResponse.total_matches} moments found`}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {searchResponse.query_type === 'gallery'
                ? `Browsing all uploaded photos hosted on Cloudinary for this event.`
                : `We found these photos from ${searchResponse.event_title}.`}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
              {searchResponse.query_type === 'gallery' ? 'FULL GALLERY' : `QUERY: ${searchResponse.query_type.toUpperCase()}`}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
              Cloudinary CDN
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {displayedResults.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-panel border border-white/10 p-8">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No matches found</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
            {searchResponse.message || "We couldn't find a strong match in this event. Try a clearer selfie with good lighting, or search using your race bib number."}
          </p>
          <button
            onClick={onBackToSearch}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-lg"
          >
            Try Another Search
          </button>
        </div>
      ) : (
        /* Responsive Masonry / Photo Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedResults.map((result) => {
            const { photo, confidence_score, match_type, detected_bib } = result;
            const isFav = favorites.includes(photo.id);
            const matchPercent = Math.round(confidence_score * 100);

            return (
              <div
                key={photo.id}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-sky-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Photo Image Area */}
                <div
                  onClick={() => onPhotoClick(photo)}
                  className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-slate-900"
                >
                  <img
                    src={photo.original_url}
                    alt="Event moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark hover vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(photo.id);
                        }}
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="text-center">
                      <button className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold border border-white/30 shadow-lg inline-flex items-center space-x-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Photo</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-300 text-left font-mono">
                      <span>{photo.camera_meta}</span>
                    </div>
                  </div>

                  {/* Match Confidence Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-emerald-400 flex items-center space-x-1 shadow">
                    <Sparkles className="w-3 h-3" />
                    <span>{matchPercent}% Match</span>
                  </div>

                  {/* Detected Bib Badge if applicable */}
                  {detected_bib && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-[10px] font-mono font-bold text-purple-200">
                      BIB #{detected_bib}
                    </div>
                  )}
                </div>

                {/* Card Meta Footer */}
                <div className="p-4 flex items-center justify-between text-xs text-slate-300 border-t border-white/[0.06]">
                  <div>
                    <span className="font-semibold text-white block">{photo.location}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{photo.captured_time}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onToggleFavorite(photo.id)}
                      className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                        isFav ? 'text-rose-400' : 'text-slate-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => onPhotoClick(photo)}
                      className="px-3 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-semibold border border-sky-500/30 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
