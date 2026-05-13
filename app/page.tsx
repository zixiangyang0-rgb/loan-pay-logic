"use client";

import React, { useState, useEffect } from 'react';

export default function MortgageCalculator() {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = (rate / 100) / 12;
    const numberOfPayments = term * 12;
    
    if (principal > 0 && monthlyRate > 0) {
      const m = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthly(m);
    } else if (principal > 0 && monthlyRate === 0) {
      setMonthly(principal / numberOfPayments);
    } else {
      setMonthly(0);
    }
  }, [price, downPayment, term, rate]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-12 font-sans selection:bg-indigo-100">
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">
        
        {/* 左侧输入区 (Left Panel) */}
        <div className="lg:col-span-7 p-8 md:p-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">L</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">LoanPayLogic</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Smart Calculator</h1>

          <div className="space-y-10">
            {/* 房价 Home Price */}
            <div className="group">
              <div className="flex justify-between mb-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Home Price</label>
                <span className="text-xl font-bold text-indigo-600 tracking-tight">{formatCurrency(price)}</span>
              </div>
              <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all border border-transparent focus:bg-white"
                />
              </div>
              <input type="range" min="50000" max="2000000" step="10000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* 首付 Down Payment */}
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Down Payment</label>
                <span className="text-xl font-bold text-indigo-600 tracking-tight">{formatCurrency(downPayment)} <span className="text-slate-300 text-sm ml-1">({Math.round((downPayment/price)*100)}%)</span></span>
              </div>
              <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                </div>
                <input 
                  type="number" 
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all border border-transparent focus:bg-white"
                />
              </div>
              <input type="range" min="0" max={price} step="5000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* 期限与利率 Term & Rate */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Term</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  </div>
                  <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full pl-12 pr-4 py-5 bg-slate-50 rounded-2xl appearance-none font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none border border-transparent cursor-pointer">
                    <option value={30}>30 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Rate (%)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</div>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-5 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700 transition-all border border-transparent" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧结果区 (Result Panel) */}
        <div className="lg:col-span-5 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* 背景装饰光晕 */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Estimated Monthly Payment</p>
            <div className="flex items-baseline gap-2 mb-12">
              <span className="text-6xl font-black text-cyan-400 tracking-tighter drop-shadow-2xl">
                {formatCurrency(monthly)}
              </span>
              <span className="text-slate-500 font-bold">/mo</span>
            </div>

            <div className="space-y-6 border-t border-white/5 pt-8">
              <div className="flex justify-between items-center group">
                <span className="text-slate-400 text-sm font-medium">Total Interest</span>
                <span className="text-xl font-bold tracking-tight text-slate-200">
                  {formatCurrency((monthly * term * 12) - (price - downPayment))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">Total Principle</span>
                <span className="text-xl font-bold tracking-tight text-slate-200">
                  {formatCurrency(price - downPayment)}
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <button className="w-full py-5 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-cyan-400/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group">
              Get Pre-Approved 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <p className="text-[9px] text-center text-slate-600 mt-6 leading-relaxed px-4">
              * This is an estimate based on current market data. Real rates may vary depending on credit score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
