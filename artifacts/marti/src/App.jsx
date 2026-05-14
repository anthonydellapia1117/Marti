import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
ResponsiveContainer, ReferenceLine, Cell, Area, AreaChart, CartesianGrid
} from 'recharts';
import {
Activity, Layers, BarChart3, Bitcoin, Target, Settings2,
ChevronRight, Play, Circle, AlertCircle, Hexagon, ArrowUp, ArrowDown,
MessageSquare, Send, Sparkles, Download, Keyboard, Zap
} from 'lucide-react';

// ============================================================
// LOGO ASSET (base64 inline, embedded from Gemini AI Studio output)
// ============================================================

// Inline base64 logo (Premium Executive Aesthetic wordmark)
const LOGO_DATA_URI = "data:image/webp;base64,UklGRqgSAABXRUJQVlA4IJwSAAAwWwCdASp/AVAAPj0ai0QiIaElp9Cc6LAHiWUAynZbXT9evDxGvyj32Pmdz3YvnoP9f5H1c/1/1CueD/3fQd5rPp58mbro6WVmGN79nP1n5UfutpJfzX8Ffp/y+1Av8p/qv+J/J38tM6/+tf578uP6l6dGsZ4L9gD+Xf0bj4qBH8//zPoQ/9P+s/KD3Q/TH/e/zXwGfy3+t/63+5fkF4OfR9/cxGpEIBkD2LuE5D4mF8rNhiVl+hpVQjUnb5GUSGEIU3LHUyxFQDhIYe5XGr8gVj2snEdPKAH6SOkjuTln/GJADBiTb/Vi0RoWMaFlMetsy7H5yrf5qkIhYpsznxqf+tUplv6hTNiVqMgRrxUOub3kTjOOALk2tkT2V4uCkxRUUxOIk8gl47/QdqoGmH4MMG/7t3Be2+GyKzCRUCR/spdoPod3b5iUeDnI/Advwgou67FpBTHB30ztyGq+1y17K9mRC6EvuR/SwOzhlI7X9LcnoLLOC1ita+dg71QBwVz6Q8O6CcrE++xI3oCm9RjhKUPLGPjCRpJeBrLCy5QB2Onh2cxrd7aCf/X5WrkYSqSbzhorGvZMKlyIy4fyB8WW8uQxxYsjFPCDqjQkwvdWmXvBgzsx8S7dw4HzFiBSE8TkQLwzUvlhKvULbUaPjV7gC0mIEfRgSawL1GfraHhs8atVmjAULs7PhaVMWnKeg9D/njLuxVllKHtrzrpLntskyjl3Zuz53DZ51Um4mlzK1JuC8PzFmJha/qs+zlx83tj3/IPH1TNy8BymZ3g2LUnKzcOuHZXwEbBRoQFo1KzvaucIrTxgyo0yZ448cADy/9GQifxxancWePhNxPe51qdLvQgaBNjws8Y4hWpB3+yVuJiPMou4wJHNtyMVrjKLPXvtkGM2+DQKW5YowrLOZyd1FvCFbeKmZ4v7fwdoTCTi6KtUNUxRHwic7iOAsUy3Ij0TPcuqwKs/20ty2z60IpXt2AAA/v0ra9LRpL8OHVB9nR3gzpiYEugeCrW1mL3/GlMCiEcMmCvT59L5mkbuN9WeIPCIB9AWYhFYnSYOVYp1mZjRrcYG/bAihXFnjVrciVZOkrBEXULlsLl1uSOrHxK+IQPfN85o/cBCcdxayv9zLLmzGxPPs3T5GrERZ4pn6XiVZyHLW07p3ewyZ2YXcqery0XjVNINNVGqv7cbvrxcEDcOtG2JWJfI7g6PKhbLAAEoACx3/iLgOtlQpdI1yEqmIo+03+RJRlrlFCiQmH6lNoFrcowKYkL+4MXa6WPBRiL7Woyp81O22/4TUpAbad1cp9UXsq+MdfUY6EZXqDveoXOCpECmnpxlILs/AenoRD2zOogZ3XkPKEuzHxb89fssUFu9EMPXmvdtSr+MwVc6B+9yx76cZZh66Vj06wYgUbKWprfa0S2fT0fmS9bcnJK24QqtNF3/x1BL+/kVxTQNPgwI5+/e8ij+C99esH0hvFvuelsdJj+7UvX5GLFUkNfSLPcp+CIU4vLvGgddvCVO1/9okVA0/B0U96Dd/HX0jirh8xQB2m3eOQTQxUJ9ybv4ZfhW+ho22s9MHuiM/OL3AtTfBngAZUhWx7l0YtTy/U46Sm4rRGU3Jml9k7hMNW7rt/AKpsyWvbIn/utRiX+Vtr25O7uKe92i+Vlt8DN0pgyJdRL6FOFnvBftu/RuMb0QXmZY+LO1g/EdS5dnuTjJ8xhe6RbwWz7lsw/Chf/FCEjgXNZxMGGSlMdGkjknqQGhnGhNKrGnCCkUvrrhT0/R4dhw1A0DMAvtxc/DouenJKI1hPU7HhiMjtn1d7ueoWpdJY3BORCQ/6hwq5ZTyM0h2p8AxXEfffvYFctOmvt4047RxjkwvCHiL7cQtXUaInaxgMgJhIVCTOhRr1PXPQYIrO5TahSIxEswltzZQw07LDNYY0xbQOsHhniG2aLvQa2qmvyDIa+VLTD8R86uZVuNci5XGwzMp8z3tpoaSWeqlFnDQh1Tha0fhVBmL7mlf57WblByBNJ/Igd6km2xaP/V3YBq832FZOMe3unLJbIImPRn5Nj49EGbKAwAEaGuPPhLKcRBKwBCLtzfRwCT5XDzAibf289wePAgbbrzbW8tmX7jZeemxSX99mZzSMBKkqWvLkaLDH8z1u9+CXERs/2u3zsI+1sL1v2E6q51y6LTix2WmcUjJ6LmxDC69QR83LAV7vphFZ/N+ZSLEVgW7Tg4cGA2R7meQSKJDRAwFWaW4OtrfBUvbZjgbpBypqE6Z61iqxF/NVq+FftvR1x8Lqs4u2EryOJA8fPSCF1INWp85Ugae7ms/qXkU5/K2ot+RcaJg1vUzmI2s+dBX0W9y2aDEaeHZxSdnSsgx1wTTjavZFeRcbwdCNvCuXnDB/PPB6mAPUMvzJl1c2kLub6GI5hDZ3BJnRDyyS/RJPcSQyNNokiuYr/ytDh+72jtb1q8tFg8GEvKZiQbIF/CsWQotzzERc1/ddhIfart+T9NsJY8oT3ghC59Oj6i+vs+zAtrPN/Hu/enip/UPuKv7HanSbase0vJNo2NVUrVu1pGtTXsWmTsRAFqCp4AxeYPaRNaBgxkHrVFJe9ZcN9so17YN+y1havimVEtEp2xDI+EvaC2ci82ssr4qZ1rnhjn2eCVvH6/LSR+3JvvQMXQDabwWvO83/mpnC+agLoqmLzyrkKj/m3zsafHK9722LCWbjqKKALIdK2vYMkAXcml0YADU2datRX4fEOkYV+KT/NwOZEyXd4yhUnEX+k/L4dGfePKVwBWWIiufRj2UxeCjCTOcHRma8EgVnPiAl2XgKLXxeLPYHhA/xWDDb8fsRIp1R7gFCVMA88SQpmIB8XT6kaXJe16+H1bvpH4k1hR5sAt8h43rKZ/+x2P+5L3cPUuSwQV67g6WSownit4pPeiseQS3QiO+rhO2ylfUjjdEAGHOe3PPLv8Wb1vhzi7fW7jkAQHKf2ts563j/vUfuvbrfAvbo3y0tXMamoj9xgQBBEJucSC0uwDDHo+VDGpM4LdPmno+LX87d0iABw6cLrnniO+uME8UYxhESL4SveESmDRhaZ+3VEZHd3kNumeuvSjd2EEHh31H36XgVY4KgcC1SrZ0XNXfCi8Zzv2S7O8xy+b+58C/RfCxbWUcotqftGhilRYkapQja+rvou20cge2IRtIEzrqmKo0I7QnXCMaatvtemEk77Tk1UBMbw6L54+i6+CXAzXQQ7xlnafPKNHZf2RyTk8i1/kSlHeKwrsZ/JyKYLR7iJ5ksJitBDSTNFrHRnYyP65Fu7gxzPvBItKuKg6T2nZ3fiyKHWaxrnUj0H5ifzxjb+em0U9HwajTtZiMSRqxKtlZtXhicqIFeaC5C4hMABAGbKPwieryKL/dRZIpVyooWabg7Op3tQfz89sdO5JEefcTNb5+YCd48f2ffn9f8NN85fM1Xs/tn53+5nuvHJLbtA7cDjg5pYxcippFrLlfDSY8ZHGtUloWNXzYY9XV8nEGJ5QPRRsqahYceqaKls8gS8MykY/9Llp2J2ziu/guTZ5ce4RNDGhW9zkFgl3cWJAa9HjF/7vcWN6avKKJBXBjRakgAqgTb8t4vqUuUQm+EiUttSvtu5zjkIkxhJ+CRJO4deRFgWzoAzq1EKuhCjXUk4I1f9XHXy4h/o3cvC6JFje/eyZieN1bDqzSlewPAXZqMCE5SGupiSNTS1pY/vmlUEjS3e1ph8EBBKDMfAPsrK8KJPlhXsg2+zYESNDJrBpbZVR10bTk5og50NR1LhjqCWfiwF6GRiWvNvlIhwzWeHim+I7eCnoxrJipbFTxBlN1+OJU0N1tVHzTIKnTdeu+osEpL2+JlbL48W1CjPJzzRk4GFVsfTtPjN/c7UYLbaquuyDJON89qnqvz2Rr5pUgUJUpHawz8kTBcq0uBxhJUKZdN8dNW9qfltPSWSwolgi+FeizyadpvUPAQhDNr5o2M2iEVKqtiRCY/mH1bllu8iWxjUvUgclaTV7H8ov166OiZwCP+pSEK1vhuF4SHHAcfC7KZ5+voQKUd+dygcMJYRwNQsapDsm5VaL67qqYdP4JqPHQJxigXeMrt6hAb6EN6RBvtmkI+E9hyMNKm/Rj7wJHdeZmlgMx6exZuTpATFcbhtRlh45riGZRklujfmWrPK/3HByErl5DukPX+5LqPVehB0EqFIbja/I6V6EUJFk2ekZaplVl4zVNJTXHUUjhtvC1hCUK822Xe2k6UDU3o7mU70BVodYgd1R2HOseK0JVvuIWOazFa0cjpEYljlM6SKy0g8hoHHYWOd87lrhi3pcx7/83+kcrnJtvCrVTbAC5ufp8fGxB6nZeUmTbQdnQjXOKb2GLoqSJf/plBhXCmr4o6gJD8JztdFqtHN/2eo9mUtLtpSVQ//Z3tSJ/Y1N8opvFl9/kV+bIk6mlm5OcIbsqYrU6gwBONfauk11CNp6a9/UJQkod7E2O7LeyiFtZCBMQ9F0KiFIMRBNwTdMJo8T5mxeO8UIIW9F3P2OeOZnNr073Dq8SiTNAfjqncXLhvoFEifI0qONI+fTMvC1Qa+MIQkLJkMmqZI/tEtuwJ20zvxMhOaYAKRHDMkPdSvr26Vr2Wb3sFHC5LmdCe+YjefCYtIgSdUqTGE+Tc7HTn/80jDh2BXqtQHTpu9RVtDixZzElPFbgYujZPFCMhWcFJlDfjsjHlXvv7/YCjGsBWUTKgBlSTF0ktxnpZU3TJx/V6Mec0uLLYTGo+JR+rMVcZfeQN8gvTsqj5O88RAsnqJgSbMsq04KyeGtnz0s4RFxeZ2DZGtulTkNPG+0mPPmIEKn5D4Ra0UspnFjAPbCMiyai7u0iXcfsLt9u1HYZEMi/HgXmgvEwKwr3ZJ0n7p5UCbbzPRoASfJNpdaNXs0YhEIQq0KEm4eAv2yytk6doNsarr8f2RgGLaHTvDRIihUsBAzC/agiDjntNNH37TXlorCd6czmiDlGrdAeQyWvolOJl5E+zX/hnv41h+Nf2HujmeXiedQVElqvH/wXNLCroF7y/mIb/tQz85fgdBnFrFRMoAYejP/60f6Bmxz8L4p7rNL8dprf1RFOrGofnk0wq90MzT832K+nl70ToEMZXTtlxR9d0B5VmvK4ZPqKvBV7IXfsUL8XcPHcP4v9X+syoPmgk9vNjZqgmogqSWcslCJ50JIv6OclmtQTDrU4wnGK2CiO6QPUuIG5jIcueMrrncELipy3OVCp/3xFQ3FE3uIvx4tm8auYXZWsfG0ZX72oOz8AhEovqiZElrln8xpYOIBPaQq90wsY/pPQAUaGua2yoNMYs/8KKLFL4sAEyJcYPrsnvNaGccmWQj0tWh7SV9fqt/6u081IMTKyXTudsAH1TRk70RnusTXjaLd9khZBKB2D0OSRdLZBEw2MAQiZGMEy9mCwMR8rYgj7qqzuDAdAAHpXJIo6C7ITPGxCnx+O/iosshqjG/d3tTxYgPYZelwF1OqEKIyP0jEeaYqNf3iA/fMvk82/IGF10ppNxT1WSd1T6Buv8njMeIayG9hZOMuYBT5YnhcPp3bGWldpw6LHaFVzLxULGYtrx1FmHqg8VK1TcVHA/8J4hwal5gE6CiuDSF9batLENo7dFONN+sHSMQOUuF5mPU6ox+OjPGDgA5XTriNEsmOAQt798qP4HNG2HSI936jyHObf6tQQeQOf3FoC4mOcT7mNK5C/6SG/opJOXpLxYOWMfGQAEF4O25I60CvW9GWr3tdfcQXh6S2hand0n+4ZoqB++FI7vCrRhsPrJfRZkziR6tj7GuQwxfg+3zpp6BI3/8NKJ/sO/lOqc2UDs7IhrugRG4uXbTaTNWx+SkFSgl4qv5uXBBj/hi8Xm4pWSEU7uI7FtSRxfAS1/i53xhwkjpIf1Lmv3vWulmiLKSILJL+ZrIo/PYg0emX9i5ZaLPoQPTovkvIQfKGWKiqKutDlF5nyiCLJGTpuvTk9yx/xLNv5Pwebekjsw+IOC3JFoxpL6t667tjIQS4KD2FOj8be1yQeLSEHNvCp0KkIUv0Vy968serK5vFtGF7ZyuVOFufk9P6Jk0MiTNB2MIPEm17/BfcCeItr4qxdzkV43FPzTHNuoLgPXfjCjeHeOAKpeuMv4jAQCN/pOyyKQ6tK8hoPVUgt6kcJ/x3bbzbWbwITTGAXJcGqi84/mCxqZQjMW9ZGlnYM7lZQYCwJlv5M9TYr87cNRbDBqjL+qm2tIvGXFKPN+3n9/mzCyZpf+yZCwHdghMQ10PBr6SgV/9Q6m4uOmLJZs4oRbsWeAeM1XQaFDAtbv9ykC1+2S1CSpUN9k1XZhVzsQuniR0pXyHUygGID+Yh1eoAAAA=";

// ============================================================
// SIM ENGINE
// ============================================================

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

function realCacheKey(market, startISO, endISO) {
return `${REAL_CACHE_PREFIX}${market}_${startISO}_${endISO}`;
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
const key = realCacheKey(market, startISO, endISO);
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
outcomes = (data.candles || [])
.filter(c => Number.isFinite(c.o) && Number.isFinite(c.c) && c.c !== c.o)
.map(c => ({ t: c.t * 1000, win: c.c > c.o ? 1 : 0 }));
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

const MARKETS = [
{ id: 'btc15', label: 'BTC 15m', sub: 'Up / Down', icon: Bitcoin, p: 0.52, mpu: 15, unit: 'bar', continuous: true,
intervalType: '15min bar', intervalsPerDay: 96, intervalShort: 'bar', intervalLong: '15-minute bar',
winLabel: 'up', lossLabel: 'down', stepUnit: 'bar' },
{ id: 'spx1h', label: 'SPX 1H', sub: 'Green / Red', icon: BarChart3, p: 0.51, mpu: 60, unit: 'bar', continuous: false, hpd: 6.5, dpw: 5,
intervalType: 'trading hour', intervalsPerDay: 6, intervalShort: 'hour', intervalLong: 'trading hour',
winLabel: 'green', lossLabel: 'red', stepUnit: 'hour' },
{ id: 'mlb', label: 'MLB Inning', sub: 'Score / No', icon: Target, p: 0.55, mpu: 22, unit: 'inning', continuous: false, hpd: 3.3, dpw: 6,
intervalType: 'inning', intervalsPerDay: 9, intervalShort: 'inning', intervalLong: 'inning',
winLabel: 'score', lossLabel: 'no score', stepUnit: 'inning' },
{ id: 'custom', label: 'Custom', sub: 'Manual', icon: Settings2, p: 0.50, mpu: 15, unit: 'bar', continuous: true,
intervalType: 'interval', intervalsPerDay: 24, intervalShort: 'interval', intervalLong: 'interval',
winLabel: 'win', lossLabel: 'loss', stepUnit: 'interval' }
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
const main = simulate({ p, b0, m, N_max, r: 1.0, num });
const scens = SCENARIOS.map(s => ({
...s,
...simulate({ p: s.p, b0, m, N_max, r: 1.0, num: Math.min(num, 5000) })
}));
const conc = simulateConcurrent(p, b0, m, N_max, 5, 8000);
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
const main = buildSequencesFromOutcomes(payload.outcomes, b0, m, N_max, 1.0);
if (!main) throw new Error('Could not build any sequences from real outcomes.');
setP(obsP);
const scens = SCENARIOS.map(s => ({
...s,
...simulate({ p: s.p, b0, m, N_max, r: 1.0, num: Math.min(num, 5000) })
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
}, [p, b0, m, N_max, num, market]);

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
version: 'v8.1',
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
case '/': e.preventDefault(); setView('askmarty'); break;
default: break;
}
};
window.addEventListener('keydown', handler);
return () => window.removeEventListener('keydown', handler);
}, [handleRun]);

return (
<div className="mb-root">
<style>{styles}</style>
<TopBar now={now} runCount={runCount} running={running} num={num} mode={mode} results={results} />
<OperatingStatusBar mode={mode} setMode={setMode} market={market} />
<div className="mb-tabs-top">
<TabSwitch view={view} setView={setView} />
</div>

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

  <div className={`mb-stage ${isStale ? 'mb-stage-stale' : ''}`}>
    {view === 'overview' && (
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
    {view === 'workspace' && (
      <WorkspaceView
        results={results}
        running={running}
        p={p} setP={setP}
        b0={b0} setB0={setB0}
        m={m} setM={setM}
        N_max={N_max} setNMax={setNMax}
        num={num} setNum={setNum}
        market={market} setMarket={setMarket}
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
    {view === 'insights' && (
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
    {view === 'askmarty' && (
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

  <BottomNav view={view} setView={setView} />
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
{dataInfo.eventCount.toLocaleString()} outcomes · {dataInfo.sequenceCount?.toLocaleString() ?? '—'} sequences ·
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

function TopBar({ now, runCount, running, num, mode, results }) {
const currentMode = MODES.find(x => x.id === mode);
return (
<header className="mb-topbar">
<div className="mb-brand">
<img src={LOGO_DATA_URI} alt="Marti" className="mb-brand-logo" />
<span className="mb-brand-ver mono">v8.1</span>
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
value: fmtMoney(moneyBreakdown.monthPnl, 0),
positive: moneyBreakdown.monthPnl >= 0,
meta: `${moneyBreakdown.monthCount.toLocaleString()} seq · ${moneyBreakdown.monthWins}W / ${moneyBreakdown.monthCaps}C`,
date: moneyBreakdown.monthLabel
},
{
label: "LIFETIME P&L",
value: fmtMoney(results.finalProfit, 0),
positive: results.finalProfit >= 0,
gold: results.finalProfit >= 0,
meta: `${num.toLocaleString()} seq · ${moneyBreakdown.totalDays}d`,
date: `avg ${fmtMoney(moneyBreakdown.avgDaily, 0)}/day`
},
{
label: "WORST SEQUENCE",
value: fmtMoney(-expectedWorst, 0),
positive: false,
danger: true,
meta: `${results.capCount.toLocaleString()} cap events`,
date: `${(results.capRate * 100).toFixed(3)}% rate`
},
{
label: "MAX EXPOSURE",
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
<div className="mb-mtile-label">{t.label}</div>
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
<h2 className="mb-section-title">Daily Breakdown</h2>
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
<h2 className="mb-section-title">Sequence Timeline</h2>
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
<h2 className="mb-section-title">Daily Interval Map</h2>
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
<h3 className="mb-section-title-sm">Concurrent Exposure</h3>
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
        <h2 className="mb-section-title">Scenario Performance</h2>
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
        <h3 className="mb-section-title-sm">Current Equity Curve</h3>
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
        <h3 className="mb-section-title-sm">Outcome Distribution</h3>
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
num, setNum, market, setMarket, onRun, expectedWorst, period, edgeClass, mode,
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

  <div className="mb-parambar">
    <ParamControl
      label={market === 'custom' ? 'p' : 'p̂'}
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
    <ParamControl label="b₀" hint="Base bet">
      <input
        type="number"
        value={b0}
        min={1}
        step={1}
        onChange={e => setB0(parseFloat(e.target.value) || 1)}
        className="mb-numinput mono"
      />
    </ParamControl>
    <ParamControl label="m" hint="Multiplier">
      <input
        type="number"
        value={m}
        step={0.1}
        min={1.1}
        max={5}
        onChange={e => setM(parseFloat(e.target.value) || 2)}
        className="mb-numinput mono"
      />
    </ParamControl>
    <ParamControl label="N" hint="Max steps">
      <input
        type="number"
        value={N_max}
        step={1}
        min={2}
        max={12}
        onChange={e => setNMax(parseInt(e.target.value) || 6)}
        className="mb-numinput mono"
      />
    </ParamControl>
    <ParamControl label="#" hint="Sequences">
      <input
        type="number"
        value={num}
        step={1000}
        min={100}
        max={50000}
        onChange={e => setNum(parseInt(e.target.value) || 1000)}
        className="mb-numinput mono"
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
      <h3 className="mb-section-title-sm">Recent Sequences</h3>
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
<h2 className="mb-section-title">What does edge mean?</h2>
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
<div className="mb-insight-title">{insight.title}</div>
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

function LoadingPanel() {
return (
<div className="mb-loading">
<div className="mb-spinner mb-spinner-lg"></div>
<div className="mono mb-loading-text">Running simulation</div>
</div>
);
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
