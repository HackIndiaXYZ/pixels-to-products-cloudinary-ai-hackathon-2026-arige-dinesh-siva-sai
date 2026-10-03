import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, X, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { Event, UploadItem } from '../../types';
import { api } from '../../services/api';

interface BulkUploadStudioProps {
  event: Event;
  onClose: () => void;
  onUploadSuccess: () => void;
}

export const BulkUploadStudio: React.FC<BulkUploadStudioProps> = ({
  event,
  onClose,
  onUploadSuccess
}) => {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const newItems: UploadItem[] = Array.from(fileList).map((f) => ({
      id: Math.random().toString(36).substring(7),
      file: f,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      progress: 0,
      status: 'pending',
      previewUrl: URL.createObjectURL(f)
    }));
    setItems((prev) => [...prev, ...newItems]);
  };

  const startUploadPipeline = async () => {
    if (items.length === 0 || isUploading) return;
    setIsUploading(true);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.status === 'indexed') continue;

      // 1. Uploading state
      setItems((prev) =>
        prev.map((it, idx) => (idx === i ? { ...it, status: 'uploading', progress: 40 } : it))
      );

      // 2. Cloudinary processing & Face Detection state
      setItems((prev) =>
        prev.map((it, idx) => (idx === i ? { ...it, status: 'processing', progress: 80 } : it))
      );

      try {
        // Real API upload call directly to Cloudinary & Face Recognition indexing
        const uploaded = await api.uploadPhoto(event.id, item.file, {
          captured_time: '12:00 PM',
          location: event.location,
          photographer: event.photographer_name
        });

        // 3. Complete & Indexed with real Cloudinary public_id and secure_url
        setItems((prev) =>
          prev.map((it, idx) => (idx === i ? {
            ...it,
            status: 'indexed',
            progress: 100,
            previewUrl: uploaded.original_url || it.previewUrl,
            cloudinaryUrl: uploaded.original_url,
            publicId: uploaded.cloudinary_public_id,
            facesDetected: uploaded.faces_detected
          } : it))
        );
      } catch (err: any) {
        console.error('Real Cloudinary upload error:', err);
        setItems((prev) =>
          prev.map((it, idx) => (idx === i ? {
            ...it,
            status: 'error',
            error: err.message || 'Cloudinary upload failed'
          } : it))
        );
      }
    }

    setIsUploading(false);
    onUploadSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 my-8 text-left">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-400 mb-1">
              <span>{event.title}</span>
              <span>•</span>
              <span className="text-slate-400">Event ID: {event.id}</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Upload Event Photos
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Photos uploaded here are stored in Cloudinary and immediately indexed for attendee facial recognition.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center mb-6 ${
            dragActive
              ? 'border-purple-400 bg-purple-500/10'
              : 'border-white/15 bg-black/40 hover:border-purple-400/40 hover:bg-white/[0.02]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />

          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-white">
            Drag & drop event photos here or <span className="text-purple-400 underline decoration-purple-400/50">Browse files</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Supports JPG, JPEG, and PNG. Automatically uploaded to your Cloudinary media library.
          </p>
        </div>

        {/* Upload Queue List */}
        {items.length > 0 && (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">{items.length} file{items.length === 1 ? '' : 's'} selected</span>
              <button
                onClick={() => setItems([])}
                disabled={isUploading}
                className="text-rose-400 hover:text-rose-300 underline cursor-pointer disabled:opacity-50"
              >
                Clear all
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate max-w-[240px] sm:max-w-xs">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    {item.status === 'pending' && (
                      <span className="text-[11px] font-mono text-slate-400">Ready</span>
                    )}
                    {item.status === 'uploading' && (
                      <span className="text-[11px] font-mono text-sky-400 flex items-center space-x-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Uploading...</span>
                      </span>
                    )}
                    {item.status === 'processing' && (
                      <span className="text-[11px] font-mono text-purple-400 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        <span>Indexing Faces...</span>
                      </span>
                    )}
                    {item.status === 'indexed' && (
                      <div className="flex items-center space-x-2 text-right">
                        <div>
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>
                              {item.facesDetected !== undefined && item.facesDetected > 0
                                ? `Indexed (${item.facesDetected} face${item.facesDetected === 1 ? '' : 's'})`
                                : 'Uploaded'}
                            </span>
                          </span>
                          {item.publicId && (
                            <span className="text-[9px] text-slate-400 font-mono block max-w-[180px] truncate">
                              {item.publicId}
                            </span>
                          )}
                        </div>
                        {item.cloudinaryUrl && (
                          <a
                            href={item.cloudinaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-sky-400 transition-colors"
                            title="Open in Cloudinary Media Library"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                    {item.status === 'error' && (
                      <span className="text-[11px] font-mono text-rose-400 flex items-center space-x-1 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{item.error || 'Upload failed'}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Action Button */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={startUploadPipeline}
            disabled={items.length === 0 || isUploading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-xl shadow-purple-500/20 flex items-center space-x-2 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Start Cloudinary Upload ({items.length})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
