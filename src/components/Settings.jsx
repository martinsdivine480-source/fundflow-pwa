import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

export default function Settings({ transactions, assets, budgetLimit }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-lg text-white">Privacy & Data Management</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          FundFlow NG stores all your Naira transactions, airtime logs, and budgets locally and securely in your browser. No servers or third parties ever access your financial data.
        </p>
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ transactions, assets, budgetLimit }, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `fundflow_ng_backup_${new Date().toISOString().split('T')[0]}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2"
          >
            <Download size={16} /> Export Backup (JSON)
          </button>
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all data?")) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2"
          >
            <RefreshCw size={16} /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}
