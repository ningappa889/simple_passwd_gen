import { WORDLIST, LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS } from '../data/wordlist.js';
import { getSecureRandomInt, getRandomArrayElement, secureShuffleArray } from './cryptoUtils.js';

/**
 * Generates a memorable passphrase using cryptographically secure random words and symbols.
 * Strictly respects active character set checkboxes (Uppercase, Lowercase, Numbers, Symbols).
 * 
 * @param {Object} options
 * @param {number} options.length Desired target length (8 - 64)
 * @param {boolean} options.includeUppercase
 * @param {boolean} options.includeLowercase
 * @param {boolean} options.includeNumbers
 * @param {boolean} options.includeSymbols
 * @returns {string}
 */
export function generateMemorablePassphrase(options = {}) {
  const {
    length = 20,
    targetLength,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  const reqLength = targetLength || length || 20;

  // Calibrate word count to match target character length closely
  let wordCount = 2;
  if (reqLength <= 16) wordCount = 2;
  else if (reqLength <= 22) wordCount = 3;
  else if (reqLength <= 28) wordCount = 4;
  else wordCount = 5;

  let wordPool = [...WORDLIST];
  if (reqLength <= 16) {
    wordPool = wordPool.filter(w => w.length <= 5);
  }

  const selectedWords = [];
  for (let i = 0; i < wordCount; i++) {
    if (wordPool.length === 0) wordPool = [...WORDLIST];
    const wordIndex = getSecureRandomInt(wordPool.length);
    let word = wordPool.splice(wordIndex, 1)[0];

    if (!includeUppercase && includeLowercase) {
      // All lowercase
      word = word.toLowerCase();
    } else if (includeUppercase && !includeLowercase) {
      // All uppercase
      word = word.toUpperCase();
    } else if (!includeUppercase && !includeLowercase) {
      // No letters allowed
      word = String(getSecureRandomInt(9000) + 1000);
    } else {
      // Standard Title Case (Capitalized first letter)
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    selectedWords.push(word);
  }

  // Separators
  const separators = ['-', '.', '_'];
  const separator = getRandomArrayElement(separators);

  let passphraseParts = [...selectedWords];

  // Insert numbers if enabled
  if (includeNumbers) {
    const num = getSecureRandomInt(90) + 10;
    const numPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[numPos] += num.toString();
  }

  // Insert symbols if enabled
  if (includeSymbols) {
    const symbol = getRandomArrayElement(SYMBOLS.split(''));
    const symPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[symPos] += symbol;
  }

  let passphrase = passphraseParts.join(separator);

  // Pad passphrase if short of reqLength
  while (passphrase.length < reqLength) {
    if (includeNumbers && getSecureRandomInt(2) === 0) {
      passphrase += getSecureRandomInt(10);
    } else if (includeSymbols && getSecureRandomInt(2) === 0) {
      passphrase += getRandomArrayElement(SYMBOLS.split(''));
    } else if (includeLowercase && !includeUppercase) {
      passphrase += getRandomArrayElement(LOWERCASE.split(''));
    } else if (includeUppercase && !includeLowercase) {
      passphrase += getRandomArrayElement(UPPERCASE.split(''));
    } else if (includeLowercase) {
      passphrase += getRandomArrayElement(LOWERCASE.split(''));
    } else {
      passphrase += getSecureRandomInt(10);
    }
  }

  // Slice passphrase to exact reqLength
  if (passphrase.length > reqLength) {
    passphrase = passphrase.slice(0, reqLength);
  }

  // Final strict character set enforcement
  if (!includeUppercase) {
    passphrase = passphrase.toLowerCase();
  } else if (!includeLowercase) {
    passphrase = passphrase.toUpperCase();
  }

  return passphrase;
}

/**
 * Generates a random character string based on active character sets.
 * Strictly enforces selected character options.
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
    targetLength,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  const reqLength = targetLength || length || 16;

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
    pool = NUMBERS;
    guaranteedChars.push(getRandomArrayElement(NUMBERS.split('')));
  }

  const poolArray = pool.split('');
  const remainingLength = Math.max(0, reqLength - guaranteedChars.length);
  const passwordChars = [...guaranteedChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(getRandomArrayElement(poolArray));
  }

  let passwordStr = secureShuffleArray(passwordChars).slice(0, reqLength).join('');

  // Final strict character set enforcement
  if (!includeUppercase) {
    passwordStr = passwordStr.toLowerCase();
  } else if (!includeLowercase) {
    passwordStr = passwordStr.toUpperCase();
  }

  return passwordStr;
}

/**
 * Main Password Dispatcher
 */
export function generatePassword(options = {}) {
  const { style = 'passphrase', length = 16, targetLength } = options;
  const reqLength = targetLength || length || 16;

  if (style === 'passphrase') {
    return generateMemorablePassphrase({ ...options, length: reqLength });
  } else if (style === 'max') {
    return generateStrongPassword({
      ...options,
      length: Math.max(24, reqLength),
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    });
  } else {
    return generateStrongPassword({ ...options, length: reqLength });
  }
}
