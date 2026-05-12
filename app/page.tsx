"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Table, PieChart, Info } from 'lucide-react';

export default function MortgageCalculator() {
  // 表单状态
  const [loanAmount, setLoanAmount] = useState<number>(2000000); // 贷款总额 (元)
  const [loanTerm, setLoanTerm] = useState<number>(30); // 贷款期限 (年)
  const [interestRate, setInterestRate] = useState<number>(3.5); // 年利率 (%)
  const [repaymentType, setRepaymentType] = useState<'equalPayment' | 'equalPrincipal'>('equalPayment');

  // 计算结果状态
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = loanTerm * 12;

    if (repaymentType === 'equalPayment') {
      // 等额本息计算公式: [贷款本金×月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
      const power = Math.pow(1 + monthlyRate, months);
      const monthly = (loanAmount * monthlyRate * power) / (power - 1);
      setMonthlyPayment(monthly);
      setTotalRepayment(monthly * months);
      setTotalInterest(monthly * months - loanAmount);
    } else {
      // 等额本金：首月还款 = (贷款本金÷还款月数) + 贷款本金×月利率
      // 总利息 = [(总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)]÷2×还款月数-总贷款额
      const firstMonth = (loanAmount / months) + loanAmount * monthlyRate;
      const totalInt = ((loanAmount / months + loanAmount * monthlyRate) + (loanAmount / months) * (1 + monthlyRate)) / 2 * months - loanAmount;
      setMonthlyPayment(firstMonth); // 这里展示首月还款
      setTotalInterest((loanAmount * months * monthlyRate + loanAmount * monthlyRate) / 2);
      setTotalRepayment(loanAmount + (loanAmount * months * monthlyRate + loanAmount * monthlyRate) / 2);
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, loanTerm, interestRate, repaymentType]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center items-center gap-2">
            <Calculator className="text-blue-600" /> LoanPayLogic
          </h1>
          <p className="mt-2 text-gray-600">专业的房贷还款规划与计算工具</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-2">参数设置</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">贷款金额 (元)</label>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">贷款期限 (年)</label>
                <select 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[5, 10, 15, 20, 25, 30].map(year => (
                    <option key={year} value={year}>{year} 年 ({year * 12} 期)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年利率 (%)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">还款方式</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setRepaymentType('equalPayment')}
                    className={`p-2 text-sm rounded-lg border transition-all ${repaymentType === 'equalPayment' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    等额本息
                  </button>
                  <button 
                    onClick={() => setRepaymentType('equalPrincipal')}
                    className={`p-2 text-sm rounded-lg border transition-all ${repaymentType === 'equalPrincipal' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
                  >
                    等额本金
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-blue-600 p-8 rounded-2xl shadow-lg text-white flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-medium opacity-90 mb-2">
                {repaymentType === 'equalPayment' ? '每月还款' : '首月还款'}
              </h2>
              <div className="text-5xl font-bold mb-8">
                ¥{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-blue-400 pb-2">
                  <span className="opacity-80">支付利息</span>
                  <span className="text-xl font-semibold">¥{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-400 pb-2">
                  <span className="opacity-80">还款总额</span>
                  <span className="text-xl font-semibold">¥{totalRepayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-700 p-4 rounded-xl flex items-start gap-3">
              <Info size={20} className="shrink-0 mt-1" />
              <p className="text-sm opacity-90">
                {repaymentType === 'equalPayment' 
                  ? "等额本息：每月还款额固定。前期利息占比较大，后期本金占比较大。" 
                  : "等额本金：每月还款本金固定，利息递减。前期还款压力较大，但总利息更省。"}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-xs mt-10">
          * 计算结果仅供参考，实际还款额以银行合同为准。域名 loanpaylogic.com 归属所有。
        </p>
      </div>
    </div>
  );
}
