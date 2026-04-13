/**
 * intentDetector.js
 * Detects user intent using keyword matching across multiple languages.
 *
 * Supported Intents:
 *  - 'fd_explain'   : User wants to know what an FD is
 *  - 'interest'     : User wants to know about interest rates
 *  - 'calculate'    : User wants to calculate FD returns
 *  - 'book_fd'      : User wants to start/book an FD
 *  - 'unknown'      : Intent not recognized
 */

// Intent keyword map — multi-language keywords for each intent
const intentKeywords = {
  fd_start: [
    'start fd', 'open fd', 'fd shuru', 'fd start cheyali',
    'invest', 'new fd', 'create fd', 'fd book'
  ],
  calculate: [
    'calculate', 'maturity', 'returns', 'how much',
    'kitna milega', 'hisab', 'entha vastundi', 'calculate cheyyandi'
  ],
  fd_rate: [
    'interest rate', 'fd rate', 'byaaj dar', 'interest',
    'rate of interest', 'vadi'
  ],
  fd_explain: [
    'what is fd', 'fd kya hai', 'fd ante enti', 'explain fd',
    'what is fixed deposit', 'tell me about fd'
  ],
};

/**
 * Detects intent from user message text.
 * @param {string} text - Lowercased user message
 * @returns {string} - One of: 'fd_start' | 'calculate' | 'fd_rate' | 'fd_explain' | 'unknown'
 */
function detectIntent(text) {
  if (!text || typeof text !== 'string') return 'unknown';

  const lower = text.toLowerCase();

  // 1. fd_start
  if (intentKeywords.fd_start.some(kw => lower.includes(kw))) {
    return 'fd_start';
  }

  // 2. calculate
  // Priority rule: numbers present AND (keywords OR mentions amount, years, %)
  const hasNumbers = /\d+/.test(lower);
  const mentionsCalcContext = lower.includes('%') || lower.includes('year') || lower.includes('month') || lower.includes('lakh') || lower.includes('k');
  const hasCalcKeyword = intentKeywords.calculate.some(kw => lower.includes(kw));

  if (hasNumbers && (mentionsCalcContext || hasCalcKeyword)) {
    return 'calculate';
  }
  // If no numbers but explicit "calculate" keyword
  if (hasCalcKeyword) {
    return 'calculate';
  }

  // 3. fd_rate
  if (intentKeywords.fd_rate.some(kw => lower.includes(kw))) {
    return 'fd_rate';
  }

  // 4. fd_explain
  if (intentKeywords.fd_explain.some(kw => lower.includes(kw))) {
    return 'fd_explain';
  }

  return 'unknown';
}

module.exports = { detectIntent };
