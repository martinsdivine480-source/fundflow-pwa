import React, { useState } from 'react';
import { X, Wallet, TrendingUp, Sparkles, ShieldCheck, Edit3 } from 'lucide-react';

export default function UserGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-slate-950 z-10">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Sparkles className="text-blue-400" size={20} /> Welcome to FundFlow NG Guide
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 bg-slate-900 rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg shrink-0 mt-0.5">
              <Wallet size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-white">1. Track Income & Airtime/Expenses</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tap <span className="text-blue-400 font-bold">Add Transaction</span> to log your monthly salary, daily food, MTN/Glo airtime, and utility bills in Naira (₦).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-white">2. Plan Your Salary (50/30/20 Rule)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tap <span className="text-emerald-400 font-bold">Salary Planner</span> in the top header to automatically split your income into Needs (50%), Wants & Airtime (30%), and Savings (20%).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="p-2 bg-purple-600/20 text-purple-400 rounded-lg shrink-0 mt-0.5">
              <TrendingUp size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-white">3. Monitor Investments & Net Worth</h4>
              <p className="text-xs text-slate-400 mt-1">
                Add Nigerian stocks (Zenith Bank, GTCO), Treasury Bills, or crypto to your portfolio. Your total net worth calculates cash + investments automatically.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="p-2 bg-amber-600/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
              <Edit3 size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-white">4. Control Your Monthly Budget</h4>
              <p className="text-xs text-slate-400 mt-1">
                Go to <span className="text-amber-400 font-bold">Expenses & Airtime</span> to edit your custom monthly budget limit and track spending progress bars.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-white">5. 100% Private & Offline</h4>
              <p className="text-xs text-slate-400 mt-1">
                All data stays securely on your device. You can export a JSON backup anytime from the Settings tab.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20"
          >
            Got It, Let's Start!
          </button>
        </div>
      </div>
    </div>
  );
}
