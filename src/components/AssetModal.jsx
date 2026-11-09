import React from 'react';

export default function AssetModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [shares, setShares] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [type, setType] = React.useState('Stock');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !shares || !price) return;
    onAdd({
      id: Date.now(),
      name,
      symbol: symbol || 'ASSET',
      shares: parseFloat(shares),
      valuePerShare: parseFloat(price),
      type
    });
    setName('');
    setSymbol('');
    setShares('');
    setPrice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h3 className="font-bold text-lg text-white mb-4">Add Investment Asset</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Asset Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="e.g. S&P 500 ETF, Apple Stock, Bitcoin" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Symbol / Ticker</label>
              <input 
                type="text" 
                value={symbol} 
                onChange={e => setSymbol(e.target.value)} 
                placeholder="AAPL, BTC" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Stock">Stock</option>
                <option value="Crypto">Crypto</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Savings">Savings</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Number of Shares</label>
              <input 
                type="number" 
                step="any"
                value={shares} 
                onChange={e => setShares(e.target.value)} 
                placeholder="10" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Price per Share ($)</label>
              <input 
                type="number" 
                step="any"
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                placeholder="150.00" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-900"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20"
            >
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
