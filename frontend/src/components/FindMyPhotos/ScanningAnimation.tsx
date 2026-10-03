import React, { useState, useEffect } from 'react';
import { Scan, Sparkles, CheckCircle2, Shield } from 'lucide-react';

interface ScanningAnimationProps {
  eventTitle: string;
  queryType: 'selfie' | 'bib';
  onScanComplete: () => void;
  targetCount?: number;
}

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({
  eventTitle,
  queryType,
  onScanComplete,
  targetCount
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    { title: 'Analyzing your photo...', detail: 'Extracting 128-d spatial biometric facial features' },
    { title: 'Searching the event gallery...', detail: `Scanning gallery photos in ${eventTitle}` },
    { title: 'Matching faces...', detail: 'Computing cosine similarity across indexed photo descriptors' },
    {
      title: targetCount !== undefined ? `Found ${targetCount} moment${targetCount === 1 ? '' : 's'}` : 'Matching complete',
      detail: 'Preparing your high-resolution gallery'
    }
  ];

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStepIndex(1);
      setProgress(45);
    }, 450);

    const t2 = setTimeout(() => {
      setStepIndex(2);
      setProgress(78);
    }, 950);

    const t3 = setTimeout(() => {
      setStepIndex(3);
      setProgress(100);
    }, 1450);

    const t4 = setTimeout(() => {
      onScanComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onScanComplete, targetCount]);

  const currentStep = steps[stepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-md rounded-3xl glass-panel border border-sky-500/30 p-8 shadow-2xl text-center overflow-hidden">
        {/* Radar Scanning Ring Effect */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-sky-500/20 animate-ping opacity-30"></div>
          <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-sky-400/50 animate-spin"></div>

          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-md border border-white/20">
            {stepIndex === 3 ? (
              <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-scale-in" />
            ) : (
              <Scan className="w-10 h-10 text-sky-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Step Text Transitions */}
        <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
          {currentStep.title}
        </h3>
        <p className="text-xs text-slate-400 mb-6 font-mono">
          {currentStep.detail}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden mb-3 border border-white/5">
          <div
            className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>{eventTitle}</span>
          <span className="text-sky-400 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
