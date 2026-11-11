import React from 'react';
import { ArrowUpRight, ArrowDownRight, PieChart, Sparkles, Calendar } from 'lucide-react';

export default function Dashboard({ netWorth, cashBalance, totalInvestments, totalExpense, categoryTotals, transactions, assets, setActiveTab }) {
  const savingsRate = cashBalance > 0 ? Math.min(100, Math.round((cashBalance / (cashBalance + totalExpense || 1)) * 100)) : 0;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySpending = transactions
    .filter(t => t.type === 'expense' && t.date === todayStr)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return (
    <div className="space-y-6">
      {/* Net Worth Banner */}
      <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Total Net Worth</p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          ₦{Number(netWorth || 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
          <div>
            <p className="text-xs text-slate-400">Cash Balance</p>
            <p className="text-lg font-bold text-emerald-400">₦{Number(cashBalance || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Investments</p>
            <p className="text-lg font-bold text-blue-400">₦{Number(totalInvestments || 0).toLocaleString()}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-400">Monthly Spending</p>
            <p className="text-lg font-bold text-rose-400">₦{Number(totalExpense || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Daily & Weekly Burn Rate / Calculation */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Today's Daily Spending</p>
            <h4 className="text-2xl font-black text-rose-400 mt-1">₦{Number(todaySpending || 0).toLocaleString()}</h4>
            <p className="text-xs text-slate-500 mt-0.5">Tracked for {todayStr}</p>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <Calendar size={24} />
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold">Financial Health Score</p>
            <h4 className="text-2xl font-black text-emerald-400 mt-1">{savingsRate}/100</h4>
            <p className="text-xs text-slate-500 mt-0.5">Based on your monthly savings rate</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Wealth Bridge Insight */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <PieChart size={20} />
          </div>
          <h3 className="font-bold text-lg text-white">The Wealth Bridge Insight</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          You have spent <span className="text-rose-400 font-semibold">₦{Number(totalExpense || 0).toLocaleString()}</span> this month. Cutting just 10% (₦
          {Math.round(Number(totalExpense || 0) * 0.1).toLocaleString()}) and investing it into mutual funds adds approx. <span className="text-emerald-400 font-semibold">
          ₦{Math.round(Number(totalExpense || 0) * 0.1 * 12 * 10).toLocaleString()}</span> to your long-term net worth over 10 years at a 7% annual return.
        </p>
      </div>

      {/* Spending Breakdown */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
        <h3 className="font-bold text-lg text-white mb-4">Spending by Category</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {categoryTotals && Object.keys(categoryTotals).length > 0 ? (
            Object.entries(categoryTotals).map(([cat, amount]) => (
              <div key={cat} className="bg-slate-900 p-4 rounded-xl border border-slate-800/80">
                <p className="text-xs text-slate-400 font-medium">{cat}</p>
                <p className="text-xl font-bold text-white mt-1">₦{Number(amount || 0).toLocaleString()}</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {Math.round((Number(amount || 0) / (Number(totalExpense) || 1)) * 100)}% of total expenses
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No expense categories logged yet.</p>
          )}
        </div>
      </div>

      {/* Recent Transactions & Investments Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-white">Recent Transactions</h3>
            <button onClick={() => setActiveTab('expenses')} className="text-xs text-blue-400 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {transactions && transactions.length > 0 ? transactions.slice(0, 3).map(tx => (
              <div key={tx.id || Math.random()} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{tx.title || 'Transaction'}</p>
                    <p className="text-xs text-slate-400">{tx.category || 'General'} • {tx.date || ''}</p>
                  </div>
                </div>
                <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}₦{Number(tx.amount || 0).toLocaleString()}
                </span>
              </div>
            )) : <p className="text-xs text-slate-500">No transactions found.</p>}
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-white">Top Investments</h3>
            <button onClick={() => setActiveTab('investments')} className="text-xs text-blue-400 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {assets && assets.length > 0 ? assets.slice(0, 3).map(asset => {
              const sharesCount = Number(asset.shares || asset.units || 0);
              const priceVal = Number(asset.purchasePrice || asset.price || 0);
              const totalVal = sharesCount * priceVal;
              return (
                <div key={asset.id || Math.random()} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800/60">
                  <div>
                    <p className="font-semibold text-sm text-white">{asset.name || 'Asset'} ({asset.symbol || 'SYM'})</p>
                    <p className="text-xs text-slate-400">{sharesCount} units @ ₦{priceVal}</p>
                  </div>
                  <span className="font-bold text-sm text-blue-400">₦{totalVal.toLocaleString()}</span>
                </div>
              );
            }) : <p className="text-xs text-slate-500">No investments found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
