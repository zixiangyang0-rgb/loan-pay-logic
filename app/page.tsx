"use client";

import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Calendar, ArrowRight } from "lucide-react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(500000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyInterestRatio = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0) {
      setMonthlyPayment(0);
      return;
    }

    // Mortgage formula: M = P[r(1+r)^n/((1+r)^n-1)]
    const top = Math.pow(1 + monthlyInterestRatio, numberOfPayments);
    const bottom = top - 1;
    const sp = top / bottom;
    const monthly = principal * monthlyInterestRatio * sp;

    setMonthlyPayment(monthly);
    setTotalPayment(monthly * numberOfPayments);
    setTotalInterest(monthly * numberOfPayments - principal);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const downPaymentPercent = Math.round((downPayment / homePrice) * 100) || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            LoanPay<span className="text-blue-600">Logic</span>
          </span>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-sm font-medium text-slate-600">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Products</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Rates</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Resources</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Smart Mortgage Calculator
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Estimate your monthly payments, view amortization details, and explore your financing options with precision.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          
          {/* Input Section */}
          <div className="p-8 md:p-12 lg:w-3/5 bg-white">
            <h2 className="text-2xl font-bold mb-8">Loan Details</h2>
            
            <div className="space-y-8">
              {/* Home Price Input */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Home Price</span>
                  <span className="text-blue-600">{formatCurrency(homePrice)}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-medium"
                  />
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="5000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Down Payment Input */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Down Payment</span>
                  <span className="text-blue-600">{formatCurrency(downPayment)} ({downPaymentPercent}%)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-medium"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={homePrice}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loan Term Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-medium appearance-none"
                    >
                      <option value={15}>15 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={30}>30 Years</option>
                    </select>
                  </div>
                </div>

                {/* Interest Rate Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Percent className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-lg font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8 md:p-12 lg:w-2/5 bg-slate-900 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Estimated Monthly Payment</h3>
              <div className="text-5xl font-extrabold text-white mb-8 tracking-tight">
                {formatCurrency(monthlyPayment)}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400">Principal Amount</span>
                  <span className="font-semibold text-lg">{formatCurrency(homePrice - downPayment)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400">Total Interest</span>
                  <span className="font-semibold text-lg">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-slate-400">Total Cost of Loan</span>
                  <span className="font-semibold text-lg">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Principal</span>
                  <span>Interest</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${((homePrice - downPayment) / totalPayment) * 100}%` }}
                  ></div>
                  <div 
                    className="bg-indigo-400 h-full" 
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h4 className="font-semibold text-white mb-2">Ready to take the next step?</h4>
              <p className="text-slate-400 text-sm mb-4">Connect with our top-tier lending partners to secure the best rates for your profile.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group">
                Get Pre-Approved Offers
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
