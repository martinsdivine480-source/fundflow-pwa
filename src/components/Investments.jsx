import React, { useState } from 'react';
import { TrendingUp, PlusCircle, Trash2 } from 'lucide-react';

export default function Investments({ assets, setAssets, totalInvestments, setShowAssetModal }) {
  const handleDelete = (id) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-emerald-400" />
            Investment Portfolio
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track your Nigerian stocks, treasury bills, crypto, and real estate in Naira (₦).</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAssetModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Add Asset
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
        <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Portfolio Value</span>
        <div className="text-4xl font-extrabold text-white mt-1">₦{totalInvestments.toLocaleString()}</div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Your Assets</h3>
        {assets.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 border border-slate-800/80 rounded-2xl">
            <p className="text-slate-400">No assets added yet. Click 'Add Asset' to start tracking your investments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset) => {
              const qty = Number(asset.shares || asset.units || 0);
              const price = Number(asset.purchasePrice || asset.valuePerShare || asset.price || 0);
              const val = qty * price;
              return (
                <div key={asset.id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 mb-2">
                      {asset.type}
                    </span>
                    <h4 className="text-lg font-bold text-white">{asset.name}</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      {qty.toLocaleString()} units @ ₦{price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Value</span>
                      <span className="text-xl font-bold text-emerald-400">₦{val.toLocaleString()}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                      title="Delete asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
