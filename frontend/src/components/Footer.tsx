import React from 'react';
import { Camera, Sparkles, Heart, Shield, Layers } from 'lucide-react';

interface FooterProps {
  onFindPhotosClick: () => void;
  onPhotographerClick: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onFindPhotosClick,
  onPhotographerClick,
  onOpenPrivacy
}) => {
  return (
    <footer className="bg-[#040508] border-t border-white/[0.08] pt-16 pb-12 relative overflow-hidden text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#090b12] rounded-[7px] flex items-center justify-center">
                  <Camera className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Event<span className="text-sky-400">Snap</span>
              </span>
            </div>

            <p className="text-slate-300 font-medium text-sm">
              Find the moments you're in.
            </p>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              One event. Thousands of moments. Find yours in seconds. The AI-powered event photo discovery platform built with Cloudinary.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-slate-300">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>HackIndia 2026 • PS-03 Media-Savvy Startup Track</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onFindPhotosClick} className="hover:text-white transition-colors">
                  Find My Photos
                </button>
              </li>
              <li>
                <button onClick={onPhotographerClick} className="hover:text-white transition-colors">
                  Photographer Studio
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white transition-colors">
                  Interactive Live Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Cloudinary & Privacy */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Media & Security</h4>
            <ul className="space-y-2">
              <li>
                <a href="#cloudinary-workflow" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <span className="text-sky-400 font-mono">Cloudinary AI Engine</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Biometric Privacy Policy</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Zero Persistent Facial Vectors</span>
              </li>
              <li>
                <span className="text-slate-500">Encrypted In-Flight Uploads</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} EventSnap Inc. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built with precision for moments that matter.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
