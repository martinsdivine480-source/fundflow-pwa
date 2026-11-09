import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install FundFlow, tap your browser menu (...) and select 'Install app' or 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-500/30 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2.5 rounded-xl text-white">
          <Download size={22} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">Install FundFlow App</h4>
          <p className="text-xs text-slate-300">Install this app on your phone or PC for offline access and quick home screen launching.</p>
        </div>
      </div>
      <button 
        onClick={handleInstallClick}
        className="bg-white hover:bg-slate-100 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition whitespace-nowrap flex items-center gap-2"
      >
        <CheckCircle2 size={16} className="text-blue-600" /> Install App
      </button>
    </div>
  );
}
