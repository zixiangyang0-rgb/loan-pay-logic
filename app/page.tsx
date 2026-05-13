"use client";

import React, { useState, useEffect } from 'react';
import { Home, Wallet, Calendar, Percent, ArrowRight } from 'lucide-react';

export default function MortgageCalculator() {
  const [price, setPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const P = price - downPayment;
    const r = (rate / 100) / 12;
    const n = term * 12;
    if (P > 0 && r > 0) {
      const m = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthly(m);
    }
  }, [price, downPayment, term, rate]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">
        
        {/* 左侧：输入区域 */}
        <div className="lg:col-span-7 p-8 md:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">LoanPayLogic</h1>
          <p className="text-slate-500 mb-10">Smart Mortgage Calculator</p>

          <div className="space-y-8">
            {/* 房价输入 */}
            <div>
              <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Home Price</span>
                <span className="text-indigo-600 text-lg">{formatCurrency(price)}</span>
              </div>
              <div className="relative mb-4">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-700"
                />
              </div>
              <input type="range" min="50000" max="2000000" step="10000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            {/* 首付输入 */}
            <div>
              <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Down Payment</span>
                <span className="text-indigo-600 text-lg">{formatCurrency(downPayment)} ({Math.round((downPayment/price)*100)}%)</span>
              </div>
              <div className="relative mb-4">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="number" 
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-slate-700"
                />
              </div>
              <input type="range" min="0" max={price} step="5000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Loan Term</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl appearance-none font-semibold text-slate-700">
                    <option value={30}>30 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl font-semibold text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：结果展示区 */}
        <div className="lg:col-span-5 bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Monthly Payment</p>
            <div className="text-6xl font-black text-cyan-400 mb-12 italic">
              {formatCurrency(monthly)}
            </div>
            
            <div className="space-y-6 border-t border-slate-800 pt-8">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Interest</span>
                <span className="font-bold text-xl">{formatCurrency((monthly * term * 12) - (price - downPayment))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount</span>
                <span className="font-bold text-xl">{formatCurrency(monthly * term * 12)}</span>
              </div>
            </div>
          </div>

          <button className="w-full py-5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group">
            APPLY NOW <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
