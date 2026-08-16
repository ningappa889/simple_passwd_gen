import { WORDLIST, LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS } from '../data/wordlist.js';
import { getSecureRandomInt, getRandomArrayElement, secureShuffleArray } from './cryptoUtils.js';

/**
 * Generates a memorable passphrase using cryptographically secure random words and symbols.
 * Example: Orbit-Mango7!River-Cactus or Silver!Falcon82-Cloud
 * 
 * @param {Object} options
 * @param {number} options.targetLength Desired length approximate/floor
 * @param {boolean} options.includeUppercase
 * @param {boolean} options.includeNumbers
 * @param {boolean} options.includeSymbols
 * @returns {string}
 */
export function generateMemorablePassphrase(options = {}) {
  const {
    targetLength = 20,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  // Determine word count based on target length (3 to 6 words)
  let wordCount = Math.max(3, Math.min(6, Math.round(targetLength / 5)));
  if (targetLength >= 26) wordCount = 5;
  if (targetLength >= 30) wordCount = 6;

  // Select unique random words from WORDLIST
  const selectedWords = [];
  const wordPool = [...WORDLIST];

  for (let i = 0; i < wordCount; i++) {
    if (wordPool.length === 0) break;
    const wordIndex = getSecureRandomInt(wordPool.length);
    let word = wordPool.splice(wordIndex, 1)[0];

    // Case formatting
    if (!includeUppercase) {
      word = word.toLowerCase();
    } else {
      // Capitalize first letter or alternate randomly
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    selectedWords.push(word);
  }

  // Joiner separators (e.g. -, _, .)
  const separators = ['-', '.', '_'];
  const separator = getRandomArrayElement(separators);

  let passphraseParts = [...selectedWords];

  // Insert random number (e.g. 7 or 82) into one of the word positions
  if (includeNumbers) {
    const num = getSecureRandomInt(90) + 10; // 2 digit number between 10 and 99
    const numPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[numPos] += num.toString();
  }

  // Insert random symbol (e.g. !, @, #, $) at a random boundary
  if (includeSymbols) {
    const symbol = getRandomArrayElement(SYMBOLS.split(''));
    const symPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[symPos] += symbol;
  }

  let passphrase = passphraseParts.join(separator);

  // If length is slightly less than target length and we need more padding, append an extra digit/symbol
  while (passphrase.length < targetLength) {
    if (includeNumbers && getSecureRandomInt(2) === 0) {
      passphrase += getSecureRandomInt(10);
    } else if (includeSymbols) {
      passphrase += getRandomArrayElement(SYMBOLS.split(''));
    } else {
      passphrase += getRandomArrayElement(LOWERCASE.split(''));
    }
  }

  return passphrase;
}

/**
 * Generates a random character string based on active character sets.
 * Example: vG7!qL9@xP2#kM8
 * 
 * @param {Object} options
 * @param {number} options.length
 * @param {boolean} options.includeUppercase
 * @param {boolean} options.includeLowercase
 * @param {boolean} options.includeNumbers
 * @param {boolean} options.includeSymbols
 * @returns {string}
 */
export function generateStrongPassword(options = {}) {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  let pool = '';
  const guaranteedChars = [];

  if (includeLowercase) {
    pool += LOWERCASE;
    guaranteedChars.push(getRandomArrayElement(LOWERCASE.split('')));
  }
  if (includeUppercase) {
    pool += UPPERCASE;
    guaranteedChars.push(getRandomArrayElement(UPPERCASE.split('')));
  }
  if (includeNumbers) {
    pool += NUMBERS;
    guaranteedChars.push(getRandomArrayElement(NUMBERS.split('')));
  }
  if (includeSymbols) {
    pool += SYMBOLS;
    guaranteedChars.push(getRandomArrayElement(SYMBOLS.split('')));
  }

  // Fallback if user turned off all checkboxes
  if (pool.length === 0) {
    pool = LOWERCASE + NUMBERS;
    guaranteedChars.push(getRandomArrayElement(LOWERCASE.split('')));
  }

  const poolArray = pool.split('');
  const remainingLength = Math.max(0, length - guaranteedChars.length);
  const passwordChars = [...guaranteedChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(getRandomArrayElement(poolArray));
  }

  // Shuffle to ensure guaranteed chars are not always at the beginning
  return secureShuffleArray(passwordChars).join('');
}

/**
 * Main Password Dispatcher
 */
export function generatePassword(options = {}) {
  const { style = 'passphrase' } = options;

  if (style === 'passphrase') {
    return generateMemorablePassphrase(options);
  } else if (style === 'max') {
    return generateStrongPassword({
      ...options,
      length: Math.max(24, options.length || 24),
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    });
  } else {
    return generateStrongPassword(options);
  }
}
