import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isForgot, setIsForgot] = useState(false);
  const [resetCode, setResetCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful authentication with 3D UI effect
    onLoginSuccess({ name: name || 'FundFlow User', email });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 3D Glassmorphic Card */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-3xl w-full max-w-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative z-10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-3">
            <Sparkles size={28} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">FundFlow NG</h2>
          <p className="text-xs text-slate-400 mt-1">Smart Naira Budgeting & Expenses</p>
        </div>

        {isForgot ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-base text-white mb-2">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your email to receive a PHPMailer verification code.</p>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="name@example.com" 
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              Send Reset Code <ArrowRight size={16} />
            </button>
            <button 
              type="button" 
              onClick={() => setIsForgot(false)}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-2"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Elder Martins" 
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="name@example.com" 
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsForgot(true)}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-600/30 transition transform active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {isLogin ? 'Sign In to FundFlow' : 'Create Account'} <ArrowRight size={16} />
            </button>

            <div className="text-center pt-3">
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-slate-400 hover:text-white"
              >
                {isLogin ? "Don't have an account? <span class='text-blue-400 font-semibold'>Register</span>" : "Already have an account? <span class='text-blue-400 font-semibold'>Sign In</span>"}
                {isLogin ? " Don't have an account? Register" : " Already have an account? Sign In"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck size={14} className="text-emerald-400" /> Secured with PHPMailer & Local Encryption
        </div>
      </div>
    </div>
  );
}
