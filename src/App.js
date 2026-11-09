import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, Sparkles, Download, RefreshCw, Search, Trash2, ArrowUpRight, ArrowDownRight, PieChart, Wallet, Settings as SettingsIcon, LayoutDashboard, ShieldCheck } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Investments from './components/Investments';
import Settings from './components/Settings';
import TransactionModal from './components/TransactionModal';
import AssetModal from './components/AssetModal';
import UserGuideModal from './components/UserGuideModal';
import { loadData, saveData } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [transactions, setTransactions] = useState(() => loadData('fundflow_transactions', [
    { id: 1, title: 'Monthly Salary', amount: 250000, type: 'income', category: 'Salary', date: '2026-11-01' },
    { id: 2, title: 'MTN Airtime & Data', amount: 5000, type: 'expense', category: 'Airtime & Data', date: '2026-11-05' },
    { id: 3, title: 'House Rent', amount: 80000, type: 'expense', category: 'Housing', date: '2026-11-02' },
    { id: 4, title: 'Electricity (PHED)', amount: 15000, type: 'expense', category: 'Utilities', date: '2026-11-03' }
  ]));

  const [assets, setAssets] = useState(() => loadData('fundflow_assets', [
    { id: 1, name: 'Treasury Bills / FGN Bond', symbol: 'FGN', shares: 100000, valuePerShare: 1, type: 'Savings' },
    { id: 2, name: 'Nigerian Stocks (Zenith Bank)', symbol: 'ZENITHBANK', shares: 500, valuePerShare: 38, type: 'Stock' }
  ]));

  const [budgetLimit, setBudgetLimit] = useState(() => loadData('fundflow_budget', 150000));

  const [showTxModal, setShowTxModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showSalaryPlanner, setShowSalaryPlanner] = useState(false);

  useEffect(() => {
    saveData('fundflow_transactions', transactions);
  }, [transactions]);

  useEffect(() => {
    saveData('fundflow_assets', assets);
  }, [assets]);

  useEffect(() => {
    saveData('fundflow_budget', budgetLimit);
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 md:pb-0 md:pl-64">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
          <UserGuideModal />
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

      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            netWorth={netWorth}
            cashBalance={cashBalance}
            totalInvestments={totalInvestments}
            totalExpense={totalExpense}
            categoryTotals={categoryTotals}
            transactions={transactions}
            assets={assets}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'expenses' && (
          <Expenses 
            transactions={transactions}
            setTransactions={setTransactions}
            totalExpense={totalExpense}
            budgetLimit={budgetLimit}
            setBudgetLimit={setBudgetLimit}
            setShowTxModal={setShowTxModal}
          />
        )}
        {activeTab === 'investments' && (
          <Investments 
            assets={assets}
            setAssets={setAssets}
            totalInvestments={totalInvestments}
            setShowAssetModal={setShowAssetModal}
          />
        )}
        {activeTab === 'settings' && (
          <Settings 
            transactions={transactions}
            assets={assets}
            budgetLimit={budgetLimit}
          />
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
              <div className="bg-slate-900 p-4ronunded-xl border border-slate-800">
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

      <TransactionModal 
        isOpen={showTxModal}
        onClose={() => setShowTxModal(false)}
        onAdd={(newTx) => setTransactions([newTx, ...transactions])}
      />

      <AssetModal 
        isOpen={showAssetModal}
        onClose={() => setShowAssetModal(false)}
        onAdd={(newAsset) => setAssets([newAsset, ...assets])}
      />
    </div>
  );
}
