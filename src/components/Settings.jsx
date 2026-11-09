import React from 'react';
import { Download, RefreshCw, FileText } from 'lucide-react';

export default function Settings({ transactions, assets, budgetLimit, goals, bills }) {
  const exportPDFStatement = () => {
    const reportWindow = window.open('', '_blank');
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    
    reportWindow.document.write(`
      <html>
        <head>
          <title>FundFlow NG Financial Statement</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; }
            h1 { color: #2563eb; margin-bottom: 5px; }
            .subtitle { color: #64748b; font-size: 14px; margin-bottom: 30px; }
            .summary { display: flex; gap: 20px; margin-bottom: 30px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px 25px; border-radius: 8px; flex: 1; }
            .card h3 { margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; }
            .card p { margin: 0; font-size: 22px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background: #f1f5f9; }
            .income { color: #16a34a; font-weight: bold; }
            .expense { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>FundFlow NG Financial Statement</h1>
          <div class="subtitle">Generated on ${new Date().toLocaleDateString()}</div>
          
          <div class="summary">
            <div class="card">
              <h3>Total Income</h3>
              <p class="income">₦${totalIncome.toLocaleString()}</p>
            </div>
            <div class="card">
              <h3>Total Expenses</h3>
              <p class="expense">₦${totalExpense.toLocaleString()}</p>
            </div>
            <div class="card">
              <h3>Net Balance</h3>
              <p>₦${(totalIncome - totalExpense).toLocaleString()}</p>
            </div>
          </div>

          <h2>Transaction History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map(t => `
                <tr>
                  <td>${t.date}</td>
                  <td>${t.title}</td>
                  <td>${t.category}</td>
                  <td>${t.type}</td>
                  <td class="${t.type === 'income' ? 'income' : 'expense'}">${t.type === 'income' ? '+' : '-'}₦${t.amount.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `);
    reportWindow.document.close();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-lg text-white">Reports & Statements</h3>
        <p className="text-sm text-slate-300">
          Generate and print a formal PDF financial statement of all your Naira transactions and cash flows.
        </p>
        <button 
          onClick={exportPDFStatement}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <FileText size={16} /> Generate PDF / Print Statement
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-lg text-white">Privacy & Data Management</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          FundFlow NG stores all your Naira transactions, goals, bills, and budgets securely in your browser.
        </p>
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ transactions, assets, budgetLimit, goals, bills }, null, 2));
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
  );
}
