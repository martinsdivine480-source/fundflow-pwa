import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, Sparkles, Download, RefreshCw, Search, Trash2, ArrowUpRight, ArrowDownRight, PieChart, Wallet, Settings as SettingsIcon, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fundflow_transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Monthly Salary', amount: 250000, type: 'income', category: 'Salary', date: '2026-11-01' },
      { id: 2, title: 'MTN Airtime & Data', amount: 5000, type: 'expense', category: 'Airtime & Data', date: '2026-11-05' },
      { id: 3, title: 'House Rent', amount: 80000, type: 'expense', category: 'Housing', date: '2026-11-02' },
      { id: 4, title: 'Electricity (PHED)', amount: 15000, type: 'expense', category: 'Utilities', date: '2026-11-03' }
    ];
  });

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('fundflow_assets');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Treasury Bills / FGN Bond', symbol: 'FGN', shares: 100000, valuePerShare: 1, type: 'Savings' },
      { id: 2, name: 'Nigerian Stocks (Zenith Bank)', symbol: 'ZENITHBANK', shares: 500, valuePerShare: 38, type: 'Stock' }
    ];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const saved = localStorage.getItem('fundflow_budget');
    return saved ? JSON.parse(saved) : 150000;
  });

  const [showTxModal, setShowTxModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showSalaryPlanner, setShowSalaryPlanner] = useState(false);

  // New Transaction form
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('Airtime & Data');

  // New Asset form
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [assetShares, setAssetShares] = useState('');
  const [assetPrice, setAssetPrice] = useState('');
  const [assetType, setAssetType] = useState('Savings');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('fundflow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fundflow_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('fundflow_budget', JSON.stringify(budgetLimit));
  }, [budgetLimit]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
  const cashBalance = totalIncome - totalExpense;
  const totalInvestments = assets.reduce((acc, a) => acc + (Number(a.shares) * Number(a.valuePerShare)), 0);
  const netWorth = cashBalance + totalInvestments;

  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!txTitle || !txAmount) return;
    const newTx = {
      id: Date.now(),
      title: txTitle,
      amount: parseFloat(txAmount),
      type: txType,
      category: txCategory,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([newTx, ...transactions]);
    setTxTitle('');
    setTxAmount('');
    setShowTxModal(false);
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!assetName || !assetShares || !assetPrice) return;
    const newAsset = {
      id: Date.now(),
      name: assetName,
      symbol: assetSymbol || 'ASSET',
      shares: parseFloat(assetShares),
      valuePerShare: parseFloat(assetPrice),
      type: assetType
    };
    setAssets([newAsset, ...assets]);
    setAssetName('');
    setAssetSymbol('');
    setAssetShares('');
    setAssetPrice('');
    setShowAssetModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 fixed inset-y-0 left-0 z-50 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-wide">FundFlow NG</h1>
            <p className="text-xs text-slate-400">Naira Wealth & Budget</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'expenses' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <Wallet size={20} /> Expenses & Airtime
          </button>
          <button 
            onClick={() => setActiveTab('investments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'investments' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <TrendingUp size={20} /> Investments
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <SettingsIcon size={20} /> Settings & Privacy
          </button>
        </nav>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <ShieldCheck size={16} /> Privacy-First PWA
          </div>
          All financial data is stored securely in your browser.
        </div>
      </aside>

      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 md:hidden">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <TrendingUp size={20} />
          </div>
          <span className="font-bold text-lg text-white">FundFlow NG</span>
        </div>
        <div className="hidden md:block">
          <h2 className="text-xl font-bold capitalize text-white">
            {activeTab === 'dashboard' ? 'Financial Overview (₦)' : activeTab}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSalaryPlanner(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition"
          >
            <Sparkles size={16} /> Salary Planner
          </button>
          <button 
            onClick={() => setShowTxModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition"
          >
            <PlusCircle size={18} /> Add Transaction
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Net Worth Banner */}
            <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Total Net Worth</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                ₦{netWorth.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div>
                  <p className="text-xs text-slate-400">Cash Balance</p>
                  <p className="text-lg font-bold text-emerald-400">₦{cashBalance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Investments</p>
                  <p className="text-lg font-bold text-blue-400">₦{totalInvestments.toLocaleString()}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-xs text-slate-400">Monthly Spending</p>
                  <p className="text-lg font-bold text-rose-400">₦{totalExpense.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-white mb-4">Spending Breakdown (Airtime, Data, Bills, etc.)</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {Object.keys(categoryTotals).length > 0 ? (
                  Object.entries(categoryTotals).map(([cat, amount]) => (
                    <div key={cat} className="bg-slate-900 p-4 rounded-xl border border-slate-800/80">
                      <p className="text-xs text-slate-400 font-medium">{cat}</p>
                      <p className="text-xl font-bold text-white mt-1">₦{amount.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {Math.round((amount / (totalExpense || 1)) * 100)}% of total expenses
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No expense categories logged yet.</p>
                )}
              </div>
            </div>

            {/* Recent Transactions & Investments */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-white">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('expenses')} className="text-xs text-blue-400 hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map(tx => (
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
                      <span className={`font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.type === 'income' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-white">Investments & Assets</h3>
                  <button onClick={() => setActiveTab('investments')} className="text-xs text-blue-400 hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {assets.slice(0, 3).map(asset => {
                    const totalVal = asset.shares * asset.valuePerShare;
                    return (
                      <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800/60">
                        <div>
                          <p className="font-semibold text-sm text-white">{asset.name} ({asset.symbol})</p>
                          <p className="text-xs text-slate-400">{asset.shares} units @ ₦{asset.valuePerShare}</p>
                        </div>
                        <span className="font-bold text-sm text-blue-400">₦{totalVal.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-white">Monthly Budget & Airtime Control</h3>
                <p className="text-xs text-slate-400">Spent ₦{totalExpense.toLocaleString()} of ₦{budgetLimit.toLocaleString()} monthly budget</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input 
                  type="number" 
                  value={budgetLimit} 
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white w-36" 
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
                      placeholder="Search (e.g. MTN, Rent)..." 
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
                    <option value="Airtime & Data">Airtime & Data</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Salary">Salary</option>
                    <option value="Transport">Transport</option>
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
                        {tx.type === 'income' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                      </span>
                      <button onClick={() => setTransactions(transactions.filter(t => t.id !== tx.id))} className="text-slate-500 hover:text-rose-400 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">Investment Portfolio</h3>
                <p className="text-xs text-slate-400">Total Value: <span className="text-blue-400 font-bold">₦{totalInvestments.toLocaleString()}</span></p>
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
                        <p className="text-xs text-slate-400">Units / Shares</p>
                        <p className="text-sm font-semibold text-slate-200">{asset.shares} @ ₦{asset.valuePerShare}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total Value</p>
                        <p className="text-lg font-bold text-blue-400">₦{currentVal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-lg text-white">Privacy & Data Management</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                FundFlow NG stores all your Naira transactions, airtime logs, and budgets locally and securely in your browser.
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
        )}
      </main>

      {/* Salary Planner Modal */}
      {showSalaryPlanner && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Sparkles size={20} className="text-emerald-400" /> Salary Budget Planner (50/30/20 Rule)
              </h3>
              <button onClick={() => setShowSalaryPlanner(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300">
              Enter your monthly salary to automatically split it into Needs (50%), Wants/Airtime (30%), and Savings/Investments (20%):
            </p>
            <div className="space-y-3 pt-2">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Recommended Needs (Rent, Utilities, Food): <span className="text-white font-bold">50%</span></p>
                <p className="text-lg font-bold text-blue-400 mt-1">₦{(totalIncome * 0.5).toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Recommended Wants & Airtime/Data: <span className="text-white font-bold">30%</span></p>
                <p className="text-lg font-bold text-amber-400 mt-1">₦{(totalIncome * 0.3).toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Recommended Savings & Investments: <span className="text-white font-bold">20%</span></p>
                <p className="text-lg font-bold text-emerald-400 mt-1">₦{(totalIncome * 0.2).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowSalaryPlanner(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-sm font-semibold"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showTxModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add Naira Transaction</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setTxType('expense')}
                    className={`py-2 rounded-xl text-sm font-semibold border ${txType === 'expense' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'border-slate-800 text-slate-400'}`}
                  >
                    Expense
                  </button>
                  <button 
                    type="button"
                    onClick={() => setTxType('income')}
                    className={`py-2 rounded-xl text-sm font-semibold border ${txType === 'income' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-slate-800 text-slate-400'}`}
                  >
                    Income (Salary, etc.)
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={txTitle} 
                  onChange={e => setTxTitle(e.target.value)} 
                  placeholder="e.g. MTN Airtime, Glo Data, Food" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Amount (₦)</label>
                <input 
                  type="number" 
                  value={txAmount} 
                  onChange={e => setTxAmount(e.target.value)} 
                  placeholder="0.00" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Category</label>
                <select 
                  value={txCategory} 
                  onChange={e => setTxCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Airtime & Data">Airtime & Data</option>
                  <option value="Food">Food & Groceries</option>
                  <option value="Housing">Housing & Rent</option>
                  <option value="Utilities">Utilities (Electricity, Water)</option>
                  <option value="Transport">Transport (Fuel, Uber)</option>
                  <option value="Salary">Salary / Income</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowTxModal(false)}
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
      )}

      {/* Add Asset Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add Nigerian Investment Asset</h3>
            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Asset Name</label>
                <input 
                  type="text" 
                  value={assetName} 
                  onChange={e => setAssetName(e.target.value)} 
                  placeholder="e.g. Zenith Bank Stock, Treasury Bills" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Symbol / Ticker</label>
                  <input 
                    type="text" 
                    value={assetSymbol} 
                    onChange={e => setAssetSymbol(e.target.value)} 
                    placeholder="ZENITHBANK" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Type</label>
                  <select 
                    value={assetType} 
                    onChange={e => setAssetType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Savings">Savings / T-Bills</option>
                    <option value="Stock">Nigerian Stock (NGX)</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Units / Quantity</label>
                  <input 
                    type="number" 
                    step="any"
                    value={assetShares} 
                    onChange={e => setAssetShares(e.target.value)} 
                    placeholder="100" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Price per Unit (₦)</label>
                  <input 
                    type="number" 
                    step="any"
                    value={assetPrice} 
                    onChange={e => setAssetPrice(e.target.value)} 
                    placeholder="50.00" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm top-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAssetModal(false)}
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
      )}
    </div>
  );
}
