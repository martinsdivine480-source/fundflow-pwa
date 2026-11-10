import React, { useState } from 'react';

export default function AssetModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Stock');
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !units || !price) return;
    onAdd({
      id: Date.now(),
      name,
      type,
      shares: Number(units),
      purchasePrice: Number(price)
    });
    setName('');
    setUnits('');
    setPrice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Add New Asset</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Asset Name</label>
            <input
              type="text"
              placeholder="e.g. MTN Nigeria or Bitcoin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Asset Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Stock">Nigerian Stock / ETF</option>
              <option value="Crypto">Cryptocurrency</option>
              <option value="Treasury Bills">Treasury Bills / Bonds</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Units / Shares</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 100"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Purchase Price per Unit (₦)</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold transition shadow-lg shadow-emerald-500/20"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
