// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortization: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);

  const [results, setResults] = useState<MortgageResults | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    if (principal <= 0) return;

    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numPayments;
      const totalPayment = monthlyPayment * numPayments;
      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest: totalPayment - principal,
        amortization: [],
      });
      return;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    let balance = principal;
    const amortization = [];

    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      amortization.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortization,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const principal = loanAmount - downPayment;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = results
    ? {
        labels: results.amortization
          .filter((_, i) => i % 12 === 0 || i === results.amortization.length - 1)
          .map((item) => `Year ${Math.ceil(item.month / 12)}`),
        datasets: [
          {
            label: 'Remaining Balance',
            data: results.amortization
              .filter((_, i) => i % 12 === 0 || i === results.amortization.length - 1)
              .map((item) => item.balance),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl">
              L
            </div>
            <div>
              <div className="font-semibold text-2xl tracking-tight">LoanPay Logic</div>
              <div className="text-xs text-blue-400 -mt-1">Smart Mortgage Solutions</div>
            </div>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors">Calculator</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Affordability</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Rates</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-4 backdrop-blur">
            <span className="text-emerald-400">●</span> Real-time • Accurate • Professional
          </div>
          <h1 className="text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
            Mortgage Calculator
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Make smarter home financing decisions with precise calculations and beautiful insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calculator Inputs */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-8">Loan Details</h2>

              <div className="space-y-8">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <label className="font-medium">Home Price</label>
                    <span className="font-mono text-blue-400">{formatCurrency(loanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="mt-3 w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <label className="font-medium">Down Payment</label>
                    <span className="font-mono text-emerald-400">{formatCurrency(downPayment)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={loanAmount}
                    step="1000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="mt-3 w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <label className="font-medium">Annual Interest Rate</label>
                    <span className="font-mono">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="12"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.01"
                    className="mt-3 w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <label className="font-medium">Loan Term</label>
                    <span className="font-mono">{loanTerm} years</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[15, 20, 25, 30].map((years) => (
                      <button
                        key={years}
                        onClick={() => setLoanTerm(years)}
                        className={`py-4 rounded-2xl text-sm font-medium transition-all ${
                          loanTerm === years
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-white/10 hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {years} yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl h-full flex flex-col">
              {results ? (
                <>
                  <div className="text-center mb-10">
                    <div className="text-sm uppercase tracking-widest text-slate-400 mb-2">Monthly Payment</div>
                    <div className="text-7xl font-bold tracking-tighter text-white">
                      {formatCurrency(results.monthlyPayment)}
                    </div>
                    <div className="text-slate-400 mt-1">per month</div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 rounded-2xl p-6 text-center">
                      <div className="text-xs text-slate-400 mb-1">TOTAL PAID</div>
                      <div className="font-semibold text-2xl">{formatCurrency(results.totalPayment)}</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 text-center">
                      <div className="text-xs text-slate-400 mb-1">TOTAL INTEREST</div>
                      <div className="font-semibold text-2xl text-orange-400">
                        {formatCurrency(results.totalInterest)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 text-center">
                      <div className="text-xs text-slate-400 mb-1">LOAN AMOUNT</div>
                      <div className="font-semibold text-2xl">{formatCurrency(principal)}</div>
                    </div>
                  </div>

                  {/* Balance Chart */}
                  {chartData && (
                    <div className="mb-10">
                      <div className="text-sm text-slate-400 mb-4 flex items-center justify-between">
                        <span>Balance Over Time</span>
                        <span className="text-xs">Yearly View</span>
                      </div>
                      <div className="h-64">
                        <Line
                          data={chartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                grid: { color: 'rgba(255,255,255,0.08)' },
                                ticks: { color: '#64748b', font: { size: 11 } },
                              },
                              x: {
                                grid: { color: 'rgba(255,255,255,0.08)' },
                                ticks: { color: '#64748b', font: { size: 11 } },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-medium transition-all active:scale-[0.985]"
                  >
                    {showSchedule ? 'Hide' : 'View'} Full Amortization Schedule
                  </button>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                  Adjust inputs to see results
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        {showSchedule && results && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-2xl font-semibold">Amortization Schedule</h3>
              <div className="text-sm text-slate-400">Total of {results.amortization.length} payments</div>
            </div>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full min-w-[700px]">
                <thead className="sticky top-0 bg-slate-950/80 backdrop-blur z-10">
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                    <th className="text-left p-5 font-normal">Payment #</th>
                    <th className="text-right p-5 font-normal">Payment</th>
                    <th className="text-right p-5 font-normal">Principal</th>
                    <th className="text-right p-5 font-normal">Interest</th>
                    <th className="text-right p-5 font-normal">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm font-mono">
                  {results.amortization.slice(0, 60).map((row) => (
                    <tr key={row.month} className="hover:bg-white/5 transition-colors">
                      <td className="p-5 text-slate-400">Month {row.month}</td>
                      <td className="p-5 text-right">{formatCurrency(row.payment)}</td>
                      <td className="p-5 text-right text-emerald-400">{formatCurrency(row.principal)}</td>
                      <td className="p-5 text-right text-orange-400">{formatCurrency(row.interest)}</td>
                      <td className="p-5 text-right">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.amortization.length > 60 && (
                <div className="p-8 text-center text-slate-400 text-sm">
                  Showing first 5 years. Download CSV for full schedule.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-8">
          © {new Date().getFullYear()} LoanPay Logic. Professional mortgage insights.
          <div className="mt-2">Built with precision • Deployed on Vercel</div>
        </div>
      </footer>
    </div>
  );
}
