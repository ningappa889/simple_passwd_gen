import { WORDLIST, LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS } from '../data/wordlist.js';

/**
 * Calculates bit entropy and estimated brute force crack time for a given password/passphrase.
 * 
 * @param {string} password The generated password
 * @param {string} style Generation style ('passphrase' | 'strong' | 'max')
 * @returns {Object} Entropy calculations, pool size, crack time display string
 */
export function calculateEntropy(password, style = 'strong') {
  if (!password) {
    return {
      bits: 0,
      poolSize: 0,
      crackTimeDisplay: 'Instant',
      crackTimeSeconds: 0,
      charBreakdown: { lower: 0, upper: 0, number: 0, symbol: 0, words: 0 }
    };
  }

  const length = password.length;

  // Detect character set inclusion
  let hasLower = /[a-z]/.test(password);
  let hasUpper = /[A-Z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSymbol = /[^a-zA-Z0-9\s]/.test(password);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += SYMBOLS.length;

  let bits = 0;

  // Passphrase specific entropy calculation vs Random string calculation
  if (style === 'passphrase' && (password.includes('-') || password.includes('.') || password.includes('_'))) {
    // Split into segments by separator
    const segments = password.split(/[-._]/);
    const wordMatches = segments.filter(seg => {
      const cleanSeg = seg.replace(/[^a-zA-Z]/g, '');
      return cleanSeg.length >= 3;
    });

    const wordCount = Math.max(1, wordMatches.length);
    const wordListEntropyPerWord = Math.log2(WORDLIST.length); // ~9.2 bits per word from 600 word list

    bits = wordCount * wordListEntropyPerWord;
    if (hasNumber) bits += 6.6; // ~6.6 bits for 2-digit random number
    if (hasSymbol) bits += 4.7; // ~4.7 bits for random symbol selection
    if (hasUpper) bits += wordCount * 1.0; // 1 bit per capitalized word
  } else {
    // Standard Shannon / Hartley entropy formula: E = L * log2(Pool)
    if (poolSize > 0) {
      bits = length * Math.log2(poolSize);
    }
  }

  bits = Math.round(bits * 10) / 10; // Round to 1 decimal place

  // Estimate crack time assuming 100 Billion (10^11) combinations tested per second
  const guessesPerSecond = 100_000_000_000;
  const combinations = Math.pow(2, bits);
  const averageGuessesToCrack = combinations / 2; // Average 50% search space
  const secondsToCrack = averageGuessesToCrack / guessesPerSecond;

  const crackTimeDisplay = formatCrackTime(secondsToCrack);

  return {
    bits,
    poolSize,
    crackTimeDisplay,
    secondsToCrack,
    charBreakdown: {
      lower: (password.match(/[a-z]/g) || []).length,
      upper: (password.match(/[A-Z]/g) || []).length,
      number: (password.match(/[0-9]/g) || []).length,
      symbol: (password.match(/[^a-zA-Z0-9\s]/g) || []).length,
      length: password.length
    }
  };
}

/**
 * Formats crack time seconds into a human readable duration.
 * @param {number} seconds 
 * @returns {string}
 */
function formatCrackTime(seconds) {
  if (seconds < 0.001) return 'Instant (< 1 ms)';
  if (seconds < 1) return 'Less than a second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 10000) return `${Math.round(seconds / (31536000 * 100))} centuries`;
  return 'Millions of years';
}
