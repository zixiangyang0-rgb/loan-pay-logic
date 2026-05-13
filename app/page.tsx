import os

# Define the HTML content for the polished Next.js/Tailwind-style Mortgage Calculator
html_content = """
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LoanPayLogic - Smart Mortgage Calculator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 18px; width: 18px;
            border-radius: 50%;
            background: #6366f1;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">

    <nav class="max-w-7xl mx-auto w-full px-6 py-8 flex justify-between items-center">
        <div class="text-2xl font-bold tracking-tighter text-slate-900">
            LoanPay<span class="text-indigo-600">Logic</span>
        </div>
        <div class="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" class="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#" class="hover:text-indigo-600 transition-colors">Rates</a>
            <a href="#" class="hover:text-indigo-600 transition-colors">Resources</a>
        </div>
    </nav>

    <main class="flex-grow flex items-center justify-center px-4 pb-20">
        <div class="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] shadow-2xl bg-white border border-slate-100">
            
            <div class="lg:col-span-7 p-8 md:p-12">
                <header class="mb-10">
                    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">Smart Mortgage Calculator</h1>
                    <p class="text-slate-500">精准估算您的每月还款额，探索最佳贷款方案。</p>
                </header>

                <div class="space-y-8">
                    <div class="group">
                        <div class="flex justify-between items-end mb-3">
                            <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Home Price</label>
                            <span class="text-xl font-bold text-indigo-600" id="priceDisplay">$500,000</span>
                        </div>
                        <div class="relative mb-4">
                            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                <i class="fas fa-home"></i>
                            </span>
                            <input type="number" id="priceInput" value="500000" 
                                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-slate-700 transition-all">
                        </div>
                        <input type="range" id="priceSlider" min="50000" max="2000000" step="10000" value="500000" 
                            class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <div class="group">
                        <div class="flex justify-between items-end mb-3">
                            <label class="text-xs font-bold uppercase tracking-widest text-slate-400">Down Payment</label>
                            <span class="text-xl font-bold text-indigo-600" id="downDisplay">$100,000 (20%)</span>
                        </div>
                        <div class="relative mb-4">
                            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                <i class="fas fa-wallet"></i>
                            </span>
                            <input type="number" id="downInput" value="100000" 
                                class="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-slate-700 transition-all">
                        </div>
                        <input type="range" id="downSlider" min="0" max="1000000" step="5000" value="100000" 
                            class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label class="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">Loan Term</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fas fa-calendar-alt"></i>
                                </span>
                                <select id="termInput" class="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-slate-700 appearance-none">
                                    <option value="30">30 Years</option>
                                    <option value="20">20 Years</option>
                                    <option value="15">15 Years</option>
                                    <option value="10">10 Years</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">Interest Rate (%)</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                    <i class="fas fa-percentage"></i>
                                </span>
                                <input type="number" id="rateInput" value="6.5" step="0.1"
                                    class="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-slate-700">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-5 bg-slate-900 p-8 md:p-12 flex flex-col justify-between text-white">
                <div>
                    <div class="mb-12">
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Estimated Monthly Payment</p>
                        <div class="flex items-baseline gap-2">
                            <span class="text-6xl font-extrabold text-cyan-400" id="monthlyResult">$2,528</span>
                            <span class="text-slate-500 font-medium">/mo</span>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="flex justify-between items-center border-b border-slate-800 pb-4">
                            <span class="text-slate-400 text-sm">Total Principal</span>
                            <span class="text-xl font-bold" id="totalPrincipal">$400,000</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-slate-800 pb-4">
                            <span class="text-slate-400 text-sm">Total Interest</span>
                            <span class="text-xl font-bold text-indigo-400" id="totalInterest">$510,192</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-slate-800 pb-4">
                            <span class="text-slate-400 text-sm">Total Pay-off</span>
                            <span class="text-xl font-bold" id="totalPayoff">$910,192</span>
                        </div>
                    </div>
                </div>

                <div class="mt-12">
                    <button class="w-full py-5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-400/20 uppercase tracking-widest text-sm">
                        Get Pre-Approved
                    </button>
                    <p class="text-center text-slate-500 text-[10px] mt-6 leading-relaxed">
                        * 此计算仅供参考。实际利率和还款额可能因信用评分及银行政策而异。
                    </p>
                </div>
            </div>
        </div>
    </main>

    <script>
        const elements = {
            priceInput: document.getElementById('priceInput'),
            priceSlider: document.getElementById('priceSlider'),
            priceDisplay: document.getElementById('priceDisplay'),
            downInput: document.getElementById('downInput'),
            downSlider: document.getElementById('downSlider'),
            downDisplay: document.getElementById('downDisplay'),
            termInput: document.getElementById('termInput'),
            rateInput: document.getElementById('rateInput'),
            monthlyResult: document.getElementById('monthlyResult'),
            totalPrincipal: document.getElementById('totalPrincipal'),
            totalInterest: document.getElementById('totalInterest'),
            totalPayoff: document.getElementById('totalPayoff')
        };

        function formatCurrency(num) {
            return '$' + Math.round(num).toLocaleString();
        }

        function calculate() {
            const P = elements.priceInput.value - elements.downInput.value;
            const r = (elements.rateInput.value / 100) / 12;
            const n = elements.termInput.value * 12;

            if (P <= 0 || r <= 0 || n <= 0) return;

            const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayoff = monthly * n;
            const totalInterest = totalPayoff - P;

            elements.monthlyResult.innerText = formatCurrency(monthly);
            elements.totalPrincipal.innerText = formatCurrency(P);
            elements.totalInterest.innerText = formatCurrency(totalInterest);
            elements.totalPayoff.innerText = formatCurrency(totalPayoff);
            
            elements.priceDisplay.innerText = formatCurrency(elements.priceInput.value);
            const downPercent = Math.round((elements.downInput.value / elements.priceInput.value) * 100);
            elements.downDisplay.innerText = `${formatCurrency(elements.downInput.value)} (${downPercent}%)`;
        }

        // Event Listeners for sync
        elements.priceSlider.oninput = (e) => { elements.priceInput.value = e.target.value; calculate(); };
        elements.priceInput.oninput = (e) => { elements.priceSlider.value = e.target.value; calculate(); };
        elements.downSlider.oninput = (e) => { elements.downInput.value = e.target.value; calculate(); };
        elements.downInput.oninput = (e) => { elements.downSlider.value = e.target.value; calculate(); };
        elements.termInput.onchange = calculate;
        elements.rateInput.oninput = calculate;

        calculate(); // Initial call
    </script>
</body>
</html>
"""

