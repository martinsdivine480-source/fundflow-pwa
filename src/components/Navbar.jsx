import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 fixed inset-y-0 left-0 z-50 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-wide">FundFlow</h1>
            <p className="text-xs text-slate-400">Wealth & Expense Tracker</p>
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
            <Wallet size={20} /> Expenses & Budget
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-slate-950 border-t border-slate-800 flex justify-around p-3 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-500' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px]">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('expenses')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'expenses' ? 'text-blue-500' : 'text-slate-400'}`}
        >
          <Wallet size={20} />
          <span className="text-[10px]">Expenses</span>
        </button>
        <button 
          onClick={() => setActiveTab('investments')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'investments' ? 'text-blue-500' : 'text-slate-400'}`}
        >
          <TrendingUp size={20} />
          <span className="text-[10px]">Investments</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-blue-500' : 'text-slate-400'}`}
        >
          <SettingsIcon size={20} />
          <span className="text-[10px]">Settings</span>
        </button>
      </nav>
    </>
  );
}
