import React, { useState } from 'react';
import { TrendingUp, PlusCircle, Trash2, ArrowUpRight } from 'lucide-react';

export default function Investments({ assets, onOpenModal, onDeleteAsset }) {
  const totalPortfolioValue = assets.reduce((acc, curr) => acc + (Number(curr.shares) * Number(curr.purchasePrice)), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-700/50 p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-emerald-400" /> Investment Portfolio
          </h2>
          <p className="text-emerald-200 text-sm mt-1">Track your Nigerian stocks, treasury bills, crypto, and real estate in Naira (₦).</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-emerald-300 font-medium">Total Portfolio Value</p>
          <p className="text-2xl font-black text-emerald-400">₦{totalPortfolioValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Your Assets</h3>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-xl transition shadow-md hover:shadow-emerald-600/20"
        >
          <PlusCircle size={18} /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <TrendingUp className="mx-auto text-slate-600 mb-3" size={40} />
            <p className="text-slate-400 font-medium">No investments added yet.</p>
            <p className="text-slate-500 text-sm mt-1">Click "Add Asset" to start tracking your wealth in Naira.</p>
          </div>
        ) : (
          assets.map((asset, index) => {
            const currentValue = Number(asset.shares) * Number(asset.purchasePrice);
            return (
              <div key={index} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        {asset.type}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2">{asset.name}</h4>
                      <p className="text-slate-400 text-xs font-mono mt-0.5">{asset.ticker}</p>
                    </div>
                    <button
                      onClick={() => onDeleteAsset(index)}
                      className="text-slate-500 hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-rose-500/10"
                      title="Delete asset"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/80">
                    <div>
                      <p className="text-xs text-slate-400">Holdings</p>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5">
                        {asset.shares} units @ ₦{Number(asset.purchasePrice).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Total Value</p>
                      <p className="text-base font-black text-emerald-400 mt-0.5">
                        ₦{currentValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
