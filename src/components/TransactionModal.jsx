import React from 'react';

export default function TransactionModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('expense');
  const [category, setCategory] = React.useState('Airtime & Data');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAdd({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    });
    setTitle('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h3 className="font-bold text-lg text-white mb-4">Add Naira Transaction</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-xl text-sm font-semibold border ${type === 'expense' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'border-slate-800 text-slate-400'}`}
              >
                Expense
              </button>
              <button 
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-xl text-sm font-semibold border ${type === 'income' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-800 text-slate-400'}`}
              >
                Income (Salary)
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. MTN Airtime, Salary" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Amount (₦)</label>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="0.00" 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Airtime & Data">Airtime & Data</option>
              <option value="Food">Food & Groceries</option>
              <option value="Housing">Housing & Rent</option>
              <option value="Utilities">Utilities (Electricity)</option>
              <option value="Transport">Transport</option>
              <option value="Salary">Salary / Income</option>
              <option value="Other">Other</option>
            </select>
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
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
