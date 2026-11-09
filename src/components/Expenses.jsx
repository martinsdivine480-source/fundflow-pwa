import React from 'react';
import { ArrowUpRight, ArrowDownRight, PlusCircle, Trash2, Search } from 'lucide-react';

export default function Expenses({ transactions, setTransactions, totalExpense, budgetLimit, setBudgetLimit, setShowTxModal }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('All');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-lg text-white">Monthly Budget Progress</h3>
          <p className="text-xs text-slate-400">Spent ${totalExpense} of ${budgetLimit} monthly limit</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="number" 
            value={budgetLimit} 
            onChange={(e) => setBudgetLimit(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white w-32" 
          />
          <button 
            onClick={() => setShowTxModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${totalExpense > budgetLimit ? 'bg-rose-500' : 'bg-blue-500'}`} 
          style={{ width: `${Math.min(100, (totalExpense / budgetLimit) * 100)}%` }}
        ></div>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-lg text-white">Transaction History</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3 top-3 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {filteredTransactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{tx.title}</p>
                  <p className="text-xs text-slate-400">{tx.category} • {tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </span>
                <button onClick={() => setTransactions(transactions.filter(t => t.id !== tx.id))} className="text-slate-500 hover:text-rose-400 transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredTransactions.length === 0 && <p className="text-sm text-slate-500 text-center py-6">No transactions found.</p>}
        </div>
      </div>
    </div>
  );
}
