import React, { useState, useMemo, useCallback, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import {
LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
ResponsiveContainer, ReferenceLine, Cell, Area, AreaChart, CartesianGrid
} from 'recharts';
import {
Activity, Layers, BarChart3, Bitcoin, Target, Settings2,
ChevronRight, Play, Circle, AlertCircle, Hexagon, ArrowUp, ArrowDown,
MessageSquare, Send, Sparkles, Download, Keyboard, Zap, Flame,
HelpCircle, DollarSign, TrendingUp, Percent,
CheckCircle, AlertTriangle, XCircle, ChevronDown
} from 'lucide-react';

// ============================================================
// LOGO ASSET (base64 inline, embedded from Gemini AI Studio output)
// ============================================================

// Inline base64 logo (Premium Executive Aesthetic wordmark)
const LOGO_DATA_URI = "data:image/webp;base64,UklGRqgSAABXRUJQVlA4IJwSAAAwWwCdASp/AVAAPj0ai0QiIaElp9Cc6LAHiWUAynZbXT9evDxGvyj32Pmdz3YvnoP9f5H1c/1/1CueD/3fQd5rPp58mbro6WVmGN79nP1n5UfutpJfzX8Ffp/y+1Av8p/qv+J/J38tM6/+tf578uP6l6dGsZ4L9gD+Xf0bj4qBH8//zPoQ/9P+s/KD3Q/TH/e/zXwGfy3+t/63+5fkF4OfR9/cxGpEIBkD2LuE5D4mF8rNhiVl+hpVQjUnb5GUSGEIU3LHUyxFQDhIYe5XGr8gVj2snEdPKAH6SOkjuTln/GJADBiTb/Vi0RoWMaFlMetsy7H5yrf5qkIhYpsznxqf+tUplv6hTNiVqMgRrxUOub3kTjOOALk2tkT2V4uCkxRUUxOIk8gl47/QdqoGmH4MMG/7t3Be2+GyKzCRUCR/spdoPod3b5iUeDnI/Advwgou67FpBTHB30ztyGq+1y17K9mRC6EvuR/SwOzhlI7X9LcnoLLOC1ita+dg71QBwVz6Q8O6CcrE++xI3oCm9RjhKUPLGPjCRpJeBrLCy5QB2Onh2cxrd7aCf/X5WrkYSqSbzhorGvZMKlyIy4fyB8WW8uQxxYsjFPCDqjQkwvdWmXvBgzsx8S7dw4HzFiBSE8TkQLwzUvlhKvULbUaPjV7gC0mIEfRgSawL1GfraHhs8atVmjAULs7PhaVMWnKeg9D/njLuxVllKHtrzrpLntskyjl3Zuz53DZ51Um4mlzK1JuC8PzFmJha/qs+zlx83tj3/IPH1TNy8BymZ3g2LUnKzcOuHZXwEbBRoQFo1KzvaucIrTxgyo0yZ448cADy/9GQifxxancWePhNxPe51qdLvQgaBNjws8Y4hWpB3+yVuJiPMou4wJHNtyMVrjKLPXvtkGM2+DQKW5YowrLOZyd1FvCFbeKmZ4v7fwdoTCTi6KtUNUxRHwic7iOAsUy3Ij0TPcuqwKs/20ty2z60IpXt2AAA/v0ra9LRpL8OHVB9nR3gzpiYEugeCrW1mL3/GlMCiEcMmCvT59L5mkbuN9WeIPCIB9AWYhFYnSYOVYp1mZjRrcYG/bAihXFnjVrciVZOkrBEXULlsLl1uSOrHxK+IQPfN85o/cBCcdxayv9zLLmzGxPPs3T5GrERZ4pn6XiVZyHLW07p3ewyZ2YXcqery0XjVNINNVGqv7cbvrxcEDcOtG2JWJfI7g6PKhbLAAEoACx3/iLgOtlQpdI1yEqmIo+03+RJRlrlFCiQmH6lNoFrcowKYkL+4MXa6WPBRiL7Woyp81O22/4TUpAbad1cp9UXsq+MdfUY6EZXqDveoXOCpECmnpxlILs/AenoRD2zOogZ3XkPKEuzHxb89fssUFu9EMPXmvdtSr+MwVc6B+9yx76cZZh66Vj06wYgUbKWprfa0S2fT0fmS9bcnJK24QqtNF3/x1BL+/kVxTQNPgwI5+/e8ij+C99esH0hvFvuelsdJj+7UvX5GLFUkNfSLPcp+CIU4vLvGgddvCVO1/9okVA0/B0U96Dd/HX0jirh8xQB2m3eOQTQxUJ9ybv4ZfhW+ho22s9MHuiM/OL3AtTfBngAZUhWx7l0YtTy/U46Sm4rRGU3Jml9k7hMNW7rt/AKpsyWvbIn/utRiX+Vtr25O7uKe92i+Vlt8DN0pgyJdRL6FOFnvBftu/RuMb0QXmZY+LO1g/EdS5dnuTjJ8xhe6RbwWz7lsw/Chf/FCEjgXNZxMGGSlMdGkjknqQGhnGhNKrGnCCkUvrrhT0/R4dhw1A0DMAvtxc/DouenJKI1hPU7HhiMjtn1d7ueoWpdJY3BORCQ/6hwq5ZTyM0h2p8AxXEfffvYFctOmvt4047RxjkwvCHiL7cQtXUaInaxgMgJhIVCTOhRr1PXPQYIrO5TahSIxEswltzZQw07LDNYY0xbQOsHhniG2aLvQa2qmvyDIa+VLTD8R86uZVuNci5XGwzMp8z3tpoaSWeqlFnDQh1Tha0fhVBmL7mlf57WblByBNJ/Igd6km2xaP/V3YBq832FZOMe3unLJbIImPRn5Nj49EGbKAwAEaGuPPhLKcRBKwBCLtzfRwCT5XDzAibf289wePAgbbrzbW8tmX7jZeemxSX99mZzSMBKkqWvLkaLDH8z1u9+CXERs/2u3zsI+1sL1v2E6q51y6LTix2WmcUjJ6LmxDC69QR83LAV7vphFZ/N+ZSLEVgW7Tg4cGA2R7meQSKJDRAwFWaW4OtrfBUvbZjgbpBypqE6Z61iqxF/NVq+FftvR1x8Lqs4u2EryOJA8fPSCF1INWp85Ugae7ms/qXkU5/K2ot+RcaJg1vUzmI2s+dBX0W9y2aDEaeHZxSdnSsgx1wTTjavZFeRcbwdCNvCuXnDB/PPB6mAPUMvzJl1c2kLub6GI5hDZ3BJnRDyyS/RJPcSQyNNokiuYr/ytDh+72jtb1q8tFg8GEvKZiQbIF/CsWQotzzERc1/ddhIfart+T9NsJY8oT3ghC59Oj6i+vs+zAtrPN/Hu/enip/UPuKv7HanSbase0vJNo2NVUrVu1pGtTXsWmTsRAFqCp4AxeYPaRNaBgxkHrVFJe9ZcN9so17YN+y1havimVEtEp2xDI+EvaC2ci82ssr4qZ1rnhjn2eCVvH6/LSR+3JvvQMXQDabwWvO83/mpnC+agLoqmLzyrkKj/m3zsafHK9722LCWbjqKKALIdK2vYMkAXcml0YADU2datRX4fEOkYV+KT/NwOZEyXd4yhUnEX+k/L4dGfePKVwBWWIiufRj2UxeCjCTOcHRma8EgVnPiAl2XgKLXxeLPYHhA/xWDDb8fsRIp1R7gFCVMA88SQpmIB8XT6kaXJe16+H1bvpH4k1hR5sAt8h43rKZ/+x2P+5L3cPUuSwQV67g6WSownit4pPeiseQS3QiO+rhO2ylfUjjdEAGHOe3PPLv8Wb1vhzi7fW7jkAQHKf2ts563j/vUfuvbrfAvbo3y0tXMamoj9xgQBBEJucSC0uwDDHo+VDGpM4LdPmno+LX87d0iABw6cLrnniO+uME8UYxhESL4SveESmDRhaZ+3VEZHd3kNumeuvSjd2EEHh31H36XgVY4KgcC1SrZ0XNXfCi8Zzv2S7O8xy+b+58C/RfCxbWUcotqftGhilRYkapQja+rvou20cge2IRtIEzrqmKo0I7QnXCMaatvtemEk77Tk1UBMbw6L54+i6+CXAzXQQ7xlnafPKNHZf2RyTk8i1/kSlHeKwrsZ/JyKYLR7iJ5ksJitBDSTNFrHRnYyP65Fu7gxzPvBItKuKg6T2nZ3fiyKHWaxrnUj0H5ifzxjb+em0U9HwajTtZiMSRqxKtlZtXhicqIFeaC5C4hMABAGbKPwieryKL/dRZIpVyooWabg7Op3tQfz89sdO5JEefcTNb5+YCd48f2ffn9f8NN85fM1Xs/tn53+5nuvHJLbtA7cDjg5pYxcippFrLlfDSY8ZHGtUloWNXzYY9XV8nEGJ5QPRRsqahYceqaKls8gS8MykY/9Llp2J2ziu/guTZ5ce4RNDGhW9zkFgl3cWJAa9HjF/7vcWN6avKKJBXBjRakgAqgTb8t4vqUuUQm+EiUttSvtu5zjkIkxhJ+CRJO4deRFgWzoAzq1EKuhCjXUk4I1f9XHXy4h/o3cvC6JFje/eyZieN1bDqzSlewPAXZqMCE5SGupiSNTS1pY/vmlUEjS3e1ph8EBBKDMfAPsrK8KJPlhXsg2+zYESNDJrBpbZVR10bTk5og50NR1LhjqCWfiwF6GRiWvNvlIhwzWeHim+I7eCnoxrJipbFTxBlN1+OJU0N1tVHzTIKnTdeu+osEpL2+JlbL48W1CjPJzzRk4GFVsfTtPjN/c7UYLbaquuyDJON89qnqvz2Rr5pUgUJUpHawz8kTBcq0uBxhJUKZdN8dNW9qfltPSWSwolgi+FeizyadpvUPAQhDNr5o2M2iEVKqtiRCY/mH1bllu8iWxjUvUgclaTV7H8ov166OiZwCP+pSEK1vhuF4SHHAcfC7KZ5+voQKUd+dygcMJYRwNQsapDsm5VaL67qqYdP4JqPHQJxigXeMrt6hAb6EN6RBvtmkI+E9hyMNKm/Rj7wJHdeZmlgMx6exZuTpATFcbhtRlh45riGZRklujfmWrPK/3HByErl5DukPX+5LqPVehB0EqFIbja/I6V6EUJFk2ekZaplVl4zVNJTXHUUjhtvC1hCUK822Xe2k6UDU3o7mU70BVodYgd1R2HOseK0JVvuIWOazFa0cjpEYljlM6SKy0g8hoHHYWOd87lrhi3pcx7/83+kcrnJtvCrVTbAC5ufp8fGxB6nZeUmTbQdnQjXOKb2GLoqSJf/plBhXCmr4o6gJD8JztdFqtHN/2eo9mUtLtpSVQ//Z3tSJ/Y1N8opvFl9/kV+bIk6mlm5OcIbsqYrU6gwBONfauk11CNp6a9/UJQkod7E2O7LeyiFtZCBMQ9F0KiFIMRBNwTdMJo8T5mxeO8UIIW9F3P2OeOZnNr073Dq8SiTNAfjqncXLhvoFEifI0qONI+fTMvC1Qa+MIQkLJkMmqZI/tEtuwJ20zvxMhOaYAKRHDMkPdSvr26Vr2Wb3sFHC5LmdCe+YjefCYtIgSdUqTGE+Tc7HTn/80jDh2BXqtQHTpu9RVtDixZzElPFbgYujZPFCMhWcFJlDfjsjHlXvv7/YCjGsBWUTKgBlSTF0ktxnpZU3TJx/V6Mec0uLLYTGo+JR+rMVcZfeQN8gvTsqj5O88RAsnqJgSbMsq04KyeGtnz0s4RFxeZ2DZGtulTkNPG+0mPPmIEKn5D4Ra0UspnFjAPbCMiyai7u0iXcfsLt9u1HYZEMi/HgXmgvEwKwr3ZJ0n7p5UCbbzPRoASfJNpdaNXs0YhEIQq0KEm4eAv2yytk6doNsarr8f2RgGLaHTvDRIihUsBAzC/agiDjntNNH37TXlorCd6czmiDlGrdAeQyWvolOJl5E+zX/hnv41h+Nf2HujmeXiedQVElqvH/wXNLCroF7y/mIb/tQz85fgdBnFrFRMoAYejP/60f6Bmxz8L4p7rNL8dprf1RFOrGofnk0wq90MzT832K+nl70ToEMZXTtlxR9d0B5VmvK4ZPqKvBV7IXfsUL8XcPHcP4v9X+syoPmgk9vNjZqgmogqSWcslCJ50JIv6OclmtQTDrU4wnGK2CiO6QPUuIG5jIcueMrrncELipy3OVCp/3xFQ3FE3uIvx4tm8auYXZWsfG0ZX72oOz8AhEovqiZElrln8xpYOIBPaQq90wsY/pPQAUaGua2yoNMYs/8KKLFL4sAEyJcYPrsnvNaGccmWQj0tWh7SV9fqt/6u081IMTKyXTudsAH1TRk70RnusTXjaLd9khZBKB2D0OSRdLZBEw2MAQiZGMEy9mCwMR8rYgj7qqzuDAdAAHpXJIo6C7ITPGxCnx+O/iosshqjG/d3tTxYgPYZelwF1OqEKIyP0jEeaYqNf3iA/fMvk82/IGF10ppNxT1WSd1T6Buv8njMeIayG9hZOMuYBT5YnhcPp3bGWldpw6LHaFVzLxULGYtrx1FmHqg8VK1TcVHA/8J4hwal5gE6CiuDSF9batLENo7dFONN+sHSMQOUuF5mPU6ox+OjPGDgA5XTriNEsmOAQt798qP4HNG2HSI936jyHObf6tQQeQOf3FoC4mOcT7mNK5C/6SG/opJOXpLxYOWMfGQAEF4O25I60CvW9GWr3tdfcQXh6S2hand0n+4ZoqB++FI7vCrRhsPrJfRZkziR6tj7GuQwxfg+3zpp6BI3/8NKJ/sO/lOqc2UDs7IhrugRG4uXbTaTNWx+SkFSgl4qv5uXBBj/hi8Xm4pWSEU7uI7FtSRxfAS1/i53xhwkjpIf1Lmv3vWulmiLKSILJL+ZrIo/PYg0emX9i5ZaLPoQPTovkvIQfKGWKiqKutDlF5nyiCLJGTpuvTk9yx/xLNv5Pwebekjsw+IOC3JFoxpL6t667tjIQS4KD2FOj8be1yQeLSEHNvCp0KkIUv0Vy968serK5vFtGF7ZyuVOFufk9P6Jk0MiTNB2MIPEm17/BfcCeItr4qxdzkV43FPzTHNuoLgPXfjCjeHeOAKpeuMv4jAQCN/pOyyKQ6tK8hoPVUgt6kcJ/x3bbzbWbwITTGAXJcGqi84/mCxqZQjMW9ZGlnYM7lZQYCwJlv5M9TYr87cNRbDBqjL+qm2tIvGXFKPN+3n9/mzCyZpf+yZCwHdghMQ10PBr6SgV/9Q6m4uOmLJZs4oRbsWeAeM1XQaFDAtbv9ykC1+2S1CSpUN9k1XZhVzsQuniR0pXyHUygGID+Yh1eoAAAA=";

// ============================================================
// SIM ENGINE
// ============================================================

// v9.2: realistic odds modeling. Real markets rarely pay parity; sportsbook lines like -200
// mean you only get back half your stake on a win. MARKET_DEFAULTS provides per-market priors.
const MARKET_DEFAULTS = {
  btc15:  { defaultOdds: 100, label: '+100 (parity)', priceModel: 'binary_parity' },
  spx1h:  { defaultOdds: 100, label: '+100 (parity)', priceModel: 'binary_parity' },
  mlb:    { defaultOdds: -200, label: '-200 (typical sportsbook)', priceModel: 'sportsbook' },
  custom: { defaultOdds: 100, label: '+100 (parity)', priceModel: 'binary_parity' },
};

// American odds → win payout multiplier per $1 staked. +100 = 1.0, -150 = 0.667, -200 = 0.5.
function payoutMultiplier(americanOdds) {
  if (!Number.isFinite(americanOdds) || americanOdds === 0) return 1;
  if (americanOdds > 0) return americanOdds / 100;
  return 100 / Math.abs(americanOdds);
}

function runSequence(p, b0, m, N_max, r) {
let profit = 0, betSize = b0, maxBet = b0;
for (let k = 1; k <= N_max; k++) {
if (Math.random() < p) {
profit += betSize * r;
return { profit, length: k, status: 'win', maxBet };
}
profit -= betSize;
if (k === N_max) return { profit, length: k, status: 'cap', maxBet };
betSize *= m;
maxBet = betSize;
}
}

function simulate({ p, b0, m, N_max, r, num }) {
let cum = 0, peak = 0, maxDD = 0, wins = 0, caps = 0;
const equity = new Array(num);
const lengths = new Array(num);
const maxBets = new Array(num);
const profits = new Float64Array(num);
const statuses = new Uint8Array(num); // 0 = win, 1 = cap
const recent = [];
for (let i = 0; i < num; i++) {
const s = runSequence(p, b0, m, N_max, r);
cum += s.profit;
if (cum > peak) peak = cum;
const dd = peak - cum;
if (dd > maxDD) maxDD = dd;
equity[i] = cum;
lengths[i] = s.length;
maxBets[i] = s.maxBet;
profits[i] = s.profit;
statuses[i] = s.status === 'win' ? 0 : 1;
s.status === 'win' ? wins++ : caps++;
if (i >= num - 30) recent.push({ id: i + 1, ...s });
}
const step = Math.max(1, Math.floor(num / 240));
const equitySampled = [];
for (let i = 0; i < num; i += step) {
equitySampled.push({ x: i + 1, y: Math.round(equity[i] * 100) / 100 });
}
if (equitySampled[equitySampled.length - 1].x !== num) {
equitySampled.push({ x: num, y: Math.round(equity[num - 1] * 100) / 100 });
}
const lengthDist = [];
for (let k = 1; k <= N_max; k++) {
let c = 0;
for (let i = 0; i < num; i++) if (lengths[i] === k) c++;
lengthDist.push({ step: `${k}`, count: c, isCap: k === N_max, pct: (c / num) * 100 });
}
const betDist = [];
for (let k = 0; k < N_max; k++) {
const tier = b0 * Math.pow(m, k);
let c = 0;
for (let i = 0; i < num; i++) if (Math.abs(maxBets[i] - tier) < 0.001) c++;
betDist.push({
tier: tier >= 1000 ? `$${(tier / 1000).toFixed(1)}k` : `$${tier % 1 === 0 ? tier : tier.toFixed(2)}`,
count: c,
isCap: k === N_max - 1
});
}
return {
equitySampled, lengthDist, betDist, recent: recent.reverse(),
finalProfit: cum, winRate: wins / num, capCount: caps, capRate: caps / num,
maxDrawdown: maxDD, peak,
avgLength: lengths.reduce((a, b) => a + b, 0) / num,
maxBetEver: Math.max(...maxBets),
avgPerSeq: cum / num,
profits, statuses, lengths
};
}

// ============================================================
// CONCURRENT EXPOSURE SIMULATOR
// Runs N parallel martingale chains and tracks max simultaneous capital at risk
// ============================================================
function simulateConcurrent(p, b0, m, N_max, numConcurrent = 5, ticks = 8000) {
const chains = Array.from({ length: numConcurrent }, () => ({ step: 0, bet: b0 }));
let maxExposure = 0;
let maxDeepCount = 0;
let worstMomentChains = null;
let worstTick = 0;

for (let t = 0; t < ticks; t++) {
let exp = 0, deep = 0;
for (let c of chains) {
exp += c.bet;
if (c.step >= Math.floor(N_max * 0.6)) deep++;
}
if (exp > maxExposure) {
maxExposure = exp;
worstMomentChains = chains.map(c => ({ step: c.step + 1, bet: c.bet }));
worstTick = t;
}
if (deep > maxDeepCount) maxDeepCount = deep;

for (let c of chains) {
  if (Math.random() < p) {
    c.step = 0;
    c.bet = b0;
  } else {
    c.step++;
    if (c.step >= N_max) {
      c.step = 0;
      c.bet = b0;
    } else {
      c.bet *= m;
    }
  }
}

}
const avgExposure = numConcurrent * b0 / (1 - (1 - p));
return {
maxExposure,
maxDeepCount,
worstMomentChains,
worstTick,
numConcurrent,
avgExposure: numConcurrent * b0 * 1.5
};
}

// ============================================================
// DAILY SUMMARY (build from per-sequence profits + period)
// ============================================================
function buildDailySummary(profits, statuses, period, seqTimestamps) {
if (!profits || !period) return [];
const n = profits.length;
const startMs = period.startDate.getTime();
const endMs = period.endDate.getTime();
const totalMs = endMs - startMs;
const useReal = seqTimestamps && seqTimestamps.length === n;
if (!useReal && totalMs <= 0) return [];
const dailyMap = new Map();

for (let i = 0; i < n; i++) {
const closeMs = useReal ? seqTimestamps[i] : (startMs + ((i + 1) / n) * totalMs);
const d = new Date(closeMs);
const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
if (!dailyMap.has(key)) {
dailyMap.set(key, {
date: key,
dateObj: new Date(d.getFullYear(), d.getMonth(), d.getDate()),
pnl: 0, count: 0, wins: 0, caps: 0
});
}
const day = dailyMap.get(key);
day.pnl += profits[i];
day.count++;
if (statuses[i] === 0) day.wins++;
else day.caps++;
}

return Array.from(dailyMap.values()).sort((a, b) => b.dateObj - a.dateObj);
}

// ============================================================
// INTERVAL SYNTHESIS
// Reconstructs interval-level W/L outcomes from sequence data
// Each sequence with length k and status=win produces (k-1) L's then a W
// Each sequence with length k and status=cap produces k L's
// ============================================================
function synthesizeIntervals(lengths, statuses, maxIntervals = null) {
if (!lengths || !statuses) return null;
const intervals = [];
const sequenceBoundaries = [];
const n = lengths.length;

for (let i = 0; i < n; i++) {
const len = lengths[i];
const isCap = statuses[i] === 1;
const seqStart = intervals.length;
for (let k = 0; k < len - 1; k++) intervals.push(0); // L
intervals.push(isCap ? 0 : 1); // last is W if win, L if cap
sequenceBoundaries.push({ start: seqStart, end: intervals.length - 1, cap: isCap });
if (maxIntervals && intervals.length >= maxIntervals) break;
}

// Longest losing streak
let longestLossStreak = 0;
let currentStreak = 0;
for (let i = 0; i < intervals.length; i++) {
if (intervals[i] === 0) {
currentStreak++;
if (currentStreak > longestLossStreak) longestLossStreak = currentStreak;
} else {
currentStreak = 0;
}
}

return { intervals, sequenceBoundaries, longestLossStreak, totalIntervals: intervals.length };
}

// ============================================================
// REAL-DATA OUTCOMES (v8): fetch from /api proxy, cache in localStorage
// ============================================================

const REAL_CACHE_PREFIX = 'marti_v8_';
const REAL_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

function realCacheKey(market, startISO, endISO, direction) {
// v9 Phase 5: include direction so the MLB cache auto-invalidates when bot direction changes
return `${REAL_CACHE_PREFIX}${market}_${direction || 'default'}_${startISO}_${endISO}`;
}

function readRealCache(key) {
try {
const raw = localStorage.getItem(key);
if (!raw) return null;
const obj = JSON.parse(raw);
if (!obj || !obj.savedAt) return null;
if (Date.now() - obj.savedAt > REAL_CACHE_TTL_MS) return null;
return obj.payload;
} catch { return null; }
}

function writeRealCache(key, payload) {
try {
localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), payload }));
} catch {}
}

function defaultRealRange() {
// Bucket "end" to a 6h boundary so consecutive runs within the same bucket share a cache key.
// Anchored to UTC midnight to keep buckets aligned across sessions.
const BUCKET_MS = 6 * 60 * 60 * 1000;
const nowMs = Date.now();
const endBucketMs = Math.floor(nowMs / BUCKET_MS) * BUCKET_MS;
const end = new Date(endBucketMs);
const start = new Date(endBucketMs - 180 * 24 * 3600 * 1000);
return { startISO: start.toISOString(), endISO: end.toISOString() };
}

async function fetchRealOutcomes(market, { force = false } = {}) {
const { startISO, endISO } = defaultRealRange();
// v9 Phase 5: derive direction from MARKETS config; bake into cache key + outcome polarity
const mkt = MARKETS.find(x => x.id === market);
const direction = mkt ? mkt.direction : null;
const key = realCacheKey(market, startISO, endISO, direction);
if (!force) {
const cached = readRealCache(key);
if (cached) return { ...cached, cached: true };
}
let url;
if (market === 'btc15') url = `/api/btc/candles?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}&granularity=900`;
else if (market === 'spx1h') url = `/api/spx/candles?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}&interval=1h`;
else if (market === 'mlb') url = `/api/mlb/events?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}`;
else throw new Error(`Real data not available for market: ${market}`);

const r = await fetch(url);
if (!r.ok) {
let detail = '';
try { detail = (await r.json()).message || ''; } catch {}
throw new Error(`Fetch ${market} failed: ${r.status} ${detail}`);
}
const data = await r.json();

let outcomes;
if (market === 'btc15' || market === 'spx1h') {
// direction === 'up' for both — bot wins when close > open
outcomes = (data.candles || [])
.filter(c => Number.isFinite(c.o) && Number.isFinite(c.c) && c.c !== c.o)
.map(c => ({ t: c.t * 1000, win: c.c > c.o ? 1 : 0 }));
} else if (market === 'mlb') {
// v9 Phase 5: bot bets the dominant 'no_score' direction → win when runs === 0
const noScoreIsWin = direction === 'no_score';
outcomes = (data.events || []).map(e => ({
  t: e.t * 1000,
  win: noScoreIsWin ? (e.runs === 0 ? 1 : 0) : (e.runs > 0 ? 1 : 0),
}));
} else {
outcomes = (data.events || []).map(e => ({ t: e.t * 1000, win: e.runs > 0 ? 1 : 0 }));
}

const payload = {
market,
start: data.start,
end: data.end,
outcomes,
fetchedAt: Date.now()
};
writeRealCache(key, payload);
return { ...payload, cached: false };
}

// Walk real outcomes building martingale sequences. Same shape as simulate() + seqTimestamps.
function buildSequencesFromOutcomes(outcomes, b0, m, N_max, r) {
const profitsArr = [];
const statusesArr = [];
const lengthsArr = [];
const maxBetsArr = [];
const seqTimestamps = [];
let i = 0;
const n = outcomes.length;
while (i < n) {
let betSize = b0;
let maxBet = b0;
let profit = 0;
let step = 0;
const seqStart = outcomes[i].t;
let status = 'cap';
while (i < n && step < N_max) {
const o = outcomes[i];
step++;
i++;
if (o.win === 1) {
profit += betSize * r;
status = 'win';
break;
} else {
profit -= betSize;
if (step >= N_max) { status = 'cap'; break; }
betSize *= m;
maxBet = betSize;
}
}
if (step === 0) break;
profitsArr.push(profit);
statusesArr.push(status === 'win' ? 0 : 1);
lengthsArr.push(step);
maxBetsArr.push(maxBet);
seqTimestamps.push(seqStart);
}
const num = profitsArr.length;
if (num === 0) return null;
const profits = new Float64Array(profitsArr);
const statuses = new Uint8Array(statusesArr);
const lengths = lengthsArr;
let cum = 0, peak = 0, maxDD = 0, wins = 0, caps = 0;
const equity = new Array(num);
const recent = [];
for (let k = 0; k < num; k++) {
cum += profits[k];
if (cum > peak) peak = cum;
const dd = peak - cum;
if (dd > maxDD) maxDD = dd;
equity[k] = cum;
if (statuses[k] === 0) wins++; else caps++;
if (k >= num - 30) recent.push({
id: k + 1, profit: profits[k], length: lengths[k],
status: statuses[k] === 0 ? 'win' : 'cap',
maxBet: maxBetsArr[k]
});
}
const sStep = Math.max(1, Math.floor(num / 240));
const equitySampled = [];
for (let k = 0; k < num; k += sStep) {
equitySampled.push({ x: k + 1, y: Math.round(equity[k] * 100) / 100 });
}
if (equitySampled.length === 0 || equitySampled[equitySampled.length - 1].x !== num) {
equitySampled.push({ x: num, y: Math.round(equity[num - 1] * 100) / 100 });
}
const lengthDist = [];
for (let k = 1; k <= N_max; k++) {
let c = 0;
for (let q = 0; q < num; q++) if (lengths[q] === k) c++;
lengthDist.push({ step: `${k}`, count: c, isCap: k === N_max, pct: (c / num) * 100 });
}
const betDist = [];
for (let k = 0; k < N_max; k++) {
const tier = b0 * Math.pow(m, k);
let c = 0;
for (let q = 0; q < num; q++) if (Math.abs(maxBetsArr[q] - tier) < 0.001) c++;
betDist.push({
tier: tier >= 1000 ? `$${(tier / 1000).toFixed(1)}k` : `$${tier % 1 === 0 ? tier : tier.toFixed(2)}`,
count: c,
isCap: k === N_max - 1
});
}
return {
equitySampled, lengthDist, betDist, recent: recent.reverse(),
finalProfit: cum, winRate: wins / num, capCount: caps, capRate: caps / num,
maxDrawdown: maxDD, peak,
avgLength: lengths.reduce((a, b) => a + b, 0) / num,
maxBetEver: maxBetsArr.length ? Math.max(...maxBetsArr) : b0,
avgPerSeq: cum / num,
profits, statuses, lengths,
seqTimestamps,
realNum: num
};
}

function observedWinRate(outcomes) {
if (!outcomes || outcomes.length === 0) return 0.5;
let w = 0;
for (const o of outcomes) if (o.win === 1) w++;
return w / outcomes.length;
}

// v9 Phase 5: bot only caps on LOSS-direction runs (consecutive win===0 outcomes) of length ≥ N_max.
// Previously cap rate counted both directions, which gave correct numbers when the bot bet the
// minority side (Phase 3a's MLB at YES-score) but overstated risk once the bot bets the dominant
// side (Phase 5's MLB at NO-score). This helper counts loss-runs only — the true bot cap rate.
function countLossRunsAtLeast(outcomes, N_max) {
  if (!outcomes || outcomes.length === 0 || N_max < 1) return 0;
  let count = 0, curLen = 0;
  for (const o of outcomes) {
    if (o.win === 0) {
      curLen++;
    } else {
      if (curLen >= N_max) count++;
      curLen = 0;
    }
  }
  if (curLen >= N_max) count++;
  return count;
}

// v9 Phase 1: Streak analysis view per Pete's framework
// Walks a binary outcome sequence (each item {win: 0|1}) and returns all consecutive
// same-direction run lengths plus distribution stats. Theoretical expected counts use
// the symmetric extension of the spec formula N*p^k*(1-p): for each length k we sum
// both win-runs (N*p^k*(1-p)) and loss-runs (N*(1-p)^k*p), since the empirical
// distribution includes runs in both directions.
function computeStreaks(outcomes) {
  const empty = {
    runs: [], distribution: [], max: 0, mean: 0, median: 0,
    total: 0, winRate: 0.5, n: 0
  };
  if (!outcomes || outcomes.length === 0) return empty;
  const runs = [];
  let curLen = 1;
  let curVal = outcomes[0].win;
  for (let i = 1; i < outcomes.length; i++) {
    if (outcomes[i].win === curVal) {
      curLen++;
    } else {
      runs.push(curLen);
      curLen = 1;
      curVal = outcomes[i].win;
    }
  }
  runs.push(curLen);
  const n = outcomes.length;
  const p = outcomes.reduce((s, o) => s + (o.win === 1 ? 1 : 0), 0) / n;
  const max = runs.reduce((a, b) => Math.max(a, b), 0);
  const sum = runs.reduce((a, b) => a + b, 0);
  const mean = runs.length > 0 ? sum / runs.length : 0;
  const sorted = [...runs].sort((a, b) => a - b);
  const median = sorted.length === 0 ? 0
    : sorted.length % 2 === 1 ? sorted[(sorted.length - 1) >> 1]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  const counts = new Map();
  for (const r of runs) counts.set(r, (counts.get(r) || 0) + 1);
  const distribution = [];
  for (let k = 1; k <= max; k++) {
    const empirical = counts.get(k) || 0;
    const theoretical = n * (Math.pow(p, k) * (1 - p) + Math.pow(1 - p, k) * p);
    distribution.push({ length: k, empirical, theoretical });
  }
  return { runs, distribution, max, mean, median, total: runs.length, winRate: p, n };
}

// v9 Phase 5: `direction` declares the dominant-outcome side the bot bets on per market.
// fetchRealOutcomes flips outcomes accordingly so outcome.win === 1 always means "bot wins".
const MARKETS = [
{ id: 'btc15', label: 'BTC 15m', sub: 'Up / Down', icon: Bitcoin, p: 0.52, mpu: 15, unit: 'bar', continuous: true,
intervalType: '15min bar', intervalsPerDay: 96, intervalShort: 'bar', intervalLong: '15-minute bar',
winLabel: 'up', lossLabel: 'down', stepUnit: 'bar', direction: 'up', directionLabel: 'UP' },
{ id: 'spx1h', label: 'SPX 1H', sub: 'Green / Red', icon: BarChart3, p: 0.51, mpu: 60, unit: 'bar', continuous: false, hpd: 6.5, dpw: 5,
intervalType: 'trading hour', intervalsPerDay: 6, intervalShort: 'hour', intervalLong: 'trading hour',
winLabel: 'green', lossLabel: 'red', stepUnit: 'hour', direction: 'up', directionLabel: 'UP' },
{ id: 'mlb', label: 'MLB Inning', sub: 'Score / No', icon: Target, p: 0.55, mpu: 22, unit: 'inning', continuous: false, hpd: 3.3, dpw: 6,
intervalType: 'inning', intervalsPerDay: 9, intervalShort: 'inning', intervalLong: 'inning',
winLabel: 'score', lossLabel: 'no score', stepUnit: 'inning', direction: 'no_score', directionLabel: 'NO SCORE' },
{ id: 'custom', label: 'Custom', sub: 'Manual', icon: Settings2, p: 0.50, mpu: 15, unit: 'bar', continuous: true,
intervalType: 'interval', intervalsPerDay: 24, intervalShort: 'interval', intervalLong: 'interval',
winLabel: 'win', lossLabel: 'loss', stepUnit: 'interval', direction: null, directionLabel: null }
];

// Data feeds per market (v8: real public APIs proxied via /api)
const DATA_FEEDS = {
btc15: { feed: 'Coinbase Exchange', symbol: 'BTC-USD', latency: '~live', live: true },
spx1h: { feed: 'Twelve Data', symbol: 'SPY (SPX proxy)', latency: '~live', live: true },
mlb: { feed: 'MLB StatsAPI', symbol: 'live innings', latency: '~live', live: true },
custom: { feed: 'Monte Carlo', symbol: '—', latency: '—', live: false }
};

// Operating modes (v8: all modes use the same real data; framing only differs)
const MODES = [
{ id: 'sim', label: 'SIMULATION', tone: 'gold', desc: 'Real market data · no capital at risk' },
{ id: 'paper', label: 'PAPER', tone: 'teal', desc: 'Real market data · simulated fills' },
{ id: 'live', label: 'LIVE', tone: 'red', desc: 'Real market data · real capital · real fills' }
];

// Broker connections
const BROKERS = [
{ id: 'ibkr', label: 'IBKR', status: 'connected', acct: 'DUQ930159 (paper)' },
{ id: 'coinbase', label: 'Coinbase', status: 'connected', acct: 'Advanced' },
{ id: 'kalshi', label: 'Kalshi', status: 'disabled', acct: 'KXINX unsupported' }
];

// Edge benchmarks (probability of a single binary win)
const EDGE_BENCHMARKS = [
{ p: 0.50, label: 'Coin flip', desc: 'Pure 50/50, no edge' },
{ p: 0.51, label: 'Casino', desc: 'House edge' },
{ p: 0.53, label: 'Sharp bettor', desc: 'Sports betting pros' },
{ p: 0.55, label: 'Strong edge', desc: 'Rare in liquid markets' },
{ p: 0.58, label: 'Elite', desc: 'Hard to sustain at scale' },
{ p: 0.60, label: 'Suspicious', desc: 'Likely overfitting or leak' }
];

function classifyEdge(p) {
if (p < 0.50) return { label: 'Negative', tone: 'red', desc: 'You lose more than you win. Martingale guarantees ruin.' };
if (p < 0.51) return { label: 'Coin flip', tone: 'dim', desc: 'No real edge. Cap events will dominate over time.' };
if (p < 0.53) return { label: 'Thin edge', tone: 'gold', desc: 'On par with casinos. Survivable but tight.' };
if (p < 0.55) return { label: 'Sharp', tone: 'teal', desc: 'Where pro sports bettors operate. Realistic ceiling.' };
if (p < 0.58) return { label: 'Strong', tone: 'teal', desc: 'Strong edge. Rarely sustainable in liquid markets.' };
if (p < 0.60) return { label: 'Elite', tone: 'teal', desc: 'Top-tier. Re-verify your signal is not overfit.' };
return { label: 'Suspicious', tone: 'gold', desc: 'Too good. Probably a data leak or look-ahead bias.' };
}

const SCENARIOS = [
{ p: 0.48 }, { p: 0.50 }, { p: 0.51 }, { p: 0.52 },
{ p: 0.54 }, { p: 0.56 }, { p: 0.58 }
];

// Demo presets for one-click scenario loading (showcase mode)
const DEMO_PRESETS = [
{ id: 'strong', label: 'Strong Edge', desc: 'BTC at 55% - profitable zone', p: 0.55, b0: 5, m: 2.0, N_max: 6, market: 'btc15' },
{ id: 'marginal', label: 'Marginal', desc: 'SPX at 51% - barely positive EV', p: 0.51, b0: 5, m: 2.0, N_max: 6, market: 'spx1h' },
{ id: 'brutal', label: 'Brutal', desc: 'MLB at 48% - negative EV, watch it bleed', p: 0.48, b0: 5, m: 2.5, N_max: 6, market: 'mlb' },
{ id: 'conservative', label: 'Conservative', desc: 'Short chains, lower multiplier', p: 0.54, b0: 5, m: 1.8, N_max: 4, market: 'btc15' }
];

// ============================================================
// ROOT
// ============================================================

export default function App() {
const [view, setView] = useState('overview');
const [mode, setMode] = useState('sim');
const [p, setP] = useState(0.52);
const [b0, setB0] = useState(5);
const [m, setM] = useState(2.0);
const [N_max, setNMax] = useState(6);
const [num, setNum] = useState(10000);
const [market, setMarket] = useState('btc15');
const [running, setRunning] = useState(false);
const [results, setResults] = useState(null);
const [scenarios, setScenarios] = useState(null);
const [concurrent, setConcurrent] = useState(null);
const [rawOutcomes, setRawOutcomes] = useState(null);
// v9 Phase 3a: global toggle for the Plain English translation layer
const [simpleMode, setSimpleMode] = useState(false);
// v9.1: Guided Mode — new default UX (guided 4-step flow); 'expert' shows the old tab interface
const [viewMode, setViewMode] = useState('guided');
// v9.1.3: returning users who opted in skip the welcome and land on Step 2
const [guidedStep, setGuidedStep] = useState(() => {
  try { return localStorage.getItem('marti_skip_welcome') === 'true' ? 2 : 1; }
  catch { return 1; }
});
const [guidedInputs, setGuidedInputs] = useState({ bankroll: 50000, dailyBudget: 1500, comfort: 'balanced' });
const [pendingRun, setPendingRun] = useState(false);
// v9.2: American odds for win payouts; default depends on market and resets when market changes
const [odds, setOdds] = useState(() => MARKET_DEFAULTS.btc15.defaultOdds);
useEffect(() => {
  const d = MARKET_DEFAULTS[market];
  if (d) setOdds(d.defaultOdds);
}, [market]);
const [runCount, setRunCount] = useState(0);
const [now, setNow] = useState(new Date());
const [autoSeed, setAutoSeed] = useState(0);
const [dataError, setDataError] = useState(null);
const [dataInfo, setDataInfo] = useState(null);
const [lowVolume, setLowVolume] = useState(false);
const [lastRunAt, setLastRunAt] = useState(null);
const [justRefreshed, setJustRefreshed] = useState(false);

useEffect(() => {
const t = setInterval(() => setNow(new Date()), 1000);
return () => clearInterval(t);
}, []);

const handleRun = useCallback(async (opts = {}) => {
const force = opts && opts.force === true;
setRunning(true);
setDataError(null);
try {
if (market === 'custom') {
const r = payoutMultiplier(odds);
const main = simulate({ p, b0, m, N_max, r, num });
const scens = SCENARIOS.map(s => ({
...s,
...simulate({ p: s.p, b0, m, N_max, r, num: Math.min(num, 5000) })
}));
const conc = simulateConcurrent(p, b0, m, N_max, 5, 8000);
// v9 Phase 1: synthesize a binary outcome stream from p so Streaks tab has data
const simN = Math.max(num, 2000);
const simOutcomes = new Array(simN);
const t0 = Date.now() - simN * 60000;
for (let i = 0; i < simN; i++) simOutcomes[i] = { t: t0 + i * 60000, win: Math.random() < p ? 1 : 0 };
setRawOutcomes(simOutcomes);
setResults(main);
setScenarios(scens);
setConcurrent(conc);
setDataInfo({ source: 'monte_carlo', market: 'custom' });
setLowVolume(false);
} else {
const payload = await fetchRealOutcomes(market, { force });
if (!payload.outcomes || payload.outcomes.length === 0) {
throw new Error(`No outcomes returned for ${market}. Try Refresh data or a different market.`);
}
const obsP = observedWinRate(payload.outcomes);
const r = payoutMultiplier(odds);
const main = buildSequencesFromOutcomes(payload.outcomes, b0, m, N_max, r);
if (!main) throw new Error('Could not build any sequences from real outcomes.');
setRawOutcomes(payload.outcomes);
setP(obsP);
const scens = SCENARIOS.map(s => ({
...s,
...simulate({ p: s.p, b0, m, N_max, r, num: Math.min(num, 5000) })
}));
const conc = simulateConcurrent(obsP, b0, m, N_max, 5, 8000);
setResults(main);
setScenarios(scens);
setConcurrent(conc);
setDataInfo({
source: 'real',
market,
feedStart: payload.start,
feedEnd: payload.end,
eventCount: payload.outcomes.length,
sequenceCount: main.realNum,
cached: payload.cached,
fetchedAt: payload.fetchedAt,
observedWinRate: obsP
});
setLowVolume(market === 'mlb' && payload.outcomes.length < 100);
}
setRunCount(c => c + 1);
setLastRunAt(Date.now());
setJustRefreshed(true);
setTimeout(() => setJustRefreshed(false), 1100);
} catch (err) {
setDataError(err && err.message ? err.message : String(err));
} finally {
setRunning(false);
}
}, [p, b0, m, N_max, num, market, odds]);

// Stale = displaying data for a different market than currently selected
const isStale = !!(dataInfo?.source === 'real' && dataInfo.market && dataInfo.market !== market);

useEffect(() => {
handleRun();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// v8: rebuild from cached data every 60s so equity/timestamps stay fresh; no API hit (cache TTL 6h)
useEffect(() => {
const t = setInterval(() => setAutoSeed(s => s + 1), 60000);
return () => clearInterval(t);
}, []);
useEffect(() => {
// v8.1: don't auto-refresh after a market switch (could be expensive).
// User must click Run to load the new market.
if (autoSeed > 0 && !isStale) handleRun();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [autoSeed]);

const expectedWorst = useMemo(() => {
let total = 0;
for (let k = 0; k < N_max; k++) total += b0 * Math.pow(m, k);
return total;
}, [b0, m, N_max]);

const breakevenP = useMemo(() => {
const sumLosses = expectedWorst;
let lo = 0.3, hi = 0.7;
for (let i = 0; i < 50; i++) {
const mid = (lo + hi) / 2;
const e = mid * b0 - Math.pow(1 - mid, N_max) * sumLosses;
if (e < 0) lo = mid; else hi = mid;
}
return (lo + hi) / 2;
}, [b0, N_max, expectedWorst]);

// Period: from real fetched range when available; falls back to derived window for custom market
const period = useMemo(() => {
if (!results) return null;
const mkt = MARKETS.find(x => x.id === market) || MARKETS[0];
if (dataInfo?.source === 'real' && dataInfo.feedStart && dataInfo.feedEnd) {
const startDate = new Date(dataInfo.feedStart);
const endDate = new Date(dataInfo.feedEnd);
const totalDays = Math.max(1, (endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
const totalUnits = (results.realNum || results.profits?.length || 0) * results.avgLength;
return { totalDays, startDate, endDate, totalUnits, mkt, source: 'real' };
}
const totalUnits = num * results.avgLength;
const totalMinutes = totalUnits * mkt.mpu;
let totalDays;
if (mkt.continuous) {
totalDays = totalMinutes / (60 * 24);
} else {
const minPerWeek = mkt.hpd * 60 * mkt.dpw;
const weeks = totalMinutes / minPerWeek;
totalDays = weeks * 7;
}
const endDate = now;
const startDate = new Date(endDate.getTime() - totalDays * 24 * 60 * 60 * 1000);
return { totalDays, startDate, endDate, totalUnits, mkt, source: 'monte_carlo' };
}, [market, num, results, now, dataInfo]);

const edgeClass = useMemo(() => classifyEdge(p), [p]);

// Synthesize interval-level outcomes (W/L per inning/hour/bar)
const intervalData = useMemo(() => {
if (!results?.lengths || !results?.statuses) return null;
return synthesizeIntervals(results.lengths, results.statuses, 2000);
}, [results]);

// Daily aggregation from per-sequence profits + period (uses real timestamps when present)
const dailySummary = useMemo(() => {
if (!results?.profits || !period) return null;
return buildDailySummary(results.profits, results.statuses, period, results.seqTimestamps);
}, [results, period]);

// Money breakdown: today, MTD, lifetime
const moneyBreakdown = useMemo(() => {
if (!dailySummary || dailySummary.length === 0 || !period) return null;
const today = dailySummary[0];
const endMonth = period.endDate.getMonth();
const endYear = period.endDate.getFullYear();
const monthEntries = dailySummary.filter(d =>
d.dateObj.getMonth() === endMonth && d.dateObj.getFullYear() === endYear
);
const monthPnl = monthEntries.reduce((s, d) => s + d.pnl, 0);
const monthCount = monthEntries.reduce((s, d) => s + d.count, 0);
const monthWins = monthEntries.reduce((s, d) => s + d.wins, 0);
const monthCaps = monthEntries.reduce((s, d) => s + d.caps, 0);
const avgDaily = results.finalProfit / dailySummary.length;
const bestDay = dailySummary.reduce((b, d) => d.pnl > b.pnl ? d : b, dailySummary[0]);
const worstDay = dailySummary.reduce((w, d) => d.pnl < w.pnl ? d : w, dailySummary[0]);
return {
today, monthPnl, monthCount, monthWins, monthCaps,
monthLabel: period.endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
avgDaily, bestDay, worstDay,
totalDays: dailySummary.length
};
}, [dailySummary, period, results]);

// Demo preset loader
const applyPreset = useCallback((preset) => {
setP(preset.p);
setB0(preset.b0);
setM(preset.m);
setNMax(preset.N_max);
setMarket(preset.market);
}, []);

// Export current state as JSON
const exportState = useCallback(() => {
const blob = {
version: 'v9.2.2-skip-to-expert',
timestamp: new Date().toISOString(),
mode,
market,
parameters: { p, b0, m, N_max, num },
results: results ? {
finalProfit: results.finalProfit,
winRate: results.winRate,
capRate: results.capRate,
capCount: results.capCount,
maxDrawdown: results.maxDrawdown,
peak: results.peak,
avgLength: results.avgLength
} : null,
period: period ? {
startDate: period.startDate?.toISOString(),
endDate: period.endDate?.toISOString(),
totalDays: period.totalDays
} : null,
breakevenP,
expectedWorst
};
const json = JSON.stringify(blob, null, 2);
const dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
const a = document.createElement('a');
a.href = dataUrl;
a.download = `marti_state_${new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')}.json`;
a.click();
}, [mode, market, p, b0, m, N_max, num, results, period, breakevenP, expectedWorst]);

// Global keyboard shortcuts
useEffect(() => {
const handler = (e) => {
// Ignore when typing in inputs/textareas
const tag = e.target.tagName;
if (tag === 'INPUT' || tag === 'TEXTAREA') return;
// Ignore with modifier keys other than what we want
if (e.altKey) return;
if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
e.preventDefault();
setView('askmarty');
return;
}
if (e.metaKey || e.ctrlKey) return;
switch (e.key) {
case '1': setView('overview'); break;
case '2': setView('workspace'); break;
case '3': setView('insights'); break;
case '4': setView('askmarty'); break;
case 'r': case 'R': handleRun(); break;
case 'p': case 'P': setSimpleMode(s => !s); break;
case '/': e.preventDefault(); setView('askmarty'); break;
default: break;
}
};
window.addEventListener('keydown', handler);
return () => window.removeEventListener('keydown', handler);
}, [handleRun]);

// v9.1: Guided Mode → Expert handoff. The "Run a 1-week simulation" CTA in GuidedView
// sets market/b0/N_max/num/view/viewMode synchronously, then sets pendingRun. By the time
// this effect re-runs (handleRun dep regenerates with new market/etc.), all state has
// committed, so handleRun() picks up the right closure.
useEffect(() => {
  if (!pendingRun) return;
  handleRun();
  setPendingRun(false);
}, [pendingRun, handleRun]);

const onRunSimulation = useCallback((cfg) => {
  if (cfg.market) setMarket(cfg.market);
  if (cfg.B != null) setB0(cfg.B);
  if (cfg.N_max != null) setNMax(cfg.N_max);
  if (cfg.num != null) setNum(cfg.num);
  setView('workspace');
  setViewMode('expert');
  setPendingRun(true);
}, []);

return (
<div className="mb-root">
<style>{styles}</style>
<TopBar now={now} runCount={runCount} running={running} num={num} mode={mode} results={results} simpleMode={simpleMode} setSimpleMode={setSimpleMode} viewMode={viewMode} setViewMode={setViewMode} setGuidedStep={setGuidedStep} />
{viewMode === 'expert' && <OperatingStatusBar mode={mode} setMode={setMode} market={market} />}
{viewMode === 'expert' && (
<div className="mb-tabs-top">
<TabSwitch view={view} setView={setView} />
</div>
)}

  {viewMode === 'expert' && market === 'mlb' && dataInfo?.observedWinRate != null && dataInfo.observedWinRate < 0.40 && !isStale && (
    <div className="mb-mlbdir-banner">
      <span className="mb-mlbdir-tag mono">MLB DIRECTION</span>
      <span className="mb-mlbdir-msg">
        ⚠ Bot strategy is currently set to <strong>"YES (will score)"</strong>. MLB innings score only ~28% of the time, so the strategy loses. The same data with bot betting <strong>"NO score"</strong> would show a ~72% win rate. Bot direction selector coming in v9.
      </span>
    </div>
  )}

  {viewMode === 'expert' && (
    <DataBanner
      dataError={dataError}
      dataInfo={dataInfo}
      lowVolume={lowVolume}
      market={market}
      onRetry={() => handleRun({ force: true })}
      running={running}
      isStale={isStale}
      justRefreshed={justRefreshed}
      lastRunAt={lastRunAt}
      now={now}
    />
  )}

  <div className={`mb-stage ${isStale ? 'mb-stage-stale' : ''}`}>
    {viewMode === 'guided' && (
      <GuidedView
        guidedStep={guidedStep}
        setGuidedStep={setGuidedStep}
        guidedInputs={guidedInputs}
        setGuidedInputs={setGuidedInputs}
        setViewMode={setViewMode}
        onRunSimulation={onRunSimulation}
      />
    )}
    {viewMode === 'expert' && simpleMode && (
      <PlainEnglishCard
        results={results}
        outcomes={rawOutcomes}
        market={market}
        dataInfo={dataInfo}
        period={period}
        isStale={isStale}
        p={p} b0={b0} m={m} N_max={N_max}
        odds={odds}
        expectedWorst={expectedWorst}
        breakevenP={breakevenP}
      />
    )}
    {viewMode === 'expert' && view === 'overview' && (
      <OverviewView
        results={results}
        scenarios={scenarios}
        p={p} b0={b0} m={m} N_max={N_max} num={num}
        breakevenP={breakevenP}
        period={period}
        edgeClass={edgeClass}
        mode={mode}
        market={market}
        expectedWorst={expectedWorst}
        moneyBreakdown={moneyBreakdown}
        dailySummary={dailySummary}
        concurrent={concurrent}
        intervalData={intervalData}
      />
    )}
    {viewMode === 'expert' && view === 'workspace' && (
      <WorkspaceView
        results={results}
        running={running}
        p={p} setP={setP}
        b0={b0} setB0={setB0}
        m={m} setM={setM}
        N_max={N_max} setNMax={setNMax}
        num={num} setNum={setNum}
        market={market} setMarket={setMarket}
        odds={odds} setOdds={setOdds}
        onRun={handleRun}
        expectedWorst={expectedWorst}
        period={period}
        edgeClass={edgeClass}
        mode={mode}
        concurrent={concurrent}
        moneyBreakdown={moneyBreakdown}
        intervalData={intervalData}
        applyPreset={applyPreset}
        exportState={exportState}
      />
    )}
    {viewMode === 'expert' && view === 'insights' && (
      <InsightsView
        results={results}
        scenarios={scenarios}
        p={p} b0={b0} m={m} N_max={N_max} num={num}
        expectedWorst={expectedWorst}
        breakevenP={breakevenP}
        period={period}
        edgeClass={edgeClass}
        mode={mode}
        market={market}
        moneyBreakdown={moneyBreakdown}
        concurrent={concurrent}
        intervalData={intervalData}
      />
    )}
    {viewMode === 'expert' && view === 'streaks' && (
      <StreaksView
        outcomes={rawOutcomes}
        market={market}
        dataInfo={dataInfo}
        isStale={isStale}
      />
    )}
    {viewMode === 'expert' && view === 'recommend' && (
      <RecommendView
        market={market}
        setMarket={setMarket}
        currentOutcomes={rawOutcomes}
      />
    )}
    {viewMode === 'expert' && view === 'askmarty' && (
      <AskMartyView
        results={results}
        period={period}
        edgeClass={edgeClass}
        intervalData={intervalData}
        concurrent={concurrent}
        moneyBreakdown={moneyBreakdown}
        mode={mode}
        market={market}
        p={p} b0={b0} m={m} N_max={N_max} num={num}
        expectedWorst={expectedWorst}
        breakevenP={breakevenP}
      />
    )}
  </div>

  {viewMode === 'expert' && <BottomNav view={view} setView={setView} />}
  <footer className="mb-disclaimer">
    Marti is a strategy simulation tool. Results reflect historical market data and do not predict future performance.
    Not investment advice. Real prediction market trading involves costs (slippage, fees, non-parity pricing) not modeled here.
    Always verify findings against independent data before deploying capital.
  </footer>
</div>

);
}

// ============================================================
// TOP BAR
// ============================================================

function fmtAgo(ms, nowMs) {
if (!ms) return '—';
const diffSec = Math.max(0, Math.floor((nowMs - ms) / 1000));
if (diffSec < 5) return 'just now';
if (diffSec < 60) return `${diffSec}s ago`;
const min = Math.floor(diffSec / 60);
if (min < 60) return `${min} min ago`;
const h = Math.floor(min / 60);
if (h < 24) return `${h}h ago`;
const d = Math.floor(h / 24);
return `${d}d ago`;
}

function DataBanner({ dataError, dataInfo, lowVolume, market, onRetry, running, isStale, justRefreshed, lastRunAt, now }) {
const mkt = MARKETS.find(x => x.id === market);
const nowMs = now ? now.getTime() : Date.now();

if (isStale) {
return (
<div className="mb-databanner mb-databanner-warn">
<span className="mb-databanner-tag mono">STALE</span>
<span className="mb-databanner-msg">
⚠ Stale data from previous market. Click <strong>Run</strong> to load <strong>{mkt?.label ?? market}</strong> data.
</span>
<button onClick={onRetry} disabled={running} className="mb-databanner-btn mono">Run now</button>
</div>
);
}
if (dataError) {
return (
<div className="mb-databanner mb-databanner-err">
<span className="mb-databanner-tag mono">DATA ERROR</span>
<span className="mb-databanner-msg">{dataError}</span>
<button onClick={onRetry} disabled={running} className="mb-databanner-btn mono">Retry</button>
</div>
);
}
if (lowVolume && market === 'mlb') {
return (
<div className={`mb-databanner mb-databanner-warn ${justRefreshed ? 'mb-databanner-pulse' : ''}`}>
<span className="mb-databanner-tag mono">MLB OFF-SEASON</span>
<span className="mb-databanner-msg">
Only {dataInfo?.eventCount ?? 0} half-inning outcomes returned in the last 180 days.
MLB regular season runs late March through early October — results are thin outside that window. Stats may be noisy.
</span>
<span className="mb-databanner-age mono dim">last run: {fmtAgo(lastRunAt, nowMs)}</span>
</div>
);
}
if (dataInfo?.source === 'real') {
const startStr = dataInfo.feedStart ? new Date(dataInfo.feedStart).toLocaleDateString() : '—';
const endStr = dataInfo.feedEnd ? new Date(dataInfo.feedEnd).toLocaleDateString() : '—';
return (
<div className={`mb-databanner mb-databanner-ok ${justRefreshed ? 'mb-databanner-pulse' : ''}`}>
<span className="mb-databanner-tag mono">REAL DATA</span>
<span className="mb-databanner-msg">
{dataInfo.eventCount.toLocaleString()} outcomes
{dataInfo.eventCount < 1000 && (
<span
className="mb-sample-chip mono"
title="Sample size below 1,000 outcomes. Observed win rate may regress toward 50% with more data. Treat findings as directional, not definitive."
> LIMITED SAMPLE</span>
)}
{' '}· {dataInfo.sequenceCount?.toLocaleString() ?? '—'} sequences ·
{' '}{startStr} → {endStr} ·
{' '}observed win rate <span className="mono">{(dataInfo.observedWinRate * 100).toFixed(2)}%</span>
{dataInfo.cached ? ' · from cache' : ' · fresh fetch'}
</span>
<span className="mb-databanner-age mono dim">last run: {fmtAgo(lastRunAt, nowMs)}</span>
</div>
);
}
return null;
}

function TopBar({ now, runCount, running, num, mode, results, simpleMode, setSimpleMode, viewMode, setViewMode, setGuidedStep }) {
const currentMode = MODES.find(x => x.id === mode);
return (
<header className="mb-topbar">
<div className="mb-brand">
<img src={LOGO_DATA_URI} alt="Marti" className="mb-brand-logo" />
<span className="mb-brand-ver mono">v9.2.2-skip-to-expert</span>
</div>
<div className="mb-topbar-right">
<div className={`mb-status ${running ? 'mb-status-run' : ''}`}>
<span className={`mb-status-dot ${running ? 'mb-status-dot-live' : ''}`}></span>
<span className="mono">{running ? 'RUNNING' : (results ? 'READY' : 'IDLE')}</span>
</div>
<div className="mb-meta mono mb-meta-hide-sm">
<span>R{runCount.toString().padStart(2, '0')}</span>
<span className="mb-meta-sep">·</span>
<span>{(num / 1000).toFixed(0)}k seq</span>
</div>
<button
  type="button"
  onClick={() => {
    setViewMode(v => {
      const next = v === 'guided' ? 'expert' : 'guided';
      if (next === 'guided') {
        // v9.1.3: respect the skip-welcome flag when re-entering Guided
        try { setGuidedStep(localStorage.getItem('marti_skip_welcome') === 'true' ? 2 : 1); }
        catch { setGuidedStep(1); }
      }
      return next;
    });
  }}
  className={`mb-plain-toggle ${viewMode === 'guided' ? 'mb-plain-toggle-on' : 'mb-plain-toggle-off'}`}
  aria-pressed={viewMode === 'guided'}
  title="Toggle Guided / Expert mode"
>
  {viewMode === 'guided' ? 'Guided' : 'Expert'}
</button>
<button
  type="button"
  onClick={() => setSimpleMode(s => !s)}
  className={`mb-plain-toggle ${simpleMode ? 'mb-plain-toggle-on' : 'mb-plain-toggle-off'}`}
  aria-pressed={simpleMode}
  title="Toggle Plain English mode (shortcut: P)"
>
  {simpleMode ? 'Plain English: ON' : 'Plain English'}
</button>
<div className="mb-clock mono">
{now.toLocaleTimeString('en-US', { hour12: false })}
</div>
</div>
</header>
);
}

function TabSwitch({ view, setView }) {
const tabs = [
{ id: 'overview', label: 'Overview' },
{ id: 'workspace', label: 'Workspace' },
{ id: 'insights', label: 'Insights' },
{ id: 'streaks', label: 'Streaks' },
{ id: 'recommend', label: 'Recommend', special: true },
{ id: 'askmarty', label: 'Ask Marti', special: true }
];
return (
<div className="mb-tabswitch">
{tabs.map(t => (
<button
key={t.id}
onClick={() => setView(t.id)}
className={`mb-tab ${view === t.id ? 'mb-tab-active' : ''} ${t.special ? 'mb-tab-special' : ''}`}
>
{t.special && <Sparkles size={11} />}
{t.label}
</button>
))}
</div>
);
}

function BottomNav({ view, setView }) {
const tabs = [
{ id: 'overview', label: 'Overview', icon: BarChart3 },
{ id: 'workspace', label: 'Workspace', icon: Layers },
{ id: 'insights', label: 'Insights', icon: Activity },
{ id: 'streaks', label: 'Streaks', icon: Flame },
{ id: 'recommend', label: 'Recommend', icon: Target },
{ id: 'askmarty', label: 'Marti', icon: Sparkles }
];
return (
<nav className="mb-bottomnav">
{tabs.map(t => {
const Icon = t.icon;
const active = view === t.id;
return (
<button
key={t.id}
onClick={() => setView(t.id)}
className={`mb-bottomnav-item ${active ? 'mb-bottomnav-active' : ''}`}
>
<Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
<span>{t.label}</span>
</button>
);
})}
</nav>
);
}

// ============================================================
// OPERATING STATUS BAR (persistent across views)
// ============================================================

function OperatingStatusBar({ mode, setMode, market }) {
const currentMode = MODES.find(x => x.id === mode);
const feed = DATA_FEEDS[market];
const mkt = MARKETS.find(x => x.id === market);

return (
<div className="mb-opsbar">
<div className="mb-opsbar-inner">
<div className="mb-opsbar-modes">
{MODES.map(mo => (
<button
key={mo.id}
onClick={() => setMode(mo.id)}
className={`mb-opsbar-mode mb-opsbar-mode-${mo.tone} ${mode === mo.id ? 'mb-opsbar-mode-active' : ''}`}
>
<span className="mb-opsbar-mode-dot"></span>
{mo.label}
</button>
))}
</div>

    <div className="mb-opsbar-divider"></div>

    <div className="mb-opsbar-item">
      <span className="mb-opsbar-label">MARKET</span>
      <span className="mb-opsbar-value mono">{mkt?.label || '—'}</span>
    </div>

    {mkt?.directionLabel && (
      <div className="mb-opsbar-item">
        <span className="mb-opsbar-label">BET</span>
        <span className="mb-opsbar-value mono gold">{mkt.directionLabel}</span>
      </div>
    )}

    <div className="mb-opsbar-item mb-opsbar-hide-md">
      <span className="mb-opsbar-label">INTERVAL</span>
      <span className="mb-opsbar-value mono">{mkt?.intervalShort}</span>
      <span className="mb-opsbar-sub mono">{mkt?.intervalsPerDay}/day</span>
    </div>

    <div className="mb-opsbar-item mb-opsbar-hide-md">
      <span className="mb-opsbar-label">FEED</span>
      <span className="mb-opsbar-value mono">{feed?.feed || '—'}</span>
      <span className="mb-opsbar-sub mono">{feed?.symbol}</span>
    </div>

    <div className="mb-opsbar-item mb-opsbar-hide-lg">
      <span className="mb-opsbar-label">LATENCY</span>
      <span className="mb-opsbar-value mono pos">{feed?.latency || '—'}</span>
    </div>

    <div className="mb-opsbar-divider mb-opsbar-hide-md"></div>

    <div className="mb-opsbar-brokers mb-opsbar-hide-md">
      <span className="mb-opsbar-label">BROKERS</span>
      <div className="mb-opsbar-brokerlist">
        {BROKERS.map(b => (
          <span key={b.id} className={`mb-broker mb-broker-${b.status}`}>
            <span className="mb-broker-dot"></span>
            <span className="mono">{b.label}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

);
}

// ============================================================
// MARTY SAYS (plain-English narrative)
// ============================================================

function MartySays({ p, b0, m, N_max, num, results, period, expectedWorst, edgeClass, market, mode }) {
if (!results || !period) return null;

const winsExpected = Math.round(p * num);
const lossesExpected = num - winsExpected;
const edgePP = ((p - 0.5) * 100).toFixed(1);
const edgeOverFair = p > 0.5 ? `${edgePP} points` : `${edgePP} points below`;
const casinoCompare = p > 0.5
? `like being the casino with a ${edgePP}-point house advantage`
: `like playing against the house with a ${Math.abs(parseFloat(edgePP))}-point disadvantage`;
const mkt = MARKETS.find(x => x.id === market);
const feed = DATA_FEEDS[market];
const currentMode = MODES.find(x => x.id === mode);

const profitPerSeq = results.avgPerSeq;
const annualizedFactor = period.totalDays > 0 ? 365 / period.totalDays : 0;
const annualized = results.finalProfit * annualizedFactor;
const worstLoss = expectedWorst;
const ladder = [];
for (let k = 0; k < N_max; k++) ladder.push(b0 * Math.pow(m, k));

return (
<section className="mb-msays">
<div className="mb-msays-head">
<div className="mb-msays-headline">
<span className="mb-msays-title">PLAIN ENGLISH</span>
<span className={`mb-edge-badge mb-edge-badge-${edgeClass.tone}`}>{edgeClass.label}</span>
</div>
<span className="mb-msays-meta mono">{currentMode?.label} · {mkt?.label}</span>
</div>

  <div className="mb-msays-body">
    <p className="mb-msays-p">
      The bot bets <strong>{mkt?.winLabel}</strong> on every {mkt?.intervalShort}. Real data from{' '}
      <strong>{feed?.feed}</strong> shows it actually went {mkt?.winLabel} on{' '}
      <strong className="mono pos">{(p * 100).toFixed(2)}%</strong> of {mkt?.intervalShort}s — that's the observed edge.{' '}
      At this rate you're <strong>{casinoCompare}</strong>.
    </p>

    <p className="mb-msays-p">
      Each martingale step = one <strong>{mkt?.intervalLong}</strong>. This run replays{' '}
      <strong className="mono">{(results.realNum || num).toLocaleString()}</strong> sequences built from real outcomes between{' '}
      <strong className="mono">{fmtDateShort(period.startDate)}</strong> and{' '}
      <strong className="mono">{fmtDateShort(period.endDate)}</strong>{' '}
      (<strong>{fmtDurationShort(period.totalDays)}</strong>).
      {mode === 'live' ? ' In LIVE mode, the same trades would have moved real capital.' :
       mode === 'paper' ? ' In PAPER mode, fills are simulated against the same real prices.' :
       ' In SIM mode, no fills hit any broker.'}{' '}
      Net P&L: <strong className={`mono ${results.finalProfit >= 0 ? 'pos' : 'neg'}`}>
        {fmtMoney(results.finalProfit, 0)}
      </strong>.
    </p>

    <p className="mb-msays-p">
      A worst-case chain means <strong className="mono">{N_max} consecutive {mkt?.lossLabel} {mkt?.intervalShort}s</strong>.
      Probability: <strong className="mono">(1 - {p.toFixed(2)})<sup>{N_max}</sup> ≈ {(Math.pow(1 - p, N_max) * 100).toFixed(3)}%</strong>{' '}
      (roughly 1 in <strong className="mono">{Math.round(1 / Math.pow(1 - p, N_max)).toLocaleString()}</strong>).
      Observed <strong className="mono neg">{results.capCount.toLocaleString()}</strong> times,
      costing <strong className="mono neg">{fmtMoney(-worstLoss, 0)}</strong> each.
      {profitPerSeq > 0
        ? ` The small wins ($${profitPerSeq.toFixed(3)} avg) absorb the caps at this edge.`
        : ` The wins are not absorbing the caps. Raise edge, shorten N, or reduce multiplier.`}
    </p>
  </div>

  <div className="mb-msays-pills">
    <NarrativePill label="MODE" value={currentMode?.label} tone={currentMode?.tone} />
    <NarrativePill label="FEED" value={feed?.feed} tone="dim" />
    <NarrativePill label="PERIOD" value={fmtDurationShort(period.totalDays)} tone="gold" />
    <NarrativePill label="EDGE" value={`+${edgePP}pp`} tone={p > 0.5 ? 'teal' : 'red'} />
    <NarrativePill label="WORST CASE" value={fmtMoney(-worstLoss, 0)} tone="red" />
  </div>
</section>

);
}

function NarrativePill({ label, value, tone }) {
return (
<div className={`mb-npill mb-npill-${tone}`}>
<span className="mb-npill-label">{label}</span>
<span className="mb-npill-value mono">{value}</span>
</div>
);
}

// ============================================================
// MONEY TILES (Today / Month / Lifetime / Worst / Concurrent)
// ============================================================

function MoneyTiles({ moneyBreakdown, results, expectedWorst, concurrent, mode, num }) {
if (!moneyBreakdown || !results) return null;
const currentMode = MODES.find(x => x.id === mode);
const isLive = mode === 'live';

const tiles = [
{
label: "TODAY'S P&L",
help: { title: "What is P&L?", explanation: "Profit and Loss — how much money you've made or lost today from this strategy.", example: "+$10 means you'd be up $10 today. −$50 means down $50." },
value: fmtMoney(moneyBreakdown.today?.pnl || 0, 0),
positive: (moneyBreakdown.today?.pnl || 0) >= 0,
primary: true,
gold: false,
meta: moneyBreakdown.today
? `${moneyBreakdown.today.count} seq · ${moneyBreakdown.today.wins}W / ${moneyBreakdown.today.caps}C`
: 'no activity',
date: moneyBreakdown.today ? fmtDateShort(moneyBreakdown.today.dateObj) : ''
},
{
label: "THIS MONTH",
help: { title: "What is This Month?", explanation: "Profit and loss for the most recent calendar month of the test period.", example: "+$2.1k means the strategy made $2,100 this month across all sequences." },
value: fmtMoney(moneyBreakdown.monthPnl, 0),
positive: moneyBreakdown.monthPnl >= 0,
meta: `${moneyBreakdown.monthCount.toLocaleString()} seq · ${moneyBreakdown.monthWins}W / ${moneyBreakdown.monthCaps}C`,
date: moneyBreakdown.monthLabel
},
{
label: "LIFETIME P&L",
help: { title: "What is Lifetime P&L?", explanation: "Total profit or loss across all simulated days. Sums every daily P&L in the test period.", example: "+$15.3k means the strategy would have made $15,300 over the full simulation." },
value: fmtMoney(results.finalProfit, 0),
positive: results.finalProfit >= 0,
gold: results.finalProfit >= 0,
meta: `${num.toLocaleString()} seq · ${moneyBreakdown.totalDays}d`,
date: `avg ${fmtMoney(moneyBreakdown.avgDaily, 0)}/day`
},
{
label: "WORST SEQUENCE",
help: { title: "What is the worst sequence?", explanation: "The biggest single loss you've taken — when the bot hit the N_max cap and accepted the full ladder loss.", example: "−$315 means one sequence lost $315 after 6 consecutive losing bets." },
value: fmtMoney(-expectedWorst, 0),
positive: false,
danger: true,
meta: `${results.capCount.toLocaleString()} cap events`,
date: `${(results.capRate * 100).toFixed(3)}% rate`
},
{
label: "MAX EXPOSURE",
help: { title: "What is max exposure?", explanation: "The most money tied up at any one moment across all active sequences.", example: "−$495 with 5 parallel chains means at peak, 5 sequences were active at the same time, putting that total at risk." },
value: concurrent ? fmtMoney(-concurrent.maxExposure, 0) : '—',
positive: false,
gold: true,
meta: concurrent ? `${concurrent.numConcurrent} parallel chains` : '',
date: concurrent ? `${concurrent.maxDeepCount} deep simultaneously` : ''
}
];

return (
<section className="mb-mtiles-wrap">
<div className="mb-mtiles-head">
<span className="mb-mtiles-title">TOTAL AMOUNTS</span>
<span className={`mb-mtiles-badge ${isLive ? 'mb-mtiles-badge-live' : 'mb-mtiles-badge-sim'}`}>
<span className="mb-mtiles-badge-dot"></span>
{isLive ? 'LIVE MONEY' : currentMode?.label}
</span>
</div>
<div className="mb-mtiles">
{tiles.map((t, i) => (
<div key={i} className={`mb-mtile ${t.primary ? 'mb-mtile-primary' : ''}`}>
<div className="mb-mtile-label">{t.label}{t.help && <HelpIcon {...t.help} />}</div>
<div className={`mb-mtile-value mono ${t.danger ? 'neg' : t.gold ? 'gold' : t.positive ? 'pos' : 'neg'}`}>
{t.value}
</div>
<div className="mb-mtile-meta">
<span className="mono">{t.meta}</span>
{t.date && <span className="mb-mtile-date">{t.date}</span>}
</div>
</div>
))}
</div>
</section>
);
}

// ============================================================
// DAILY BREAKDOWN TABLE
// ============================================================

function DailyBreakdown({ dailySummary, moneyBreakdown }) {
const [showAll, setShowAll] = useState(false);
if (!dailySummary || dailySummary.length === 0) return null;

const display = showAll ? dailySummary : dailySummary.slice(0, 12);
const maxAbs = Math.max(...dailySummary.map(d => Math.abs(d.pnl)));

return (
<section className="mb-section">
<div className="mb-section-head">
<div>
<h2 className="mb-section-title">Daily Breakdown <HelpIcon title="What is the daily breakdown?" explanation="P&L grouped by calendar day. Shows wins, caps, and net for each day in the test period." example="A day with +$85 net means the strategy ended that day up $85 across all its sequences." /></h2>
<p className="mb-section-sub">
P&L by trading day · {dailySummary.length} days total
{moneyBreakdown?.bestDay && (
<> · best <span className="mono pos">{fmtMoney(moneyBreakdown.bestDay.pnl, 0)}</span></>
)}
{moneyBreakdown?.worstDay && (
<> · worst <span className="mono neg">{fmtMoney(moneyBreakdown.worstDay.pnl, 0)}</span></>
)}
</p>
</div>
<div className="mb-section-meta mono mb-meta-hide-sm">
avg {fmtMoney(moneyBreakdown?.avgDaily || 0, 0)}/day
</div>
</div>
<div className="mb-daily">
<div className="mb-daily-head">
<span>DATE</span>
<span className="mb-num">SEQ</span>
<span className="mb-num mb-daily-hide-sm">W / C</span>
<span className="mb-daily-hide-sm">DISTRIBUTION</span>
<span className="mb-num">P&L</span>
</div>
<div className="mb-daily-body">
{display.map((d, i) => {
const widthPct = maxAbs > 0 ? (Math.abs(d.pnl) / maxAbs) * 100 : 0;
const positive = d.pnl >= 0;
return (
<div key={d.date} className="mb-daily-row">
<span className="mb-daily-date">
<span className="mono">{d.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
<span className="dim mb-daily-yr mono">{d.dateObj.getFullYear()}</span>
</span>
<span className="mono mb-num">{d.count}</span>
<span className="mono mb-num mb-daily-hide-sm">
<span className="pos">{d.wins}</span>
<span className="dim"> / </span>
<span className={d.caps > 0 ? 'neg' : 'dim'}>{d.caps}</span>
</span>
<span className="mb-daily-bar-cell mb-daily-hide-sm">
<div className="mb-daily-bar-track">
<div
className={`mb-daily-bar ${positive ? 'mb-daily-bar-pos' : 'mb-daily-bar-neg'}`}
style={{ width: `${widthPct}%` }}
></div>
</div>
</span>
<span className={`mono mb-num ${positive ? 'pos' : 'neg'}`}>
{fmtMoney(d.pnl, 0)}
</span>
</div>
);
})}
</div>
{dailySummary.length > 12 && (
<button
className="mb-daily-more"
onClick={() => setShowAll(s => !s)}
>
{showAll ? `Show top 12 only` : `Show all ${dailySummary.length} days`}
</button>
)}
</div>
</section>
);
}

// ============================================================
// STEP TIMELINE
// Shows how each martingale step maps to one inning / hour / bar
// ============================================================
function StepTimeline({ N_max, market, b0, m, p }) {
const mkt = MARKETS.find(x => x.id === market);
if (!mkt) return null;
const steps = [];
for (let k = 0; k < N_max; k++) {
steps.push({
step: k + 1,
bet: b0 * Math.pow(m, k),
label: `${capitalize(mkt.intervalShort)} ${k + 1}`
});
}
const worstProb = Math.pow(1 - p, N_max);
const intervalsPerDay = mkt.intervalsPerDay;
const sequencesPerDay = intervalsPerDay; // worst-case mapping

return (
<section className="mb-section">
<div className="mb-section-head">
<div>
<h2 className="mb-section-title">Sequence Timeline <HelpIcon title="What is the sequence timeline?" explanation="Every individual sequence in time order, with its P&L. Lets you spot streaks of wins or clusters of caps." example="A row of green sequences followed by one red cap shows the strategy's typical rhythm." /></h2>
<p className="mb-section-sub">
Each martingale step maps to one <strong className="mono">{mkt.intervalLong}</strong>.
A worst-case chain of <strong className="mono">{N_max}</strong> losses means{' '}
<strong className="mono">{N_max} consecutive {mkt.lossLabel}</strong> {mkt.intervalShort}s.
</p>
</div>
<div className="mb-section-meta mono mb-meta-hide-sm">
{intervalsPerDay} {mkt.intervalShort}s / day
</div>
</div>
<div className="mb-steptl">
<div className="mb-steptl-track">
{steps.map((s, i) => {
const winThisStep = `Win ${s.label}: +${fmtMoney(s.bet, 0).replace('+', '')}`;
return (
<React.Fragment key={s.step}>
<div className="mb-steptl-node">
<div className="mb-steptl-num mono">{s.step}</div>
<div className="mb-steptl-label">{s.label}</div>
<div className="mb-steptl-bet mono">
<span className="neg">{fmtMoney(-s.bet, 0)}</span>
<span className="dim"> bet</span>
</div>
</div>
{i < steps.length - 1 && <div className="mb-steptl-arrow">→</div>}
</React.Fragment>
);
})}
</div>
<div className="mb-steptl-footer">
<div className="mb-steptl-foot-item">
<span className="mb-steptl-foot-label">P({N_max} {mkt.lossLabel}s in a row)</span>
<span className="mb-steptl-foot-val mono">
<span className={worstProb < 0.01 ? 'pos' : worstProb < 0.05 ? 'gold' : 'neg'}>
{(worstProb * 100).toFixed(3)}%
</span>
</span>
</div>
<div className="mb-steptl-foot-item">
<span className="mb-steptl-foot-label">≈ 1 in</span>
<span className="mb-steptl-foot-val mono">
{worstProb > 0 ? Math.round(1 / worstProb).toLocaleString() : '∞'}
</span>
</div>
<div className="mb-steptl-foot-item">
<span className="mb-steptl-foot-label">Plain English</span>
<span className="mb-steptl-foot-val">
(1 - <span className="mono">{p.toFixed(2)}</span>)<sup>{N_max}</sup> ≈{' '}
<span className="mono">{worstProb.toExponential(2)}</span>
</span>
</div>
</div>
</div>
</section>
);
}

function capitalize(s) {
return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

// ============================================================
// INTERVAL MAP
// Visual heatmap of intervals chunked by day (innings/hours/bars)
// ============================================================
function IntervalMap({ intervalData, market, N_max }) {
if (!intervalData) return null;
const mkt = MARKETS.find(x => x.id === market);
if (!mkt) return null;

const { intervals, longestLossStreak, totalIntervals } = intervalData;
const intervalsPerRow = mkt.intervalsPerDay;
const maxRows = 20;
const totalRows = Math.min(maxRows, Math.ceil(intervals.length / intervalsPerRow));

// Build rows
const rows = [];
for (let r = 0; r < totalRows; r++) {
const start = r * intervalsPerRow;
const slice = intervals.slice(start, start + intervalsPerRow);
const wins = slice.filter(x => x === 1).length;
const losses = slice.length - wins;
// Find longest loss streak within this row
let rowMaxStreak = 0;
let curr = 0;
for (const v of slice) {
if (v === 0) { curr++; if (curr > rowMaxStreak) rowMaxStreak = curr; }
else curr = 0;
}
rows.push({ slice, wins, losses, rowMaxStreak, rowIdx: r });
}

const rowLabel = mkt.id === 'mlb' ? 'Game' : mkt.id === 'spx1h' ? 'Day' : 'Day';

return (
<section className="mb-section">
<div className="mb-section-head">
<div>
<h2 className="mb-section-title">Daily Interval Map <HelpIcon title="What is the interval map?" explanation="A heatmap showing wins and losses at every interval in the dataset (e.g. each 15-minute bar for BTC)." example="A row of red cells next to greens shows the empirical sequence of bet outcomes hour-by-hour." /></h2>
<p className="mb-section-sub">
Each row is one <strong>{rowLabel.toLowerCase()}</strong>:{' '}
<strong className="mono">{intervalsPerRow}</strong> {mkt.intervalShort}s ({mkt.winLabel} / {mkt.lossLabel}).
Showing last {totalRows} {rowLabel.toLowerCase()}s of {Math.ceil(totalIntervals / intervalsPerRow).toLocaleString()} simulated.
</p>
</div>
<div className="mb-section-meta mono mb-meta-hide-sm">
longest losing streak: <span className={longestLossStreak >= N_max ? 'neg' : 'gold'}>{longestLossStreak}</span>
</div>
</div>
<div className="mb-imap">
<div className="mb-imap-head">
<span className="mb-imap-rowlabel"></span>
<div className="mb-imap-cols">
{Array.from({ length: intervalsPerRow }).map((_, i) => (
<span key={i} className="mb-imap-colnum mono">{i + 1}</span>
))}
</div>
<span className="mb-imap-stats">W / L · streak</span>
</div>
{rows.map(r => (
<div key={r.rowIdx} className="mb-imap-row">
<span className="mb-imap-rowlabel mono">{rowLabel.charAt(0)}{r.rowIdx + 1}</span>
<div className="mb-imap-cols">
{r.slice.map((v, i) => {
const partOfStreak = r.rowMaxStreak >= N_max && v === 0;
return (
<div
key={i}
className={`mb-imap-cell mb-imap-cell-${v === 1 ? 'win' : 'loss'} ${partOfStreak ? 'mb-imap-cell-bust' : ''}`}
title={`${mkt.intervalShort} ${i + 1}: ${v === 1 ? mkt.winLabel : mkt.lossLabel}`}
>
{v === 1 ? mkt.winLabel.charAt(0).toUpperCase() : mkt.lossLabel.charAt(0).toUpperCase()}
</div>
);
})}
{/* pad remaining */}
{r.slice.length < intervalsPerRow && Array.from({ length: intervalsPerRow - r.slice.length }).map((_, i) => (
<div key={`pad-${i}`} className="mb-imap-cell mb-imap-cell-pad"></div>
))}
</div>
<span className="mb-imap-stats mono">
<span className="pos">{r.wins}</span>
<span className="dim"> / </span>
<span className={r.losses === intervalsPerRow ? 'neg' : ''}>{r.losses}</span>
<span className="dim"> · </span>
<span className={r.rowMaxStreak >= N_max ? 'neg' : 'dim'}>{r.rowMaxStreak}</span>
</span>
</div>
))}
<div className="mb-imap-legend">
<div className="mb-imap-legitem">
<div className="mb-imap-legbox mb-imap-cell-win"></div>
<span>{capitalize(mkt.winLabel)}</span>
</div>
<div className="mb-imap-legitem">
<div className="mb-imap-legbox mb-imap-cell-loss"></div>
<span>{capitalize(mkt.lossLabel)}</span>
</div>
<div className="mb-imap-legitem">
<div className="mb-imap-legbox mb-imap-cell-bust"></div>
<span>Bust streak (≥{N_max})</span>
</div>
</div>
</div>
</section>
);
}

// ============================================================
// ASK MARTY (chatbot - the v7 unlock)
// ============================================================

function AskMartyView({
results, period, edgeClass, intervalData, concurrent, moneyBreakdown,
mode, market, p, b0, m, N_max, num, expectedWorst, breakevenP
}) {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');
const [isThinking, setIsThinking] = useState(false);
const messagesEndRef = useRef(null);
const inputRef = useRef(null);

useEffect(() => {
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isThinking]);

useEffect(() => {
inputRef.current?.focus();
}, []);

const buildContext = useCallback(() => {
const mkt = MARKETS.find(x => x.id === market);
const feed = DATA_FEEDS[market];
return {
mode: mode.toUpperCase(),
market: mkt,
feed,
params: { p, b0, m, N_max, num },
results,
period,
moneyBreakdown,
concurrent,
edge: { p, classification: edgeClass.label, description: edgeClass.desc, breakevenP },
derived: {
worstCaseLoss: expectedWorst,
theoreticalCapRate: Math.pow(1 - p, N_max),
winsToRecover: Math.ceil(expectedWorst / b0),
edgeOverFair: (p - 0.5) * 100
},
intervals: intervalData
};
}, [results, period, edgeClass, intervalData, concurrent, moneyBreakdown,
mode, market, p, b0, m, N_max, num, expectedWorst, breakevenP]);

const handleSend = async (override) => {
const userMsg = (override || input).trim();
if (!userMsg || isThinking) return;

const newMessages = [...messages, { role: 'user', text: userMsg, time: new Date() }];
setMessages(newMessages);
setInput('');
setIsThinking(true);

try {
  const context = buildContext();
  const systemPrompt = buildAskMartySystemPrompt(context);
  const historyText = newMessages.slice(-8).map(m =>
    `${m.role === 'user' ? 'User' : 'Marti'}: ${m.text}`
  ).join('\n\n');

  const fullPrompt = `${systemPrompt}\n\nConversation so far:\n${historyText}\n\nMarti's next response (concise, plain English, cite specific numbers):`;

  const history = newMessages.map(mm => ({
    role: mm.role === 'user' ? 'user' : 'assistant',
    content: mm.text
  }));
  const r = await fetch('/api/ask-marti', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system: systemPrompt, messages: history })
  });
  if (!r.ok) {
    let detail = '';
    try { detail = (await r.json()).message || ''; } catch {}
    throw new Error(`Server ${r.status} ${detail}`);
  }
  const data = await r.json();
  const responseText = (data.content || '').trim() || 'No response from Anthropic.';
  setMessages(m => [...m, { role: 'marty', text: responseText, time: new Date() }]);
} catch (err) {
  setMessages(m => [...m, {
    role: 'marty',
    text: `Connection error: ${err && err.message ? err.message : 'unknown'}`,
    time: new Date(),
    error: true
  }]);
} finally {
  setIsThinking(false);
}

};

const handleKeyDown = (e) => {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
handleSend();
}
};

const starters = [
{ label: 'Explain the edge', q: `Explain my current ${(p*100).toFixed(0)}% edge in plain English. Is it good? What does it mean in practice?` },
{ label: 'Period & data', q: `What period does this ${mode === 'paper' ? 'paper trading run' : mode === 'live' ? 'live trading run' : 'simulation'} cover? Which market and data feed?` },
{ label: 'Worst case math', q: 'What is my worst-case loss per sequence? How often does it happen?' },
{ label: 'Daily breakdown', q: 'How did I do today and this month? Best and worst day?' },
{ label: 'Sim vs Live', q: 'Am I in simulation or live mode? What does that mean for these numbers?' },
{ label: 'Recovery math', q: 'If I hit my N_max cap, how many wins do I need to recover that loss?' },
{ label: 'Should I be worried', q: 'Given my current edge and cap rate, should I be worried about ruin? Walk me through the risk.' },
{ label: 'Improve the strategy', q: 'What is the single highest-impact change I could make to improve expected value?' }
];

return (
<div className="mb-askmarty">
<aside className="mb-askmarty-sidebar">
<div className="mb-askmarty-sidebar-title">SUGGESTED QUESTIONS</div>
<div className="mb-askmarty-starters">
{starters.map((s, i) => (
<button
key={i}
className="mb-askmarty-starter"
onClick={() => handleSend(s.q)}
disabled={isThinking}
>
<span className="mb-askmarty-starter-label">{s.label}</span>
<span className="mb-askmarty-starter-q">{s.q}</span>
</button>
))}
</div>
<div className="mb-askmarty-foot">
<div className="mb-askmarty-foot-stat">
<span className="mb-askmarty-foot-label">SOURCE</span>
<span className="mono dim">live state</span>
</div>
<div className="mb-askmarty-foot-stat">
<span className="mb-askmarty-foot-label">MODE</span>
<span className={`mono ${mode === 'live' ? 'neg' : mode === 'paper' ? 'pos' : 'gold'}`}>{mode.toUpperCase()}</span>
</div>
<div className="mb-askmarty-foot-stat">
<span className="mb-askmarty-foot-label">EDGE</span>
<span className="mono gold">{(p * 100).toFixed(0)}% · {edgeClass.label}</span>
</div>
</div>
</aside>

  <main className="mb-askmarty-main">
    <div className="mb-askmarty-messages">
      {messages.length === 0 && (
        <div className="mb-askmarty-empty">
          <div className="mb-askmarty-empty-icon">
            <Sparkles size={28} strokeWidth={1.5} />
          </div>
          <div className="mb-askmarty-empty-title">Ask Marti anything</div>
          <div className="mb-askmarty-empty-sub">
            I can see your current simulation state and answer questions about edge, P&L,
            drawdowns, periods, and risk. Pick a starter on the left or type your own.
          </div>
          <div className="mb-askmarty-empty-tip mono">
            <kbd>Cmd</kbd>+<kbd>K</kbd> opens this view from anywhere
          </div>
        </div>
      )}
      {messages.map((msg, i) => (
        <ChatBubble key={i} msg={msg} />
      ))}
      {isThinking && <ChatBubble msg={{ role: 'marty', thinking: true }} />}
      <div ref={messagesEndRef} />
    </div>

    <div className="mb-askmarty-inputbar">
      <textarea
        ref={inputRef}
        className="mb-askmarty-input"
        placeholder="Ask Marti about your edge, P&L, period, worst case, mode..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isThinking}
        rows={1}
      />
      <button
        className="mb-askmarty-send"
        onClick={() => handleSend()}
        disabled={isThinking || !input.trim()}
      >
        <Send size={13} strokeWidth={2} />
        <span>Send</span>
      </button>
    </div>
  </main>
</div>

);
}

function ChatBubble({ msg }) {
if (msg.thinking) {
return (
<div className="mb-chatbubble mb-chatbubble-marty">
<div className="mb-chatbubble-avatar mb-chatbubble-avatar-marty">M</div>
<div className="mb-chatbubble-content">
<div className="mb-chatbubble-thinking">
<span></span><span></span><span></span>
</div>
</div>
</div>
);
}
const isUser = msg.role === 'user';
return (
<div className={`mb-chatbubble ${isUser ? 'mb-chatbubble-user' : 'mb-chatbubble-marty'}`}>
<div className={`mb-chatbubble-avatar ${isUser ? 'mb-chatbubble-avatar-user' : 'mb-chatbubble-avatar-marty'}`}>
{isUser ? 'A' : 'M'}
</div>
<div className="mb-chatbubble-content">
<div className={`mb-chatbubble-text ${msg.error ? 'mb-chatbubble-error' : ''}`}>
{parseMarkdown(msg.text)}
</div>
<div className="mb-chatbubble-time mono">
{msg.time?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
</div>
</div>
</div>
);
}

function parseMarkdown(text) {
if (!text) return null;
const lines = text.split('\n');
return lines.map((line, lineIdx) => {
const segments = line.split(/(\*\*[^*]+\*\*)/);
const parsed = segments.map((seg, segIdx) => {
if (seg.startsWith('**') && seg.endsWith('**')) {
return <strong key={segIdx}>{seg.slice(2, -2)}</strong>;
}
return <span key={segIdx}>{seg}</span>;
});
return (
<React.Fragment key={lineIdx}>
{parsed}
{lineIdx < lines.length - 1 && <br />}
</React.Fragment>
);
});
}

function buildAskMartySystemPrompt(ctx) {
const fmt2 = (v) => v?.toFixed(2);
const fmt3 = (v) => v?.toFixed(3);
const fmtInt = (v) => v ? Math.round(v).toLocaleString() : '—';

return `You are Marti, an AI co-pilot embedded inside the Marti dashboard - a martingale strategy simulator. You answer questions for Pete Sarubbi (an attorney exploring this strategy) and Anthony DellaPia (the strategy architect).

CURRENT STATE SNAPSHOT - use these exact numbers in every response:

MODE: ${ctx.mode}
${ctx.mode === 'SIM' ? '(Real market data, no capital at risk — outcomes are replayed, not synthetic)' : ctx.mode === 'PAPER' ? '(Real market data, simulated fills against real prices)' : '(Real market data, real capital, real fills — LIVE MONEY)'}

MARKET: ${ctx.market.label}

- Interval type: ${ctx.market.intervalLong}
- Intervals per day: ${ctx.market.intervalsPerDay}
- Outcome labels: ${ctx.market.winLabel} (win) / ${ctx.market.lossLabel} (loss)

DATA FEED: ${ctx.feed?.feed} (${ctx.feed?.symbol}), latency ${ctx.feed?.latency}

PARAMETERS:

- Win probability p: ${ctx.params.p} (${(ctx.params.p * 100).toFixed(0)}%)
- Base bet b0: $${ctx.params.b0}
- Multiplier m: ${ctx.params.m}
- Max steps N_max: ${ctx.params.N_max}
- Sequences simulated: ${ctx.params.num.toLocaleString()}

EDGE CLASSIFICATION: ${ctx.edge.classification}
"${ctx.edge.description}"
Breakeven edge required: ${(ctx.edge.breakevenP * 100).toFixed(2)}%
Margin over breakeven: ${((ctx.params.p - ctx.edge.breakevenP) * 100).toFixed(2)}pp

SIMULATION RESULTS:

- Net P&L: $${fmt2(ctx.results?.finalProfit)}
- Win rate: ${(ctx.results?.winRate * 100).toFixed(2)}%
- Cap events: ${ctx.results?.capCount} (${(ctx.results?.capRate * 100).toFixed(3)}%)
- Max drawdown: -$${fmt2(ctx.results?.maxDrawdown)}
- Peak equity: $${fmt2(ctx.results?.peak)}
- Avg sequence length: ${fmt2(ctx.results?.avgLength)} steps
- Max bet ever hit: $${fmt2(ctx.results?.maxBetEver)}
- Avg profit per sequence: $${ctx.results?.avgPerSeq?.toFixed(4)}

PERIOD (the dates this ${ctx.mode === 'PAPER' ? 'paper trading run' : ctx.mode === 'LIVE' ? 'live trading run' : 'simulation'} covers):
${ctx.period ? `- Start: ${ctx.period.startDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

- End: ${ctx.period.endDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
- Total days: ${fmt2(ctx.period.totalDays)}
- Total intervals tested: ${fmtInt(ctx.period.totalUnits)}` : '(period data not yet computed)'}

MONEY BREAKDOWN:
${ctx.moneyBreakdown ? `- Today's P&L: $${fmt2(ctx.moneyBreakdown.today?.pnl)}

- Today's sequence count: ${ctx.moneyBreakdown.today?.count || 0}
- This month P&L: $${fmt2(ctx.moneyBreakdown.monthPnl)} (${ctx.moneyBreakdown.monthLabel})
- This month sequences: ${ctx.moneyBreakdown.monthCount}
- Average daily P&L: $${fmt2(ctx.moneyBreakdown.avgDaily)}
- Best day: $${fmt2(ctx.moneyBreakdown.bestDay?.pnl)}
- Worst day: $${fmt2(ctx.moneyBreakdown.worstDay?.pnl)}` : '(money breakdown not available)'}

CONCURRENT EXPOSURE (5 parallel chains):
${ctx.concurrent ? `- Max simultaneous capital at risk: $${fmt2(ctx.concurrent.maxExposure)}

- Max chains deep simultaneously: ${ctx.concurrent.maxDeepCount}` : '(not available)'}

INTERVAL DATA:
${ctx.intervals ? `- Total intervals synthesized: ${ctx.intervals.totalIntervals.toLocaleString()}

- Longest consecutive losing streak observed: ${ctx.intervals.longestLossStreak}` : '(not available)'}

DERIVED:

- Worst-case loss per sequence: -$${ctx.derived.worstCaseLoss.toFixed(2)}
- Theoretical cap rate: ${(ctx.derived.theoreticalCapRate * 100).toFixed(3)}% (1 in ${Math.round(1/ctx.derived.theoreticalCapRate).toLocaleString()})
- Wins needed to recover one cap event: ${ctx.derived.winsToRecover}
- Edge over fair coin: ${ctx.derived.edgeOverFair.toFixed(1)}pp

RESPONSE RULES (follow strictly):

- Use the SPECIFIC NUMBERS from the snapshot above. Never invent or estimate.
- Lead with the answer in the first sentence. Explain after if needed.
- Direct and concise. No filler. No "I'd be happy to help." No "Great question."
- For edge questions, use casino framing ("a 55% edge is like being the casino with a 5-point house advantage")
- For probability math, show the calculation: (1 - 0.55)^6 ≈ 0.83%
- Use **bold** for the 1-3 most important numbers per response
- Plain-text tables when comparing multiple things
- Hyphens not em-dashes
- Acknowledge sim/paper/live mode clearly when discussing P&L
- Pete is an attorney, not a quant. Plain English wins.
- If asked for financial advice, redirect: "I can show you what the numbers say. The decision is yours."
- Max 5 short paragraphs. Trim ruthlessly. Quality over completeness.`;
  }

// ============================================================
// DEMO PRESETS ROW (one-click scenario loading for showcase)
// ============================================================

function DemoPresetRow({ applyPreset, currentP, currentMarket, exportState }) {
return (
<div className="mb-presets">
<div className="mb-presets-label">PRESETS</div>
<div className="mb-presets-buttons">
{DEMO_PRESETS.map(preset => {
const isActive = Math.abs(currentP - preset.p) < 0.001 && currentMarket === preset.market;
return (
<button
key={preset.id}
onClick={() => applyPreset(preset)}
className={`mb-preset-btn ${isActive ? 'mb-preset-btn-active' : ''}`}
title={preset.desc}
>
<span className="mb-preset-btn-label">{preset.label}</span>
<span className="mb-preset-btn-meta mono">p={preset.p}</span>
</button>
);
})}
</div>
<button onClick={exportState} className="mb-preset-export" title="Export current state as JSON">
<Download size={11} />
<span>Export</span>
</button>
</div>
);
}

// ============================================================
// CONCURRENT EXPOSURE CARD
// ============================================================

function ConcurrentExposure({ concurrent, b0, m, N_max, expectedWorst }) {
if (!concurrent) return null;
const ladderTotal = expectedWorst;
const concurrentRatio = concurrent.maxExposure / ladderTotal;

return (
<section className="mb-section">
<div className="mb-section-head mb-section-head-tight">
<h3 className="mb-section-title-sm">Concurrent Exposure <HelpIcon title="What is concurrent exposure?" explanation="If you run multiple sequences in parallel at the same time, this is the worst-case combined money at risk." example="5 parallel chains with max exposure $495 means at peak, 5 sequences had a combined $495 in play." /></h3>
<span className="mb-section-meta mono">{concurrent.numConcurrent} parallel chains · 8k ticks</span>
</div>
<div className="mb-concurrent">
<div className="mb-concurrent-stat">
<div className="mb-concurrent-stat-label">PEAK SIMULTANEOUS RISK</div>
<div className="mb-concurrent-stat-value mono neg">
{fmtMoney(-concurrent.maxExposure, 0)}
</div>
<div className="mb-concurrent-stat-meta">
<span className="mono">{(concurrentRatio).toFixed(2)}× </span>
<span className="dim">single-chain worst case ({fmtMoney(-ladderTotal, 0)})</span>
</div>
</div>

    {concurrent.worstMomentChains && (
      <div className="mb-concurrent-snapshot">
        <div className="mb-concurrent-snapshot-label">WORST MOMENT SNAPSHOT</div>
        <div className="mb-concurrent-chains">
          {concurrent.worstMomentChains.map((c, i) => {
            const isDeep = c.step >= Math.floor(N_max * 0.6);
            return (
              <div key={i} className={`mb-cchain ${isDeep ? 'mb-cchain-deep' : ''}`}>
                <div className="mb-cchain-id mono">#{i + 1}</div>
                <div className="mb-cchain-step">
                  <span className="mono">step {c.step}</span>
                </div>
                <div className={`mb-cchain-bet mono ${isDeep ? 'neg' : ''}`}>
                  {fmtMoney(-c.bet, 0)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-concurrent-explain">
          Worst observed: <strong className="mono">{concurrent.maxDeepCount}</strong> chains
          at step <strong className="mono">{Math.floor(N_max * 0.6)}+</strong> at the same time.
          Total capital tied up: <strong className="mono neg">{fmtMoney(-concurrent.maxExposure, 0)}</strong>.
        </div>
      </div>
    )}
  </div>
</section>

);
}

// ============================================================
// LOSS PATH (worst-case bet ladder waterfall)
// ============================================================

function LossPath({ b0, m, N_max }) {
const steps = [];
let cumulative = 0;
for (let k = 0; k < N_max; k++) {
const bet = b0 * Math.pow(m, k);
cumulative += bet;
steps.push({ step: k + 1, bet, cumulative });
}
const total = cumulative;
const maxBet = steps[steps.length - 1].bet;

return (
<div className="mb-losspath">
<div className="mb-losspath-head">
<div>
<div className="mb-losspath-title">If you lose all {N_max} steps in a row</div>
<div className="mb-losspath-sub mono">Each step doubles your previous bet at {m.toFixed(1)}× multiplier</div>
</div>
<div className="mb-losspath-total">
<span className="mb-losspath-total-label">TOTAL LOSS</span>
<span className="mono neg mb-losspath-total-val">{fmtMoney(-total, 0)}</span>
</div>
</div>
<div className="mb-losspath-grid">
{steps.map(s => {
const widthPct = (s.bet / maxBet) * 100;
return (
<div key={s.step} className="mb-losspath-row">
<div className="mb-losspath-stepnum mono">L{s.step}</div>
<div className="mb-losspath-barwrap">
<div className="mb-losspath-bar" style={{ width: `${widthPct}%` }}>
<span className="mb-losspath-bar-val mono">{fmtMoney(s.bet, 0)}</span>
</div>
</div>
<div className="mb-losspath-cum mono">
<span className="dim">cum </span>
<span className="neg">{fmtMoney(-s.cumulative, 0)}</span>
</div>
</div>
);
})}
</div>
</div>
);
}

// ============================================================
// OVERVIEW VIEW
// ============================================================

function OverviewView({ results, scenarios, p, b0, m, N_max, num, breakevenP, period, edgeClass, mode, market, expectedWorst, moneyBreakdown, dailySummary, concurrent, intervalData }) {
const [expanded, setExpanded] = useState(null);
if (!results || !scenarios) return <LoadingPanel />;

const sortedScens = [...scenarios].sort((a, b) => a.p - b.p);

return (
<div className="mb-view">
{/* MONEY TILES - dollar-focused glance layer */}
<MoneyTiles
moneyBreakdown={moneyBreakdown}
results={results}
expectedWorst={expectedWorst}
concurrent={concurrent}
mode={mode}
num={num}
/>

  {/* HERO NARRATIVE */}
  <MartySays
    p={p} b0={b0} m={m} N_max={N_max} num={num}
    results={results}
    period={period}
    expectedWorst={expectedWorst}
    edgeClass={edgeClass}
    market={market}
    mode={mode}
  />

  {/* PERIOD + EDGE STRIP */}
  <div className="mb-contextbar">
    <div className="mb-contextbar-item">
      <div className="mb-contextbar-label">SIMULATED PERIOD</div>
      <div className="mb-contextbar-value mono">
        {period && fmtPeriodRange(period)}
      </div>
      <div className="mb-contextbar-sub">
        {period && `${period.mkt.label} · ${period.totalUnits.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${period.mkt.unit}s`}
      </div>
    </div>
    <div className="mb-contextbar-divider"></div>
    <div className="mb-contextbar-item">
      <div className="mb-contextbar-label">CURRENT EDGE</div>
      <div className="mb-contextbar-value">
        <span className="mono">{(p * 100).toFixed(0)}%</span>
        <span className={`mb-edge-badge mb-edge-badge-${edgeClass.tone}`}>{edgeClass.label}</span>
      </div>
      <div className="mb-contextbar-sub">{edgeClass.desc}</div>
    </div>
  </div>

  <div className="mb-kpistrip">
    <KpiCell label="Net P&L" value={fmtMoney(results.finalProfit)} positive={results.finalProfit >= 0} primary />
    <KpiCell label="Win Rate" value={`${(results.winRate * 100).toFixed(2)}%`} />
    <KpiCell label="Cap Rate" value={`${(results.capRate * 100).toFixed(2)}%`} danger={results.capRate > 0.01} />
    <KpiCell label="Avg / Seq" value={fmtMoney(results.avgPerSeq, 3)} />
    <KpiCell label="Max DD" value={fmtMoney(-results.maxDrawdown)} danger />
    <KpiCell label="B/E Edge" value={`${(breakevenP * 100).toFixed(2)}%`} gold />
  </div>

  <section className="mb-section">
    <div className="mb-section-head">
      <div>
        <h2 className="mb-section-title">Scenario Performance <HelpIcon title="What is scenario performance?" explanation="The same strategy run across a range of win-rate scenarios (35%, 45%, 50%, 55%, 60%) so you can see how sensitive P&L is to edge." example="If 50% makes $0 but 55% makes $50k, the strategy is highly edge-dependent." /></h2>
        <p className="mb-section-sub">Ranked by net P&L across {Math.min(num, 5000).toLocaleString()} sequences each</p>
      </div>
      <div className="mb-section-meta mono mb-meta-hide-sm">
        N={N_max} · m={m.toFixed(1)} · b₀=${b0}
      </div>
    </div>

    <div className="mb-table">
      <div className="mb-table-head">
        <div className="mb-th mb-th-edge">EDGE</div>
        <div className="mb-th mb-th-num">WIN %</div>
        <div className="mb-th mb-th-num mb-th-hide-sm">CAPS</div>
        <div className="mb-th mb-th-num mb-th-hide-md">AVG / SEQ</div>
        <div className="mb-th mb-th-num mb-th-hide-sm">MAX DD</div>
        <div className="mb-th mb-th-num mb-th-pnl">NET P&L</div>
        <div className="mb-th mb-th-chev"></div>
      </div>

      {sortedScens.map((s, i) => {
        const isExp = expanded === s.p;
        const isHighlight = Math.abs(s.p - p) < 0.001;
        const pnlPositive = s.finalProfit >= 0;
        return (
          <div key={s.p}>
            <div
              className={`mb-tr ${isExp ? 'mb-tr-exp' : ''} ${isHighlight ? 'mb-tr-active' : ''}`}
              onClick={() => setExpanded(isExp ? null : s.p)}
            >
              <div className="mb-td mb-td-edge">
                <div className="mb-rank mono">{i + 1}</div>
                <div className="mb-edge-cell">
                  <span className="mono mb-edge-val">{(s.p * 100).toFixed(0)}%</span>
                  {isHighlight && <span className="mb-pill mb-pill-teal">CURRENT</span>}
                </div>
              </div>
              <div className="mb-td mb-td-num mono">{(s.winRate * 100).toFixed(1)}</div>
              <div className="mb-td mb-td-num mono mb-td-hide-sm">{s.capCount.toLocaleString()}</div>
              <div className="mb-td mb-td-num mono mb-td-hide-md">
                <span className={s.avgPerSeq >= 0 ? 'pos' : 'neg'}>
                  {fmtMoney(s.avgPerSeq, 3)}
                </span>
              </div>
              <div className="mb-td mb-td-num mono mb-td-hide-sm neg">
                {fmtMoney(-s.maxDrawdown, 0)}
              </div>
              <div className={`mb-td mb-td-num mb-td-pnl mono ${pnlPositive ? 'pos' : 'neg'}`}>
                <DeltaArrow positive={pnlPositive} />
                {fmtMoney(s.finalProfit, 0)}
              </div>
              <div className="mb-td mb-td-chev">
                <ChevronRight size={12} className={isExp ? 'mb-rotate' : ''} />
              </div>
            </div>

            {isExp && (
              <div className="mb-tr-detail">
                <div className="mb-detail-grid">
                  <DetailRow label="Sequences" value={Math.min(num, 5000).toLocaleString()} />
                  <DetailRow label="Cap rate" value={`${(s.capRate * 100).toFixed(3)}%`} />
                  <DetailRow label="Avg length" value={s.avgLength.toFixed(2)} />
                  <DetailRow label="Max bet hit" value={fmtMoney(s.maxBetEver, 0)} />
                  <DetailRow label="Peak equity" value={fmtMoney(s.peak, 0)} />
                  <DetailRow label="Theoretical cap" value={`${(Math.pow(1 - s.p, N_max) * 100).toFixed(3)}%`} />
                </div>
                <div className="mb-spark">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={s.equitySampled} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                      <defs>
                        <linearGradient id={`g-${(s.p * 100).toFixed(0)}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={pnlPositive ? '#3d6e52' : '#c44545'} stopOpacity={0.28} />
                          <stop offset="100%" stopColor={pnlPositive ? '#3d6e52' : '#c44545'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <ReferenceLine y={0} stroke="#2a2d33" strokeDasharray="2 2" />
                      <Area
                        type="monotone"
                        dataKey="y"
                        stroke={pnlPositive ? '#3d6e52' : '#c44545'}
                        strokeWidth={1.2}
                        fill={`url(#g-${(s.p * 100).toFixed(0)})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>

  {/* DAILY BREAKDOWN */}
  <DailyBreakdown dailySummary={dailySummary} moneyBreakdown={moneyBreakdown} />

  {/* STEP TIMELINE - how steps map to innings/hours/bars */}
  <StepTimeline N_max={N_max} market={market} b0={b0} m={m} p={p} />

  {/* INTERVAL MAP - visual heatmap of W/L per interval, chunked by day */}
  <IntervalMap intervalData={intervalData} market={market} N_max={N_max} />

  <div className="mb-grid-2">
    <section className="mb-section">
      <div className="mb-section-head mb-section-head-tight">
        <h3 className="mb-section-title-sm">Current Equity Curve <HelpIcon title="What is the equity curve?" explanation="Running cumulative P&L across every sequence, in order. The shape shows whether profits grow steadily or in bursts." example="A smoothly rising line means consistent wins. Sudden drops are cap events." /></h3>
        <span className="mb-section-meta mono">{num.toLocaleString()} seq</span>
      </div>
      <div className="mb-chart-lg">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={results.equitySampled} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="gMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d6e52" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#3d6e52" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
            <XAxis
              dataKey="x"
              stroke="#52524a"
              tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              axisLine={{ stroke: '#2a2d33' }}
              tickLine={false}
            />
            <YAxis
              stroke="#52524a"
              tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }}
              tickFormatter={(v) => `${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              axisLine={{ stroke: '#2a2d33' }}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<ChartTooltip prefix="$" labelPrefix="Seq #" />} />
            <ReferenceLine y={0} stroke="#2a2d33" strokeDasharray="2 2" />
            <ReferenceLine y={results.peak} stroke="#c7a26b" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Area type="monotone" dataKey="y" stroke="#3d6e52" strokeWidth={1.4} fill="url(#gMain)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>

    <section className="mb-section">
      <div className="mb-section-head mb-section-head-tight">
        <h3 className="mb-section-title-sm">Outcome Distribution <HelpIcon title="What is the outcome distribution?" explanation="How many sequences ended at each step (won on step 1, step 2, etc.) plus how many hit the cap." example="Most sequences should peak at step 1 (immediate win); a small red bar at N_max shows cap events." /></h3>
        <span className="mb-section-meta mono">avg {results.avgLength.toFixed(2)} steps</span>
      </div>
      <div className="mb-chart-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={results.lengthDist} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
            <XAxis dataKey="step" stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} />
            <YAxis stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={50} />
            <Tooltip content={<ChartTooltip labelPrefix="Step " />} />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {results.lengthDist.map((d, i) => (
                <Cell key={i} fill={(d.isCap && d.count > 0) ? '#c44545' : '#3d6e52'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  </div>
</div>

);
}

// ============================================================
// WORKSPACE VIEW
// ============================================================

function WorkspaceView({
results, running, p, setP, b0, setB0, m, setM, N_max, setNMax,
num, setNum, market, setMarket, odds, setOdds, onRun, expectedWorst, period, edgeClass, mode,
concurrent, moneyBreakdown, applyPreset, exportState
}) {
const [chartTab, setChartTab] = useState('equity');

const handleMarket = (id) => {
setMarket(id);
const mkt = MARKETS.find(x => x.id === id);
if (mkt && id !== 'custom') setP(mkt.p);
};

if (!results) return <LoadingPanel />;

return (
<div className="mb-view">
{/* DEMO PRESETS - one-click scenario loading */}
<DemoPresetRow
applyPreset={applyPreset}
currentP={p}
currentMarket={market}
exportState={exportState}
/>

  <div className="mb-controlbar">
    <div className="mb-controlbar-label">MARKET</div>
    <div className="mb-segmented">
      {MARKETS.map(mkt => {
        const Icon = mkt.icon;
        const active = market === mkt.id;
        return (
          <button
            key={mkt.id}
            onClick={() => handleMarket(mkt.id)}
            className={`mb-segbtn ${active ? 'mb-segbtn-active' : ''}`}
          >
            <Icon size={11} />
            <span>{mkt.label}</span>
          </button>
        );
      })}
    </div>
  </div>

  {/* PERIOD + EDGE CONTEXT */}
  <div className="mb-contextbar">
    <div className="mb-contextbar-item">
      <div className="mb-contextbar-label">SIMULATED PERIOD</div>
      <div className="mb-contextbar-value mono">
        {period && fmtPeriodRange(period)}
      </div>
      <div className="mb-contextbar-sub">
        {period && `${period.mkt.label} · ${period.totalUnits.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${period.mkt.unit}s${period.mkt.continuous ? '' : ' · market hours only'}`}
      </div>
    </div>
    <div className="mb-contextbar-divider"></div>
    <div className="mb-contextbar-item">
      <div className="mb-contextbar-label">EDGE CLASSIFICATION</div>
      <div className="mb-contextbar-value">
        <span className="mono">{(p * 100).toFixed(0)}%</span>
        <span className={`mb-edge-badge mb-edge-badge-${edgeClass.tone}`}>{edgeClass.label}</span>
      </div>
      <div className="mb-contextbar-sub">{edgeClass.desc}</div>
    </div>
  </div>
  {market === 'spx1h' && (
    <div className="mb-spx-disclosure">
      Note: SPX 1H uses SPY ETF prices as a proxy for S&amp;P 500 because TwelveData doesn't provide direct SPX data on free tier.
      Real prediction markets (e.g. IBKR ForecastTrader, Kalshi) may have non-parity contract pricing and slippage that affect
      realized P&amp;L. This dashboard tests pure market direction; market structure costs are not modeled.
    </div>
  )}

  <div className="mb-parambar">
    <ParamControl
      label={<>{market === 'custom' ? 'p' : 'p̂'} <HelpIcon title="What is the win rate?" explanation="How often a single bet wins. 50% means each bet is a coin flip." example="BTC 15-minute price changes win about 50% of the time (almost a true coin flip)." /></>}
      hint={market === 'custom' ? 'Win prob' : 'Observed win rate'}
      value={`${(p * 100).toFixed(1)}%`}
    >
      <input
        type="range"
        min={0.40}
        max={0.65}
        step={0.01}
        value={p}
        onChange={e => { if (market === 'custom') setP(parseFloat(e.target.value)); }}
        className="mb-slider"
        disabled={market !== 'custom'}
        readOnly={market !== 'custom'}
        title={market !== 'custom' ? 'Read-only — derived from real outcomes' : 'Drag to set win probability'}
      />
      <EdgeMeter p={p} />
    </ParamControl>
    <ParamControl label={<>b₀ <Hint term="Base bet">The first bet at the start of each sequence. Doubled (×m) after each loss until win or cap.</Hint></>} hint="Base bet">
      <NumberField value={b0} onCommit={setB0} defaultValue={5} min={1} step={1} integer ariaLabel="Base bet" />
    </ParamControl>
    <ParamControl label={<>m <Hint term="Multiplier">Factor by which the bet is multiplied after each loss. 2× is classic Martingale; lower values grow exposure more slowly.</Hint></>} hint="Multiplier">
      <NumberField value={m} onCommit={setM} defaultValue={2} min={1.1} max={5} step={0.1} ariaLabel="Multiplier" />
    </ParamControl>
    <ParamControl label={<>N <Hint term="N_max (cap)">Max consecutive losses before the bot gives up on a sequence and accepts the cumulative loss. Caps tail risk at the cost of conceding some sequences.</Hint></>} hint="Max steps">
      <NumberField value={N_max} onCommit={setNMax} defaultValue={6} min={2} max={12} step={1} integer ariaLabel="Max ladder steps" />
    </ParamControl>
    <ParamControl label={<># <HelpIcon title="What is a sequence?" explanation="One round of the betting strategy from start to end (either a win or hitting the cap)." example="10,000 sequences means we simulate 10,000 separate rounds to see the overall results." /></>} hint="Sequences">
      <NumberField value={num} onCommit={setNum} defaultValue={10000} min={100} max={50000} step={1000} integer ariaLabel="Sequence count" />
    </ParamControl>
    <ParamControl
      label={<>odds <HelpIcon title="What are assumed odds?" explanation="American odds for your bets. +100 means parity (winning $1 for every $1 bet). -150 means you bet $1.50 to win $1 — typical sportsbook line. Real markets are rarely +100." example="MLB no-score inning typically trades at -200 to -250 (sportsbooks) or 60–75¢ on Kalshi." /></>}
      hint="American"
      value={`${payoutMultiplier(odds).toFixed(2)}× payout`}
    >
      <NumberField
        value={odds}
        onCommit={(v) => { if (v !== 0) setOdds(v); }}
        defaultValue={MARKET_DEFAULTS[market]?.defaultOdds ?? 100}
        min={-1000}
        max={1000}
        step={10}
        integer
        ariaLabel="Assumed American odds"
      />
    </ParamControl>
    <div className="mb-param-actions">
      <button
        onClick={() => onRun()}
        disabled={running}
        className={`mb-runbtn ${running ? 'mb-runbtn-running' : ''}`}
        aria-busy={running}
      >
        {running ? (
          <>
            <span className="mb-spinner"></span>
            <span>Running…</span>
          </>
        ) : (
          <>
            <Play size={11} fill="currentColor" />
            <span>RUN</span>
          </>
        )}
      </button>
      {market !== 'custom' && (
        <button
          onClick={() => onRun({ force: true })}
          disabled={running}
          className="mb-runbtn mb-runbtn-ghost"
          title="Re-fetch real market data (bypass 6h cache)"
        >
          <span>↻ Refresh data</span>
        </button>
      )}
    </div>
  </div>

  <div className="mb-cardgrid">
    <Card title="Net P&L" emph>
      <div className={`mb-card-value mono ${results.finalProfit >= 0 ? 'pos' : 'neg'}`}>
        {fmtMoney(results.finalProfit, 0)}
      </div>
      <div className="mb-card-meta">
        <DeltaArrow positive={results.finalProfit >= 0} size={10} />
        <span className="mono">{((results.finalProfit / (b0 * num)) * 100).toFixed(2)}%</span>
        <span className="mb-card-meta-sep">ROI</span>
      </div>
    </Card>

    <Card title="Worst Case">
      <div className="mb-card-value mono gold">
        {fmtMoney(-expectedWorst, 0)}
      </div>
      <div className="mb-card-meta">
        <span className="mono">{N_max} losses</span>
        <span className="mb-card-meta-sep">at {m.toFixed(1)}×</span>
      </div>
    </Card>

    <Card title="Cap Events">
      <div className={`mb-card-value mono ${results.capRate > 0.005 ? 'neg' : ''}`}>
        {results.capCount.toLocaleString()}
      </div>
      <div className="mb-card-meta">
        <span className="mono">{(results.capRate * 100).toFixed(3)}%</span>
        <span className="mb-card-meta-sep">of runs</span>
      </div>
    </Card>

    <Card title="Max DD">
      <div className="mb-card-value mono neg">
        {fmtMoney(-results.maxDrawdown, 0)}
      </div>
      <div className="mb-card-meta">
        <span className="mono">peak {fmtMoney(results.peak, 0)}</span>
      </div>
    </Card>
  </div>

  <section className="mb-section">
    <div className="mb-controlbar mb-controlbar-inset">
      <div className="mb-segmented mb-segmented-sm">
        {[
          { id: 'equity', label: 'Equity Curve' },
          { id: 'lengths', label: 'Length Dist' },
          { id: 'bets', label: 'Exposure' },
          { id: 'losspath', label: 'Loss Path' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setChartTab(t.id)}
            className={`mb-segbtn ${chartTab === t.id ? 'mb-segbtn-active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <span className="mb-section-meta mono">
        {chartTab === 'equity' && `peak ${fmtMoney(results.peak, 0)}`}
        {chartTab === 'lengths' && `avg ${results.avgLength.toFixed(2)} steps`}
        {chartTab === 'bets' && `max ${fmtMoney(results.maxBetEver, 0)}`}
        {chartTab === 'losspath' && `worst case ${fmtMoney(-expectedWorst, 0)}`}
      </span>
    </div>

    <div className="mb-chart-xl">
      {chartTab === 'equity' && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={results.equitySampled} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gWS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d6e52" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3d6e52" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
            <XAxis
              dataKey="x"
              stroke="#52524a"
              tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              axisLine={{ stroke: '#2a2d33' }}
              tickLine={false}
            />
            <YAxis
              stroke="#52524a"
              tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              axisLine={{ stroke: '#2a2d33' }}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<ChartTooltip prefix="$" labelPrefix="Seq #" />} />
            <ReferenceLine y={0} stroke="#2a2d33" strokeDasharray="2 2" />
            <ReferenceLine y={results.peak} stroke="#c7a26b" strokeDasharray="3 3" strokeOpacity={0.5} />
            <Area type="monotone" dataKey="y" stroke="#3d6e52" strokeWidth={1.4} fill="url(#gWS)" />
          </AreaChart>
        </ResponsiveContainer>
      )}
      {chartTab === 'lengths' && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={results.lengthDist} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
            <XAxis dataKey="step" stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} />
            <YAxis stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={56} />
            <Tooltip content={<ChartTooltip labelPrefix="Step " />} />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {results.lengthDist.map((d, i) => (
                <Cell key={i} fill={(d.isCap && d.count > 0) ? '#c44545' : '#3d6e52'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {chartTab === 'bets' && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={results.betDist} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
            <XAxis dataKey="tier" stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} />
            <YAxis stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={56} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {results.betDist.map((d, i) => (
                <Cell key={i} fill={d.isCap ? '#c7a26b' : '#3d6e52'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {chartTab === 'losspath' && (
        <div className="mb-chart-inset">
          <LossPath b0={b0} m={m} N_max={N_max} />
        </div>
      )}
    </div>
  </section>

  {/* CONCURRENT EXPOSURE */}
  <ConcurrentExposure
    concurrent={concurrent}
    b0={b0} m={m} N_max={N_max}
    expectedWorst={expectedWorst}
  />

  <section className="mb-section">
    <div className="mb-section-head mb-section-head-tight">
      <h3 className="mb-section-title-sm">Recent Sequences <HelpIcon title="What is this list?" explanation="The most recent simulated sequences with each one's outcome and P&L. Useful for spot-checking specific edge cases." example="Click a row to expand the bet-by-bet ladder for that sequence." /></h3>
      <span className="mb-section-meta mono">last 30 of {num.toLocaleString()}</span>
    </div>
    <div className="mb-ledger">
      <div className="mb-ledger-head">
        <span>ID</span>
        <span>STATUS</span>
        <span className="mb-num">STEPS</span>
        <span className="mb-num mb-ledger-hide-sm">MAX BET</span>
        <span className="mb-num">P&L</span>
        <span className="mb-num mb-ledger-hide-sm">CUMULATIVE</span>
      </div>
      <div className="mb-ledger-body">
        {results.recent.map((s, i) => {
          // approximate cumulative: assume recent[0] is latest, so reverse-index for cumulative
          // we don't store true cumulative per sequence, so use results.finalProfit and back-calc
          const idxFromEnd = i;
          const back = results.recent.slice(0, i + 1).reduce((acc, x) => acc + x.profit, 0);
          const cum = results.finalProfit - back + s.profit;
          return (
            <div key={s.id} className="mb-ledger-row">
              <span className="mono dim">#{s.id.toLocaleString()}</span>
              <span>
                {s.status === 'win' ? (
                  <span className="mb-tag mb-tag-teal">
                    <Circle size={6} fill="currentColor" />
                    WON
                  </span>
                ) : (
                  <span className="mb-tag mb-tag-red">
                    <AlertCircle size={9} strokeWidth={2} />
                    CAP
                  </span>
                )}
              </span>
              <span className="mono mb-num">{s.length}</span>
              <span className="mono mb-num mb-ledger-hide-sm">{fmtMoney(s.maxBet, 0)}</span>
              <span className={`mono mb-num ${s.profit >= 0 ? 'pos' : 'neg'}`}>
                {fmtMoney(s.profit, 0)}
              </span>
              <span className={`mono mb-num mb-ledger-hide-sm ${cum >= 0 ? 'pos' : 'neg'}`}>
                {fmtMoney(cum, 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
</div>

);
}

// ============================================================
// INSIGHTS VIEW
// ============================================================

function InsightsView({ results, scenarios, p, b0, m, N_max, num, expectedWorst, breakevenP, period, edgeClass, mode, market }) {
if (!results || !scenarios) return <LoadingPanel />;

const sortedScens = [...scenarios].sort((a, b) => b.finalProfit - a.finalProfit);
const best = sortedScens[0];
const worst = sortedScens[sortedScens.length - 1];
const spread = best.finalProfit - worst.finalProfit;
const theoreticalCap = Math.pow(1 - p, N_max);
const observedCap = results.capRate;
const variance = theoreticalCap > 0 ? ((observedCap - theoreticalCap) / theoreticalCap) * 100 : 0;
const winsToRecover = Math.ceil(expectedWorst / b0);
const profitFactor = results.capCount > 0
? ((num - results.capCount) * b0 / (results.capCount * expectedWorst))
: null;

const insights = [
{
title: 'EDGE DECODED',
help: { title: "What is edge?", explanation: "How much more often you win than you'd expect from a fair coin flip. 50% is no edge; higher is profitable territory.", example: "p = 51% means you win 51 of every 100 bets — a 1-percentage-point edge." },
headline: `${(p * 100).toFixed(0)}%`,
headlineColor: edgeClass.tone,
sub: edgeClass.label.toUpperCase(),
rows: [
['Wins per 100 trades', `${Math.round(p * 100)}`, 'pos'],
['Losses per 100', `${100 - Math.round(p * 100)}`, 'neg'],
['Edge over fair coin', `${((p - 0.5) * 100).toFixed(1)}pp`, p > 0.5 ? 'pos' : 'neg'],
['Realistic ceiling', '~55%', 'gold']
]
},
{
title: 'TIME HORIZON',
help: { title: "What is the time horizon?", explanation: "How long the test ran in real-world days, plus the data window the results came from.", example: "180 days means we tested across 6 months of real market data." },
headline: period ? fmtDurationShort(period.totalDays) : '—',
headlineColor: 'gold',
rows: period ? [
['Start', fmtDateShort(period.startDate)],
['End', fmtDateShort(period.endDate)],
[`${period.mkt.unit}s`, period.totalUnits.toLocaleString(undefined, { maximumFractionDigits: 0 })],
['Min per unit', `${period.mkt.mpu}`]
] : []
},
{
title: 'BREAKEVEN EDGE',
help: { title: "What is breakeven edge?", explanation: "The win rate you'd need for the strategy to come out neutral (no profit, no loss).", example: "54.67% breakeven means: if you win 54.67% of bets, you'd break even. Above that is profit, below is loss." },
headline: `${(breakevenP * 100).toFixed(2)}%`,
headlineColor: 'gold',
rows: [
['Required p', `${(breakevenP * 100).toFixed(2)}%`],
['Current p', `${(p * 100).toFixed(2)}%`, p >= breakevenP ? 'pos' : 'neg'],
['Margin', `${((p - breakevenP) * 100).toFixed(2)}pp`, p >= breakevenP ? 'pos' : 'neg'],
['Verdict', p >= breakevenP ? 'PROFITABLE' : 'NEGATIVE EV', p >= breakevenP ? 'teal' : 'red']
]
},
{
title: 'BEST ALTERNATIVE',
help: { title: "What is the best alternative?", explanation: "Of all the scenarios we tested, which one would have made the most money — and how much better than the current setup.", example: "55% edge with +$22k profit means a stronger-edge scenario would have made $22k more than your current settings." },
headline: `${(best.p * 100).toFixed(0)}% edge`,
headlineColor: 'teal',
rows: [
['Net P&L', fmtMoney(best.finalProfit, 0), best.finalProfit >= 0 ? 'pos' : 'neg'],
['Cap rate', `${(best.capRate * 100).toFixed(3)}%`],
['Win rate', `${(best.winRate * 100).toFixed(2)}%`],
['vs current', best.p === p ? 'Active' : fmtMoney(best.finalProfit - results.finalProfit, 0), best.p === p ? 'teal' : ((best.finalProfit - results.finalProfit) >= 0 ? 'pos' : 'neg')]
]
},
{
title: 'TAIL RISK',
help: { title: "What is tail risk?", explanation: "Rare but devastating events — the small chance of a big loss.", example: "1 in 66 chance of hitting the cap means once every 66 sequences you lose the full per-sequence max." },
headline: theoreticalCap > 0 ? `1 in ${Math.round(1 / theoreticalCap).toLocaleString()}` : '—',
rows: [
['Theoretical', `${(theoreticalCap * 100).toFixed(3)}%`],
['Observed', `${(observedCap * 100).toFixed(3)}%`],
['Variance', `${variance >= 0 ? '+' : ''}${variance.toFixed(1)}%`, Math.abs(variance) > 20 ? 'red' : 'dim'],
['Loss / cap', fmtMoney(-expectedWorst, 0), 'neg']
]
},
{
title: 'RECOVERY MATH',
help: { title: "What is recovery math?", explanation: "How many winning sequences it takes to recover from a single cap event.", example: "63 wins means: after one cap (a $315 loss), you'd need 63 successful sequences to climb back to breakeven." },
headline: `${winsToRecover} wins`,
rows: [
['Per cap event', fmtMoney(-expectedWorst, 0), 'neg'],
['Per win', fmtMoney(b0, 0), 'pos'],
['Wins needed', `${winsToRecover}`, 'gold'],
['Recovery cost', `${(winsToRecover / num * 100).toFixed(2)}% of run`]
]
},
{
title: 'EXPOSURE LADDER',
help: { title: "What is the exposure ladder?", explanation: "The size of each bet as it doubles, and how much total money is on the line by the final step.", example: "$5 → $160 final bet, $315 total exposure — that's 63× leverage off your $5 base bet." },
headline: fmtMoney(b0 * Math.pow(m, N_max - 1), 0),
headlineColor: 'gold',
rows: [
['Step 1 bet', fmtMoney(b0, 0)],
['Final step bet', fmtMoney(b0 * Math.pow(m, N_max - 1), 0)],
['Total exposure', fmtMoney(expectedWorst, 0), 'gold'],
['Leverage', `${(expectedWorst / b0).toFixed(0)}× base`]
]
},
{
title: 'PROFIT FACTOR',
help: { title: "What is profit factor?", explanation: "Total dollars won divided by total dollars lost. Above 1.0 = wins outpace losses.", example: "1.05 means for every $1 lost, you earn $1.05 back — barely profitable but positive." },
headline: profitFactor ? profitFactor.toFixed(2) : '∞',
headlineColor: profitFactor && profitFactor >= 1 ? 'teal' : 'red',
rows: [
['Gross wins', fmtMoney((num - results.capCount) * b0, 0), 'pos'],
['Gross losses', fmtMoney(results.capCount * expectedWorst, 0), 'neg'],
['Ratio', profitFactor ? profitFactor.toFixed(2) : 'No caps', profitFactor && profitFactor >= 1 ? 'pos' : 'neg'],
['Verdict', profitFactor && profitFactor >= 1 ? 'WINS COVER' : 'LOSSES WIN', profitFactor && profitFactor >= 1 ? 'teal' : 'red']
]
}
];

return (
<div className="mb-view">
{/* EDGE BENCHMARK TABLE */}
<section className="mb-section">
<div className="mb-section-head">
<div>
<h2 className="mb-section-title">What does edge mean? <HelpIcon title="What does edge mean?" explanation="A 'benchmark' showing where your current win rate sits on the real-world spectrum from coin flip (50%) to consistent edge (~55%)." example="51% places you in 'marginal edge' territory — profitable but not by much." /></h2>
<p className="mb-section-sub">Where the current {(p * 100).toFixed(0)}% win probability sits on the real-world benchmark</p>
</div>
<div className="mb-section-meta mono mb-meta-hide-sm">
current p = {(p * 100).toFixed(0)}%
</div>
</div>
<div className="mb-benchtable">
{EDGE_BENCHMARKS.map(b => {
const isCurrent = Math.abs(b.p - p) < 0.005 || (b === EDGE_BENCHMARKS.find(x => p < x.p + 0.01 && p >= x.p - 0.01));
const matchesBand = (p >= b.p && p < (EDGE_BENCHMARKS[EDGE_BENCHMARKS.indexOf(b) + 1]?.p ?? 1));
return (
<div key={b.p} className={`mb-benchrow ${matchesBand ? 'mb-benchrow-active' : ''}`}>
<div className="mb-benchrow-p mono">{(b.p * 100).toFixed(0)}%</div>
<div className="mb-benchrow-label">{b.label}</div>
<div className="mb-benchrow-desc">{b.desc}</div>
<div className="mb-benchrow-marker">
{matchesBand && <span className="mb-pill mb-pill-teal">YOU ARE HERE</span>}
</div>
</div>
);
})}
</div>
</section>

  <div className="mb-insights-grid">
    {insights.map((ins, i) => (
      <InsightCard key={i} insight={ins} />
    ))}
  </div>
</div>

);
}

function InsightCard({ insight }) {
const headlineClass =
insight.headlineColor === 'teal' ? 'pos' :
insight.headlineColor === 'gold' ? 'gold' :
insight.headlineColor === 'red' ? 'neg' : '';
return (
<div className="mb-insight">
<div className="mb-insight-title">{insight.title}{insight.help && <HelpIcon {...insight.help} />}</div>
<div className={`mb-insight-headline mono ${headlineClass}`}>
{insight.headline}
</div>
{insight.sub && (
<div className="mb-insight-sub">{insight.sub}</div>
)}
<div className="mb-insight-rows">
{insight.rows.map((r, j) => {
const valClass =
r[2] === 'pos' || r[2] === 'teal' ? 'pos' :
r[2] === 'neg' || r[2] === 'red' ? 'neg' :
r[2] === 'gold' ? 'gold' :
r[2] === 'dim' ? 'dim' : '';
return (
<div key={j} className="mb-insight-row">
<span className="mb-insight-row-label">{r[0]}</span>
<span className={`mb-insight-row-val mono ${valClass}`}>{r[1]}</span>
</div>
);
})}
</div>
</div>
);
}

// ============================================================
// EDGE METER (inline benchmark scale)
// ============================================================

function EdgeMeter({ p }) {
// Track from 40% to 65% mapped to 0..100%
const pct = Math.max(0, Math.min(1, (p - 0.40) / (0.65 - 0.40))) * 100;
const cls = classifyEdge(p);
const markers = [
{ p: 0.50, label: 'Coin' },
{ p: 0.53, label: 'Sharp' },
{ p: 0.55, label: 'Strong' },
{ p: 0.58, label: 'Elite' }
];
return (
<div className="mb-edgemeter">
<div className="mb-edgemeter-track">
{markers.map(m => {
const left = ((m.p - 0.40) / (0.65 - 0.40)) * 100;
return (
<div key={m.p} className="mb-edgemeter-tick" style={{ left: `${left}%` }}>
<div className="mb-edgemeter-tickline"></div>
<div className="mb-edgemeter-ticklabel mono">{m.label}</div>
</div>
);
})}
<div
className={`mb-edgemeter-pointer mb-edgemeter-pointer-${cls.tone}`}
style={{ left: `${pct}%` }}
></div>
</div>
<div className={`mb-edgemeter-verdict mb-edgemeter-verdict-${cls.tone}`}>
{cls.label}
</div>
</div>
);
}

// ============================================================
// SHARED
// ============================================================

function KpiCell({ label, value, positive, danger, gold, primary }) {
const cls = primary
? (positive ? 'pos' : 'neg')
: danger ? 'neg' : gold ? 'gold' : positive ? 'pos' : '';
return (
<div className={`mb-kpi ${primary ? 'mb-kpi-primary' : ''}`}>
<div className="mb-kpi-label">{label}</div>
<div className={`mb-kpi-value mono ${cls}`}>{value}</div>
</div>
);
}

function Card({ title, emph, children }) {
return (
<div className={`mb-card ${emph ? 'mb-card-emph' : ''}`}>
<div className="mb-card-title">{title}</div>
{children}
</div>
);
}

function ParamControl({ label, hint, value, children }) {
return (
<div className="mb-param">
<div className="mb-param-head">
<span className="mb-param-label mono">{label}</span>
<span className="mb-param-hint">{hint}</span>
{value && <span className="mb-param-val mono">{value}</span>}
</div>
{children}
</div>
);
}

function DetailRow({ label, value }) {
return (
<div className="mb-detail-row">
<span className="mb-detail-label">{label}</span>
<span className="mb-detail-val mono">{value}</span>
</div>
);
}

function ChartTooltip({ active, payload, label, prefix = '', labelPrefix = '' }) {
if (!active || !payload || !payload.length) return null;
return (
<div className="mb-tooltip">
<div className="mb-tooltip-label mono">{labelPrefix}{label}</div>
<div className="mb-tooltip-val mono">
{prefix}{Number(payload[0].value).toLocaleString()}
</div>
</div>
);
}

function DeltaArrow({ positive, size = 9 }) {
if (positive) return <ArrowUp size={size} strokeWidth={2.5} />;
return <ArrowDown size={size} strokeWidth={2.5} />;
}

// v9 Polish: Number input that allows empty state, commits on blur/Enter, resets to default on clear.
function NumberField({ value, onCommit, defaultValue, min, max, step = 1, integer, ariaLabel }) {
  const [displayValue, setDisplayValue] = useState(String(value));
  const focusedRef = useRef(false);
  useEffect(() => {
    if (!focusedRef.current) setDisplayValue(String(value));
  }, [value]);

  const commit = (raw) => {
    if (raw === '' || raw == null) {
      onCommit(defaultValue);
      setDisplayValue(String(defaultValue));
      return;
    }
    const n = integer ? parseInt(raw, 10) : parseFloat(raw);
    if (!Number.isFinite(n)) {
      onCommit(defaultValue);
      setDisplayValue(String(defaultValue));
      return;
    }
    let clamped = n;
    if (min != null) clamped = Math.max(min, clamped);
    if (max != null) clamped = Math.min(max, clamped);
    onCommit(clamped);
    setDisplayValue(String(clamped));
  };

  return (
    <div className="mb-numfield">
      <input
        type="number"
        value={displayValue}
        min={min}
        max={max}
        step={step}
        onChange={e => setDisplayValue(e.target.value)}
        onFocus={() => { focusedRef.current = true; }}
        onBlur={() => { focusedRef.current = false; commit(displayValue); }}
        onKeyDown={e => { if (e.key === 'Enter') { e.currentTarget.blur(); } }}
        className="mb-numinput mono"
        aria-label={ariaLabel}
      />
      <button
        type="button"
        onMouseDown={e => e.preventDefault()}
        onClick={() => commit('')}
        className="mb-numfield-reset"
        title={`Reset to ${defaultValue}`}
        aria-label={`Reset to ${defaultValue}`}
      >×</button>
    </div>
  );
}

// v9.0.2 / v9.1.1: Structured help popover with title/explanation/example. Single-open across
// the app (opening one fires a custom event that closes other open instances). Renders the
// popover into document.body via createPortal so it escapes parent stacking contexts and is
// never clipped by card/table borders or chart surfaces. Position is computed from the
// trigger's bounding rect and flips to keep the popover on-screen. Mobile (<560px) uses a
// fixed centered modal with a backdrop.
const HELP_POPUP_W = 280;
function HelpIcon({ title, explanation, example }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const triggerRef = useRef(null);
  const id = useId();

  const computePos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 560;
    if (isMobile) { setPos({ mobile: true }); return; }
    const w = HELP_POPUP_W;
    const margin = 8;
    // Prefer above the trigger; flip below if it would clip off the top
    let left = r.left + r.width / 2 - w / 2;
    if (left + w + margin > window.innerWidth) left = window.innerWidth - w - margin;
    if (left < margin) left = margin;
    const placeAbove = r.top > 200; // rough heuristic
    setPos({ left, top: placeAbove ? null : r.bottom + 8, bottom: placeAbove ? (window.innerHeight - r.top + 8) : null });
  }, []);

  useEffect(() => {
    if (!open) return;
    computePos();
    const onOtherOpen = (e) => { if (e.detail !== id) setOpen(false); };
    const onDocClick = (e) => {
      const t = e.target;
      if (t && (t.closest('.mb-help-popup') || t.closest('.mb-help-icon'))) return;
      setOpen(false);
    };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onReflow = () => { computePos(); };
    window.addEventListener('mb-help-open', onOtherOpen);
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, true);
    return () => {
      window.removeEventListener('mb-help-open', onOtherOpen);
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
      window.removeEventListener('resize', onReflow);
      window.removeEventListener('scroll', onReflow, true);
    };
  }, [open, id, computePos]);

  const toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!open) window.dispatchEvent(new CustomEvent('mb-help-open', { detail: id }));
    setOpen(o => !o);
  };

  const popupStyle = pos && !pos.mobile
    ? { position: 'fixed', left: `${pos.left}px`, ...(pos.top != null ? { top: `${pos.top}px` } : { bottom: `${pos.bottom}px` }), width: `${HELP_POPUP_W}px` }
    : undefined;

  const portalContent = open && (
    <>
      <span className="mb-help-backdrop" onClick={() => setOpen(false)} />
      <span
        className={`mb-help-popup ${pos?.mobile ? 'mb-help-popup-mobile' : ''}`}
        role="tooltip"
        style={popupStyle}
      >
        <span className="mb-help-popup-title mono">{title}</span>
        <span className="mb-help-popup-explanation">{explanation}</span>
        {example && (
          <span className="mb-help-popup-example">Example: {example}</span>
        )}
      </span>
    </>
  );

  return (
    <span className="mb-help-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="mb-help-icon"
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(e); }}
        aria-label={`Help: ${title}`}
        aria-expanded={open}
      >
        <HelpCircle size={12} strokeWidth={2} />
      </button>
      {open && typeof document !== 'undefined' && createPortal(portalContent, document.body)}
    </span>
  );
}

// v9 Polish: Lightweight hint popover. Click the (?) to toggle a short plain-English explanation.
function Hint({ term, children }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="mb-hint">
      <button
        type="button"
        className="mb-hint-icon"
        aria-label={`Help: ${term}`}
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(o => !o); }}
        onBlur={() => setOpen(false)}
      >?</button>
      {open && (
        <span className="mb-hint-popup" role="tooltip">
          <strong>{term}:</strong> {children}
        </span>
      )}
    </span>
  );
}

function LoadingPanel() {
return (
<div className="mb-loading">
<div className="mb-spinner mb-spinner-lg"></div>
<div className="mono mb-loading-text">Running simulation</div>
</div>
);
}

// ============================================================
// PLAIN ENGLISH CARD (v9 Phase 3a)
// Translation overlay — appears at top of mb-stage when simpleMode is on.
// Five questions + traffic-light verdict. Purely additive; existing views unchanged.
// ============================================================

// v9 Phase 5: copy reflects each market's bet direction (set on MARKETS[*].direction)
const PLAIN_WHAT_IM_DOING = {
  btc15: "You're using a Martingale strategy on Bitcoin 15-minute price changes. The bot bets on whether Bitcoin goes UP each 15 minutes. If you lose, you double your bet next time. If you win, you start over.",
  spx1h: "You're using a Martingale strategy on S&P 500 hourly direction. The bot bets on whether the market goes UP each hour. If you lose, you double your bet next hour.",
  mlb: "You're betting on whether each MLB inning has NO runs scored. (Innings score only ~28% of the time, so 'no score' is the dominant side.) If your bet wins, you start over. If it loses, you double your bet next inning.",
  custom: "You're running a simulation with a custom win probability. This is NOT real market data.",
};

function PlainEnglishCard({ results, outcomes, market, dataInfo, period, isStale, p, b0, m, N_max, odds = 100 }) {
  const hasOutcomes = !!(outcomes && outcomes.length > 0);
  const hasResults = !!results;
  const isSimulated = market === 'custom';

  if (!hasResults || !hasOutcomes) {
    return (
      <div className="mb-plain-card mb-plain-card-empty">
        <span className="mb-plain-tag mono">PLAIN ENGLISH</span>
        <div className="mb-plain-empty-msg">Run a backtest first to see your plain English summary.</div>
      </div>
    );
  }

  const mkt = MARKETS.find(x => x.id === market);
  const mktLabel = mkt ? mkt.label : market;
  const whatImDoing = PLAIN_WHAT_IM_DOING[market] || `You're running a Martingale strategy on ${mktLabel}.`;

  const stats = computeStreaks(outcomes);
  const { n } = stats;
  const capCount = countLossRunsAtLeast(outcomes, N_max);
  const capRate = n > 0 ? capCount / n : 0;
  const perSeqMaxLoss = m === 1 ? b0 * N_max : b0 * (Math.pow(m, N_max) - 1) / (m - 1);
  const finalBetSize = b0 * Math.pow(m, N_max - 1);

  let verdict;
  if (results.finalProfit > 0 && capRate < 0.05 && perSeqMaxLoss < 1000) {
    verdict = {
      tone: 'green', label: 'GOOD TO GO',
      msg: 'This setup is profitable with manageable risk. Consider deploying.',
    };
  } else if (results.finalProfit > 0) {
    verdict = {
      tone: 'yellow', label: 'RISKY',
      msg: 'This setup is profitable but has elevated risk. Tighten N_max or reduce base bet.',
    };
  } else {
    verdict = {
      tone: 'red', label: 'BAD BET',
      msg: 'This setup loses money. Change market, flip bet direction, or adjust strategy parameters.',
    };
  }

  const totalSequences = results.realNum || results.profits?.length || 0;
  const haveDailyMath = period && period.totalDays > 0 && totalSequences > 0;
  const seqsPerDay = haveDailyMath ? totalSequences / period.totalDays : null;
  const dailyReturn = haveDailyMath ? results.finalProfit / period.totalDays : null;
  const capsPerDay = haveDailyMath ? capCount / period.totalDays : null;
  const fmtCaps = (v) => v >= 1 ? v.toFixed(0) : v.toFixed(2);

  return (
    <div className="mb-plain-card">
      <div className="mb-plain-header">
        <span className="mb-plain-tag mono">PLAIN ENGLISH</span>
        {isSimulated && <span className="mb-plain-warn-chip mono">SIMULATED DATA</span>}
        {isStale && dataInfo?.market && (
          <span className="mb-plain-warn-chip mono">
            Showing data from {dataInfo.market.toUpperCase()}, not current selection
          </span>
        )}
        <span className="mb-plain-warn-chip mono">{odds >= 0 ? '+' : ''}{odds} odds · wins pay {payoutMultiplier(odds).toFixed(2)}× bet</span>
      </div>

      <div className={`mb-plain-verdict mb-plain-verdict-${verdict.tone}`}>
        <span className="mb-plain-verdict-label mono">{verdict.label}</span>
        <span className="mb-plain-verdict-msg">{verdict.msg}</span>
      </div>

      <div className="mb-plain-sections">
        <div className="mb-plain-section">
          <div className="mb-plain-section-head">
            <HelpCircle size={16} strokeWidth={1.8} />
            <span className="mono mb-plain-section-label">What am I doing?</span>
          </div>
          <div className="mb-plain-section-body">{whatImDoing}</div>
        </div>

        <div className="mb-plain-section">
          <div className="mb-plain-section-head">
            <DollarSign size={16} strokeWidth={1.8} />
            <span className="mono mb-plain-section-label">How much am I applying?</span>
          </div>
          <div className="mb-plain-section-body">
            Each sequence starts at <span className="mono">${b0}</span>. If you lose, you double to <span className="mono">${Math.round(b0 * m)}</span>, then <span className="mono">${Math.round(b0 * Math.pow(m, 2))}</span>, up to a maximum of <span className="mono">{fmtBankroll(finalBetSize)}</span> per bet. After <span className="mono">{N_max}</span> consecutive losses, the bot stops and accepts a total loss of <span className="mono">{fmtBankroll(perSeqMaxLoss)}</span>.
          </div>
        </div>

        <div className="mb-plain-section">
          <div className="mb-plain-section-head">
            <TrendingUp size={16} strokeWidth={1.8} />
            <span className="mono mb-plain-section-label">What is my possible return?</span>
          </div>
          <div className="mb-plain-section-body">
            {!haveDailyMath ? (
              <>On average, you win <span className="mono">${b0}</span> per sequence. Daily return data is not available yet.</>
            ) : dailyReturn >= 0 ? (
              <>On average, you win <span className="mono">${b0}</span> per sequence. With about <span className="mono">{seqsPerDay.toFixed(0)}</span> sequences per day, your expected daily return is approximately <span className="mono">{fmtMoney(dailyReturn)}</span>.</>
            ) : (
              <>On average, you LOSE about <span className="mono">{fmtBankroll(Math.abs(dailyReturn))}</span> per day at these settings.</>
            )}
          </div>
        </div>

        <div className="mb-plain-section">
          <div className="mb-plain-section-head">
            <AlertCircle size={16} strokeWidth={1.8} />
            <span className="mono mb-plain-section-label">What is my possible risk?</span>
          </div>
          <div className="mb-plain-section-body">
            Worst case in one sequence: you lose <span className="mono">{fmtBankroll(perSeqMaxLoss)}</span>. This happens about <span className="mono">{fmtCapRate(capRate)}</span> of the time.
            {capsPerDay !== null && (
              <> On a typical day, you might hit about <span className="mono">{fmtCaps(capsPerDay)}</span> cap events.</>
            )}
            {capsPerDay !== null && (
              <> Over 30 days, expect about <span className="mono">{(capsPerDay * 30).toFixed(capsPerDay * 30 >= 1 ? 0 : 1)}</span> cap events costing roughly <span className="mono">{fmtBankroll(capsPerDay * 30 * perSeqMaxLoss)}</span> total.</>
            )}
          </div>
        </div>

        <div className="mb-plain-section">
          <div className="mb-plain-section-head">
            <Percent size={16} strokeWidth={1.8} />
            <span className="mono mb-plain-section-label">What is the probability of winning?</span>
          </div>
          <div className="mb-plain-section-body">
            About <span className="mono">{(p * 100).toFixed(0)}%</span> of sequences end in a <span className="mono">${b0}</span> win. About <span className="mono">{fmtCapRate(capRate)}</span> of sequences hit the cap and lose <span className="mono">{fmtBankroll(perSeqMaxLoss)}</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RECOMMEND VIEW (v9 Phase 3b) — prescription layer
// Takes user constraints (bankroll, daily budget, risk tolerance, preference) and
// proposes a concrete (market, N_max, B) play by scoring every viable config across
// all enabled markets against live streak data.
// ============================================================

const REC_RECOMMEND_MARKETS = ['btc15', 'spx1h', 'mlb'];
const REC_N_VALUES = [4, 5, 6, 7, 8, 10, 12, 15];
const REC_MULTIPLIER = 2; // m=2 fixed for now; slider deferred to Phase 4
const REC_BET_SNAPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

function snapBet(maxB) {
  let best = 1;
  for (const s of REC_BET_SNAPS) if (s <= maxB) best = s;
  return best;
}

// ============================================================
// GUIDED VIEW (v9.1) — 4-screen first-run flow
// Screen 1: Welcome + how-it-works
// Screen 2: Three inputs (bankroll, daily budget, comfort)
// Screen 3: The Answer — verdict + plan + stats
// Screen 4: What's next — three action cards
// ============================================================

const COMFORT_TO_PREF = {
  most_careful: 'minimize_caps',
  balanced: 'max_profit',
  aggressive: 'maximize_seqs',
};
const COMFORT_LABEL = {
  most_careful: 'Most careful',
  balanced: 'Balanced',
  aggressive: 'Aggressive',
};

function formatCurrency(n) {
  return `$${Math.round(n).toLocaleString()}`;
}

function GuidedView({ guidedStep, setGuidedStep, guidedInputs, setGuidedInputs, setViewMode, onRunSimulation }) {
  const stepLabel = guidedStep === 5 ? 'YOUR RESULT' : `STEP ${guidedStep} OF 4`;
  return (
    <div className="mb-guided">
      <div className="mb-guided-stepbar">
        <div className="mb-guided-stepbar-track">
          {[1, 2, 3, 4].map(s => {
            const reached = guidedStep === 5 ? s <= 4 : s <= guidedStep;
            return <div key={s} className={`mb-guided-stepbar-cell ${reached ? 'mb-guided-stepbar-cell-active' : ''}`} />;
          })}
        </div>
        <div className="mb-guided-stepbar-label mono">{stepLabel}</div>
      </div>
      {guidedStep === 1 && <GuidedScreen1 onNext={() => setGuidedStep(2)} onSkipToExpert={() => setViewMode('expert')} />}
      {guidedStep === 2 && (
        <GuidedScreen2
          inputs={guidedInputs}
          setInputs={setGuidedInputs}
          onBack={() => setGuidedStep(1)}
          onNext={() => setGuidedStep(3)}
          onShowWelcome={() => setGuidedStep(1)}
        />
      )}
      {guidedStep === 3 && (
        <GuidedScreen3
          inputs={guidedInputs}
          onBack={() => setGuidedStep(2)}
          onNext={() => setGuidedStep(4)}
        />
      )}
      {guidedStep === 4 && (
        <GuidedScreen4
          inputs={guidedInputs}
          onShowResult={() => setGuidedStep(5)}
          onGoExpert={() => setViewMode('expert')}
          onRestart={() => { setGuidedStep(2); }}
        />
      )}
      {guidedStep === 5 && (
        <GuidedScreen5
          inputs={guidedInputs}
          onBack={() => setGuidedStep(2)}
          onSeeFullMath={onRunSimulation}
        />
      )}
    </div>
  );
}

function GuidedScreen1({ onNext, onSkipToExpert }) {
  const [open, setOpen] = useState(false);
  // v9.1.3: initialize checkbox from existing localStorage flag so returning users see their saved preference
  const [skipNext, setSkipNext] = useState(() => {
    try { return localStorage.getItem('marti_skip_welcome') === 'true'; }
    catch { return false; }
  });
  const persistSkipPref = () => {
    try {
      if (skipNext) localStorage.setItem('marti_skip_welcome', 'true');
      else localStorage.removeItem('marti_skip_welcome');
    } catch {}
  };
  const handleNext = () => { persistSkipPref(); onNext(); };
  const handleSkip = () => { persistSkipPref(); onSkipToExpert(); };
  return (
    <div className="mb-guided-card mb-guided-anim">
      <h2 className="mb-guided-title">Welcome to Marti</h2>
      <p className="mb-guided-sub">Marti tests a betting strategy against real market data. Tell us your situation. We'll tell you if this strategy would work for you.</p>
      <button
        type="button"
        className="mb-guided-disclosure"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        How does this strategy work? <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
      </button>
      {open && (
        <div className="mb-guided-disclosure-body">
          <p>Marti uses a "doubling-bet" strategy called <strong>martingale</strong>. You bet a small amount. If you lose, you double your bet next time. Keep doubling until you win — then you recover all losses plus your starting bet. The risk: if you keep losing too many times in a row, the bets get huge fast. Marti tests this strategy against real market data (Bitcoin, MLB, stocks) to see if it would actually work for your bankroll.</p>
          <div className="mb-guided-ladder">
            {[
              { v: '$5', tone: 'gold' },
              { v: '$10', tone: 'dim' },
              { v: '$20', tone: 'dim' },
              { v: '$40', tone: 'dim' },
              { v: '$80', tone: 'dim' },
              { v: '$160', tone: 'red' },
            ].map((b, i) => (
              <React.Fragment key={i}>
                <span className={`mb-guided-ladder-cell mb-guided-ladder-${b.tone} mono`}>{b.v}</span>
                {i < 5 && <span className="mb-guided-ladder-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="mb-guided-ladder-cap mono dim">starts at $5 · caps at $160 after 6 losses</p>
        </div>
      )}
      <label className="mb-guided-skip">
        <input
          type="checkbox"
          checked={skipNext}
          onChange={e => setSkipNext(e.target.checked)}
        />
        <span>Don't show this intro again</span>
      </label>
      <div className="mb-guided-actions mb-guided-actions-welcome">
        <button type="button" className="mb-guided-btn-secondary mb-guided-btn-skip" onClick={handleSkip}>Skip</button>
        <button type="button" className="mb-guided-btn-primary" onClick={handleNext}>Let's go →</button>
      </div>
    </div>
  );
}

function GuidedScreen2({ inputs, setInputs, onBack, onNext, onShowWelcome }) {
  const { bankroll, dailyBudget, comfort } = inputs;
  let error = null;
  if (bankroll < 100) error = 'Bankroll too small to be meaningful.';
  else if (dailyBudget < 10) error = 'Daily budget too small for any viable strategy.';
  else if (dailyBudget > bankroll) error = "Daily budget can't exceed your total bankroll.";

  return (
    <div className="mb-guided-card mb-guided-anim">
      <div className="mb-guided-title-row">
        <h2 className="mb-guided-title">Your situation</h2>
        {onShowWelcome && (
          <button type="button" className="mb-guided-welcome-link" onClick={onShowWelcome}>What is Marti?</button>
        )}
      </div>
      <p className="mb-guided-sub">We need three pieces of information from you.</p>

      <div className="mb-guided-field">
        <label className="mb-guided-field-label">
          How much money would you put aside for this?
          <HelpIcon title="Your total bankroll" explanation="What you'd risk on this strategy over time. Bigger means more buffer for bad days, but ties up more capital." example="$10k is a typical start. $50k is serious." />
        </label>
        <p className="mb-guided-field-sub">Your total bankroll — what you'd risk on this strategy over time, not what you'd bet each day.</p>
        <input
          type="number" min={100} max={10_000_000} step={100}
          value={bankroll}
          onChange={e => setInputs(prev => ({ ...prev, bankroll: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
          className="mb-guided-input mono"
        />
        <span className="mb-guided-field-fmt mono dim">{formatCurrency(bankroll)}</span>
      </div>

      <div className="mb-guided-field">
        <label className="mb-guided-field-label">
          How much are you OK losing per day at the worst?
          <HelpIcon title="Daily allocation" explanation="The most you'd be willing to lose in one bad day. Marti uses this to size your bets." example="$1,500/day = mid-tier serious. $500/day = cautious." />
        </label>
        <p className="mb-guided-field-sub">Your daily allocation. Bigger means bigger potential wins but bigger swings.</p>
        <input
          type="number" min={10} max={100_000} step={10}
          value={dailyBudget}
          onChange={e => setInputs(prev => ({ ...prev, dailyBudget: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
          className="mb-guided-input mono"
        />
        <span className="mb-guided-field-fmt mono dim">{formatCurrency(dailyBudget)}</span>
      </div>

      <div className="mb-guided-field">
        <label className="mb-guided-field-label">How careful do you want to be?</label>
        <p className="mb-guided-field-sub">Pick the trade-off between bigger wins and lower risk.</p>
        <div className="mb-guided-comfort-grid">
          {[
            { id: 'most_careful', label: 'Most careful', sub: 'Small wins, tiny risk of big losses', help: { title: 'Most careful', explanation: 'Smaller bets, lower win amounts, but very rare big losses.', example: 'Maybe $24/day average gain but almost never a bad day.' } },
            { id: 'balanced', label: 'Balanced', sub: 'Medium wins, low risk — good default', help: { title: 'Balanced', explanation: 'Mid-sized bets with manageable downside.', example: 'Maybe $240/day average gain with occasional bad days.' } },
            { id: 'aggressive', label: 'Aggressive', sub: 'Bigger wins, more risk of bad days', help: { title: 'Aggressive', explanation: 'Bigger bets, bigger wins, but more bad days.', example: 'Maybe $535/day average gain, harder days more frequent.' } },
          ].map(opt => (
            <div
              key={opt.id}
              role="button"
              tabIndex={0}
              onClick={() => setInputs(prev => ({ ...prev, comfort: opt.id }))}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setInputs(prev => ({ ...prev, comfort: opt.id })); } }}
              className={`mb-guided-comfort-card ${comfort === opt.id ? 'mb-guided-comfort-card-active' : ''}`}
              aria-pressed={comfort === opt.id}
            >
              <span className="mb-guided-comfort-label">
                {opt.label}
                <HelpIcon title={opt.help.title} explanation={opt.help.explanation} example={opt.help.example} />
              </span>
              <span className="mb-guided-comfort-sub">{opt.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="mb-guided-error">{error}</div>}

      <div className="mb-guided-actions">
        <button type="button" className="mb-guided-btn-secondary" onClick={onBack}>← Back</button>
        <button type="button" className="mb-guided-btn-primary" onClick={onNext} disabled={!!error}>Calculate →</button>
      </div>
    </div>
  );
}

function GuidedScreen3({ inputs, onBack, onNext }) {
  const { bankroll, dailyBudget, comfort } = inputs;
  const preference = COMFORT_TO_PREF[comfort] || 'max_profit';
  const [outcomesByMarket, setOutcomesByMarket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all(REC_RECOMMEND_MARKETS.map(m => fetchRealOutcomes(m).then(p => [m, p]).catch(err => [m, { error: err.message || String(err) }])))
      .then(entries => {
        if (cancelled) return;
        const next = {};
        let firstErr = null;
        for (const [m, payload] of entries) {
          if (payload && payload.error) firstErr = firstErr || payload.error;
          else next[m] = payload;
        }
        setOutcomesByMarket(next);
        if (Object.keys(next).length === 0 && firstErr) setError(firstErr);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const recommendation = useMemo(() => {
    if (loading) return { kind: 'loading' };
    if (Object.keys(outcomesByMarket).length === 0) return { kind: 'no_data', error };
    const tolerance = 0.05;
    const configs = [];
    for (const m of REC_RECOMMEND_MARKETS) {
      const payload = outcomesByMarket[m];
      if (!payload || !payload.outcomes) continue;
      const outcomes = payload.outcomes;
      const stats = computeStreaks(outcomes);
      const { n, winRate } = stats;
      const totalDays = payload.start && payload.end
        ? Math.max(1, (new Date(payload.end) - new Date(payload.start)) / 86400000)
        : 1;
      const outcomesPerDay = n / totalDays;
      for (const N_max of REC_N_VALUES) {
        const capCount = countLossRunsAtLeast(outcomes, N_max);
        const capRate = n > 0 ? capCount / n : 0;
        if (capRate > tolerance) continue;
        const ladder = (Math.pow(REC_MULTIPLIER, N_max) - 1) / (REC_MULTIPLIER - 1);
        const maxB = (dailyBudget / 3) / ladder;
        if (maxB < 1) continue;
        const B = snapBet(maxB);
        const perSeqMaxLoss = B * ladder;
        const avgSeqLen = winRate > 0 ? Math.min(1 / winRate, N_max) : N_max;
        const seqsPerDay = outcomesPerDay / avgSeqLen;
        const capsPerDay = capCount / totalDays;
        const rm = computeRiskMetrics(bankroll, perSeqMaxLoss, capRate, seqsPerDay, 30);
        if (rm.pRuin > 0.05) continue;
        const mr = payoutMultiplier(MARKET_DEFAULTS[m]?.defaultOdds ?? 100);
        const expectedDailyProfit = seqsPerDay * (winRate * B * mr - capRate * perSeqMaxLoss);
        let score;
        if (preference === 'maximize_seqs') score = seqsPerDay;
        else if (preference === 'minimize_caps') score = (1 - capRate) * 1000;
        else score = expectedDailyProfit;
        const daysToDeplete = capsPerDay > 0 && perSeqMaxLoss > 0
          ? dailyBudget / (capsPerDay * perSeqMaxLoss)
          : Infinity;
        configs.push({ market: m, N_max, B, capRate, perSeqMaxLoss, seqsPerDay, capsPerDay, pRuin: rm.pRuin, expectedDailyProfit, daysToDeplete, score, winRate });
      }
    }
    if (configs.length === 0) return { kind: 'none_viable' };
    configs.sort((a, b) => b.score - a.score);
    return { kind: 'ok', primary: configs[0] };
  }, [outcomesByMarket, loading, bankroll, dailyBudget, preference, error]);

  let verdict = null;
  if (recommendation.kind === 'ok') {
    const p = recommendation.primary;
    if (p.pRuin < 0.01 && p.expectedDailyProfit > 0) verdict = { tone: 'green', label: 'GOOD TO GO', Icon: CheckCircle };
    else if (p.expectedDailyProfit > 0) verdict = { tone: 'yellow', label: 'RISKY', Icon: AlertTriangle };
    else verdict = { tone: 'red', label: 'BAD BET', Icon: XCircle };
  } else if (recommendation.kind === 'none_viable' || recommendation.kind === 'no_data') {
    verdict = { tone: 'red', label: 'NO SAFE PLAY', Icon: XCircle };
  }

  return (
    <div className="mb-guided-card mb-guided-anim">
      <h2 className="mb-guided-title">The answer</h2>

      {recommendation.kind === 'loading' && (
        <div className="mb-guided-loading mono">Loading market data…</div>
      )}

      {verdict && (
        <div className={`mb-guided-verdict mb-guided-verdict-${verdict.tone}`}>
          <verdict.Icon size={28} strokeWidth={2} />
          <span className="mb-guided-verdict-label mono">{verdict.label}</span>
        </div>
      )}

      {recommendation.kind === 'ok' && (() => {
        const p = recommendation.primary;
        const mkt = MARKETS.find(x => x.id === p.market);
        const mktLabel = mkt ? mkt.label : p.market;
        const dirLabel = mkt?.directionLabel ? ` (${mkt.directionLabel})` : '';
        const daily = p.expectedDailyProfit;
        return (
          <>
            <div className="mb-guided-plan">
              <div className="mb-guided-plan-label">THE PLAN</div>
              <div className="mb-guided-plan-line">
                Bet on <strong>{mktLabel}{dirLabel}</strong>, <span className="mono gold">${p.B}</span> per round. Stop after <span className="mono gold">{p.N_max}</span> doubles.
              </div>
              <div className="mb-guided-plan-sub mono dim">({fmtBankroll(p.perSeqMaxLoss)} max loss per round)</div>
            </div>

            <div className="mb-guided-stats">
              <div className="mb-guided-stat">
                <div className="mb-guided-stat-label">Expected daily return <HelpIcon title="What you'd average per day" explanation="How much profit (or loss) per day on average, across many days of this strategy." example="+$240/day means after 30 days you'd be up ~$7,200 on average." /></div>
                <div className={`mb-guided-stat-value mono ${daily >= 0 ? 'pos' : 'neg'}`}>{fmtMoney(daily)}</div>
              </div>
              <div className="mb-guided-stat">
                <div className="mb-guided-stat-label">Worst possible day <HelpIcon title="The biggest single-day loss" explanation="Your daily allocation — if everything goes wrong in one day, this is your max pain." example="-$1,500 means you set $1,500 as your daily allocation, so that's your worst case." /></div>
                <div className="mb-guided-stat-value mono neg">-{formatCurrency(dailyBudget)}</div>
              </div>
              <div className="mb-guided-stat">
                <div className="mb-guided-stat-label">Bankroll lasts (worst case) <HelpIcon title="How long your money holds out" explanation="If you hit your worst possible day consecutively, this is how many days before your bankroll is depleted." example="~24 days means even with terrible luck repeated daily, you'd have over 3 weeks before running dry." /></div>
                <div className="mb-guided-stat-value mono gold">~{Number.isFinite(p.daysToDeplete) ? Math.round(p.daysToDeplete).toLocaleString() : '∞'} days</div>
              </div>
              <div className="mb-guided-stat">
                <div className="mb-guided-stat-label">Chance you go broke (30d) <HelpIcon title="Probability of ruin" explanation="The chance you lose your entire bankroll within 30 days, based on real market data." example="<0.01% means basically zero. Above 5% means real risk." /></div>
                <div className="mb-guided-stat-value mono pos">{fmtCapRate(p.pRuin)}</div>
              </div>
            </div>
          </>
        );
      })()}

      {(recommendation.kind === 'none_viable' || recommendation.kind === 'no_data') && (
        <>
          <div className="mb-guided-plan">
            <div className="mb-guided-plan-label">WHAT HAPPENED</div>
            <div className="mb-guided-plan-line"><strong>No safe strategy fits your inputs.</strong></div>
            <div className="mb-guided-plan-sub">
              {recommendation.kind === 'no_data'
                ? 'Could not load market data. Try again in a moment.'
                : 'Your daily budget is too small relative to your bankroll, or your bankroll is too small for any market we test. Try increasing your daily budget or your bankroll.'}
            </div>
          </div>
        </>
      )}

      <div className="mb-guided-actions">
        <button type="button" className="mb-guided-btn-secondary" onClick={onBack}>← Adjust</button>
        <button type="button" className="mb-guided-btn-primary" onClick={onNext} disabled={recommendation.kind !== 'ok'}>I'm interested →</button>
      </div>
    </div>
  );
}

function GuidedScreen4({ inputs, onShowResult, onGoExpert, onRestart }) {
  // Re-derive the primary so the "Run a 1-week sim" CTA can wire the right config
  const { bankroll, dailyBudget, comfort } = inputs;
  const preference = COMFORT_TO_PREF[comfort] || 'max_profit';
  const [outcomesByMarket, setOutcomesByMarket] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    Promise.all(REC_RECOMMEND_MARKETS.map(m => fetchRealOutcomes(m).then(p => [m, p]).catch(() => [m, null])))
      .then(entries => {
        if (cancelled) return;
        const next = {};
        for (const [m, payload] of entries) if (payload) next[m] = payload;
        setOutcomesByMarket(next);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);
  const primary = useMemo(() => {
    if (loading || Object.keys(outcomesByMarket).length === 0) return null;
    const tolerance = 0.05;
    const configs = [];
    for (const m of REC_RECOMMEND_MARKETS) {
      const payload = outcomesByMarket[m]; if (!payload?.outcomes) continue;
      const outcomes = payload.outcomes;
      const stats = computeStreaks(outcomes);
      const { n, winRate } = stats;
      const totalDays = payload.start && payload.end
        ? Math.max(1, (new Date(payload.end) - new Date(payload.start)) / 86400000)
        : 1;
      const outcomesPerDay = n / totalDays;
      for (const N_max of REC_N_VALUES) {
        const capCount = countLossRunsAtLeast(outcomes, N_max);
        const capRate = n > 0 ? capCount / n : 0;
        if (capRate > tolerance) continue;
        const ladder = (Math.pow(REC_MULTIPLIER, N_max) - 1) / (REC_MULTIPLIER - 1);
        const maxB = (dailyBudget / 3) / ladder;
        if (maxB < 1) continue;
        const B = snapBet(maxB);
        const perSeqMaxLoss = B * ladder;
        const avgSeqLen = winRate > 0 ? Math.min(1 / winRate, N_max) : N_max;
        const seqsPerDay = outcomesPerDay / avgSeqLen;
        const rm = computeRiskMetrics(bankroll, perSeqMaxLoss, capRate, seqsPerDay, 30);
        if (rm.pRuin > 0.05) continue;
        const mr = payoutMultiplier(MARKET_DEFAULTS[m]?.defaultOdds ?? 100);
        let score;
        if (preference === 'maximize_seqs') score = seqsPerDay;
        else if (preference === 'minimize_caps') score = (1 - capRate) * 1000;
        else score = seqsPerDay * (winRate * B * mr - capRate * perSeqMaxLoss);
        configs.push({ market: m, N_max, B, score });
      }
    }
    if (configs.length === 0) return null;
    configs.sort((a, b) => b.score - a.score);
    return configs[0];
  }, [outcomesByMarket, loading, bankroll, dailyBudget, preference]);

  return (
    <div className="mb-guided-card mb-guided-anim">
      <h2 className="mb-guided-title">Smart next step</h2>
      <p className="mb-guided-sub">Don't risk real money yet. Try this on paper first.</p>

      <div className="mb-guided-next-cards">
        <button
          type="button"
          className="mb-guided-next-card"
          onClick={() => primary && onShowResult()}
          disabled={!primary}
        >
          <span className="mb-guided-next-card-title">Run a 1-week simulation</span>
          <span className="mb-guided-next-card-sub">See what this would have done over the past 7 days of real market data.</span>
        </button>
        <button
          type="button"
          className="mb-guided-next-card"
          onClick={onGoExpert}
        >
          <span className="mb-guided-next-card-title">See the full math (Expert Mode)</span>
          <span className="mb-guided-next-card-sub">All the analysis: streak distribution, risk engine, trade-off curves.</span>
        </button>
        <button
          type="button"
          className="mb-guided-next-card"
          onClick={onRestart}
        >
          <span className="mb-guided-next-card-title">Start over with different numbers</span>
          <span className="mb-guided-next-card-sub">Adjust your bankroll, budget, or comfort level.</span>
        </button>
      </div>
    </div>
  );
}

// v9.1.2 / v9.2: Walks the last ~7 days of outcomes through the bot's ladder.
// `r` is the payout multiplier (1.0 at parity, 0.5 at -200 odds, etc.). Wins pay bet*r, not bet.
function simulateLastWeek(outcomes, B, m, N_max, r = 1) {
  const dailyPL = new Map();
  const bumpDay = (t, delta) => {
    const day = new Date(t).toISOString().slice(0, 10);
    dailyPL.set(day, (dailyPL.get(day) || 0) + delta);
  };
  let winRounds = 0, capRounds = 0;
  let i = 0;
  while (i < outcomes.length) {
    let bet = B, k = 0, won = false;
    while (k < N_max && i < outcomes.length) {
      const o = outcomes[i];
      if (o.win === 1) { bumpDay(o.t, bet * r); won = true; i++; winRounds++; break; }
      bumpDay(o.t, -bet);
      i++; k++; bet *= m;
    }
    if (!won) capRounds++;
  }
  const dayEntries = Array.from(dailyPL.entries()).sort();
  const totalPL = dayEntries.reduce((s, [, v]) => s + v, 0);
  const bestDay = dayEntries.length ? Math.max(...dayEntries.map(d => d[1])) : 0;
  const worstDay = dayEntries.length ? Math.min(...dayEntries.map(d => d[1])) : 0;
  return { totalPL, winRounds, capRounds, totalRounds: winRounds + capRounds, dailyPL: dayEntries, daysPlayed: dayEntries.length, bestDay, worstDay };
}

function GuidedScreen5({ inputs, onBack, onSeeFullMath }) {
  const { bankroll, dailyBudget, comfort } = inputs;
  const preference = COMFORT_TO_PREF[comfort] || 'max_profit';
  const [outcomesByMarket, setOutcomesByMarket] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    Promise.all(REC_RECOMMEND_MARKETS.map(m => fetchRealOutcomes(m).then(p => [m, p]).catch(() => [m, null])))
      .then(entries => {
        if (cancelled) return;
        const next = {};
        for (const [m, payload] of entries) if (payload) next[m] = payload;
        setOutcomesByMarket(next);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Re-derive the same primary as Screen 4 (same scoring, same filters).
  const primary = useMemo(() => {
    if (loading || Object.keys(outcomesByMarket).length === 0) return null;
    const tolerance = 0.05;
    const configs = [];
    for (const m of REC_RECOMMEND_MARKETS) {
      const payload = outcomesByMarket[m]; if (!payload?.outcomes) continue;
      const outcomes = payload.outcomes;
      const stats = computeStreaks(outcomes);
      const { n, winRate } = stats;
      const totalDays = payload.start && payload.end
        ? Math.max(1, (new Date(payload.end) - new Date(payload.start)) / 86400000)
        : 1;
      const outcomesPerDay = n / totalDays;
      for (const N_max of REC_N_VALUES) {
        const capCount = countLossRunsAtLeast(outcomes, N_max);
        const capRate = n > 0 ? capCount / n : 0;
        if (capRate > tolerance) continue;
        const ladder = (Math.pow(REC_MULTIPLIER, N_max) - 1) / (REC_MULTIPLIER - 1);
        const maxB = (dailyBudget / 3) / ladder;
        if (maxB < 1) continue;
        const B = snapBet(maxB);
        const perSeqMaxLoss = B * ladder;
        const avgSeqLen = winRate > 0 ? Math.min(1 / winRate, N_max) : N_max;
        const seqsPerDay = outcomesPerDay / avgSeqLen;
        const rm = computeRiskMetrics(bankroll, perSeqMaxLoss, capRate, seqsPerDay, 30);
        if (rm.pRuin > 0.05) continue;
        const mr = payoutMultiplier(MARKET_DEFAULTS[m]?.defaultOdds ?? 100);
        let score;
        if (preference === 'maximize_seqs') score = seqsPerDay;
        else if (preference === 'minimize_caps') score = (1 - capRate) * 1000;
        else score = seqsPerDay * (winRate * B * mr - capRate * perSeqMaxLoss);
        configs.push({ market: m, N_max, B, score });
      }
    }
    if (configs.length === 0) return null;
    configs.sort((a, b) => b.score - a.score);
    return configs[0];
  }, [outcomesByMarket, loading, bankroll, dailyBudget, preference]);

  // Filter that market's outcomes to the last 7 days (using outcome timestamps).
  const sim = useMemo(() => {
    if (!primary) return null;
    const payload = outcomesByMarket[primary.market];
    if (!payload?.outcomes || payload.outcomes.length === 0) return null;
    const outcomes = payload.outcomes;
    const last = outcomes[outcomes.length - 1].t;
    const cutoff = last - 7 * 86400000;
    const last7 = outcomes.filter(o => o.t >= cutoff);
    if (last7.length === 0) return null;
    const md = MARKET_DEFAULTS[primary.market];
    const r = payoutMultiplier(md?.defaultOdds ?? 100);
    const result = simulateLastWeek(last7, primary.B, REC_MULTIPLIER, primary.N_max, r);
    result._oddsLabel = md?.label ?? '+100 (parity)';
    return result;
  }, [primary, outcomesByMarket]);

  if (loading) {
    return (
      <div className="mb-guided-card mb-guided-anim">
        <h2 className="mb-guided-title">Loading your week…</h2>
        <p className="mb-guided-sub mono">Crunching the last 7 days of real market data.</p>
      </div>
    );
  }

  if (!primary || !sim) {
    return (
      <div className="mb-guided-card mb-guided-anim">
        <h2 className="mb-guided-title">No result available</h2>
        <p className="mb-guided-sub">Go back to step 2 and complete your situation first.</p>
        <div className="mb-guided-actions">
          <button type="button" className="mb-guided-btn-secondary" onClick={onBack}>← Back</button>
          <span />
        </div>
      </div>
    );
  }

  const mkt = MARKETS.find(x => x.id === primary.market);
  const mktLabel = mkt ? mkt.label : primary.market;
  const dirLabel = mkt?.directionLabel ? ` (${mkt.directionLabel})` : '';
  const winRate = sim.totalRounds > 0 ? (sim.winRounds / sim.totalRounds) * 100 : 0;
  const verdictTone = sim.totalPL > 0 ? 'green' : sim.totalPL < 0 ? 'red' : 'yellow';
  const VerdictIcon = sim.totalPL > 0 ? CheckCircle : sim.totalPL < 0 ? XCircle : AlertTriangle;
  const verdictLabel = sim.totalPL > 0
    ? `WOULD HAVE MADE +${fmtBankroll(sim.totalPL)}`
    : sim.totalPL < 0
    ? `WOULD HAVE LOST −${fmtBankroll(Math.abs(sim.totalPL))}`
    : 'BREAK EVEN';

  return (
    <div className="mb-guided-card mb-guided-anim">
      <h2 className="mb-guided-title">Last week with your strategy</h2>
      <p className="mb-guided-sub">
        If you had played <strong>{mktLabel}{dirLabel}</strong> with <span className="mono gold">${primary.B}</span> bets capped at <span className="mono gold">{primary.N_max}</span> doubles over the past <span className="mono">{sim.daysPlayed}</span> days…
      </p>
      <p className="mb-guided-odds-notice mono">At <strong>{sim._oddsLabel}</strong> odds (typical for {mktLabel})</p>

      <div className={`mb-guided-verdict mb-guided-verdict-${verdictTone}`}>
        <VerdictIcon size={28} strokeWidth={2} />
        <span className="mb-guided-verdict-label mono">{verdictLabel}</span>
      </div>

      <div className="mb-guided-stats">
        <div className="mb-guided-stat">
          <div className="mb-guided-stat-label">Days played</div>
          <div className="mb-guided-stat-value mono">{sim.daysPlayed}</div>
        </div>
        <div className="mb-guided-stat">
          <div className="mb-guided-stat-label">Rounds run</div>
          <div className="mb-guided-stat-value mono">{sim.totalRounds.toLocaleString()}</div>
        </div>
        <div className="mb-guided-stat">
          <div className="mb-guided-stat-label">Win rate</div>
          <div className="mb-guided-stat-value mono pos">{winRate.toFixed(1)}%</div>
        </div>
        <div className="mb-guided-stat">
          <div className="mb-guided-stat-label">Best day</div>
          <div className={`mb-guided-stat-value mono ${sim.bestDay >= 0 ? 'pos' : 'neg'}`}>{fmtMoney(sim.bestDay)}</div>
        </div>
        <div className="mb-guided-stat">
          <div className="mb-guided-stat-label">Worst day</div>
          <div className={`mb-guided-stat-value mono ${sim.worstDay >= 0 ? 'pos' : 'neg'}`}>{fmtMoney(sim.worstDay)}</div>
        </div>
      </div>

      <div className="mb-guided-actions">
        <button type="button" className="mb-guided-btn-secondary" onClick={onBack}>← Adjust strategy</button>
        <button
          type="button"
          className="mb-guided-btn-primary"
          onClick={() => onSeeFullMath({ market: primary.market, B: primary.B, N_max: primary.N_max, num: 10000 })}
        >See full math →</button>
      </div>
    </div>
  );
}

function RecommendView({ market, setMarket, currentOutcomes }) {
  const [bankroll, setBankroll] = useState(50_000);
  const [dailyBudget, setDailyBudget] = useState(1_500);
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [enabledMarkets, setEnabledMarkets] = useState({ btc15: true, spx1h: true, mlb: true });
  // v9 Scoring v2: new default "max_profit" maximizes expected daily $ profit instead of seqsPerDay·(1−capRate)
  const [preference, setPreference] = useState('max_profit');
  const [outcomesByMarket, setOutcomesByMarket] = useState(() => {
    return currentOutcomes && market && REC_RECOMMEND_MARKETS.includes(market)
      ? { [market]: { outcomes: currentOutcomes, start: null, end: null } }
      : {};
  });
  const [loadingMarkets, setLoadingMarkets] = useState(new Set());
  const [errorMarkets, setErrorMarkets] = useState({});
  const [lockedAt, setLockedAt] = useState(null);

  const enabledList = useMemo(
    () => REC_RECOMMEND_MARKETS.filter(m => enabledMarkets[m]),
    [enabledMarkets]
  );

  // Lazy-fetch outcomes for any enabled market we haven't loaded yet
  useEffect(() => {
    const toFetch = enabledList.filter(m => !outcomesByMarket[m] && !loadingMarkets.has(m) && !errorMarkets[m]);
    if (toFetch.length === 0) return;
    setLoadingMarkets(prev => {
      const next = new Set(prev);
      for (const m of toFetch) next.add(m);
      return next;
    });
    for (const m of toFetch) {
      fetchRealOutcomes(m)
        .then(payload => {
          setOutcomesByMarket(prev => ({ ...prev, [m]: payload }));
          setLoadingMarkets(prev => { const n = new Set(prev); n.delete(m); return n; });
        })
        .catch(err => {
          setErrorMarkets(prev => ({ ...prev, [m]: err && err.message ? err.message : String(err) }));
          setLoadingMarkets(prev => { const n = new Set(prev); n.delete(m); return n; });
        });
    }
  }, [enabledList, outcomesByMarket, loadingMarkets, errorMarkets]);

  // Auto-clear the "locked in" toast after 3s
  useEffect(() => {
    if (!lockedAt) return;
    const t = setTimeout(() => setLockedAt(null), 3000);
    return () => clearTimeout(t);
  }, [lockedAt]);

  const recommendation = useMemo(() => {
    if (enabledList.length === 0) return { kind: 'empty' };
    if (dailyBudget > bankroll) return { kind: 'budget_exceeds_bankroll' };
    if (dailyBudget < 50) return { kind: 'budget_too_small' };

    const stillLoading = enabledList.filter(m => !outcomesByMarket[m] && !errorMarkets[m]);
    if (stillLoading.length > 0) return { kind: 'loading', stillLoading };

    const tolerance = riskTolerance / 100;
    const configs = [];
    for (const m of enabledList) {
      const payload = outcomesByMarket[m];
      if (!payload || !payload.outcomes) continue;
      const outcomes = payload.outcomes;
      const stats = computeStreaks(outcomes);
      const { runs, n, winRate } = stats;
      const totalDays = payload.start && payload.end
        ? Math.max(1, (new Date(payload.end) - new Date(payload.start)) / 86400000)
        : 1;
      const outcomesPerDay = n / totalDays;
      for (const N_max of REC_N_VALUES) {
        const capCount = countLossRunsAtLeast(outcomes, N_max);
        const capRate = n > 0 ? capCount / n : 0;
        if (capRate > tolerance) continue;
        const ladderMultiple = (Math.pow(REC_MULTIPLIER, N_max) - 1) / (REC_MULTIPLIER - 1);
        const maxB = (dailyBudget / 3) / ladderMultiple;
        if (maxB < 1) continue;
        const B = snapBet(maxB);
        const perSeqMaxLoss = B * ladderMultiple;
        const finalBetSize = B * Math.pow(REC_MULTIPLIER, N_max - 1);
        const avgSeqLen = winRate > 0 ? Math.min(1 / winRate, N_max) : N_max;
        const seqsPerDay = outcomesPerDay / avgSeqLen;
        const capsPerDay = capCount / totalDays;
        const requiredBankroll = perSeqMaxLoss * 5; // 5x per-seq loss as suggested floor
        const daysToDeplete = capsPerDay > 0 && perSeqMaxLoss > 0
          ? dailyBudget / (capsPerDay * perSeqMaxLoss)
          : Infinity;
        // v9.0.1: hard safety filter — reject any config with >5% chance of bankrupting the user's
        // bankroll over 30 days, regardless of which preference is selected. Without this, the
        // "Maximize daily profit" scorer would happily recommend BTC N=4 B=$25 even though it
        // shows ~100% P(ruin) against a $50k bankroll.
        const rm = computeRiskMetrics(bankroll, perSeqMaxLoss, capRate, seqsPerDay, 30);
        if (rm.pRuin > 0.05) continue;
        const pRuin30 = rm.pRuin;
        const mr = payoutMultiplier(MARKET_DEFAULTS[m]?.defaultOdds ?? 100);
        // v9 Scoring v2 / v9.2: "max_profit" is the default — expected $/day, now odds-adjusted.
        let score;
        if (preference === 'maximize_seqs') score = seqsPerDay;
        else if (preference === 'minimize_caps') score = (1 - capRate) * 1000;
        else score = seqsPerDay * (winRate * B * mr - capRate * perSeqMaxLoss);
        configs.push({
          market: m, N_max, B, capRate, perSeqMaxLoss, finalBetSize,
          seqsPerDay, capsPerDay, requiredBankroll, daysToDeplete, score, winRate, pRuin30,
        });
      }
    }
    if (configs.length === 0) return { kind: 'none_viable' };
    configs.sort((a, b) => b.score - a.score);
    return { kind: 'ok', primary: configs[0], alternatives: configs.slice(1, 4), all: configs };
  }, [enabledList, outcomesByMarket, errorMarkets, riskTolerance, dailyBudget, bankroll, preference]);

  const onLockIn = () => {
    if (recommendation.kind !== 'ok') return;
    setMarket(recommendation.primary.market);
    setLockedAt(Date.now());
  };

  const budgetWarn = dailyBudget > bankroll;

  return (
    <div className="mb-view">
      <div className="mb-rec-layout">
        <section className="mb-section mb-rec-inputs">
          <div className="mb-section-head">
            <div>
              <h2 className="mb-section-title">Your situation</h2>
              <p className="mb-section-sub">Tell Marti your constraints and it will propose a play.</p>
            </div>
          </div>
          <div className="mb-rec-input-grid">
            <label className="mb-rec-field">
              <span className="mb-rec-field-label">Total bankroll <HelpIcon title="What is total bankroll?" explanation="The full amount of money you're willing to risk on this strategy over its lifetime." example="$50,000 means you could lose all $50k in a worst-case scenario; size your bets accordingly." /></span>
              <input
                type="number" min={100} max={10_000_000} step={100}
                value={bankroll}
                onChange={e => setBankroll(Math.max(100, Math.min(10_000_000, parseFloat(e.target.value) || 0)))}
                className="mb-numinput mono"
              />
            </label>
            <label className={`mb-rec-field ${budgetWarn ? 'mb-rec-field-warn' : ''}`}>
              <span className="mb-rec-field-label">Daily allocation budget <HelpIcon title="What is the daily budget?" explanation="The most you're willing to lose in a single day. Larger budgets let Marti recommend bigger base bets." example="$1,500/day = 3% of $50k bankroll, a common rule-of-thumb starting point." /></span>
              <input
                type="number" min={10} max={100_000} step={10}
                value={dailyBudget}
                onChange={e => setDailyBudget(Math.max(10, Math.min(100_000, parseFloat(e.target.value) || 0)))}
                className="mb-numinput mono"
              />
              {budgetWarn && <span className="mb-rec-field-warn-msg">Daily budget exceeds total bankroll</span>}
            </label>
            <label className="mb-rec-field">
              <span className="mb-rec-field-label">
                Risk tolerance (cap rate ceiling) <Hint term="Cap rate ceiling">Marti will only recommend configs where the empirical cap rate stays below this percentage. Lower = pickier.</Hint> <span className="mono">{riskTolerance}%</span>
              </span>
              <input
                type="range" min={1} max={25} step={1}
                value={riskTolerance}
                onChange={e => setRiskTolerance(parseInt(e.target.value, 10))}
                className="mb-slider"
              />
            </label>
            <div className="mb-rec-field">
              <span className="mb-rec-field-label">Markets willing to play <HelpIcon title="Which markets to consider?" explanation="Check which markets Marti can recommend. Unchecked ones are excluded from the search even if they'd otherwise win." example="Uncheck MLB to force a stocks/crypto recommendation only." /></span>
              <div className="mb-rec-checks">
                {REC_RECOMMEND_MARKETS.map(m => {
                  const mkt = MARKETS.find(x => x.id === m);
                  return (
                    <label key={m} className="mb-rec-check">
                      <input
                        type="checkbox"
                        checked={!!enabledMarkets[m]}
                        onChange={e => setEnabledMarkets(prev => ({ ...prev, [m]: e.target.checked }))}
                      />
                      <span>{mkt ? mkt.label : m}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mb-rec-field">
              <span className="mb-rec-field-label">Preference</span>
              <div className="mb-rec-radios">
                {[
                  { id: 'max_profit', label: 'Maximize daily profit', hint: 'Highest expected dollar return per day — picks the largest base bet that fits your cap-rate ceiling.' },
                  { id: 'maximize_seqs', label: 'Maximize sequences/day', hint: 'Most ladders run per day, regardless of size. Picks whichever (market, N_max) cycles fastest under your cap-rate ceiling.' },
                  { id: 'minimize_caps', label: 'Minimize cap frequency', hint: 'Fewest cap events expected; smallest single-sequence losses. Picks the highest N_max viable for a smaller base bet.' },
                ].map(opt => (
                  <label key={opt.id} className="mb-rec-radio">
                    <input
                      type="radio"
                      name="rec-pref"
                      checked={preference === opt.id}
                      onChange={() => setPreference(opt.id)}
                    />
                    <span>{opt.label} <Hint term={opt.label}>{opt.hint}</Hint></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-section mb-rec-output">
          <div className="mb-section-head">
            <div>
              <h2 className="mb-section-title">Marti's recommendation</h2>
              <p className="mb-section-sub">Computed live from observed streak data against your constraints.</p>
            </div>
          </div>

          {recommendation.kind === 'empty' && (
            <div className="mb-rec-empty">Select at least one market to see recommendations.</div>
          )}
          {recommendation.kind === 'budget_exceeds_bankroll' && (
            <div className="mb-rec-empty">Daily budget exceeds total bankroll. Lower the daily allocation or increase bankroll.</div>
          )}
          {recommendation.kind === 'budget_too_small' && (
            <div className="mb-rec-empty">Daily budget too small. Increase to at least $50 to enable any play.</div>
          )}
          {recommendation.kind === 'loading' && (
            <div className="mb-rec-empty mono">Loading streak data for {recommendation.stillLoading.join(', ')}…</div>
          )}
          {recommendation.kind === 'none_viable' && (
            <div className="mb-rec-empty">
              No market meets your {riskTolerance}% cap rate ceiling. Loosen tolerance, lower N_max, or reduce base bet.
            </div>
          )}

          {recommendation.kind === 'ok' && (() => {
            const r = recommendation.primary;
            const mkt = MARKETS.find(x => x.id === r.market);
            const mktLabel = mkt ? mkt.label : r.market;
            const capsPerDayOk = r.capsPerDay <= (riskTolerance / 100) * r.seqsPerDay;
            return (
              <>
                <div className="mb-rec-primary">
                  <div className="mb-rec-primary-head">
                    <Sparkles size={16} strokeWidth={1.8} />
                    <span className="mono mb-rec-primary-tag">MARTI RECOMMENDS</span>
                  </div>
                  <div className="mb-rec-primary-line mono">
                    Play <span className="gold">{mktLabel}</span>{mkt?.directionLabel && <> ({mkt.directionLabel})</>} with base bet <span className="gold">${r.B}</span>, cap at N_max=<span className="gold">{r.N_max}</span>
                  </div>
                  <div className="mb-rec-primary-sub">
                    Bot bets the <span className="mono">{mkt?.directionLabel || '—'}</span> direction. Expected: <span className="mono">{fmtCapRate(r.capRate)}</span> cap rate, <span className="mono">{fmtBankroll(r.perSeqMaxLoss)}</span> max single-sequence loss.
                    {(() => {
                      const rm = computeRiskMetrics(bankroll, r.perSeqMaxLoss, r.capRate, r.seqsPerDay, 30);
                      return (
                        <> · 30-day P(ruin): <span className={`mono ${riskTone(rm.pRuin) === 'teal' ? 'pos' : riskTone(rm.pRuin) === 'red' ? 'neg' : 'gold'}`}>{rm.pRuin < 0.0001 ? '<0.01%' : `${(rm.pRuin * 100).toFixed(2)}%`}</span>, ~<span className="mono">{rm.expectedCaps30 >= 1 ? rm.expectedCaps30.toFixed(0) : rm.expectedCaps30.toFixed(2)}</span> cap events expected.</>
                      );
                    })()}
                  </div>
                  <div className="mb-kpistrip mb-rec-kpis">
                    <div className="mb-kpi mb-kpi-primary">
                      <div className="mb-kpi-label">Sequences / day <HelpIcon title="What is sequences/day?" explanation="How many betting rounds the strategy runs in a typical day at this market's pace." example="48/day means the bot starts about 48 fresh ladders every 24 hours." /></div>
                      <div className="mb-kpi-value mono pos">~{r.seqsPerDay.toFixed(0)}</div>
                    </div>
                    <div className="mb-kpi">
                      <div className="mb-kpi-label">Cap events / day <HelpIcon title="What are cap events/day?" explanation="Expected number of full-ladder losses per day. Green if rare enough to absorb; red if too frequent." example="0.18/day = one cap every ~5 days; 5/day = bot caps multiple times per session." /></div>
                      <div className={`mb-kpi-value mono ${capsPerDayOk ? 'pos' : 'neg'}`}>
                        {r.capsPerDay >= 1 ? r.capsPerDay.toFixed(1) : r.capsPerDay.toFixed(2)}
                      </div>
                    </div>
                    <div className="mb-kpi">
                      <div className="mb-kpi-label">Days to deplete budget <HelpIcon title="How long would my budget last?" explanation="At the expected cap frequency and loss size, how many days of caps it would take to chew through your daily budget." example="~33 days = your $1,500 daily budget covers about a month of expected cap pain." /></div>
                      <div className="mb-kpi-value mono">
                        {Number.isFinite(r.daysToDeplete) ? `~${r.daysToDeplete.toFixed(0)}` : '∞'}
                      </div>
                    </div>
                    <div className="mb-kpi">
                      <div className="mb-kpi-label">Suggested bankroll <HelpIcon title="What is the suggested bankroll?" explanation="A safety-cushion bankroll: 5× the per-sequence max loss, so a string of 5 caps still leaves you running." example="$1.3k = $255 per-seq loss × 5 — enough to ride out an unlucky run." /></div>
                      <div className="mb-kpi-value mono gold">{fmtBankroll(r.requiredBankroll)}</div>
                    </div>
                  </div>
                  <div className="mb-rec-actions">
                    <button
                      type="button"
                      onClick={onLockIn}
                      className="mb-rec-lockbtn"
                      disabled={r.market === market}
                    >
                      {r.market === market ? 'Currently active' : 'Lock in this recommendation'}
                    </button>
                    {lockedAt && (
                      <span className="mb-rec-toast mono">Locked in: {mktLabel} is now the active market.</span>
                    )}
                  </div>
                </div>

                {recommendation.alternatives.length > 0 && (
                  <div className="mb-rec-alts">
                    <div className="mb-section-head mb-section-head-tight">
                      <h3 className="mb-section-title-sm">Top alternatives <HelpIcon title="What are the alternatives?" explanation="The next-best (market, N_max, bet) combinations after the primary recommendation, ranked by your chosen preference." example="If primary is MLB N=4, alternatives might be MLB N=5 (slightly safer) and BTC N=4 (different market, similar return)." /></h3>
                      <span className="mb-section-meta mono">ranked by score</span>
                    </div>
                    <div className="mb-rec-alttable">
                      <div className="mb-rec-altrow mb-rec-altrow-head">
                        <span>Market</span>
                        <span className="mb-rec-altnum">N_max</span>
                        <span className="mb-rec-altnum">Base bet</span>
                        <span className="mb-rec-altnum">Cap rate</span>
                        <span className="mb-rec-altnum">Per-seq loss</span>
                        <span className="mb-rec-altnum">Score</span>
                      </div>
                      {recommendation.alternatives.map((a, i) => {
                        const am = MARKETS.find(x => x.id === a.market);
                        return (
                          <div key={i} className="mb-rec-altrow">
                            <span>{am ? am.label : a.market}</span>
                            <span className="mb-rec-altnum mono">{a.N_max}</span>
                            <span className="mb-rec-altnum mono">${a.B}</span>
                            <span className="mb-rec-altnum mono">{fmtCapRate(a.capRate)}</span>
                            <span className="mb-rec-altnum mono">{fmtBankroll(a.perSeqMaxLoss)}</span>
                            <span className="mb-rec-altnum mono">{a.score.toFixed(1)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {Object.keys(errorMarkets).length > 0 && (
            <div className="mb-rec-errors">
              {Object.entries(errorMarkets).map(([m, msg]) => (
                <div key={m} className="mb-rec-error mono">⚠ {m}: {msg}</div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ============================================================
// STREAKS VIEW (v9 Phase 1)
// ============================================================

function StreaksView({ outcomes, market, dataInfo, isStale }) {
  // v9 Phase 2: Survival funding calculator inputs
  const [bankrollBase, setBankrollBase] = useState(5);
  const [bankrollM, setBankrollM] = useState(2.0);
  const [safetyMarginPct, setSafetyMarginPct] = useState(50);
  // v9 Phase 2 pivot: N_max slider for cap-aware analysis
  const [bankrollNMax, setBankrollNMax] = useState(6);
  // v9 Phase 4 Lite: bankroll input for Risk Engine (P(ruin) calc)
  const [riskBankroll, setRiskBankroll] = useState(10000);

  if (!outcomes || outcomes.length === 0) {
    return (
      <div className="mb-view">
        <section className="mb-section">
          <div className="mb-section-head">
            <div>
              <h2 className="mb-section-title">Streak analysis</h2>
              <p className="mb-section-sub">Consecutive-direction runs in the outcome stream</p>
            </div>
          </div>
          <div className="mb-streak-empty">
            <Flame size={28} strokeWidth={1.5} />
            <div className="mono mb-streak-empty-text">Run a backtest to see streak analysis</div>
          </div>
        </section>
      </div>
    );
  }

  const mkt = MARKETS.find(x => x.id === market);
  const mktLabel = mkt ? mkt.label : market;
  const stats = useMemo(() => computeStreaks(outcomes), [outcomes]);
  const { distribution, max, mean, median, total, winRate, n, runs } = stats;
  const isSimulated = market === 'custom';
  const showLimitedSample = !isSimulated && n < 1000;
  const showSpxDisclosure = market === 'spx1h';
  const showMlbBanner = market === 'mlb' && winRate < 0.40 && !isStale;

  const q = Math.max(winRate, 1 - winRate);
  const theoreticalMax = q === 0.5
    ? Math.log2(n)
    : Math.log(n) / Math.log(1 / q);
  const divergencePct = theoreticalMax > 0 ? ((max - theoreticalMax) / theoreticalMax) * 100 : 0;
  const divergenceAbove = divergencePct > 0;

  // v9 Phase 2 pivot: dual-scenario bankroll analysis — capped (deployed strategy) + uncapped (reference)
  const funding = useMemo(() => {
    // Scenario A: capped strategy (the one we actually run)
    const perSeqMaxLoss = bankrollM === 1
      ? bankrollBase * bankrollNMax
      : bankrollBase * (Math.pow(bankrollM, bankrollNMax) - 1) / (bankrollM - 1);
    const finalBetAtCap = bankrollBase * Math.pow(bankrollM, bankrollNMax - 1);
    const capCount = countLossRunsAtLeast(outcomes, bankrollNMax);
    const capRate = n > 0 ? capCount / n : 0;
    const seqsBeforeCap = capRate > 0 ? 1 / capRate : Infinity;

    // Scenario B: uncapped reference (cost of zero cap events)
    const targetSurvivalStreak = Math.ceil(max * (1 + safetyMarginPct / 100));
    const uncappedBankroll = bankrollM === 1
      ? bankrollBase * targetSurvivalStreak
      : bankrollBase * (Math.pow(bankrollM, targetSurvivalStreak) - 1) / (bankrollM - 1);
    const finalBetAtTarget = bankrollBase * Math.pow(bankrollM, targetSurvivalStreak - 1);
    const uncappedInBaseBets = uncappedBankroll / bankrollBase;
    const uncappedOverflow = !Number.isFinite(uncappedBankroll) || uncappedBankroll > Number.MAX_SAFE_INTEGER;
    const cappedOverflow = !Number.isFinite(perSeqMaxLoss) || perSeqMaxLoss > Number.MAX_SAFE_INTEGER;

    let uncappedTier;
    if (uncappedOverflow || uncappedBankroll >= 10_000_000) uncappedTier = 'prohibitive';
    else if (uncappedBankroll >= 1_000_000) uncappedTier = 'institutional';
    else if (uncappedBankroll >= 100_000) uncappedTier = 'professional';
    else if (uncappedBankroll >= 10_000) uncappedTier = 'serious';
    else uncappedTier = 'hobbyist';

    return {
      perSeqMaxLoss, finalBetAtCap, capCount, capRate, seqsBeforeCap, cappedOverflow,
      targetSurvivalStreak, uncappedBankroll, finalBetAtTarget, uncappedInBaseBets, uncappedOverflow, uncappedTier,
    };
  }, [stats, bankrollBase, bankrollM, safetyMarginPct, bankrollNMax]);

  // Verdict 1: deployability of the capped strategy (capital + cap-frequency joint test)
  const verdictCapped = (() => {
    const { perSeqMaxLoss, capRate, cappedOverflow } = funding;
    const lossSafe = !cappedOverflow && perSeqMaxLoss < 1_000;
    const lossOk = !cappedOverflow && perSeqMaxLoss < 10_000;
    if (lossSafe && capRate < 0.05) {
      return {
        tone: 'teal',
        label: 'DEPLOYABLE',
        msg: `Capped strategy is retail-deployable. ${fmtCapRate(capRate)} of sequences will cap, accepting max ${fmtBankroll(perSeqMaxLoss)} loss per cap event.`,
      };
    }
    if (lossOk && capRate < 0.10) {
      return {
        tone: 'gold',
        label: 'ACCEPTABLE',
        msg: `Cap rate of ${fmtCapRate(capRate)} is acceptable for serious retail. Plan for ${fmtBankroll(perSeqMaxLoss)} drawdowns at the expected frequency.`,
      };
    }
    if (capRate > 0.25) {
      return {
        tone: 'red',
        label: 'CAP-HEAVY',
        msg: `Cap rate of ${fmtCapRate(capRate)} means most sequences end in loss. Reconsider N_max, market, or direction.`,
      };
    }
    return {
      tone: 'gold-bright',
      label: 'BORDERLINE',
      msg: 'Capped strategy may be deployable but cap frequency or loss size requires capital cushion.',
    };
  })();

  // Verdict 2: uncapped reference — only shown for context, intentionally smaller
  const tierName = {
    hobbyist: 'Hobbyist',
    serious: 'Serious-retail',
    professional: 'Professional',
    institutional: 'Institutional',
    prohibitive: 'Capital-prohibitive',
  }[funding.uncappedTier];
  const verdictUncapped = {
    tone: funding.uncappedTier === 'hobbyist' || funding.uncappedTier === 'serious' ? 'teal'
      : funding.uncappedTier === 'professional' ? 'gold'
      : funding.uncappedTier === 'institutional' ? 'gold-bright'
      : 'red',
    label: 'UNCAPPED REFERENCE',
    msg: `To eliminate cap events entirely, you would need ${fmtBankroll(funding.uncappedBankroll)} — this is the ${tierName}-tier requirement and is shown only as reference.`,
  };

  // v9 Phase 4 Lite: seqsPerDay needed for both trade-off chart and risk engine
  const totalDays = dataInfo && dataInfo.feedStart && dataInfo.feedEnd
    ? Math.max(1, (new Date(dataInfo.feedEnd) - new Date(dataInfo.feedStart)) / 86400000)
    : 1;
  const outcomesPerDay = n / totalDays;
  const avgSeqLen = winRate > 0 ? Math.min(1 / winRate, bankrollNMax) : bankrollNMax;
  const seqsPerDay = outcomesPerDay / avgSeqLen;
  const riskMetrics = useMemo(
    () => computeRiskMetrics(riskBankroll, funding.perSeqMaxLoss, funding.capRate, seqsPerDay, 30),
    [riskBankroll, funding.perSeqMaxLoss, funding.capRate, seqsPerDay]
  );

  // Trade-off curve: how per-seq loss and cap rate move as N_max ranges from 2 to (max + 5)
  const tradeoffData = useMemo(() => {
    const data = [];
    const xMax = Math.max(max + 5, bankrollNMax + 1);
    for (let nmax = 2; nmax <= xMax; nmax++) {
      const seqLoss = bankrollM === 1
        ? bankrollBase * nmax
        : bankrollBase * (Math.pow(bankrollM, nmax) - 1) / (bankrollM - 1);
      const seqLossOverflow = !Number.isFinite(seqLoss) || seqLoss > Number.MAX_SAFE_INTEGER;
      const cnt = countLossRunsAtLeast(outcomes, nmax);
      const cr = n > 0 ? (cnt / n) * 100 : 0;
      data.push({ nmax, seqLoss: seqLossOverflow ? null : seqLoss, capRate: cr });
    }
    return data;
  }, [stats, bankrollBase, bankrollM, bankrollNMax, max]);

  let insight;
  if (Math.abs(divergencePct) > 30) {
    insight = `Max streak of ${max} significantly ${divergenceAbove ? 'exceeds' : 'falls short of'} directional theoretical max of ${theoreticalMax.toFixed(1)}. Possible non-random clustering — investigate before deploying capital.`;
  } else if (market === 'mlb' && Math.abs(divergencePct) < 30) {
    insight = `Max streak of ${max} is consistent with random clustering at the observed ${(winRate * 100).toFixed(0)}% scoring rate. The dominant direction (NO-score, ~${(q * 100).toFixed(0)}%) drives streaks up to a directional theoretical max of ${theoreticalMax.toFixed(1)}. Fund the bot to survive max + safety margin regardless of randomness.`;
  } else if (market === 'spx1h' && Math.abs(divergencePct) < 20) {
    insight = `Max streak of ${max} aligns closely with random walk theoretical max of ${theoreticalMax.toFixed(1)}. SPX 1H is essentially symmetric — fund the bot to survive max + safety margin.`;
  } else if (market === 'btc15' && Math.abs(divergencePct) < 20) {
    insight = `Max streak of ${max} aligns closely with random walk theoretical max of ${theoreticalMax.toFixed(1)}. BTC 15m behaves like a coin flip — fund the bot to survive max + safety margin and the strategy is mathematically robust.`;
  } else {
    insight = `Max streak of ${max} sits ${Math.abs(divergencePct).toFixed(0)}% ${divergenceAbove ? 'above' : 'below'} directional theoretical max of ${theoreticalMax.toFixed(1)} (observed win rate ${(winRate * 100).toFixed(0)}%).`;
  }

  return (
    <div className="mb-view">
      {showMlbBanner && (
        <div className="mb-mlbdir-banner">
          <span className="mb-mlbdir-tag mono">MLB DIRECTION</span>
          <span className="mb-mlbdir-msg">
            Streak analysis below counts runs of "score" and "no score" outcomes. MLB innings score only ~{(winRate * 100).toFixed(0)}% of the time, so long "no score" runs dominate — fund-to-survive applies to the loss direction here.
          </span>
        </div>
      )}

      <section className="mb-section">
        <div className="mb-section-head">
          <div>
            <h2 className="mb-section-title">Streak analysis · {mktLabel}{mkt?.directionLabel ? <> · <span className="mono gold">{mkt.directionLabel}</span></> : null} <HelpIcon title="What is streak analysis?" explanation="Looks at how often the market produces long runs of the same outcome (e.g. 5 ups in a row). Long streaks drive the bot's tail risk." example="If the longest streak in the data is 15, your bot needs to survive at least 15 losses in a row." /></h2>
            <p className="mb-section-sub">
              {n.toLocaleString()} outcomes
              {showLimitedSample && (
                <span
                  className="mb-sample-chip mono"
                  title="Sample size below 1,000 outcomes. Streak distribution may be noisy."
                > LIMITED SAMPLE</span>
              )}
              {' '}· observed win rate <span className="mono">{(winRate * 100).toFixed(2)}%</span>
              {isSimulated && <span className="mb-streak-sim-tag mono"> SIMULATED</span>}
            </p>
          </div>
        </div>

        {isSimulated && (
          <div className="mb-spx-disclosure">
            Custom mode: outcomes are simulated from win probability p, not real market data. Run BTC, SPX, or MLB to analyze historical streaks.
          </div>
        )}

        {showSpxDisclosure && (
          <div className="mb-spx-disclosure">
            SPX market uses SPY ETF as a 1:1 directional proxy for the S&amp;P 500. Streaks reflect raw bar-direction outcomes; non-parity contract pricing on real prediction markets is not modeled.
          </div>
        )}

        <div className="mb-kpistrip mb-streak-kpis">
          <div className="mb-kpi mb-kpi-primary">
            <div className="mb-kpi-label">Max streak <HelpIcon title="What is max streak?" explanation="The longest run of consecutive same-direction outcomes ever observed in the data." example="Max streak of 15 means at some point, the market produced 15 of the same outcome in a row." /></div>
            <div className="mb-kpi-value mono gold">{max}</div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Mean <HelpIcon title="What is the mean streak?" explanation="Average streak length across all runs in the dataset. Usually close to 2 for fair markets." example="Mean of 2.0 means streaks average two outcomes long before flipping direction." /></div>
            <div className="mb-kpi-value mono">{mean.toFixed(2)}</div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Median <HelpIcon title="What is the median streak?" explanation="The middle streak length: half the streaks are shorter, half are longer. Resistant to outliers." example="Median of 1.0 means half of all streaks are just one outcome before flipping." /></div>
            <div className="mb-kpi-value mono">{median.toFixed(1)}</div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Total streaks <HelpIcon title="What is total streaks?" explanation="How many separate runs (same-direction sequences) are in the dataset." example="8,000 total streaks in 17,000 outcomes means streaks average about 2 outcomes long." /></div>
            <div className="mb-kpi-value mono">{total.toLocaleString()}</div>
          </div>
        </div>

        <div className="mb-streak-divergence">
          <span className="mono mb-streak-divergence-label">Empirical max vs theoretical <HelpIcon title="What is empirical vs theoretical max?" explanation="How the longest streak we actually saw compares to what random-walk math predicts for this market's win rate." example="+5% means observed max is 5% above the predicted max — close enough to call random." /></span>
          <span className={`mono mb-streak-divergence-val ${divergenceAbove ? 'neg' : 'pos'}`}>
            {divergenceAbove ? '+' : ''}{divergencePct.toFixed(1)}%
          </span>
          <span className="mb-streak-divergence-detail dim">
            ({max} observed · {theoreticalMax.toFixed(1)} theoretical)
          </span>
        </div>

        <div className="mb-streak-insight">
          {insight}
        </div>

        <div className="mb-section-head mb-section-head-tight">
          <h3 className="mb-section-title-sm">Streak length distribution <HelpIcon title="What is the distribution?" explanation="How many streaks of each length appeared in real data, vs how many a random-walk would predict." example="Lots of length-1 streaks, fewer length-2, very few length-6. Shape should look exponential." /></h3>
          <span className="mb-section-meta mono">empirical vs theoretical</span>
        </div>
        <div className="mb-chart-lg">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
              <XAxis dataKey="length" stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} />
              <YAxis stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={50} />
              <Tooltip
                contentStyle={{ background: '#14161a', border: '1px solid #2a2d33', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                labelFormatter={(l) => `Length ${l}`}
                formatter={(v, k) => [typeof v === 'number' ? v.toFixed(k === 'theoretical' ? 1 : 0) : v, k === 'theoretical' ? 'Theoretical' : 'Empirical']}
              />
              <Bar dataKey="empirical" radius={[2, 2, 0, 0]} barSize={18}>
                {distribution.map((d, i) => (
                  <Cell key={i} fill={d.length === max ? '#c7a26b' : '#5a9978'} />
                ))}
              </Bar>
              <Bar dataKey="theoretical" radius={[2, 2, 0, 0]} barSize={6} fill="#d4b787" fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-streak-legend">
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#5a9978' }}></span>Empirical (both directions)</span>
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#c7a26b' }}></span>Max observed</span>
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#d4b787' }}></span>Theoretical (random walk)</span>
        </div>
      </section>

      <section className="mb-section">
        <div className="mb-section-head">
          <div>
            <h2 className="mb-section-title">Bankroll &amp; Cap Analysis <HelpIcon title="What is this section?" explanation="Compares two strategies: one where you cap losses at N steps (smart), versus one where you don't cap (need a huge bankroll)." example="Capping at 6 steps: max loss $315. Uncapped: max loss $42 million. Capping is what makes the strategy practical." /></h2>
            <p className="mb-section-sub">The deployed strategy caps at N_max losses and accepts the per-sequence drawdown. Uncapped survival is shown only as a reference point.</p>
          </div>
        </div>

        <div className="mb-streak-funding-controls mb-streak-funding-controls-4">
          <div className="mb-streak-funding-row">
            <div className="mb-streak-funding-label">
              <span>Base bet (B)</span>
              <span className="mono mb-streak-funding-val">${bankrollBase}</span>
            </div>
            <input
              type="range" min={1} max={100} step={1}
              value={bankrollBase}
              onChange={e => setBankrollBase(parseFloat(e.target.value))}
              className="mb-slider"
              aria-label="Base bet in dollars"
            />
          </div>
          <div className="mb-streak-funding-row">
            <div className="mb-streak-funding-label">
              <span>Multiplier (m)</span>
              <span className="mono mb-streak-funding-val">{bankrollM.toFixed(1)}×</span>
            </div>
            <input
              type="range" min={1.5} max={3.0} step={0.1}
              value={bankrollM}
              onChange={e => setBankrollM(parseFloat(e.target.value))}
              className="mb-slider"
              aria-label="Martingale multiplier"
            />
          </div>
          <div className="mb-streak-funding-row">
            <div className="mb-streak-funding-label">
              <span>N_max (cap-at-N) <Hint term="N_max">Max consecutive losses before the bot accepts defeat on a sequence. Larger N_max = more survival, larger possible single-sequence loss.</Hint></span>
              <span className="mono mb-streak-funding-val">{bankrollNMax}</span>
            </div>
            <input
              type="range" min={2} max={30} step={1}
              value={bankrollNMax}
              onChange={e => setBankrollNMax(parseInt(e.target.value, 10))}
              className="mb-slider"
              aria-label="Max ladder steps before cap"
            />
          </div>
          <div className="mb-streak-funding-row">
            <div className="mb-streak-funding-label">
              <span>Safety margin</span>
              <span className="mono mb-streak-funding-val">{safetyMarginPct}%</span>
            </div>
            <input
              type="range" min={0} max={100} step={5}
              value={safetyMarginPct}
              onChange={e => setSafetyMarginPct(parseFloat(e.target.value))}
              className="mb-slider"
              aria-label="Safety margin percent"
            />
          </div>
        </div>

        <div className="mb-streak-scenario-grid">
          <div className="mb-streak-scenario-col">
            <div className="mb-streak-scenario-title">Capped strategy (N_max = {bankrollNMax})</div>
            <div className="mb-streak-scenario-kpis">
              <div className="mb-kpi mb-kpi-primary">
                <div className="mb-kpi-label">Per-sequence max loss <Hint term="Per-sequence max loss">Total dollars lost if a single Martingale ladder reaches N_max consecutive losses: B × (m^N_max − 1)/(m − 1).</Hint></div>
                <div className="mb-kpi-value mono gold">{fmtBankroll(funding.perSeqMaxLoss)}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Expected cap rate <Hint term="Cap rate">Fraction of outcomes that fall inside a loss-direction streak of length ≥ N_max — i.e. how often the bot's ladder gets capped.</Hint></div>
                <div className="mb-kpi-value mono">{fmtCapRate(funding.capRate)}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Final bet at N_max</div>
                <div className="mb-kpi-value mono">{fmtBankroll(funding.finalBetAtCap)}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Sequences before 1st cap</div>
                <div className="mb-kpi-value mono">{Number.isFinite(funding.seqsBeforeCap) ? `~${Math.round(funding.seqsBeforeCap).toLocaleString()}` : '∞'}</div>
              </div>
            </div>
          </div>
          <div className="mb-streak-scenario-col mb-streak-scenario-col-dim">
            <div className="mb-streak-scenario-title">Uncapped reference (not the deployed strategy)</div>
            <div className="mb-streak-scenario-kpis">
              <div className="mb-kpi">
                <div className="mb-kpi-label">Uncapped bankroll</div>
                <div className="mb-kpi-value mono">{fmtBankroll(funding.uncappedBankroll)}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Target survival streak</div>
                <div className="mb-kpi-value mono">{funding.targetSurvivalStreak}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Final bet at target</div>
                <div className="mb-kpi-value mono">{fmtBankroll(funding.finalBetAtTarget)}</div>
              </div>
              <div className="mb-kpi">
                <div className="mb-kpi-label">Bankroll as base bets</div>
                <div className="mb-kpi-value mono">{funding.uncappedOverflow ? '∞' : `${funding.uncappedInBaseBets.toLocaleString(undefined, { maximumFractionDigits: 0 })}×`}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mb-streak-verdict mb-streak-verdict-${verdictCapped.tone}`}>
          <span className="mb-streak-verdict-tag mono">{verdictCapped.label}</span>
          <span className="mb-streak-verdict-msg">{verdictCapped.msg}</span>
        </div>

        <div className={`mb-streak-verdict mb-streak-verdict-sm mb-streak-verdict-${verdictUncapped.tone}`}>
          <span className="mb-streak-verdict-tag mono">{verdictUncapped.label}</span>
          <span className="mb-streak-verdict-msg">{verdictUncapped.msg}</span>
        </div>

        <div className="mb-section-head mb-section-head-tight">
          <h3 className="mb-section-title-sm">Trade-off: N_max vs (bankroll required, cap frequency) <HelpIcon title="What does this trade-off show?" explanation="As N_max grows, per-sequence max loss explodes (gold line, log scale) while cap rate plummets (teal line). Pick N_max where both are acceptable." example="At N_max=6: $315 max loss + 1% cap rate. At N_max=10: $5,115 max loss + 0.02% cap rate." /></h3>
          <span className="mb-section-meta mono">current N_max = {bankrollNMax}</span>
        </div>
        <div className="mb-chart-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tradeoffData} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#2a2d33" vertical={false} />
              <XAxis dataKey="nmax" stroke="#52524a" tick={{ fontSize: 10, fill: '#8a8578', fontFamily: 'JetBrains Mono, monospace' }} axisLine={{ stroke: '#2a2d33' }} tickLine={false} />
              <YAxis
                yAxisId="loss" scale="log" domain={['auto', 'auto']} allowDataOverflow
                stroke="#c7a26b" tick={{ fontSize: 10, fill: '#c7a26b', fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={64}
                tickFormatter={(v) => fmtBankroll(v)}
              />
              <YAxis
                yAxisId="cap" orientation="right"
                stroke="#5a9978" tick={{ fontSize: 10, fill: '#5a9978', fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={{ stroke: '#2a2d33' }} tickLine={false} width={48}
                tickFormatter={(v) => `${v.toFixed(0)}%`}
              />
              <Tooltip
                contentStyle={{ background: '#14161a', border: '1px solid #2a2d33', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                labelFormatter={(l) => `N_max = ${l}`}
                formatter={(v, k) => k === 'seqLoss' ? [v == null ? '∞' : fmtBankroll(v), 'Per-seq max loss'] : [`${v.toFixed(2)}%`, 'Cap rate']}
              />
              <ReferenceLine x={bankrollNMax} yAxisId="loss" stroke="#d4b787" strokeDasharray="3 3" />
              <Line yAxisId="loss" type="monotone" dataKey="seqLoss" stroke="#c7a26b" strokeWidth={1.8} dot={false} connectNulls={false} />
              <Line yAxisId="cap" type="monotone" dataKey="capRate" stroke="#5a9978" strokeWidth={1.8} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-streak-legend">
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#c7a26b' }}></span>Per-sequence max loss (log scale, left)</span>
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#5a9978' }}></span>Cap rate % (right)</span>
          <span className="mb-streak-legend-item"><span className="mb-streak-swatch" style={{ background: '#d4b787' }}></span>Current N_max</span>
        </div>

        <div className="mb-section-head mb-section-head-tight mb-risk-head">
          <h3 className="mb-section-title-sm">Risk Engine: How likely is bankruptcy? <HelpIcon title="What is the Risk Engine?" explanation="Estimates your chance of going broke under the current settings, using a Poisson model of cap arrivals over 30 days." example="P(ruin) under 0.01% with the safety gauge in green means you're far from any realistic bankruptcy scenario." /></h3>
          <span className="mb-section-meta mono">Poisson cap arrivals</span>
        </div>
        <div className="mb-risk-controls">
          <label className="mb-risk-bankroll-label">
            <span>Assumed total bankroll <Hint term="Bankroll for risk calc">P(ruin) compares expected cap losses over 30 days against this bankroll. Increase to see how survival improves with more capital.</Hint></span>
            <input
              type="range" min={1000} max={500000} step={1000}
              value={riskBankroll}
              onChange={e => setRiskBankroll(parseInt(e.target.value, 10))}
              className="mb-slider"
              aria-label="Risk engine assumed bankroll"
            />
            <span className="mono mb-risk-bankroll-val">{fmtBankroll(riskBankroll)}</span>
          </label>
        </div>
        <div className="mb-kpistrip mb-risk-kpis">
          <div className="mb-kpi mb-kpi-primary">
            <div className="mb-kpi-label">P(ruin) over 30 days <Hint term="P(ruin)">Probability that cap-event losses exceed your bankroll within 30 days, using Poisson(λ = seqsPerDay·days·capRate). Lower is safer.</Hint></div>
            <div className={`mb-kpi-value mono ${riskTone(riskMetrics.pRuin) === 'teal' ? 'pos' : riskTone(riskMetrics.pRuin) === 'red' ? 'neg' : 'gold'}`}>
              {riskMetrics.pRuin < 0.0001 ? '<0.01%' : `${(riskMetrics.pRuin * 100).toFixed(2)}%`}
            </div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Drawdown survival <Hint term="Drawdown survival">Probability you do NOT see 5 consecutive cap events: 1 − capRate^5. A tail-risk health check.</Hint></div>
            <div className="mb-kpi-value mono pos">
              {(riskMetrics.drawdownSurvival * 100 >= 99.99 ? '>99.99' : (riskMetrics.drawdownSurvival * 100).toFixed(2))}%
            </div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Expected caps / day <HelpIcon title="What are expected caps/day?" explanation="How many cap events to expect on an average day, based on historical cap rate and sequences per day." example="0.24/day ≈ one cap every 4 days at typical pace." /></div>
            <div className="mb-kpi-value mono">
              {riskMetrics.expectedCapsPerDay >= 1 ? riskMetrics.expectedCapsPerDay.toFixed(2) : riskMetrics.expectedCapsPerDay.toFixed(3)}
            </div>
          </div>
          <div className="mb-kpi">
            <div className="mb-kpi-label">Bankroll covers (cap events) <HelpIcon title="How many caps does the bankroll cover?" explanation="Total bankroll divided by per-sequence max loss — how many bad sequences you could absorb before going broke." example="Bankroll covers ~31 means you'd need 31 cap events to fully deplete your stake." /></div>
            <div className="mb-kpi-value mono gold">
              ~{riskMetrics.bankrollInCaps.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="mb-risk-gauge">
          <div className="mb-risk-gauge-bar">
            <div className="mb-risk-gauge-marker" style={{ left: `${riskMarkerPct(riskMetrics.pRuin)}%` }} />
          </div>
          <div className="mb-risk-gauge-labels mono">
            <span>Safe</span><span>Borderline</span><span>Concerning</span>
          </div>
        </div>
        <div className="mb-risk-horizon">
          <div className="mb-risk-horizon-head">Expected cap events over time <HelpIcon title="What is the cap forecast?" explanation="Projected cap events across 30, 60, and 90 days. Scales linearly with time at the empirical cap rate." example="If 30 days = 7 caps, then 90 days = 21 caps under the same conditions." /></div>
          <div className="mb-risk-horizon-grid">
            <div className="mb-risk-horizon-cell">
              <div className="mb-risk-horizon-label">30 days</div>
              <div className="mono mb-risk-horizon-val">~{riskMetrics.expectedCaps30 >= 1 ? riskMetrics.expectedCaps30.toFixed(0) : riskMetrics.expectedCaps30.toFixed(2)}</div>
            </div>
            <div className="mb-risk-horizon-cell">
              <div className="mb-risk-horizon-label">60 days</div>
              <div className="mono mb-risk-horizon-val">~{riskMetrics.expectedCaps60 >= 1 ? riskMetrics.expectedCaps60.toFixed(0) : riskMetrics.expectedCaps60.toFixed(2)}</div>
            </div>
            <div className="mb-risk-horizon-cell">
              <div className="mb-risk-horizon-label">90 days</div>
              <div className="mono mb-risk-horizon-val">~{riskMetrics.expectedCaps90 >= 1 ? riskMetrics.expectedCaps90.toFixed(0) : riskMetrics.expectedCaps90.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// v9 Phase 4 Lite: Poisson CDF for P(ruin) estimation. Recurrence avoids factorial overflow.
function poissonCDF(k, lambda) {
  if (lambda <= 0) return 1;
  if (k < 0) return 0;
  let term = Math.exp(-lambda);
  if (!Number.isFinite(term) || term === 0) return k >= lambda ? 1 : 0;
  let sum = term;
  const cap = Math.min(Math.floor(k), 10000);
  for (let i = 1; i <= cap; i++) {
    term = term * lambda / i;
    sum += term;
    if (term < 1e-15 && i > lambda) break;
  }
  return Math.min(1, sum);
}

// v9 Phase 4 Lite: three risk metrics for a given (bankroll, perSeqMaxLoss, capRate, seqsPerDay).
// pRuin: prob cap-loss events exceed bankroll capacity over `days`, assuming Poisson cap arrivals.
// drawdownSurvival: prob you DON'T see 5 consecutive caps (rare-tail health check).
// expectedCaps: linear in days (Poisson mean = seqsPerDay * days * capRate).
function computeRiskMetrics(bankroll, perSeqMaxLoss, capRate, seqsPerDay, days = 30) {
  const bankrollInCaps = perSeqMaxLoss > 0 ? Math.floor(bankroll / perSeqMaxLoss) : 0;
  const lambda = seqsPerDay * days * capRate;
  const pRuin = bankrollInCaps > 0 ? Math.max(0, 1 - poissonCDF(bankrollInCaps, lambda)) : 1;
  const drawdownSurvival = 1 - Math.pow(capRate, 5);
  const expectedCaps = seqsPerDay * capRate;
  return {
    pRuin,
    drawdownSurvival,
    expectedCapsPerDay: expectedCaps,
    expectedCaps30: expectedCaps * 30,
    expectedCaps60: expectedCaps * 60,
    expectedCaps90: expectedCaps * 90,
    bankrollInCaps,
    lambda30: lambda,
  };
}

// v9 Phase 4 Lite: traffic-light tone for P(ruin)
function riskTone(pRuin) {
  if (pRuin < 0.001) return 'teal';
  if (pRuin < 0.01) return 'gold';
  return 'red';
}

// v9 Phase 4 Lite: marker position on the safety gauge (0..100)
function riskMarkerPct(pRuin) {
  if (pRuin < 0.0001) return 6;
  if (pRuin < 0.001) return 22;
  if (pRuin < 0.01) return 50;
  if (pRuin < 0.1) return 78;
  return 94;
}

// v9 Phase 2: format big bankroll values; flips to ∞ when not finite or beyond MAX_SAFE_INTEGER
function fmtBankroll(v) {
  if (!Number.isFinite(v) || v > Number.MAX_SAFE_INTEGER) return '∞';
  if (v >= 1e12) return `$${(v / 1e12).toFixed(1)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}k`;
  return `$${v.toFixed(0)}`;
}

// v9 Phase 2 pivot: cap-rate formatter with "<0.01%" floor and natural scaling
function fmtCapRate(r) {
  if (!Number.isFinite(r) || r <= 0) return '<0.01%';
  const pct = r * 100;
  if (pct < 0.01) return '<0.01%';
  if (pct < 1) return `${pct.toFixed(2)}%`;
  if (pct < 10) return `${pct.toFixed(1)}%`;
  return `${pct.toFixed(0)}%`;
}

function fmtMoney(v, digits = 0) {
const sign = v < 0 ? '-' : v > 0 ? '+' : '';
const abs = Math.abs(v);
if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(abs >= 10000 ? 1 : 2)}k`;
if (digits > 0) return `${sign}$${abs.toFixed(digits)}`;
return `${sign}$${abs.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function fmtDateShort(d) {
if (!d) return '—';
return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtPeriodRange(period) {
if (!period) return '—';
return `${fmtDateShort(period.startDate)} → ${fmtDateShort(period.endDate)}`;
}

function fmtDurationShort(days) {
if (days == null || !isFinite(days)) return '—';
if (days < 1) {
const hours = days * 24;
if (hours < 1) return `${(hours * 60).toFixed(0)} min`;
return `${hours.toFixed(1)} hr`;
}
if (days < 60) return `${Math.round(days)} days`;
if (days < 730) return `${(days / 30.44).toFixed(1)} mo`;
return `${(days / 365.25).toFixed(1)} yr`;
}

// ============================================================
// STYLES
// ============================================================

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
/* Premium Executive Aesthetic palette */
--bg: #0a0b0d;         /* near-black charcoal */
--s1: #14161a;         /* warm charcoal surface */
--s2: #1a1d22;         /* elevated warm charcoal */
--border: #2a2d33;     /* brushed pewter */
--teal: #3d6e52;       /* anodized forest green (variable kept for compat) */
--teal-bright: #5a9978; /* lifted forest green for highlights */
--gold: #c7a26b;       /* champagne gold (unchanged) */
--gold-bright: #d4b787; /* lifted gold for emphasis */
--text: #e8e4d8;       /* warm off-white */
--muted: #8a8578;      /* warm pewter */
--dim: #52524a;        /* warm dim */
--red: #c44545;        /* muted oxblood */
--red-bright: #d96565; /* lifted oxblood */

/* Desktop-first fluid scale: larger min/max, density at scale */
--fs-xs: clamp(10px, 0.35vw + 8.5px, 12px);
--fs-sm: clamp(11px, 0.45vw + 9.5px, 13px);
--fs-md: clamp(12px, 0.55vw + 10px, 14px);
--fs-lg: clamp(14px, 0.85vw + 11px, 18px);
--fs-xl: clamp(18px, 1.3vw + 14px, 26px);
--fs-xxl: clamp(22px, 1.9vw + 16px, 34px);

--sp-xs: clamp(4px, 0.25vw + 3.5px, 7px);
--sp-sm: clamp(6px, 0.4vw + 5px, 12px);
--sp-md: clamp(10px, 0.6vw + 8px, 18px);
--sp-lg: clamp(14px, 0.85vw + 11px, 26px);

--topbar-h: clamp(48px, 3vw + 36px, 56px);
}

- { box-sizing: border-box; }
  .mb-root {
  background: var(--bg);
  color: var(--text);
  font-family: 'Outfit', -apple-system, system-ui, sans-serif;
  font-size: var(--fs-md);
  line-height: 1.4;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.005em;
  }
  .mono { font-family: 'JetBrains Mono', monospace; font-feature-settings: 'tnum', 'zero'; letter-spacing: 0; }
  .pos { color: var(--teal); }
  .neg { color: var(--red); }
  .gold { color: var(--gold); }
  .dim { color: var(--muted); }

.mb-topbar {
position: sticky;
top: 0;
z-index: 50;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 var(--sp-md);
height: var(--topbar-h);
background: var(--s2);
border-bottom: 1px solid var(--border);
}
.mb-brand { display: flex; align-items: center; gap: 10px; }
.mb-brand-logo {
height: clamp(28px, 2.2vw + 18px, 40px);
width: auto;
display: block;
object-fit: contain;
}
.mb-brand-ver {
font-size: var(--fs-xs);
color: var(--gold);
padding: 2px 6px;
background: rgba(199, 162, 107, 0.08);
border: 1px solid rgba(199, 162, 107, 0.25);
border-radius: 2px;
letter-spacing: 0.06em;
font-weight: 600;
}

.mb-topbar-right { display: flex; align-items: center; gap: var(--sp-md); }
.mb-status {
display: flex; align-items: center; gap: 5px;
font-size: var(--fs-xs);
color: var(--muted);
padding: 3px 7px;
background: var(--s1);
border: 1px solid var(--border);
border-radius: 3px;
letter-spacing: 0.06em;
}
.mb-status-run { color: var(--teal); border-color: rgba(61, 110, 82, 0.35); }
.mb-status-dot {
width: 5px; height: 5px;
background: var(--dim);
border-radius: 50%;
}
.mb-status-dot-live { background: var(--teal); animation: mb-pulse 1.5s ease-in-out infinite; }
@keyframes mb-pulse {
0%, 100% { opacity: 1; transform: scale(1); }
50% { opacity: 0.4; transform: scale(0.8); }
}
.mb-meta {
display: flex; gap: 6px;
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.02em;
}
.mb-meta-sep { color: var(--dim); }
.mb-clock {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.04em;
}
@media (max-width: 480px) { .mb-meta-hide-sm { display: none; } }

.mb-tabs-top {
position: sticky;
top: calc(var(--topbar-h) + 36px);
z-index: 48;
background: var(--s2);
border-bottom: 1px solid var(--border);
padding: 0 var(--sp-md);
display: flex;
}
.mb-tabswitch {
display: flex;
gap: 2px;
padding: 4px 0;
}
.mb-tab {
background: transparent;
border: 0;
color: var(--muted);
font-family: inherit;
font-size: var(--fs-sm);
font-weight: 500;
padding: 6px 12px;
border-radius: 3px;
cursor: pointer;
transition: color 0.15s, background 0.15s;
}
.mb-tab:hover { color: var(--text); }
.mb-tab-active {
color: var(--teal);
background: rgba(61, 110, 82, 0.08);
}
@media (max-width: 640px) { .mb-tabs-top { display: none; } }

.mb-bottomnav {
position: fixed;
bottom: 0; left: 0; right: 0;
background: var(--s2);
border-top: 1px solid var(--border);
display: none;
z-index: 50;
padding-bottom: env(safe-area-inset-bottom);
}
@media (max-width: 640px) { .mb-bottomnav { display: flex; } }
.mb-bottomnav-item {
flex: 1;
background: transparent;
border: 0;
color: var(--muted);
font-family: inherit;
font-size: 10px;
font-weight: 500;
padding: 8px 4px;
height: 48px;
display: flex; flex-direction: column; align-items: center; justify-content: center;
gap: 3px;
cursor: pointer;
}
.mb-bottomnav-active { color: var(--teal); }

.mb-stage {
padding: var(--sp-md);
padding-bottom: 64px;
max-width: 1600px;
margin: 0 auto;
}
@media (min-width: 641px) { .mb-stage { padding-bottom: var(--sp-md); } }

.mb-view {
display: flex;
flex-direction: column;
gap: var(--sp-md);
}

.mb-kpistrip {
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 1px;
background: var(--border);
border: 1px solid var(--border);
border-radius: 4px;
overflow: hidden;
}
@media (max-width: 880px) { .mb-kpistrip { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 480px) {
.mb-kpistrip { grid-template-columns: repeat(3, 1fr); }
}
.mb-kpi {
background: var(--s1);
padding: var(--sp-sm) var(--sp-md);
display: flex; flex-direction: column;
gap: 3px;
min-width: 0;
}
.mb-kpi-primary { background: var(--s2); }
.mb-kpi-label {
font-size: var(--fs-xs);
color: var(--muted);
text-transform: uppercase;
letter-spacing: 0.08em;
font-weight: 500;
}
.mb-kpi-value {
font-size: var(--fs-lg);
font-weight: 600;
color: var(--text);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.mb-section {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
overflow: hidden;
}
.mb-section-head {
display: flex;
align-items: flex-start;
justify-content: space-between;
padding: var(--sp-md);
gap: var(--sp-sm);
border-bottom: 1px solid var(--border);
background: var(--s2);
}
.mb-section-head-tight {
padding: var(--sp-sm) var(--sp-md);
align-items: center;
}
.mb-section-title {
margin: 0;
font-size: var(--fs-md);
font-weight: 600;
color: var(--text);
}
.mb-section-title-sm {
margin: 0;
font-size: var(--fs-sm);
font-weight: 600;
color: var(--text);
}
.mb-section-sub {
margin: 2px 0 0;
font-size: var(--fs-xs);
color: var(--muted);
}
.mb-section-meta {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.02em;
white-space: nowrap;
}

.mb-table {
display: flex;
flex-direction: column;
}
.mb-table-head {
display: grid;
grid-template-columns: 1.7fr 0.8fr 0.7fr 1fr 0.9fr 1.1fr 24px;
gap: var(--sp-sm);
padding: 8px var(--sp-md);
background: var(--s2);
border-bottom: 1px solid var(--border);
align-items: center;
}
.mb-th {
font-size: var(--fs-xs);
color: var(--muted);
text-transform: uppercase;
letter-spacing: 0.08em;
font-weight: 500;
}
.mb-th-num, .mb-th-pnl { text-align: right; }

.mb-tr {
display: grid;
grid-template-columns: 1.7fr 0.8fr 0.7fr 1fr 0.9fr 1.1fr 24px;
gap: var(--sp-sm);
padding: 10px var(--sp-md);
border-bottom: 1px solid var(--border);
align-items: center;
cursor: pointer;
transition: background 0.15s;
font-size: var(--fs-sm);
}
.mb-tr:last-child { border-bottom: 0; }
.mb-tr:hover { background: rgba(61, 110, 82, 0.03); }
.mb-tr-exp { background: var(--s2); }
.mb-tr-active { box-shadow: inset 2px 0 0 var(--teal); }

.mb-td { min-width: 0; }
.mb-td-num, .mb-td-pnl { text-align: right; }
.mb-td-pnl {
display: flex; align-items: center; justify-content: flex-end; gap: 4px;
font-weight: 600;
}
.mb-td-edge {
display: flex; align-items: center; gap: var(--sp-sm);
}
.mb-rank {
width: 18px; height: 18px;
display: flex; align-items: center; justify-content: center;
background: var(--border);
color: var(--muted);
border-radius: 2px;
font-size: 10px;
font-weight: 600;
flex-shrink: 0;
}
.mb-edge-cell { display: flex; align-items: center; gap: 6px; min-width: 0; }
.mb-edge-val { font-weight: 600; font-size: var(--fs-md); }

.mb-pill {
font-size: 9px;
padding: 1px 5px;
border-radius: 2px;
font-weight: 600;
letter-spacing: 0.06em;
white-space: nowrap;
}
.mb-pill-teal {
background: rgba(61, 110, 82, 0.12);
color: var(--teal);
border: 1px solid rgba(61, 110, 82, 0.3);
}

.mb-td-chev {
display: flex; justify-content: flex-end;
color: var(--muted);
}
.mb-rotate { transform: rotate(90deg); transition: transform 0.18s; color: var(--teal); }

@media (max-width: 880px) {
.mb-table-head, .mb-tr {
grid-template-columns: 1.5fr 0.7fr 0.9fr 1.1fr 24px;
}
.mb-th-hide-md, .mb-td-hide-md { display: none; }
}
@media (max-width: 560px) {
.mb-table-head, .mb-tr {
grid-template-columns: 1.6fr 0.7fr 1.1fr 24px;
gap: 6px;
padding-left: 10px; padding-right: 10px;
}
.mb-th-hide-sm, .mb-td-hide-sm { display: none; }
}
@media (max-width: 480px) {
.mb-table-head, .mb-tr {
grid-template-columns: 1.4fr 0.6fr 90px 20px;
gap: 4px;
}
.mb-th-pnl, .mb-td-pnl {
min-width: 80px;
white-space: nowrap;
text-align: right;
}
}

.mb-tr-detail {
background: var(--bg);
padding: var(--sp-md);
border-bottom: 1px solid var(--border);
display: grid;
grid-template-columns: 1fr 1.4fr;
gap: var(--sp-md);
animation: mb-expand 0.18s ease-out;
}
@media (max-width: 640px) {
.mb-tr-detail { grid-template-columns: 1fr; }
}
@keyframes mb-expand {
from { opacity: 0; }
to { opacity: 1; }
}
.mb-detail-grid {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 0 12px;
}
.mb-detail-row {
display: flex; justify-content: space-between;
font-size: var(--fs-xs);
padding: 5px 0;
border-bottom: 1px solid var(--border);
}
.mb-detail-label { color: var(--muted); }
.mb-detail-val { color: var(--text); }
.mb-spark { height: 80px; }

.mb-grid-2 {
display: grid;
grid-template-columns: 1fr 1fr;
gap: var(--sp-md);
}
@media (max-width: 880px) {
.mb-grid-2 { grid-template-columns: 1fr; }
}

.mb-chart-lg { height: clamp(200px, 24vh, 280px); padding: var(--sp-sm); }
.mb-chart-xl { height: clamp(260px, 36vh, 420px); padding: var(--sp-sm); }

.mb-controlbar {
display: flex;
align-items: center;
gap: var(--sp-md);
padding: var(--sp-sm) var(--sp-md);
background: var(--s2);
border: 1px solid var(--border);
border-radius: 4px;
}
.mb-controlbar-inset {
background: var(--s2);
border: 0;
border-bottom: 1px solid var(--border);
border-radius: 0;
}
.mb-controlbar-label {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 600;
flex-shrink: 0;
}
.mb-segmented {
display: flex;
gap: 2px;
background: var(--s1);
padding: 2px;
border-radius: 3px;
border: 1px solid var(--border);
flex: 1;
overflow-x: auto;
scrollbar-width: none;
min-width: 0;
}
.mb-segmented::-webkit-scrollbar { display: none; }
.mb-segmented-sm { flex: 0 1 auto; }
.mb-segbtn {
background: transparent;
border: 0;
color: var(--muted);
font-family: inherit;
font-size: var(--fs-xs);
font-weight: 500;
padding: 6px 10px;
border-radius: 2px;
cursor: pointer;
display: flex; align-items: center; gap: 5px;
white-space: nowrap;
transition: color 0.15s, background 0.15s;
min-height: 28px;
}
.mb-segbtn:hover { color: var(--text); }
.mb-segbtn-active {
background: rgba(61, 110, 82, 0.1);
color: var(--teal);
}

.mb-parambar {
display: grid;
grid-template-columns: 1.8fr repeat(4, 1fr) auto;
gap: var(--sp-md);
padding: var(--sp-md);
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
align-items: end;
}
@media (max-width: 880px) {
.mb-parambar { grid-template-columns: 1fr 1fr 1fr; }
.mb-param-actions { grid-column: span 3; }
}
@media (max-width: 480px) {
.mb-parambar { grid-template-columns: 1fr 1fr; }
.mb-param-actions { grid-column: span 2; }
}
.mb-param {
display: flex; flex-direction: column;
gap: 6px;
min-width: 0;
}
.mb-param-head {
display: flex; align-items: baseline; gap: 6px;
font-size: var(--fs-xs);
}
.mb-param-label {
font-weight: 600;
color: var(--text);
}
.mb-param-hint {
color: var(--muted);
font-size: var(--fs-xs);
}
.mb-param-val {
margin-left: auto;
color: var(--teal);
font-weight: 600;
font-size: var(--fs-sm);
}
.mb-slider {
-webkit-appearance: none;
width: 100%;
height: 3px;
background: var(--border);
border-radius: 2px;
outline: 0;
cursor: pointer;
}
.mb-slider::-webkit-slider-thumb {
-webkit-appearance: none;
width: 14px; height: 14px;
background: var(--teal);
border-radius: 50%;
cursor: pointer;
border: 2px solid var(--s1);
}
.mb-slider::-moz-range-thumb {
width: 14px; height: 14px;
background: var(--teal);
border-radius: 50%;
cursor: pointer;
border: 2px solid var(--s1);
}
.mb-numinput {
width: 100%;
height: 30px;
background: var(--bg);
border: 1px solid var(--border);
border-radius: 3px;
color: var(--text);
font-size: var(--fs-sm);
padding: 0 8px;
outline: 0;
transition: border-color 0.15s;
}
.mb-numinput:focus { border-color: var(--teal); }

.mb-param-actions { display: flex; align-items: end; }
.mb-runbtn {
height: 30px;
padding: 0 16px;
background: var(--teal);
color: var(--bg);
border: 0;
border-radius: 3px;
font-family: inherit;
font-weight: 600;
font-size: var(--fs-xs);
letter-spacing: 0.08em;
cursor: pointer;
display: flex; align-items: center; gap: 5px;
width: 100%;
justify-content: center;
transition: background 0.15s;
}
.mb-runbtn:hover { background: #34d4b6; }
.mb-runbtn:disabled {
background: var(--border);
color: var(--dim);
cursor: not-allowed;
}
.mb-runbtn-running:disabled {
background: linear-gradient(90deg, #1c8a76 0%, #34d4b6 50%, #1c8a76 100%);
background-size: 200% 100%;
color: var(--bg);
cursor: wait;
animation: mb-runbtn-breath 2s ease-in-out infinite;
}
@keyframes mb-runbtn-breath {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}
.mb-databanner-pulse {
animation: mb-databanner-pulse 1.1s ease-out 1;
}
@keyframes mb-databanner-pulse {
0% { box-shadow: inset 0 0 0 0 rgba(199, 162, 107, 0.0); background-color: rgba(199, 162, 107, 0.22); }
40% { background-color: rgba(199, 162, 107, 0.16); }
100% { background-color: inherit; }
}
.mb-databanner-age { margin-left: auto; font-size: 10px; opacity: 0.7; }

/* v8.2: Sample-size chip in REAL DATA banner */
.mb-sample-chip {
display: inline-block;
margin-left: 6px;
padding: 1px 6px;
border-radius: 2px;
background: rgba(199, 162, 107, 0.18);
color: var(--gold-bright, #d4b27a);
border: 1px solid rgba(199, 162, 107, 0.35);
font-size: 9.5px;
letter-spacing: 0.06em;
cursor: help;
vertical-align: 1px;
}

/* v8.2: SPX market-structure disclosure footnote */
.mb-spx-disclosure {
margin-top: 6px;
padding: 6px 10px;
font-size: 12px;
font-style: italic;
color: var(--dim);
border-left: 2px solid rgba(199, 162, 107, 0.35);
line-height: 1.5;
}

/* v8.2: MLB direction explainer banner */
.mb-mlbdir-banner {
display: flex;
align-items: center;
gap: 10px;
padding: 8px 12px;
margin: 0 var(--sp-md) var(--sp-xs);
background: var(--s2, rgba(199, 162, 107, 0.06));
border: 1px solid rgba(199, 162, 107, 0.45);
border-radius: 4px;
font-size: 13px;
line-height: 1.45;
color: var(--text);
}
.mb-mlbdir-tag {
flex: 0 0 auto;
padding: 2px 8px;
border-radius: 2px;
background: rgba(199, 162, 107, 0.18);
color: var(--gold-bright, #d4b27a);
font-size: 10px;
letter-spacing: 0.08em;
}
.mb-mlbdir-msg { flex: 1; }
@media (max-width: 640px) {
.mb-mlbdir-banner { flex-direction: column; align-items: flex-start; gap: 6px; }
.mb-mlbdir-msg { font-size: 12px; }
}

/* v9 Phase 1: Streak analysis view */
.mb-streak-empty {
  padding: var(--sp-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--muted);
}
.mb-streak-empty-text { font-size: var(--fs-sm); }
.mb-streak-kpis {
  margin: var(--sp-md);
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 560px) {
  .mb-streak-kpis { grid-template-columns: repeat(2, 1fr); }
}
.mb-streak-divergence {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: var(--sp-sm) var(--sp-md);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--s2);
  font-size: var(--fs-sm);
  flex-wrap: wrap;
}
.mb-streak-divergence-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: var(--fs-xs);
}
.mb-streak-divergence-val {
  font-size: var(--fs-md);
  font-weight: 600;
}
.mb-streak-divergence-detail { font-size: var(--fs-xs); }
.mb-streak-insight {
  padding: var(--sp-sm) var(--sp-md);
  font-size: var(--fs-sm);
  color: var(--text);
  border-bottom: 1px solid var(--border);
  border-left: 2px solid var(--gold);
  line-height: 1.5;
}
.mb-streak-sim-tag {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 2px;
  background: rgba(199, 162, 107, 0.18);
  color: var(--gold-bright, #d4b27a);
  border: 1px solid rgba(199, 162, 107, 0.35);
  font-size: 9.5px;
  letter-spacing: 0.06em;
  vertical-align: 1px;
}
.mb-streak-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-md);
  padding: var(--sp-sm) var(--sp-md);
  font-size: var(--fs-xs);
  color: var(--muted);
  border-top: 1px solid var(--border);
}
.mb-streak-legend-item { display: inline-flex; align-items: center; gap: 6px; }
.mb-streak-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

/* v9 Phase 2: Survival funding calculator */
.mb-streak-funding-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-md);
  padding: var(--sp-md);
  border-bottom: 1px solid var(--border);
}
.mb-streak-funding-controls-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) {
  .mb-streak-funding-controls-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .mb-streak-funding-controls { grid-template-columns: 1fr; }
  .mb-streak-funding-controls-4 { grid-template-columns: 1fr; }
}
.mb-streak-funding-row { display: flex; flex-direction: column; gap: 6px; }
.mb-streak-funding-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.mb-streak-funding-val { color: var(--text); text-transform: none; letter-spacing: 0; font-size: var(--fs-sm); }
.mb-streak-funding-kpis {
  margin: var(--sp-md);
  grid-template-columns: repeat(2, 1fr);
}
@media (max-width: 560px) {
  .mb-streak-funding-kpis { grid-template-columns: 1fr; }
}
.mb-streak-verdict {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px var(--sp-md);
  margin: 0 var(--sp-md) var(--sp-md);
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text);
}
.mb-streak-verdict-tag {
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 600;
}
.mb-streak-verdict-msg { flex: 1; }
.mb-streak-verdict-teal {
  background: rgba(61, 110, 82, 0.10);
  border-color: rgba(61, 110, 82, 0.45);
}
.mb-streak-verdict-teal .mb-streak-verdict-tag {
  background: rgba(61, 110, 82, 0.20);
  color: var(--teal-bright);
}
.mb-streak-verdict-gold {
  background: rgba(199, 162, 107, 0.06);
  border-color: rgba(199, 162, 107, 0.45);
}
.mb-streak-verdict-gold .mb-streak-verdict-tag {
  background: rgba(199, 162, 107, 0.18);
  color: var(--gold);
}
.mb-streak-verdict-gold-bright {
  background: rgba(212, 183, 135, 0.12);
  border-color: rgba(212, 183, 135, 0.55);
}
.mb-streak-verdict-gold-bright .mb-streak-verdict-tag {
  background: rgba(212, 183, 135, 0.25);
  color: var(--gold-bright);
}
.mb-streak-verdict-red {
  background: rgba(196, 69, 69, 0.08);
  border-color: rgba(196, 69, 69, 0.45);
}
.mb-streak-verdict-red .mb-streak-verdict-tag {
  background: rgba(196, 69, 69, 0.18);
  color: var(--red-bright);
}
@media (max-width: 560px) {
  .mb-streak-verdict { flex-direction: column; align-items: flex-start; gap: 6px; }
}

/* v9 Phase 2 pivot: dual-scenario grid + dim column + small reference verdict */
.mb-streak-scenario-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: var(--sp-md);
  padding: var(--sp-md);
  border-bottom: 1px solid var(--border);
}
@media (max-width: 880px) {
  .mb-streak-scenario-grid { grid-template-columns: 1fr; }
}
.mb-streak-scenario-col { display: flex; flex-direction: column; gap: var(--sp-sm); min-width: 0; }
.mb-streak-scenario-title {
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border);
}
.mb-streak-scenario-kpis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
@media (max-width: 480px) {
  .mb-streak-scenario-kpis { grid-template-columns: 1fr; }
}
.mb-streak-scenario-col-dim .mb-streak-scenario-title { color: var(--dim); }
.mb-streak-scenario-col-dim .mb-kpi { background: var(--bg); }
.mb-streak-scenario-col-dim .mb-kpi-label { color: var(--dim); }
.mb-streak-scenario-col-dim .mb-kpi-value { color: var(--muted); font-size: var(--fs-md); }

.mb-streak-verdict-sm {
  padding: 6px var(--sp-md);
  font-size: 11.5px;
  opacity: 0.85;
}
.mb-streak-verdict-sm .mb-streak-verdict-tag { font-size: 9px; padding: 1px 6px; }

/* v9 Phase 4 Lite: Risk Engine block */
.mb-risk-head { border-top: 1px solid var(--border); }
.mb-risk-controls { padding: var(--sp-sm) var(--sp-md); border-bottom: 1px solid var(--border); }
.mb-risk-bankroll-label {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: var(--sp-md);
  align-items: center;
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.mb-risk-bankroll-val { color: var(--text); text-transform: none; font-size: var(--fs-sm); }
@media (max-width: 720px) {
  .mb-risk-bankroll-label { grid-template-columns: 1fr; gap: 6px; }
}
.mb-risk-kpis {
  margin: var(--sp-md);
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 720px) {
  .mb-risk-kpis { grid-template-columns: repeat(2, 1fr); }
}
.mb-risk-gauge {
  padding: var(--sp-sm) var(--sp-md);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--s2);
}
.mb-risk-gauge-bar {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right,
    var(--teal-bright) 0%,
    var(--teal-bright) 25%,
    var(--gold-bright) 50%,
    var(--red-bright) 75%,
    var(--red-bright) 100%);
  position: relative;
  margin-bottom: 6px;
}
.mb-risk-gauge-marker {
  position: absolute;
  top: -3px;
  width: 4px;
  height: 14px;
  background: var(--text);
  transform: translateX(-50%);
  border-radius: 1px;
  box-shadow: 0 0 4px rgba(0,0,0,0.6);
  transition: left 0.25s ease-out;
}
.mb-risk-gauge-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.mb-risk-horizon { padding: var(--sp-sm) var(--sp-md) var(--sp-md); }
.mb-risk-horizon-head {
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}
.mb-risk-horizon-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.mb-risk-horizon-cell {
  background: var(--s1);
  padding: var(--sp-sm);
  text-align: center;
}
.mb-risk-horizon-label {
  font-size: var(--fs-xs);
  color: var(--muted);
}
.mb-risk-horizon-val {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--gold-bright);
}

/* v9 Phase 3a: Plain English toggle pill in TopBar */
.mb-plain-toggle {
  padding: 4px 10px;
  border-radius: 2px;
  font-size: var(--fs-xs);
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  font-family: 'Outfit', -apple-system, system-ui, sans-serif;
  white-space: nowrap;
}
.mb-plain-toggle-off {
  border: 1px solid var(--border);
  color: var(--muted);
  background: transparent;
}
.mb-plain-toggle-off:hover { color: var(--text); border-color: var(--teal); }
.mb-plain-toggle-on {
  border: 1px solid var(--teal);
  color: var(--teal-bright);
  background: rgba(61, 110, 82, 0.15);
  font-weight: 600;
}

/* v9 Phase 3a: Plain English translation card */
.mb-plain-card {
  background: var(--s2);
  border: 1px solid var(--gold-bright);
  border-radius: 4px;
  padding: var(--sp-md);
  margin: 0 var(--sp-md) var(--sp-md);
}
.mb-plain-card-empty {
  text-align: center;
  padding: var(--sp-md);
}
.mb-plain-empty-msg {
  color: var(--muted);
  margin-top: var(--sp-sm);
  font-size: var(--fs-md);
}
.mb-plain-header {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
  margin-bottom: var(--sp-sm);
  flex-wrap: wrap;
}
.mb-plain-tag {
  color: var(--gold-bright);
  text-transform: uppercase;
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  font-weight: 600;
}
.mb-plain-warn-chip {
  padding: 1px 6px;
  border-radius: 2px;
  background: rgba(199, 162, 107, 0.18);
  color: var(--gold-bright);
  border: 1px solid rgba(199, 162, 107, 0.35);
  font-size: 9.5px;
  letter-spacing: 0.06em;
}
.mb-plain-verdict {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
  padding: var(--sp-md);
  border: 1px solid;
  border-radius: 4px;
  margin-bottom: var(--sp-md);
}
.mb-plain-verdict-label {
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: 0.08em;
  flex: 0 0 auto;
}
.mb-plain-verdict-msg {
  flex: 1;
  font-size: var(--fs-md);
  line-height: 1.4;
}
.mb-plain-verdict-green {
  background: rgba(61, 110, 82, 0.18);
  border-color: var(--teal-bright);
}
.mb-plain-verdict-green .mb-plain-verdict-label,
.mb-plain-verdict-green .mb-plain-verdict-msg { color: var(--teal-bright); }
.mb-plain-verdict-yellow {
  background: rgba(212, 183, 135, 0.18);
  border-color: var(--gold-bright);
}
.mb-plain-verdict-yellow .mb-plain-verdict-label,
.mb-plain-verdict-yellow .mb-plain-verdict-msg { color: var(--gold-bright); }
.mb-plain-verdict-red {
  background: rgba(196, 69, 69, 0.18);
  border-color: var(--red-bright);
}
.mb-plain-verdict-red .mb-plain-verdict-label,
.mb-plain-verdict-red .mb-plain-verdict-msg { color: var(--red-bright); }
.mb-plain-sections {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
}
.mb-plain-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mb-plain-section-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}
.mb-plain-section-label {
  text-transform: uppercase;
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  font-weight: 600;
}
.mb-plain-section-body {
  font-size: var(--fs-md);
  line-height: 1.5;
  color: var(--text);
  padding-left: 24px;
}
@media (max-width: 560px) {
  .mb-plain-verdict { flex-direction: column; align-items: flex-start; gap: 6px; }
  .mb-plain-section-body { padding-left: 0; }
}

/* v9 Polish: NumberField wrapper with inline reset */
.mb-numfield { position: relative; display: inline-block; }
.mb-numfield .mb-numinput { padding-right: 22px; width: 100%; }
.mb-numfield-reset {
  position: absolute;
  right: 4px; top: 50%; transform: translateY(-50%);
  width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: 0;
  color: var(--dim);
  cursor: pointer;
  font-size: 14px; line-height: 1;
  padding: 0;
  border-radius: 2px;
  transition: color 0.15s, background 0.15s;
}
.mb-numfield-reset:hover { color: var(--text); background: rgba(255,255,255,0.04); }

/* v9 Polish: Hint popover */
.mb-hint { position: relative; display: inline-block; vertical-align: baseline; margin-left: 2px; }
.mb-hint-icon {
  display: inline-flex;
  align-items: center; justify-content: center;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--dim);
  color: var(--muted);
  font-size: 9px;
  font-weight: 600;
  cursor: help;
  padding: 0;
  font-family: inherit;
  vertical-align: 1px;
  line-height: 1;
  transition: color 0.15s, border-color 0.15s;
}
.mb-hint-icon:hover, .mb-hint-icon[aria-expanded="true"] {
  color: var(--teal-bright);
  border-color: var(--teal);
}
.mb-hint-popup {
  position: absolute;
  z-index: 60;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--s2);
  border: 1px solid var(--border);
  border-left: 2px solid var(--gold);
  border-radius: 3px;
  padding: 8px 10px;
  width: 240px;
  font-size: var(--fs-xs);
  line-height: 1.45;
  color: var(--text);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-family: 'Outfit', -apple-system, system-ui, sans-serif;
  white-space: normal;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.mb-hint-popup strong { color: var(--gold-bright); font-weight: 600; }
@media (max-width: 560px) {
  .mb-hint-popup { width: 180px; }
}

/* v9.0.2 / v9.1.1: HelpIcon — gold-tinted (?) circle, portal-rendered popover. */
.mb-help-wrap { position: relative; display: inline-block; vertical-align: middle; margin-left: 6px; }
.mb-help-icon {
  display: inline-flex;
  align-items: center; justify-content: center;
  width: 18px; height: 18px;
  padding: 0;
  background: rgba(212, 183, 135, 0.12);
  border: 1px solid rgba(212, 183, 135, 0.4);
  color: var(--gold-bright);
  cursor: pointer;
  border-radius: 50%;
  transition: background 120ms ease-out, border-color 120ms ease-out, transform 120ms ease-out;
  vertical-align: middle;
}
.mb-help-icon:hover {
  background: rgba(212, 183, 135, 0.22);
  border-color: rgba(212, 183, 135, 0.7);
  transform: scale(1.05);
}
.mb-help-icon[aria-expanded="true"] {
  background: rgba(212, 183, 135, 0.3);
  border-color: var(--gold-bright);
}
.mb-help-icon:focus-visible {
  outline: 2px solid var(--teal-bright);
  outline-offset: 2px;
}
.mb-help-popup {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--s2);
  border: 1px solid var(--border);
  border-left: 3px solid var(--gold);
  border-radius: 4px;
  padding: 10px 12px;
  width: 280px;
  max-width: 80vw;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
  text-align: left;
  white-space: normal;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
.mb-help-popup-title {
  color: var(--gold-bright);
  text-transform: uppercase;
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  font-weight: 600;
}
.mb-help-popup-explanation {
  color: var(--text);
  font-size: var(--fs-sm);
  line-height: 1.45;
  font-family: 'Outfit', -apple-system, system-ui, sans-serif;
}
.mb-help-popup-example {
  color: var(--muted);
  font-size: var(--fs-xs);
  font-style: italic;
  line-height: 1.45;
  font-family: 'Outfit', -apple-system, system-ui, sans-serif;
}
.mb-help-backdrop { display: none; }
@media (max-width: 560px) {
  .mb-help-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 9998;
  }
  .mb-help-popup-mobile {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(320px, 88vw);
    z-index: 9999;
  }
}

/* v9.0.2: Button affordances — focus-visible rings, subtle hover lift, clearer active states */
.mb-tab:focus-visible,
.mb-segbtn:focus-visible,
.mb-opsbar-mode:focus-visible,
.mb-preset-btn:focus-visible,
.mb-bottomnav-item:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 1px;
  border-radius: 3px;
}
.mb-tab:not(.mb-tab-active):hover {
  background: rgba(61, 110, 82, 0.05);
}
.mb-segbtn:not(.mb-segbtn-active) {
  border: 1px solid transparent;
}
.mb-segbtn:not(.mb-segbtn-active):hover {
  border-color: rgba(61, 110, 82, 0.25);
  background: rgba(61, 110, 82, 0.04);
}
.mb-segbtn-active {
  border: 1px solid rgba(61, 110, 82, 0.45);
}
.mb-preset-btn { transition: border-color 0.15s, background 0.15s, transform 0.12s; }
.mb-preset-btn:hover:not(:disabled) { transform: translateY(-1px); }
.mb-preset-btn:active { transform: translateY(0); }
.mb-opsbar-mode:not(.mb-opsbar-mode-active):hover {
  background: rgba(138, 133, 120, 0.06);
}

/* v9 Polish: keep TopBar toggle visible on very narrow screens */
@media (max-width: 480px) {
  .mb-topbar-right { gap: 6px; }
  .mb-plain-toggle { padding: 3px 6px; font-size: 10px; }
  .mb-clock { font-size: 11px; }
  .mb-brand-ver { font-size: 9px; }
}

/* v9 Phase 3b: Recommend view layout */
.mb-rec-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.4fr) 1fr;
  gap: var(--sp-md);
}
@media (max-width: 880px) {
  .mb-rec-layout { grid-template-columns: 1fr; }
}
.mb-rec-input-grid {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
  padding: var(--sp-md);
}
.mb-rec-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mb-rec-field-label {
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  gap: 6px;
}
.mb-rec-field-warn .mb-numinput {
  border-color: var(--red);
}
.mb-rec-field-warn-msg {
  font-size: var(--fs-xs);
  color: var(--red-bright);
}
.mb-rec-checks, .mb-rec-radios {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mb-rec-check, .mb-rec-radio {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  cursor: pointer;
  color: var(--text);
}
.mb-rec-check input, .mb-rec-radio input {
  accent-color: var(--teal);
  cursor: pointer;
}

.mb-rec-empty {
  padding: var(--sp-lg) var(--sp-md);
  color: var(--muted);
  font-size: var(--fs-sm);
  text-align: center;
}

.mb-rec-primary {
  padding: var(--sp-md);
  border-bottom: 1px solid var(--border);
}
.mb-rec-primary-head {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--gold-bright);
  margin-bottom: 8px;
}
.mb-rec-primary-tag {
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  font-weight: 600;
}
.mb-rec-primary-line {
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 4px;
}
.mb-rec-primary-sub {
  font-size: var(--fs-sm);
  color: var(--muted);
  margin-bottom: var(--sp-md);
}
.mb-rec-kpis {
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: var(--sp-md);
}
@media (max-width: 560px) {
  .mb-rec-kpis { grid-template-columns: 1fr; }
}
.mb-rec-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
  flex-wrap: wrap;
}
.mb-rec-lockbtn {
  padding: 8px 14px;
  border-radius: 3px;
  border: 1px solid var(--gold-bright);
  background: rgba(199, 162, 107, 0.18);
  color: var(--gold-bright);
  cursor: pointer;
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: 0.04em;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}
.mb-rec-lockbtn:hover:not(:disabled) {
  background: rgba(199, 162, 107, 0.30);
  color: var(--text);
}
.mb-rec-lockbtn:disabled {
  border-color: var(--border);
  background: transparent;
  color: var(--dim);
  cursor: default;
}
.mb-rec-toast {
  font-size: var(--fs-xs);
  color: var(--teal-bright);
  padding: 4px 8px;
  background: rgba(61, 110, 82, 0.15);
  border: 1px solid var(--teal);
  border-radius: 2px;
  letter-spacing: 0.02em;
}

.mb-rec-alts { padding: 0 var(--sp-md) var(--sp-md); }
.mb-rec-alttable {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 3px;
  overflow: hidden;
}
.mb-rec-altrow {
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.7fr 0.8fr 1fr 0.7fr;
  gap: var(--sp-sm);
  padding: 8px var(--sp-md);
  border-bottom: 1px solid var(--border);
  align-items: center;
  font-size: var(--fs-sm);
}
.mb-rec-altrow:last-child { border-bottom: 0; }
.mb-rec-altrow-head {
  background: var(--s2);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: var(--fs-xs);
  font-weight: 500;
}
.mb-rec-altnum { text-align: right; }
@media (max-width: 560px) {
  .mb-rec-altrow { grid-template-columns: 1.4fr 0.6fr 0.8fr 1fr; }
  .mb-rec-altnum:nth-child(5), .mb-rec-altnum:nth-child(6) { display: none; }
}

.mb-rec-errors { padding: 0 var(--sp-md) var(--sp-md); }
.mb-rec-error {
  font-size: var(--fs-xs);
  color: var(--red-bright);
  padding: 4px 0;
}

/* v9.1: Guided Mode */
.mb-guided {
  max-width: 640px;
  margin: 0 auto;
  padding: var(--sp-lg) var(--sp-md);
}
.mb-guided-stepbar {
  display: flex;
  align-items: center;
  gap: var(--sp-md);
  margin-bottom: var(--sp-lg);
}
.mb-guided-stepbar-track {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
.mb-guided-stepbar-cell {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  transition: background 0.2s;
}
.mb-guided-stepbar-cell-active { background: var(--teal); }
.mb-guided-stepbar-label {
  font-size: var(--fs-xs);
  color: var(--muted);
  letter-spacing: 0.08em;
}
.mb-guided-card {
  background: var(--s1);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: var(--sp-lg);
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
}
.mb-guided-anim {
  animation: mb-guided-fadein 0.22s ease-out;
}
@keyframes mb-guided-fadein {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.mb-guided-title {
  margin: 0;
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}
.mb-guided-sub {
  margin: 0;
  font-size: var(--fs-md);
  line-height: 1.5;
  color: var(--muted);
}
.mb-guided-disclosure {
  align-self: flex-start;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 6px 10px;
  color: var(--teal-bright);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--fs-sm);
  display: flex; align-items: center; gap: 6px;
}
.mb-guided-disclosure:hover { background: rgba(61, 110, 82, 0.08); }
.mb-guided-disclosure-body {
  padding: var(--sp-sm) 0;
  font-size: var(--fs-sm);
  line-height: 1.55;
  color: var(--text);
}
.mb-guided-disclosure-body p { margin: 0 0 var(--sp-sm); }
.mb-guided-ladder {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--sp-sm);
}
.mb-guided-ladder-cell {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 44px; height: 32px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 3px;
  font-size: var(--fs-sm);
  font-weight: 600;
  background: var(--s2);
}
.mb-guided-ladder-gold { color: var(--gold); border-color: var(--gold); }
.mb-guided-ladder-dim { color: var(--muted); }
.mb-guided-ladder-red { color: var(--red-bright); border-color: var(--red); }
.mb-guided-ladder-arrow { color: var(--dim); font-size: var(--fs-sm); }
.mb-guided-ladder-cap { margin: 6px 0 0; font-size: var(--fs-xs); }

/* v9.1.3: skip-welcome checkbox + manual override link */
.mb-guided-skip {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  color: var(--muted);
  cursor: pointer;
  user-select: none;
}
.mb-guided-skip input {
  accent-color: var(--teal);
  cursor: pointer;
}
.mb-guided-skip:hover { color: var(--text); }
.mb-guided-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--sp-md);
  flex-wrap: wrap;
}
.mb-guided-welcome-link {
  background: transparent;
  border: 0;
  padding: 0;
  font-family: inherit;
  font-size: var(--fs-sm);
  color: var(--muted);
  cursor: pointer;
  text-decoration: none;
}
.mb-guided-welcome-link:hover {
  color: var(--text);
  text-decoration: underline;
}
.mb-guided-welcome-link:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
  border-radius: 2px;
}

/* v9.2.1: welcome screen — both buttons on the right, stacked Skip-on-top on mobile */
.mb-guided-actions-welcome {
  justify-content: flex-end;
  gap: var(--sp-sm);
}
@media (max-width: 560px) {
  .mb-guided-actions-welcome {
    flex-direction: column;
  }
  .mb-guided-actions-welcome > button { width: 100%; }
}

/* v9.2: inline odds notice on Step 5 above the verdict */
.mb-guided-odds-notice {
  margin: 0;
  font-size: var(--fs-xs);
  color: var(--muted);
  letter-spacing: 0.04em;
}
.mb-guided-odds-notice strong { color: var(--gold-bright); font-weight: 600; }

.mb-guided-field {
  display: flex; flex-direction: column; gap: 6px;
  padding: var(--sp-sm) 0;
  border-top: 1px solid var(--border);
}
.mb-guided-field:first-of-type { border-top: 0; padding-top: 0; }
.mb-guided-field-label {
  font-size: var(--fs-md);
  color: var(--text);
  font-weight: 500;
  display: flex; align-items: center; gap: 6px;
}
.mb-guided-field-sub {
  margin: 0;
  font-size: var(--fs-sm);
  color: var(--muted);
}
.mb-guided-input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  padding: 8px 12px;
  font-size: var(--fs-lg);
  width: 100%;
  max-width: 240px;
  margin-top: 4px;
}
.mb-guided-input:focus {
  outline: none;
  border-color: var(--teal);
}
.mb-guided-field-fmt { font-size: var(--fs-xs); margin-top: 2px; }
.mb-guided-comfort-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-sm);
  margin-top: var(--sp-xs);
}
@media (max-width: 560px) {
  .mb-guided-comfort-grid { grid-template-columns: 1fr; }
}
.mb-guided-comfort-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: var(--sp-sm) var(--sp-md);
  cursor: pointer;
  font-family: inherit;
  display: flex; flex-direction: column; gap: 4px;
  text-align: left;
  transition: border-color 0.15s, background 0.15s, transform 0.12s;
}
.mb-guided-comfort-card:hover { border-color: rgba(61, 110, 82, 0.5); transform: translateY(-1px); }
.mb-guided-comfort-card-active {
  border-color: var(--teal);
  background: rgba(61, 110, 82, 0.10);
}
.mb-guided-comfort-label { font-size: var(--fs-md); color: var(--text); font-weight: 600; }
.mb-guided-comfort-sub { font-size: var(--fs-xs); color: var(--muted); }

.mb-guided-error {
  padding: 8px 12px;
  border: 1px solid var(--red);
  border-left: 3px solid var(--red);
  background: rgba(196, 69, 69, 0.10);
  border-radius: 3px;
  color: var(--red-bright);
  font-size: var(--fs-sm);
}

.mb-guided-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--sp-md);
  margin-top: var(--sp-md);
}
.mb-guided-btn-primary {
  padding: 10px 18px;
  border: 1px solid var(--gold-bright);
  border-radius: 4px;
  background: var(--gold);
  color: var(--bg);
  font-family: inherit;
  font-size: var(--fs-md);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.12s;
}
.mb-guided-btn-primary:hover:not(:disabled) { background: var(--gold-bright); transform: translateY(-1px); }
.mb-guided-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.mb-guided-btn-secondary {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: transparent;
  color: var(--muted);
  font-family: inherit;
  font-size: var(--fs-sm);
  cursor: pointer;
}
.mb-guided-btn-secondary:hover { color: var(--text); border-color: var(--teal); }

.mb-guided-loading { padding: var(--sp-md); color: var(--muted); text-align: center; }

.mb-guided-verdict {
  display: flex; align-items: center; gap: var(--sp-md);
  padding: var(--sp-md);
  border: 2px solid;
  border-radius: 6px;
  font-weight: 700;
}
.mb-guided-verdict-label { font-size: var(--fs-xl); letter-spacing: 0.04em; }
.mb-guided-verdict-green { background: rgba(61, 110, 82, 0.18); border-color: var(--teal-bright); color: var(--teal-bright); }
.mb-guided-verdict-yellow { background: rgba(212, 183, 135, 0.18); border-color: var(--gold-bright); color: var(--gold-bright); }
.mb-guided-verdict-red { background: rgba(196, 69, 69, 0.18); border-color: var(--red-bright); color: var(--red-bright); }

.mb-guided-plan {
  padding: var(--sp-md);
  background: var(--s2);
  border-radius: 4px;
  border-left: 3px solid var(--gold);
}
.mb-guided-plan-label {
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
.mb-guided-plan-line { font-size: var(--fs-md); line-height: 1.5; color: var(--text); }
.mb-guided-plan-sub { font-size: var(--fs-xs); margin-top: 4px; }

.mb-guided-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
@media (max-width: 480px) { .mb-guided-stats { grid-template-columns: 1fr; } }
.mb-guided-stat {
  background: var(--s2);
  padding: var(--sp-sm) var(--sp-md);
  display: flex; flex-direction: column; gap: 2px;
}
.mb-guided-stat-label {
  font-size: var(--fs-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.mb-guided-stat-value { font-size: var(--fs-lg); font-weight: 600; }

.mb-guided-next-cards {
  display: flex; flex-direction: column;
  gap: var(--sp-sm);
  margin-top: var(--sp-sm);
}
.mb-guided-next-card {
  display: flex; flex-direction: column; gap: 4px;
  text-align: left;
  background: var(--s2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: var(--sp-md);
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, transform 0.12s;
}
.mb-guided-next-card:hover:not(:disabled) { border-color: var(--gold); background: rgba(199, 162, 107, 0.06); transform: translateY(-1px); }
.mb-guided-next-card:disabled { opacity: 0.5; cursor: not-allowed; }
.mb-guided-next-card-title { font-size: var(--fs-md); color: var(--text); font-weight: 600; }
.mb-guided-next-card-sub { font-size: var(--fs-sm); color: var(--muted); }

@media (max-width: 560px) {
  .mb-guided { padding: var(--sp-md) var(--sp-sm); }
  .mb-guided-card { padding: var(--sp-md); }
  .mb-guided-actions { flex-direction: column-reverse; align-items: stretch; }
  .mb-guided-actions > button { width: 100%; }
}

/* v8.2: Disclaimer footer */
.mb-disclaimer {
padding: 10px 16px 14px;
font-size: 10.5px;
line-height: 1.5;
color: var(--dim);
text-align: center;
opacity: 0.75;
border-top: 1px solid rgba(255,255,255,0.04);
}
@media (max-width: 640px) {
.mb-disclaimer { font-size: 10px; padding: 8px 12px 12px; text-align: left; }
}
.mb-stage-stale .mb-card,
.mb-stage-stale .mb-kpi,
.mb-stage-stale .mb-cardgrid,
.mb-stage-stale .mb-insights {
opacity: 0.6;
transition: opacity 0.2s ease;
filter: saturate(0.7);
}

.mb-spinner {
width: 10px; height: 10px;
border: 1.5px solid currentColor;
border-top-color: transparent;
border-radius: 50%;
animation: mb-spin 0.6s linear infinite;
}
.mb-spinner-lg { width: 20px; height: 20px; border-width: 2px; }
@keyframes mb-spin { to { transform: rotate(360deg); } }

.mb-cardgrid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: var(--sp-sm);
}
@media (max-width: 880px) { .mb-cardgrid { grid-template-columns: repeat(2, 1fr); } }

.mb-card {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
padding: var(--sp-md);
display: flex; flex-direction: column;
gap: 6px;
}
.mb-card-emph { background: var(--s2); }
.mb-card-title {
font-size: var(--fs-xs);
color: var(--muted);
text-transform: uppercase;
letter-spacing: 0.08em;
font-weight: 600;
}
.mb-card-value {
font-size: var(--fs-xl);
font-weight: 600;
color: var(--text);
letter-spacing: -0.01em;
}
.mb-card-meta {
font-size: var(--fs-xs);
color: var(--muted);
display: flex; align-items: center; gap: 4px;
}
.mb-card-meta-sep { color: var(--dim); }

.mb-ledger {
display: flex; flex-direction: column;
}
.mb-ledger-head {
display: grid;
grid-template-columns: 0.8fr 1fr 0.6fr 1fr 1fr 1fr;
gap: var(--sp-sm);
padding: 8px var(--sp-md);
background: var(--s2);
border-bottom: 1px solid var(--border);
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 500;
}
.mb-ledger-head > span:nth-child(n+3) { text-align: right; }
.mb-ledger-body {
max-height: 360px;
overflow-y: auto;
}
.mb-ledger-body::-webkit-scrollbar { width: 4px; }
.mb-ledger-body::-webkit-scrollbar-track { background: transparent; }
.mb-ledger-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.mb-ledger-row {
display: grid;
grid-template-columns: 0.8fr 1fr 0.6fr 1fr 1fr 1fr;
gap: var(--sp-sm);
padding: 8px var(--sp-md);
border-bottom: 1px solid var(--border);
font-size: var(--fs-sm);
align-items: center;
}
.mb-ledger-row:last-child { border-bottom: 0; }
.mb-ledger-row > span:nth-child(n+3) { text-align: right; }
.mb-num { text-align: right; }
@media (max-width: 560px) {
.mb-ledger-head, .mb-ledger-row {
grid-template-columns: 0.7fr 1fr 0.5fr 1fr;
}
.mb-ledger-hide-sm { display: none; }
}

.mb-tag {
display: inline-flex; align-items: center; gap: 4px;
font-size: 9px;
font-weight: 600;
letter-spacing: 0.08em;
padding: 2px 6px;
border-radius: 2px;
}
.mb-tag-teal {
background: rgba(61, 110, 82, 0.1);
color: var(--teal);
border: 1px solid rgba(61, 110, 82, 0.25);
}
.mb-tag-red {
background: rgba(196, 69, 69, 0.1);
color: var(--red);
border: 1px solid rgba(196, 69, 69, 0.25);
}

.mb-tooltip {
background: var(--s2);
border: 1px solid var(--border);
padding: 6px 9px;
border-radius: 3px;
font-size: var(--fs-xs);
}
.mb-tooltip-label { color: var(--muted); margin-bottom: 2px; }
.mb-tooltip-val { color: var(--teal); font-weight: 600; }

.mb-insights-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: var(--sp-sm);
}
@media (max-width: 1100px) { .mb-insights-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 800px) { .mb-insights-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .mb-insights-grid { grid-template-columns: 1fr; } }

.mb-insight {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
padding: var(--sp-md);
display: flex; flex-direction: column;
gap: var(--sp-sm);
transition: border-color 0.15s;
}
.mb-insight:hover { border-color: var(--dim); }
.mb-insight-title {
font-size: var(--fs-xs);
color: var(--gold);
letter-spacing: 0.1em;
font-weight: 600;
}
.mb-insight-headline {
font-size: var(--fs-xl);
font-weight: 600;
color: var(--text);
letter-spacing: -0.01em;
line-height: 1.1;
}
.mb-insight-rows {
display: flex; flex-direction: column;
margin-top: 2px;
}
.mb-insight-row {
display: flex; justify-content: space-between; align-items: center;
padding: 5px 0;
border-bottom: 1px solid var(--border);
font-size: var(--fs-xs);
}
.mb-insight-row:last-child { border-bottom: 0; }
.mb-insight-row-label { color: var(--muted); }
.mb-insight-row-val { color: var(--text); font-weight: 500; }

.mb-loading {
padding: var(--sp-lg);
display: flex;
flex-direction: column;
align-items: center;
gap: var(--sp-md);
min-height: 200px;
justify-content: center;
color: var(--teal);
}
.mb-loading-text {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.1em;
}

/* ============================================
DESKTOP DENSITY (1440px+)
Maximize information density on large screens
============================================ */
@media (min-width: 1440px) {
.mb-stage {
max-width: 1720px;
padding: 14px 20px;
}
.mb-view {
gap: 14px;
}
/* Money tiles get even more breathing room for the headline figure */
.mb-mtile-value {
font-size: clamp(24px, 1.8vw + 14px, 36px);
}
/* Insight cards: 5 across instead of 4 */
.mb-insights-grid {
grid-template-columns: repeat(5, 1fr);
}
/* KPI strip can show 6 cleanly */
.mb-kpistrip {
grid-template-columns: repeat(6, 1fr);
}
}

@media (min-width: 1680px) {
/* Even more density at ultrawide */
.mb-mtiles {
grid-template-columns: repeat(5, 1fr);
}
.mb-cardgrid {
grid-template-columns: repeat(4, 1fr);
}
}

/* ============================================
CONTEXT BAR (Period + Edge)
============================================ */
.mb-contextbar {
display: grid;
grid-template-columns: 1fr auto 1fr;
gap: var(--sp-md);
padding: var(--sp-sm) var(--sp-md);
background: var(--s2);
border: 1px solid var(--border);
border-radius: 4px;
align-items: center;
}
@media (max-width: 640px) {
.mb-contextbar {
grid-template-columns: 1fr;
gap: var(--sp-sm);
}
.mb-contextbar-divider { display: none; }
}
.mb-contextbar-item {
display: flex;
flex-direction: column;
gap: 2px;
min-width: 0;
}
.mb-contextbar-divider {
width: 1px;
background: var(--border);
height: 32px;
justify-self: center;
}
.mb-contextbar-label {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 600;
text-transform: uppercase;
}
.mb-contextbar-value {
font-size: var(--fs-md);
font-weight: 600;
color: var(--text);
display: flex;
align-items: center;
gap: 8px;
flex-wrap: wrap;
}
.mb-contextbar-sub {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.01em;
}

.mb-edge-badge {
display: inline-flex;
align-items: center;
padding: 2px 7px;
border-radius: 2px;
font-size: var(--fs-xs);
font-weight: 600;
letter-spacing: 0.06em;
text-transform: uppercase;
}
.mb-edge-badge-teal {
background: rgba(61, 110, 82, 0.12);
color: var(--teal);
border: 1px solid rgba(61, 110, 82, 0.3);
}
.mb-edge-badge-gold {
background: rgba(199, 162, 107, 0.12);
color: var(--gold);
border: 1px solid rgba(199, 162, 107, 0.3);
}
.mb-edge-badge-red {
background: rgba(196, 69, 69, 0.12);
color: var(--red);
border: 1px solid rgba(196, 69, 69, 0.3);
}
.mb-edge-badge-dim {
background: rgba(138, 133, 120, 0.08);
color: var(--muted);
border: 1px solid var(--border);
}

/* ============================================
DATA BANNER (v8 real-data status / errors)
============================================ */
.mb-databanner {
display: flex;
align-items: center;
gap: 12px;
padding: 8px 16px;
border-bottom: 1px solid var(--border);
font-size: 12px;
flex-wrap: wrap;
}
.mb-databanner-ok { background: rgba(61, 110, 82, 0.06); color: var(--muted); }
.mb-databanner-warn { background: rgba(199, 162, 107, 0.08); color: var(--gold); }
.mb-databanner-err { background: rgba(196, 69, 69, 0.10); color: var(--red); }
.mb-databanner-tag {
font-size: 10px;
font-weight: 700;
letter-spacing: 0.08em;
padding: 2px 6px;
border: 1px solid currentColor;
border-radius: 2px;
opacity: 0.85;
}
.mb-databanner-msg { flex: 1; min-width: 200px; }
.mb-databanner-btn {
background: transparent;
border: 1px solid currentColor;
color: inherit;
padding: 3px 10px;
font-size: 11px;
cursor: pointer;
border-radius: 2px;
}
.mb-databanner-btn:hover:not(:disabled) { background: rgba(255,255,255,0.04); }
.mb-databanner-btn:disabled { opacity: 0.4; cursor: wait; }

.mb-runbtn-ghost {
background: transparent !important;
border: 1px solid var(--border) !important;
color: var(--muted) !important;
margin-left: 6px;
}
.mb-runbtn-ghost:hover:not(:disabled) {
border-color: var(--gold) !important;
color: var(--gold) !important;
}

.mb-slider[disabled],
.mb-slider[readonly] {
opacity: 0.7;
cursor: not-allowed;
}

/* ============================================
EDGE METER (under p slider)
============================================ */
.mb-edgemeter {
display: flex;
align-items: center;
gap: 8px;
margin-top: 6px;
padding-bottom: 16px;
}
@media (max-width: 480px) {
.mb-edgemeter { padding-bottom: 6px; }
.mb-edgemeter-ticklabel { display: none; }
}
.mb-edgemeter-track {
position: relative;
flex: 1;
height: 18px;
background: linear-gradient(
to right,
rgba(196, 69, 69, 0.12) 0%,
rgba(138, 133, 120, 0.10) 40%,
rgba(61, 110, 82, 0.18) 75%,
rgba(199, 162, 107, 0.18) 100%
);
border: 1px solid var(--border);
border-radius: 2px;
}
.mb-edgemeter-tick {
position: absolute;
top: 0;
transform: translateX(-50%);
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
pointer-events: none;
}
.mb-edgemeter-tickline {
width: 1px;
height: 6px;
background: var(--dim);
margin-top: 1px;
}
.mb-edgemeter-ticklabel {
position: absolute;
top: 100%;
margin-top: 2px;
font-size: 9px;
color: var(--muted);
white-space: nowrap;
}
.mb-edgemeter-pointer {
position: absolute;
top: 50%;
width: 9px;
height: 9px;
border-radius: 50%;
transform: translate(-50%, -50%);
border: 2px solid var(--s1);
transition: left 0.15s ease;
z-index: 2;
}
.mb-edgemeter-pointer-teal { background: var(--teal); }
.mb-edgemeter-pointer-gold { background: var(--gold); }
.mb-edgemeter-pointer-red { background: var(--red); }
.mb-edgemeter-pointer-dim { background: var(--muted); }

.mb-edgemeter-verdict {
font-size: 9px;
font-weight: 600;
letter-spacing: 0.06em;
text-transform: uppercase;
white-space: nowrap;
}
.mb-edgemeter-verdict-teal { color: var(--teal); }
.mb-edgemeter-verdict-gold { color: var(--gold); }
.mb-edgemeter-verdict-red { color: var(--red); }
.mb-edgemeter-verdict-dim { color: var(--muted); }

/* ============================================
EDGE BENCHMARK TABLE
============================================ */
.mb-benchtable {
display: flex;
flex-direction: column;
}
.mb-benchrow {
display: grid;
grid-template-columns: 60px 110px 1fr auto;
gap: var(--sp-sm);
align-items: center;
padding: 8px var(--sp-md);
border-bottom: 1px solid var(--border);
font-size: var(--fs-sm);
transition: background 0.15s;
}
.mb-benchrow:last-child { border-bottom: 0; }
.mb-benchrow-active {
background: rgba(61, 110, 82, 0.04);
box-shadow: inset 2px 0 0 var(--teal);
}
.mb-benchrow-p {
font-weight: 600;
font-size: var(--fs-md);
color: var(--text);
}
.mb-benchrow-label {
color: var(--text);
font-weight: 500;
}
.mb-benchrow-desc {
color: var(--muted);
font-size: var(--fs-xs);
}
.mb-benchrow-marker {
text-align: right;
}
@media (max-width: 560px) {
.mb-benchrow {
grid-template-columns: 50px 1fr auto;
gap: 8px;
}
.mb-benchrow-desc { display: none; }
}

.mb-insight-sub {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.06em;
font-weight: 500;
margin-top: -4px;
}

/* ============================================
OPERATING STATUS BAR (persistent)
============================================ */
.mb-opsbar {
position: sticky;
top: var(--topbar-h);
z-index: 49;
background: var(--bg);
border-bottom: 1px solid var(--border);
}
.mb-opsbar-inner {
display: flex;
align-items: center;
gap: var(--sp-md);
padding: 6px var(--sp-md);
max-width: 1600px;
margin: 0 auto;
overflow-x: auto;
scrollbar-width: none;
}
.mb-opsbar-inner::-webkit-scrollbar { display: none; }
.mb-opsbar-modes {
display: flex;
gap: 2px;
background: var(--s1);
padding: 2px;
border-radius: 3px;
border: 1px solid var(--border);
flex-shrink: 0;
}
.mb-opsbar-mode {
background: transparent;
border: 0;
color: var(--muted);
font-family: inherit;
font-size: var(--fs-xs);
font-weight: 600;
letter-spacing: 0.08em;
padding: 4px 9px;
border-radius: 2px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
white-space: nowrap;
transition: color 0.15s, background 0.15s;
}
.mb-opsbar-mode:hover { color: var(--text); }
.mb-opsbar-mode-dot {
width: 5px;
height: 5px;
border-radius: 50%;
background: var(--dim);
}
.mb-opsbar-mode-active.mb-opsbar-mode-gold { color: var(--gold); background: rgba(199, 162, 107, 0.1); }
.mb-opsbar-mode-active.mb-opsbar-mode-gold .mb-opsbar-mode-dot { background: var(--gold); animation: mb-pulse 1.5s ease-in-out infinite; }
.mb-opsbar-mode-active.mb-opsbar-mode-teal { color: var(--teal); background: rgba(61, 110, 82, 0.1); }
.mb-opsbar-mode-active.mb-opsbar-mode-teal .mb-opsbar-mode-dot { background: var(--teal); animation: mb-pulse 1.5s ease-in-out infinite; }
.mb-opsbar-mode-active.mb-opsbar-mode-red { color: var(--red); background: rgba(196, 69, 69, 0.1); }
.mb-opsbar-mode-active.mb-opsbar-mode-red .mb-opsbar-mode-dot { background: var(--red); animation: mb-pulse 1.5s ease-in-out infinite; }

.mb-opsbar-divider {
width: 1px;
height: 20px;
background: var(--border);
flex-shrink: 0;
}
.mb-opsbar-item {
display: flex;
align-items: baseline;
gap: 6px;
white-space: nowrap;
flex-shrink: 0;
}
.mb-opsbar-label {
font-size: 9px;
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 600;
}
.mb-opsbar-value {
font-size: var(--fs-sm);
color: var(--text);
font-weight: 500;
}
.mb-opsbar-sub {
font-size: var(--fs-xs);
color: var(--muted);
}
.mb-opsbar-brokers {
display: flex;
align-items: center;
gap: 8px;
flex-shrink: 0;
}
.mb-opsbar-brokerlist {
display: flex;
gap: 6px;
}
.mb-broker {
display: inline-flex;
align-items: center;
gap: 4px;
font-size: var(--fs-xs);
padding: 2px 6px;
border-radius: 2px;
border: 1px solid var(--border);
background: var(--s1);
}
.mb-broker-dot {
width: 5px;
height: 5px;
border-radius: 50%;
}
.mb-broker-connected { color: var(--teal); border-color: rgba(61, 110, 82, 0.25); }
.mb-broker-connected .mb-broker-dot { background: var(--teal); }
.mb-broker-disabled { color: var(--dim); }
.mb-broker-disabled .mb-broker-dot { background: var(--dim); }

@media (max-width: 880px) {
.mb-opsbar-hide-md { display: none; }
}
@media (max-width: 1100px) {
.mb-opsbar-hide-lg { display: none; }
}

/* ============================================
MARTY SAYS (narrative hero)
============================================ */
.mb-msays {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
padding: var(--sp-md);
}
.mb-msays-head {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: var(--sp-sm);
gap: var(--sp-sm);
}
.mb-msays-headline {
display: flex;
align-items: center;
gap: var(--sp-sm);
}
.mb-msays-title {
font-size: var(--fs-xs);
color: var(--gold);
letter-spacing: 0.12em;
font-weight: 600;
}
.mb-msays-meta {
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.04em;
}
.mb-msays-body {
display: flex;
flex-direction: column;
gap: 10px;
border-left: 2px solid var(--border);
padding-left: var(--sp-md);
margin-bottom: var(--sp-md);
}
.mb-msays-p {
margin: 0;
font-size: var(--fs-md);
line-height: 1.55;
color: var(--text);
letter-spacing: -0.003em;
}
.mb-msays-p strong {
font-weight: 600;
color: var(--text);
}
.mb-msays-pills {
display: flex;
flex-wrap: wrap;
gap: var(--sp-sm);
padding-top: var(--sp-sm);
border-top: 1px solid var(--border);
}

.mb-npill {
display: flex;
flex-direction: column;
gap: 1px;
padding: 4px 10px;
border-radius: 3px;
border: 1px solid var(--border);
background: var(--bg);
min-width: 80px;
}
.mb-npill-label {
font-size: 9px;
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 600;
}
.mb-npill-value {
font-size: var(--fs-sm);
font-weight: 600;
color: var(--text);
}
.mb-npill-teal .mb-npill-value { color: var(--teal); }
.mb-npill-teal { border-color: rgba(61, 110, 82, 0.3); }
.mb-npill-gold .mb-npill-value { color: var(--gold); }
.mb-npill-gold { border-color: rgba(199, 162, 107, 0.3); }
.mb-npill-red .mb-npill-value { color: var(--red); }
.mb-npill-red { border-color: rgba(196, 69, 69, 0.3); }
.mb-npill-dim .mb-npill-value { color: var(--muted); }

@media (max-width: 480px) {
.mb-msays-body { padding-left: var(--sp-sm); }
}

/* ============================================
LOSS PATH (waterfall)
============================================ */
.mb-chart-inset {
padding: var(--sp-md);
height: 100%;
overflow: auto;
}
.mb-losspath {
display: flex;
flex-direction: column;
gap: var(--sp-md);
height: 100%;
}
.mb-losspath-head {
display: flex;
justify-content: space-between;
align-items: flex-start;
gap: var(--sp-md);
padding-bottom: var(--sp-sm);
border-bottom: 1px solid var(--border);
}
.mb-losspath-title {
font-size: var(--fs-md);
font-weight: 600;
color: var(--text);
}
.mb-losspath-sub {
font-size: var(--fs-xs);
color: var(--muted);
margin-top: 2px;
}
.mb-losspath-total {
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 2px;
}
.mb-losspath-total-label {
font-size: 9px;
color: var(--muted);
letter-spacing: 0.1em;
font-weight: 600;
}
.mb-losspath-total-val {
font-size: var(--fs-xl);
font-weight: 600;
letter-spacing: -0.01em;
}
.mb-losspath-grid {
display: flex;
flex-direction: column;
gap: 6px;
flex: 1;
}
.mb-losspath-row {
display: grid;
grid-template-columns: 32px 1fr 90px;
gap: var(--sp-sm);
align-items: center;
}
.mb-losspath-stepnum {
font-size: var(--fs-xs);
color: var(--muted);
font-weight: 600;
letter-spacing: 0.04em;
}
.mb-losspath-barwrap {
height: 24px;
background: rgba(196, 69, 69, 0.04);
border-radius: 2px;
position: relative;
overflow: hidden;
}
.mb-losspath-bar {
height: 100%;
background: linear-gradient(to right, rgba(196, 69, 69, 0.25), rgba(196, 69, 69, 0.45));
border-right: 2px solid var(--red);
display: flex;
align-items: center;
padding: 0 8px;
transition: width 0.3s ease;
}
.mb-losspath-bar-val {
font-size: var(--fs-sm);
color: var(--red);
font-weight: 600;
}
.mb-losspath-cum {
font-size: var(--fs-xs);
text-align: right;
letter-spacing: -0.005em;
}
@media (max-width: 480px) {
.mb-losspath-row {
grid-template-columns: 28px 1fr 70px;
}
.mb-losspath-cum { font-size: 10px; }
}

/* ============================================
MONEY TILES (Today/Month/Lifetime/Worst/Concurrent)
============================================ */
.mb-mtiles-wrap {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
overflow: hidden;
}
.mb-mtiles-head {
display: flex;
align-items: center;
justify-content: space-between;
padding: 8px var(--sp-md);
background: var(--s2);
border-bottom: 1px solid var(--border);
}
.mb-mtiles-title {
font-size: var(--fs-xs);
color: var(--gold);
letter-spacing: 0.12em;
font-weight: 600;
}
.mb-mtiles-badge {
display: inline-flex;
align-items: center;
gap: 5px;
padding: 2px 8px;
border-radius: 2px;
font-size: var(--fs-xs);
font-weight: 600;
letter-spacing: 0.08em;
}
.mb-mtiles-badge-sim {
background: rgba(199, 162, 107, 0.1);
color: var(--gold);
border: 1px solid rgba(199, 162, 107, 0.3);
}
.mb-mtiles-badge-live {
background: rgba(196, 69, 69, 0.12);
color: var(--red);
border: 1px solid rgba(196, 69, 69, 0.3);
}
.mb-mtiles-badge-dot {
width: 5px;
height: 5px;
border-radius: 50%;
background: currentColor;
animation: mb-pulse 1.5s ease-in-out infinite;
}
.mb-mtiles {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 1px;
background: var(--border);
}
@media (max-width: 1100px) {
.mb-mtiles { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
.mb-mtiles { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 380px) {
.mb-mtiles { grid-template-columns: 1fr; }
}
.mb-mtile {
background: var(--s1);
padding: var(--sp-md);
display: flex;
flex-direction: column;
gap: 4px;
min-width: 0;
}
.mb-mtile-primary {
background: var(--s2);
}
.mb-mtile-label {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.1em;
font-weight: 600;
text-transform: uppercase;
}
.mb-mtile-value {
font-size: var(--fs-xxl);
font-weight: 600;
letter-spacing: -0.015em;
line-height: 1.05;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.mb-mtile-meta {
display: flex;
flex-direction: column;
gap: 1px;
font-size: var(--fs-xs);
color: var(--muted);
}
.mb-mtile-date {
color: var(--dim);
font-size: 10px;
letter-spacing: 0.02em;
}

/* ============================================
DAILY BREAKDOWN
============================================ */
.mb-daily {
display: flex;
flex-direction: column;
}
.mb-daily-head {
display: grid;
grid-template-columns: 1.3fr 0.6fr 0.7fr 1.6fr 1fr;
gap: var(--sp-sm);
padding: 8px var(--sp-md);
background: var(--s2);
border-bottom: 1px solid var(--border);
font-size: var(--fs-xs);
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 500;
align-items: center;
}
.mb-daily-head > span:nth-child(n+2):not(.mb-daily-bar-cell) { text-align: right; }
.mb-daily-head > span:nth-child(4) { text-align: left; }

.mb-daily-body {
max-height: 360px;
overflow-y: auto;
}
.mb-daily-body::-webkit-scrollbar { width: 4px; }
.mb-daily-body::-webkit-scrollbar-track { background: transparent; }
.mb-daily-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
.mb-daily-row {
display: grid;
grid-template-columns: 1.3fr 0.6fr 0.7fr 1.6fr 1fr;
gap: var(--sp-sm);
padding: 8px var(--sp-md);
border-bottom: 1px solid var(--border);
font-size: var(--fs-sm);
align-items: center;
transition: background 0.15s;
}
.mb-daily-row:last-child { border-bottom: 0; }
.mb-daily-row:hover { background: rgba(61, 110, 82, 0.025); }

.mb-daily-date {
display: flex;
align-items: baseline;
gap: 6px;
min-width: 0;
}
.mb-daily-yr {
font-size: 10px;
}
.mb-daily-bar-cell {
min-width: 0;
}
.mb-daily-bar-track {
height: 6px;
background: rgba(138, 133, 120, 0.06);
border-radius: 1px;
overflow: hidden;
}
.mb-daily-bar {
height: 100%;
border-radius: 1px;
transition: width 0.3s ease;
}
.mb-daily-bar-pos { background: var(--teal); }
.mb-daily-bar-neg { background: var(--red); }

.mb-daily-more {
width: 100%;
background: var(--s2);
border: 0;
border-top: 1px solid var(--border);
color: var(--muted);
font-family: inherit;
font-size: var(--fs-xs);
font-weight: 500;
letter-spacing: 0.04em;
padding: 8px;
cursor: pointer;
transition: color 0.15s, background 0.15s;
}
.mb-daily-more:hover {
color: var(--teal);
background: rgba(61, 110, 82, 0.03);
}

@media (max-width: 640px) {
.mb-daily-head, .mb-daily-row {
grid-template-columns: 1.2fr 0.6fr 1fr;
gap: 8px;
}
.mb-daily-hide-sm { display: none; }
}

/* ============================================
CONCURRENT EXPOSURE
============================================ */
.mb-concurrent {
padding: var(--sp-md);
display: grid;
grid-template-columns: 1fr 1.5fr;
gap: var(--sp-lg);
}
@media (max-width: 880px) {
.mb-concurrent { grid-template-columns: 1fr; }
}
.mb-concurrent-stat {
display: flex;
flex-direction: column;
gap: 6px;
}
.mb-concurrent-stat-label {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.1em;
font-weight: 600;
}
.mb-concurrent-stat-value {
font-size: var(--fs-xxl);
font-weight: 600;
letter-spacing: -0.015em;
}
.mb-concurrent-stat-meta {
font-size: var(--fs-xs);
}

.mb-concurrent-snapshot {
display: flex;
flex-direction: column;
gap: var(--sp-sm);
}
.mb-concurrent-snapshot-label {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.1em;
font-weight: 600;
}
.mb-concurrent-chains {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
gap: 6px;
}
.mb-cchain {
display: flex;
justify-content: space-between;
align-items: center;
padding: 6px 10px;
background: var(--bg);
border: 1px solid var(--border);
border-radius: 3px;
gap: 6px;
}
.mb-cchain-deep {
border-color: rgba(196, 69, 69, 0.35);
background: rgba(196, 69, 69, 0.04);
}
.mb-cchain-id {
font-size: 10px;
color: var(--muted);
font-weight: 600;
}
.mb-cchain-step {
font-size: var(--fs-xs);
color: var(--muted);
}
.mb-cchain-bet {
font-size: var(--fs-sm);
font-weight: 600;
color: var(--text);
}
.mb-concurrent-explain {
font-size: var(--fs-sm);
color: var(--muted);
line-height: 1.5;
padding-top: 4px;
border-top: 1px solid var(--border);
}
.mb-concurrent-explain strong {
color: var(--text);
font-weight: 600;
}

/* ============================================
STEP TIMELINE
============================================ */
.mb-steptl {
padding: var(--sp-md);
}
.mb-steptl-track {
display: flex;
align-items: stretch;
gap: 0;
overflow-x: auto;
scrollbar-width: none;
padding-bottom: 4px;
}
.mb-steptl-track::-webkit-scrollbar { display: none; }
.mb-steptl-node {
flex-shrink: 0;
min-width: 100px;
padding: 10px 12px;
background: var(--bg);
border: 1px solid var(--border);
border-radius: 3px;
display: flex;
flex-direction: column;
gap: 4px;
}
.mb-steptl-num {
font-size: 10px;
color: var(--gold);
letter-spacing: 0.08em;
font-weight: 700;
}
.mb-steptl-label {
font-size: var(--fs-sm);
font-weight: 600;
color: var(--text);
}
.mb-steptl-bet {
font-size: var(--fs-xs);
}
.mb-steptl-arrow {
display: flex;
align-items: center;
padding: 0 8px;
color: var(--dim);
font-size: 14px;
flex-shrink: 0;
}
.mb-steptl-footer {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: var(--sp-md);
margin-top: var(--sp-md);
padding-top: var(--sp-md);
border-top: 1px solid var(--border);
}
@media (max-width: 640px) {
.mb-steptl-footer { grid-template-columns: 1fr; gap: 6px; }
}
.mb-steptl-foot-item {
display: flex;
flex-direction: column;
gap: 2px;
}
.mb-steptl-foot-label {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.08em;
font-weight: 600;
text-transform: uppercase;
}
.mb-steptl-foot-val {
font-size: var(--fs-md);
font-weight: 600;
color: var(--text);
}
.mb-steptl-foot-val sup {
font-size: 9px;
}

/* ============================================
INTERVAL MAP (heatmap)
============================================ */
.mb-imap {
padding: var(--sp-md);
}
.mb-imap-head {
display: grid;
grid-template-columns: 36px 1fr 110px;
gap: 8px;
padding-bottom: 6px;
border-bottom: 1px solid var(--border);
margin-bottom: 6px;
align-items: center;
}
.mb-imap-rowlabel {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.06em;
font-weight: 600;
text-align: center;
}
.mb-imap-cols {
display: flex;
gap: 3px;
flex-wrap: nowrap;
overflow-x: auto;
scrollbar-width: none;
}
.mb-imap-cols::-webkit-scrollbar { display: none; }
.mb-imap-colnum {
flex: 1;
min-width: 18px;
text-align: center;
font-size: 9px;
color: var(--dim);
}
.mb-imap-stats {
font-size: 10px;
color: var(--muted);
letter-spacing: 0.04em;
text-align: right;
font-weight: 600;
}
.mb-imap-row {
display: grid;
grid-template-columns: 36px 1fr 110px;
gap: 8px;
padding: 3px 0;
align-items: center;
}
.mb-imap-cell {
flex: 1;
min-width: 18px;
height: 22px;
border-radius: 2px;
display: flex;
align-items: center;
justify-content: center;
font-size: 9px;
font-weight: 600;
font-family: 'JetBrains Mono', monospace;
letter-spacing: 0;
cursor: default;
transition: transform 0.15s;
}
.mb-imap-cell:hover {
transform: scale(1.15);
z-index: 1;
}
.mb-imap-cell-win {
background: rgba(61, 110, 82, 0.18);
color: var(--teal);
border: 1px solid rgba(61, 110, 82, 0.35);
}
.mb-imap-cell-loss {
background: rgba(138, 133, 120, 0.08);
color: var(--muted);
border: 1px solid var(--border);
}
.mb-imap-cell-bust {
background: rgba(196, 69, 69, 0.18) !important;
color: var(--red) !important;
border-color: rgba(196, 69, 69, 0.45) !important;
}
.mb-imap-cell-pad {
background: transparent;
border: 1px dashed var(--border);
opacity: 0.3;
}
.mb-imap-legend {
display: flex;
gap: var(--sp-md);
flex-wrap: wrap;
padding-top: var(--sp-sm);
margin-top: var(--sp-sm);
border-top: 1px solid var(--border);
}
.mb-imap-legitem {
display: flex;
align-items: center;
gap: 6px;
font-size: var(--fs-xs);
color: var(--muted);
}
.mb-imap-legbox {
width: 12px;
height: 12px;
border-radius: 2px;
}

@media (max-width: 560px) {
.mb-imap-head, .mb-imap-row {
grid-template-columns: 28px 1fr 80px;
gap: 6px;
}
.mb-imap-cell { min-width: 14px; height: 18px; font-size: 8px; }
}

/* ============================================
ASK MARTY TAB (special gold styling)
============================================ */
.mb-tab-special {
display: flex;
align-items: center;
gap: 5px;
color: var(--gold);
}
.mb-tab-special:not(.mb-tab-active):hover {
color: var(--gold-bright);
background: rgba(199, 162, 107, 0.05);
}
.mb-tab-special.mb-tab-active {
color: var(--gold-bright);
background: rgba(199, 162, 107, 0.1);
}

/* ============================================
ASK MARTY VIEW (chatbot)
============================================ */
.mb-askmarty {
display: grid;
grid-template-columns: 300px 1fr;
gap: var(--sp-md);
height: calc(100vh - var(--topbar-h) - 100px);
min-height: 600px;
}
@media (max-width: 880px) {
.mb-askmarty {
grid-template-columns: 1fr;
height: auto;
min-height: auto;
}
.mb-askmarty-sidebar {
max-height: 280px;
order: 2;
}
.mb-askmarty-main {
order: 1;
min-height: 480px;
}
}

.mb-askmarty-sidebar {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
padding: var(--sp-md);
overflow-y: auto;
display: flex;
flex-direction: column;
}
.mb-askmarty-sidebar::-webkit-scrollbar { width: 4px; }
.mb-askmarty-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.mb-askmarty-sidebar-title {
font-size: var(--fs-xs);
color: var(--gold);
letter-spacing: 0.12em;
font-weight: 600;
margin-bottom: var(--sp-sm);
padding-bottom: var(--sp-sm);
border-bottom: 1px solid var(--border);
}

.mb-askmarty-starters {
display: flex;
flex-direction: column;
gap: 6px;
flex: 1;
}

.mb-askmarty-starter {
background: transparent;
border: 1px solid var(--border);
border-radius: 3px;
padding: 9px 11px;
cursor: pointer;
text-align: left;
display: flex;
flex-direction: column;
gap: 3px;
transition: border-color 0.15s, background 0.15s, transform 0.1s;
font-family: inherit;
}
.mb-askmarty-starter:hover:not(:disabled) {
border-color: rgba(61, 110, 82, 0.5);
background: rgba(61, 110, 82, 0.05);
}
.mb-askmarty-starter:active:not(:disabled) {
transform: translateY(1px);
}
.mb-askmarty-starter:disabled {
opacity: 0.4;
cursor: not-allowed;
}
.mb-askmarty-starter-label {
font-size: var(--fs-xs);
font-weight: 600;
color: var(--text);
letter-spacing: 0.02em;
}
.mb-askmarty-starter-q {
font-size: 10px;
color: var(--muted);
line-height: 1.4;
}

.mb-askmarty-foot {
margin-top: var(--sp-md);
padding-top: var(--sp-sm);
border-top: 1px solid var(--border);
display: flex;
flex-direction: column;
gap: 4px;
}
.mb-askmarty-foot-stat {
display: flex;
justify-content: space-between;
font-size: var(--fs-xs);
align-items: center;
}
.mb-askmarty-foot-label {
color: var(--muted);
letter-spacing: 0.06em;
font-weight: 600;
}

.mb-askmarty-main {
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
display: flex;
flex-direction: column;
overflow: hidden;
}

.mb-askmarty-messages {
flex: 1;
overflow-y: auto;
padding: var(--sp-md);
display: flex;
flex-direction: column;
gap: var(--sp-md);
}
.mb-askmarty-messages::-webkit-scrollbar { width: 5px; }
.mb-askmarty-messages::-webkit-scrollbar-track { background: transparent; }
.mb-askmarty-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

.mb-askmarty-empty {
text-align: center;
padding: var(--sp-lg);
margin: auto;
max-width: 440px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
}
.mb-askmarty-empty-icon { color: var(--gold); margin-bottom: 4px; }
.mb-askmarty-empty-title {
font-size: var(--fs-lg);
color: var(--gold);
font-weight: 600;
letter-spacing: -0.01em;
}
.mb-askmarty-empty-sub {
font-size: var(--fs-sm);
color: var(--muted);
line-height: 1.55;
}
.mb-askmarty-empty-tip {
margin-top: 8px;
font-size: 10px;
color: var(--dim);
display: flex;
align-items: center;
gap: 4px;
}
.mb-askmarty-empty-tip kbd {
background: var(--bg);
border: 1px solid var(--border);
border-radius: 2px;
padding: 1px 5px;
font-size: 10px;
font-family: inherit;
color: var(--muted);
}

/* CHAT BUBBLES */
.mb-chatbubble {
display: flex;
gap: var(--sp-sm);
max-width: 100%;
animation: mb-fade-in 0.2s ease-out;
}
@keyframes mb-fade-in {
from { opacity: 0; transform: translateY(4px); }
to { opacity: 1; transform: translateY(0); }
}
.mb-chatbubble-user {
flex-direction: row-reverse;
align-self: flex-end;
max-width: 78%;
}
.mb-chatbubble-marty {
align-self: flex-start;
max-width: 88%;
}

.mb-chatbubble-avatar {
width: 28px;
height: 28px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 11px;
font-weight: 700;
flex-shrink: 0;
margin-top: 2px;
font-family: 'JetBrains Mono', monospace;
}
.mb-chatbubble-avatar-marty {
background: linear-gradient(135deg, #3d6e52 0%, #2a5a40 100%);
color: var(--gold-bright);
border: 1px solid rgba(199, 162, 107, 0.4);
}
.mb-chatbubble-avatar-user {
background: var(--border);
color: var(--text);
border: 1px solid var(--dim);
}

.mb-chatbubble-content {
display: flex;
flex-direction: column;
gap: 4px;
min-width: 0;
}
.mb-chatbubble-text {
font-size: var(--fs-sm);
color: var(--text);
line-height: 1.6;
padding: 10px 13px;
background: var(--s2);
border: 1px solid var(--border);
border-radius: 6px;
word-wrap: break-word;
}
.mb-chatbubble-text strong {
font-weight: 600;
color: var(--gold);
font-family: 'JetBrains Mono', monospace;
font-feature-settings: 'tnum';
}
.mb-chatbubble-user .mb-chatbubble-text {
background: rgba(61, 110, 82, 0.1);
border-color: rgba(61, 110, 82, 0.35);
}
.mb-chatbubble-user .mb-chatbubble-text strong {
color: var(--text);
font-family: inherit;
}
.mb-chatbubble-error .mb-chatbubble-text {
border-color: rgba(196, 69, 69, 0.4);
background: rgba(196, 69, 69, 0.08);
color: var(--red);
}
.mb-chatbubble-time {
font-size: 9px;
color: var(--dim);
letter-spacing: 0.04em;
padding: 0 6px;
}
.mb-chatbubble-user .mb-chatbubble-time { text-align: right; }

.mb-chatbubble-thinking {
display: flex;
gap: 5px;
padding: 14px;
background: var(--s2);
border: 1px solid var(--border);
border-radius: 6px;
}
.mb-chatbubble-thinking span {
width: 6px;
height: 6px;
border-radius: 50%;
background: var(--gold);
animation: mb-bounce 1.4s ease-in-out infinite;
opacity: 0.4;
}
.mb-chatbubble-thinking span:nth-child(2) { animation-delay: 0.15s; }
.mb-chatbubble-thinking span:nth-child(3) { animation-delay: 0.3s; }
@keyframes mb-bounce {
0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
30% { transform: translateY(-4px); opacity: 1; }
}

.mb-askmarty-inputbar {
display: flex;
gap: var(--sp-sm);
padding: var(--sp-sm) var(--sp-md);
border-top: 1px solid var(--border);
background: var(--s2);
align-items: flex-end;
}
.mb-askmarty-input {
flex: 1;
background: var(--bg);
border: 1px solid var(--border);
border-radius: 4px;
color: var(--text);
font-family: inherit;
font-size: var(--fs-sm);
padding: 10px 12px;
resize: none;
outline: 0;
transition: border-color 0.15s;
min-height: 38px;
max-height: 120px;
line-height: 1.4;
}
.mb-askmarty-input:focus {
border-color: rgba(61, 110, 82, 0.5);
}
.mb-askmarty-input:disabled { opacity: 0.5; }
.mb-askmarty-input::placeholder { color: var(--dim); }

.mb-askmarty-send {
background: var(--gold);
color: var(--bg);
border: 0;
border-radius: 4px;
padding: 0 16px;
font-family: inherit;
font-weight: 600;
font-size: var(--fs-sm);
letter-spacing: 0.04em;
cursor: pointer;
transition: background 0.15s, transform 0.1s;
height: 38px;
display: flex;
align-items: center;
gap: 6px;
}
.mb-askmarty-send:hover:not(:disabled) { background: var(--gold-bright); }
.mb-askmarty-send:active:not(:disabled) { transform: translateY(1px); }
.mb-askmarty-send:disabled {
background: var(--border);
color: var(--dim);
cursor: not-allowed;
}

/* ============================================
DEMO PRESETS ROW
============================================ */
.mb-presets {
display: flex;
align-items: center;
gap: var(--sp-md);
padding: var(--sp-sm) var(--sp-md);
background: var(--s1);
border: 1px solid var(--border);
border-radius: 4px;
flex-wrap: wrap;
}
.mb-presets-label {
font-size: var(--fs-xs);
color: var(--gold);
letter-spacing: 0.1em;
font-weight: 600;
flex-shrink: 0;
}
.mb-presets-buttons {
display: flex;
gap: 6px;
flex: 1;
flex-wrap: wrap;
}
.mb-preset-btn {
background: var(--bg);
border: 1px solid var(--border);
border-radius: 3px;
padding: 6px 10px;
cursor: pointer;
font-family: inherit;
display: flex;
flex-direction: column;
gap: 1px;
align-items: flex-start;
transition: border-color 0.15s, background 0.15s;
min-width: 0;
}
.mb-preset-btn:hover {
border-color: rgba(61, 110, 82, 0.4);
background: rgba(61, 110, 82, 0.04);
}
.mb-preset-btn-active {
border-color: var(--gold);
background: rgba(199, 162, 107, 0.08);
}
.mb-preset-btn-active .mb-preset-btn-label { color: var(--gold); }
.mb-preset-btn-label {
font-size: var(--fs-xs);
font-weight: 600;
color: var(--text);
letter-spacing: 0.02em;
}
.mb-preset-btn-meta {
font-size: 9px;
color: var(--muted);
}
.mb-preset-export {
background: var(--bg);
border: 1px solid var(--border);
border-radius: 3px;
padding: 6px 10px;
cursor: pointer;
font-family: inherit;
font-size: var(--fs-xs);
color: var(--muted);
font-weight: 500;
display: flex;
align-items: center;
gap: 5px;
transition: color 0.15s, border-color 0.15s;
flex-shrink: 0;
}
.mb-preset-export:hover {
color: var(--gold);
border-color: rgba(199, 162, 107, 0.4);
}
`;
