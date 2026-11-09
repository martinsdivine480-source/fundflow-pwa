import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Delete } from 'lucide-react';

export default function PinLockScreen({ onUnlock }) {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState(false);

  const handlePress = (num) => {
    if (enteredPin.length < 4) {
      const newPin = enteredPin + num;
      setEnteredPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '1234' || localStorage.getItem('fundflow_user_pin') === newPin) {
          onUnlock();
        } else {
          setError(true);
          setTimeout(() => {
            setEnteredPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    setEnteredPin(enteredPin.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-3xl w-full max-w-sm shadow-2xl relative z-10 text-center space-y-6">
        <div>
          <div className="inline-flex p-3 bg-blue-600/20 text-blue-400 rounded-2xl mb-3">
            <Lock size={28} />
          </div>
          <h2 className="text-xl font-bold text-white">Enter Security PIN</h2>
          <p className="text-xs text-slate-400 mt-1">Default PIN is <span className="text-blue-400 font-bold">1234</span></p>
        </div>

        {/* PIN Dots */}
        <div className="flex justify-center gap-3 py-2">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${i < enteredPin.length ? (error ? 'bg-rose-500 scale-110' : 'bg-blue-500 scale-110') : 'bg-slate-800'}`}
            ></div>
          ))}
        </div>
        {error && <p className="text-xs text-rose-400 font-semibold">Incorrect PIN. Try 1234</p>}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((item, index) => {
            if (item === '') return <div key={index}></div>;
            if (item === 'del') {
              return (
                <button 
                  key={index} 
                  onClick={handleDelete}
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition"
                >
                  <Delete size={20} />
                </button>
              );
            }
            return (
              <button 
                key={index} 
                onClick={() => handlePress(item)}
                className="bg-slate-800/80 hover:bg-slate-700 text-white h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition active:scale-95"
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-400" /> Secure Local PIN Lock
        </div>
      </div>
    </div>
  );
}
