import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function Investments({ assets, setAssets, totalInvestments, setShowAssetModal }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-white">Investment Portfolio</h3>
          <p className="text-xs text-slate-400">Total Portfolio Value: <span className="text-blue-400 font-bold">${totalInvestments.toLocaleString()}</span></p>
        </div>
        <button 
          onClick={() => setShowAssetModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <PlusCircle size={16} /> Add Asset
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {assets.map(asset => {
          const currentVal = asset.shares * asset.valuePerShare;
          return (
            <div key={asset.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded font-medium">{asset.type}</span>
                    <h4 className="font-bold text-lg text-white mt-1">{asset.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">{asset.symbol}</p>
                  </div>
                  <button onClick={() => setAssets(assets.filter(a => a.id !== asset.id))} className="text-slate-500 hover:text-rose-400 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400">Holdings</p>
                  <p className="text-sm font-semibold text-slate-200">{asset.shares} shares @ ${asset.valuePerShare}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Value</p>
                  <p className="text-lg font-bold text-blue-400">${currentVal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {assets.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No assets added yet.</p>}
    </div>
  );
}
