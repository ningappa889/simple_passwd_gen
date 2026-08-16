import { WORDLIST, LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS } from '../data/wordlist.js';
import { getSecureRandomInt, getRandomArrayElement, secureShuffleArray } from './cryptoUtils.js';

/**
 * Generates a memorable passphrase using cryptographically secure random words and symbols.
 * Example: Orbit-Mango7!River-Cactus or Silver!Falcon82-Cloud
 * 
 * @param {Object} options
 * @param {number} options.length Desired target length (12 - 32)
 * @param {boolean} options.includeUppercase
 * @param {boolean} options.includeNumbers
 * @param {boolean} options.includeSymbols
 * @returns {string}
 */
export function generateMemorablePassphrase(options = {}) {
  const {
    length = 20,
    targetLength,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  const reqLength = targetLength || length || 20;

  // Calibrate word count to match target character length closely
  let wordCount = 2;
  if (reqLength <= 18) wordCount = 2;
  else if (reqLength <= 24) wordCount = 3;
  else if (reqLength <= 29) wordCount = 4;
  else wordCount = 5;

  // Select unique random words from WORDLIST
  // Filter wordpool to shorter 3-5 letter words if reqLength is small
  let wordPool = [...WORDLIST];
  if (reqLength <= 16) {
    wordPool = wordPool.filter(w => w.length <= 5);
  }

  const selectedWords = [];
  for (let i = 0; i < wordCount; i++) {
    if (wordPool.length === 0) wordPool = [...WORDLIST];
    const wordIndex = getSecureRandomInt(wordPool.length);
    let word = wordPool.splice(wordIndex, 1)[0];

    if (!includeUppercase) {
      word = word.toLowerCase();
    } else {
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
    const num = getSecureRandomInt(90) + 10; // 2-digit number
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
    pool = LOWERCASE + NUMBERS;
    guaranteedChars.push(getRandomArrayElement(LOWERCASE.split('')));
  }

  const poolArray = pool.split('');
  const remainingLength = Math.max(0, reqLength - guaranteedChars.length);
  const passwordChars = [...guaranteedChars];

  for (let i = 0; i < remainingLength; i++) {
    passwordChars.push(getRandomArrayElement(poolArray));
  }

  // Shuffle and slice to strictly match target length
  return secureShuffleArray(passwordChars).slice(0, reqLength).join('');
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
