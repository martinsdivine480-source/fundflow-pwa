import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Investments from './components/Investments';
import Settings from './components/Settings';
import TransactionModal from './components/TransactionModal';
import AssetModal from './components/AssetModal';
import { loadData, saveData } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [transactions, setTransactions] = useState(() => loadData('fundflow_transactions', [
    { id: 1, title: 'Salary Deposit', amount: 3500, type: 'income', category: 'Salary', date: '2026-11-01' },
    { id: 2, title: 'Grocery Store', amount: 120, type: 'expense', category: 'Food', date: '2026-11-05' },
    { id: 3, title: 'Apartment Rent', amount: 1200, type: 'expense', category: 'Housing', date: '2026-11-02' }
  ]));

  const [assets, setAssets] = useState(() => loadData('fundflow_assets', [
    { id: 1, name: 'S&P 500 Index ETF', symbol: 'VOO', shares: 15, valuePerShare: 450, type: 'Stock' },
    { id: 2, name: 'Bitcoin', symbol: 'BTC', shares: 0.15, valuePerShare: 68000, type: 'Crypto' }
  ]));

  const [budgetLimit, setBudgetLimit] = useState(() => loadData('fundflow_budget', 2000));

  const [showTxModal, setShowTxModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

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
          <span className="font-bold text-lg text-white">FundFlow</span>
        </div>
        <div className="hidden md:block">
          <h2 className="text-xl font-bold capitalize text-white">
            {activeTab === 'dashboard' ? 'Financial Overview' : activeTab}
          </h2>
        </div>
        <div className="flex items-center gap-3">
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
