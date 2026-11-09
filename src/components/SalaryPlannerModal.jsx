import React, { useState } from 'react';
import { Sparkles, Edit2, Check, RefreshCw } from 'lucide-react';

export default function SalaryPlannerModal({ isOpen, onClose, totalIncome }) {
  const [isEditing, setIsEditing] = useState(false);
  const [needs, setNeeds] = useState(totalIncome * 0.5);
  const [wants, setWants] = useState(totalIncome * 0.3);
  const [savings, setSavings] = useState(totalIncome * 0.2);

  if (!isOpen) return null;

  const handleReset = () => {
    setNeeds(totalIncome * 0.5);
    setWants(totalIncome * 0.3);
    setSavings(totalIncome * 0.2);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-400" /> Custom Salary Budget Planner
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <p className="text-xs text-slate-300">
          Review or click the edit button to customize the exact Naira allocation for your monthly income (₦{totalIncome.toLocaleString()}):
        </p>

        <div className="space-y-3 pt-2">
          {/* Needs */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Needs (Rent, Utilities, Food)</p>
              {isEditing ? (
                <input 
                  type="number" 
                  value={needs} 
                  onChange={e => setNeeds(Number(e.target.value))}
                  className="bg-slate-950 border border-blue-500 rounded-lg px-2 py-1 text-base font-bold text-blue-400 mt-1 w-40"
                />
              ) : (
                <p className="text-lg font-bold text-blue-400 mt-1">₦{needs.toLocaleString()}</p>
              )}
            </div>
            <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg font-semibold">
              {Math.round((needs / (totalIncome || 1)) * 100)}%
            </span>
          </div>

          {/* Wants */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Wants & Airtime / Data</p>
              {isEditing ? (
                <input 
                  type="number" 
                  value={wants} 
                  onChange={e => setWants(Number(e.target.value))}
                  className="bg-slate-950 border border-amber-500 rounded-lg px-2 py-1 text-base font-bold text-amber-400 mt-1 w-40"
                />
              ) : (
                <p className="text-lg font-bold text-amber-400 mt-1">₦{wants.toLocaleString()}</p>
              )}
            </div>
            <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg font-semibold">
              {Math.round((wants / (totalIncome || 1)) * 100)}%
            </span>
          </div>

          {/* Savings */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Savings & Investments</p>
              {isEditing ? (
                <input 
                  type="number" 
                  value={savings} 
                  onChange={e => setSavings(Number(e.target.value))}
                  className="bg-slate-950 border border-emerald-500 rounded-lg px-2 py-1 text-base font-bold text-emerald-400 mt-1 w-40"
                />
              ) : (
                <p className="text-lg font-bold text-emerald-400 mt-1">₦{savings.toLocaleString()}</p>
              )}
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg font-semibold">
              {Math.round((savings / (totalIncome || 1)) * 100)}%
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          {isEditing ? (
            <button 
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw size={12} /> Reset to Default (50/30/20)
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              {isEditing ? <Check size={14} /> : <Edit2 size={14} />} {isEditing ? 'Done Editing' : 'Customize Amounts'}
            </button>
            <button 
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
