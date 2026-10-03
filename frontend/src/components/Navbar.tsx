import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, User, Search, Shield, Menu, X, ArrowRight, Layers } from 'lucide-react';

interface NavbarProps {
  onFindPhotosClick: () => void;
  onPhotographerClick: () => void;
  onNavigateHome: () => void;
  activeView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onFindPhotosClick,
  onPhotographerClick,
  onNavigateHome,
  activeView
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06070a]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-3 group focus:outline-none text-left"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all">
              <div className="w-full h-full bg-[#090b12] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <Camera className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-2.5 h-2.5 text-purple-300 absolute top-1.5 right-1.5 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Event<span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">Snap</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                AI Photo Discovery
              </span>
            </div>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              Live Demo
            </button>
            <button
              onClick={() => {
                onFindPhotosClick();
              }}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors rounded-full ${
                activeView === 'find-photos'
                  ? 'text-sky-400 bg-sky-500/10 border border-sky-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => {
                onPhotographerClick();
              }}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors rounded-full ${
                activeView === 'photographer'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Photographer Studio
            </button>
            <button
              onClick={() => scrollToSection('cloudinary-workflow')}
              className="px-3.5 py-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors rounded-full hover:bg-sky-500/10 flex items-center space-x-1"
            >
              <Layers className="w-3 h-3" />
              <span>Cloudinary AI</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onPhotographerClick}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                activeView === 'photographer'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Photographer Studio</span>
            </button>

            <button
              onClick={onFindPhotosClick}
              className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 rounded-lg group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center space-x-2 px-4 py-2 rounded-[7px] bg-[#090b12] group-hover:bg-opacity-90 transition-all text-xs font-semibold text-white">
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span>Find My Photos</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onFindPhotosClick}
              className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-purple-600 rounded-lg text-xs font-semibold text-white"
            >
              Find Photos
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d17]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection('demo')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Live Demo
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onFindPhotosClick();
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Events
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onPhotographerClick();
            }}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Photographer Studio
          </button>
          <button
            onClick={() => scrollToSection('cloudinary-workflow')}
            className="block w-full text-left py-2 text-sm text-sky-400"
          >
            Cloudinary AI Workflow
          </button>
          <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPhotographerClick();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-white/5 text-purple-300 border border-purple-500/20"
            >
              Photographer Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
