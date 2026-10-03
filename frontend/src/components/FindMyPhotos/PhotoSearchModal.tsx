import React, { useState, useRef } from 'react';
import { Upload, Camera, Search, UserCheck, Shield, Sparkles, X, Trophy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Event, DemoPersona } from '../../types';

interface PhotoSearchModalProps {
  event: Event;
  demoPersonas: DemoPersona[];
  onStartSelfieSearch: (file?: File, personaId?: string) => void;
  onStartBibSearch: (bibNumber: string) => void;
  onClose: () => void;
  searchError?: string | null;
  onClearError?: () => void;
}

export const PhotoSearchModal: React.FC<PhotoSearchModalProps> = ({
  event,
  demoPersonas,
  onStartSelfieSearch,
  onStartBibSearch,
  onClose,
  searchError,
  onClearError
}) => {
  const [activeTab, setActiveTab] = useState<'selfie' | 'bib'>('selfie');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bibNumber, setBibNumber] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const relevantPersonas = (demoPersonas || []).filter(
    (p) => p.event_id === event?.id || (!(demoPersonas || []).some((dp) => dp.event_id === event?.id))
  );

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setSelectedPersonaId(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onClearError?.();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPersona = (p: DemoPersona) => {
    setSelectedPersonaId(p.id);
    setSelectedFile(null);
    setPreviewUrl(p.selfie_url);
    if (p.bib_number) {
      setBibNumber(p.bib_number);
    }
    onClearError?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'selfie') {
      if (selectedPersonaId) {
        onStartSelfieSearch(undefined, selectedPersonaId);
      } else if (selectedFile) {
        onStartSelfieSearch(selectedFile);
      }
    } else {
      if (bibNumber.trim()) {
        onStartBibSearch(bibNumber.trim());
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-sky-400 mb-2 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="font-semibold text-sky-300">{event.title}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono text-[11px] bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-800/60">{event.id}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{(event.total_photos ?? 0).toLocaleString()} photos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find your moments in {event.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Upload a clear selfie and we'll search photos indexed under event{' '}
            <code className="text-sky-300 font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/10">{event.id}</code>{' '}
            using facial recognition AI.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('selfie')}
            className={`flex items-center space-x-2 pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'selfie'
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Selfie Search (AI Face Match)</span>
          </button>

          {event.type?.toLowerCase() === 'sports' && (
            <button
              onClick={() => setActiveTab('bib')}
              className={`flex items-center space-x-2 pb-3 px-4 text-xs font-bold transition-all relative ${
                activeTab === 'bib'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Search with Bib Number</span>
            </button>
          )}
        </div>

        {activeTab === 'selfie' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1-Click Persona Quick Presets */}
            {relevantPersonas.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-2 font-medium flex items-center justify-between">
                  <span>Quick Test Presets (Instant 1-Click Evaluation):</span>
                  <span className="text-[10px] text-sky-400">Click any avatar</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {relevantPersonas.map((p) => {
                    const isSelected = selectedPersonaId === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handleSelectPersona(p)}
                        className={`p-2 rounded-xl flex items-center space-x-2 border transition-all text-left ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-400/60 ring-1 ring-sky-400'
                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08]'
                        }`}
                      >
                        <img
                          src={p.selfie_url}
                          alt={p.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/20"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-white truncate">{p.name}</p>
                          <p className="text-[9px] text-slate-400 truncate">{p.role_description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                isDragOver
                  ? 'border-sky-400 bg-sky-500/10'
                  : 'border-white/15 bg-black/40 hover:border-white/30 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              />

              {previewUrl ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-xl mb-3">
                    <img src={previewUrl} alt="Selfie preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-sky-500/10"></div>
                  </div>
                  <span className="text-xs font-semibold text-sky-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Photo selected • Ready to scan</span>
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">Click to replace photo</span>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-sky-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Drop your selfie here <span className="text-slate-400 font-normal">or</span>{' '}
                    <span className="text-sky-400 underline decoration-sky-400/50">Choose a photo</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    For best results, use a clear photo where your face is visible.
                  </p>
                </>
              )}
            </div>

            {/* Error Banner */}
            {searchError && (
              <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start space-x-3 shadow-lg shadow-rose-950/40">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-300">Selfie Validation Failed</p>
                  <p className="text-rose-200/90 mt-0.5 leading-relaxed">{searchError}</p>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Privacy pledge:</strong> Your selfie is used only to find matching photos. We never store or share your biometric data.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedFile && !selectedPersonaId}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold shadow-xl shadow-sky-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Photos</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">
                  Enter Bib Number
                </label>
                <div className="relative">
                  <Trophy className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 482 or 1024"
                    value={bibNumber}
                    onChange={(e) => setBibNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-black/60 border border-white/15 rounded-xl text-lg font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Our OCR engine reads official race bib numbers pinned to shirts or vests.
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-2 text-xs text-slate-400">
                <span>Try sample marathon bibs:</span>
                <button
                  type="button"
                  onClick={() => setBibNumber('482')}
                  className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30"
                >
                  #482 (Alex)
                </button>
                <button
                  type="button"
                  onClick={() => setBibNumber('1024')}
                  className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30"
                >
                  #1024
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-sm font-bold shadow-xl shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Find Photos with Bib #{bibNumber || '...'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
