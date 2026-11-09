import React, { useState } from 'react';
import { PlusCircle, Trash2, Target, Repeat, FileText, Smartphone } from 'lucide-react';

export default function GoalsAndBills({ goals, setGoals, bills, setBills }) {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  // Goal form
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  // Bill form
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billDueDate, setBillDueDate] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount) return;
    setGoals([...goals, { id: Date.now(), name: goalName, target: parseFloat(targetAmount), current: parseFloat(currentAmount) || 0 }]);
    setGoalName('');
    setTargetAmount('');
    setCurrentAmount('');
    setShowGoalModal(false);
  };

  const handleAddBill = (e) => {
    e.preventDefault();
    if (!billName || !billAmount) return;
    setBills([...bills, { id: Date.now(), name: billName, amount: parseFloat(billAmount), dueDate: billDueDate || 'End of month' }]);
    setBillName('');
    setBillAmount('');
    setBillDueDate('');
    setShowBillModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Savings Goals */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Target className="text-emerald-400" size={20} />
            <h3 className="font-bold text-lg text-white">Savings & Investment Goals</h3>
          </div>
          <button 
            onClick={() => setShowGoalModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <PlusCircle size={14} /> Add Goal
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {goals.map(goal => {
            const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={goal.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-white text-sm">{goal.name}</h4>
                  <button onClick={() => setGoals(goals.filter(g => g.id !== goal.id))} className="text-slate-500 hover:text-rose-400">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Saved: ₦{goal.current.toLocaleString()}</span>
                  <span>Target: ₦{goal.target.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-[10px] text-right text-emerald-400 font-semibold">{percent}% Completed</p>
              </div>
            );
          })}
          {goals.length === 0 && <p className="text-xs text-slate-500 col-span-2 py-4 text-center">No savings goals created yet.</p>}
        </div>
      </div>

      {/* Recurring Bills */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Repeat className="text-amber-400" size={20} />
            <h3 className="font-bold text-lg text-white">Recurring Bills & Subscriptions</h3>
          </div>
          <button 
            onClick={() => setShowBillModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <PlusCircle size={14} /> Add Bill
          </button>
        </div>
        <div className="space-y-3">
          {bills.map(bill => (
            <div key={bill.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Repeat size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{bill.name}</p>
                  <p className="text-xs text-slate-400">Due: {bill.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-amber-400">₦{bill.amount.toLocaleString()}</span>
                <button onClick={() => setBills(bills.filter(b => b.id !== bill.id))} className="text-slate-500 hover:text-rose-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {bills.length === 0 && <p className="text-xs text-slate-500 py-4 text-center">No recurring bills added.</p>}
        </div>
      </div>

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add Savings Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Goal Name</label>
                <input 
                  type="text" 
                  value={goalName} 
                  onChange={e => setGoalName(e.target.value)} 
                  placeholder="e.g. New Laptop, Emergency Fund" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Amount (₦)</label>
                <input 
                  type="number" 
                  value={targetAmount} 
                  onChange={e => setTargetAmount(e.target.value)} 
                  placeholder="500000" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Already Saved (₦)</label>
                <input 
                  type="number" 
                  value={currentAmount} 
                  onChange={e => setCurrentAmount(e.target.value)} 
                  placeholder="50000" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowGoalModal(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold">Save Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add Recurring Bill</h3>
            <form onSubmit={handleAddBill} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Bill Name</label>
                <input 
                  type="text" 
                  value={billName} 
                  onChange={e => setBillName(e.target.value)} 
                  placeholder="e.g. Netflix, DSTV, Electricity" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Amount (₦)</label>
                <input 
                  type="number" 
                  value={billAmount} 
                  onChange={e => setBillAmount(e.target.value)} 
                  placeholder="10000" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Due Date / Frequency</label>
                <input 
                  type="text" 
                  value={billDueDate} 
                  onChange={e => setBillDueDate(e.target.value)} 
                  placeholder="e.g. Every 28th" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowBillModal(false)} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold">Save Bill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
