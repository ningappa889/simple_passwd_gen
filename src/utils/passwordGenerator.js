import { WORDLIST, LOWERCASE, UPPERCASE, NUMBERS, SYMBOLS } from '../data/wordlist.js';
import { getSecureRandomInt, getRandomArrayElement, secureShuffleArray } from './cryptoUtils.js';

/**
 * Strict character sanitizer that guarantees zero disabled character types appear in output.
 */
function sanitizePassword(str, options = {}) {
  const {
    reqLength = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  let result = str;

  // 1. Strip disabled character classes
  if (!includeUppercase) {
    result = result.replace(/[A-Z]/g, '');
  }
  if (!includeLowercase) {
    result = result.replace(/[a-z]/g, '');
  }
  if (!includeNumbers) {
    result = result.replace(/[0-9]/g, '');
  }
  if (!includeSymbols) {
    result = result.replace(/[^a-zA-Z0-9]/g, '');
  }

  // 2. Build pool exclusively from active enabled character sets
  let pool = '';
  if (includeLowercase) pool += LOWERCASE;
  if (includeUppercase) pool += UPPERCASE;
  if (includeNumbers) pool += NUMBERS;
  if (includeSymbols) pool += SYMBOLS;

  // Fallback if all checkboxes were turned off by user
  if (pool.length === 0) {
    pool = NUMBERS;
  }

  const poolArray = pool.split('');

  // 3. Pad using ONLY active allowed character pool until reqLength is reached
  while (result.length < reqLength) {
    result += getRandomArrayElement(poolArray);
  }

  // 4. Truncate to exact target length
  return result.slice(0, reqLength);
}

/**
 * Generates a memorable passphrase using cryptographically secure random words.
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
      word = word.toLowerCase();
    } else if (includeUppercase && !includeLowercase) {
      word = word.toUpperCase();
    } else if (!includeUppercase && !includeLowercase) {
      word = String(getSecureRandomInt(9000) + 1000);
    } else {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    selectedWords.push(word);
  }

  // Separators: ONLY use symbols if includeSymbols is true!
  const separators = includeSymbols ? ['-', '.', '_'] : [''];
  const separator = getRandomArrayElement(separators);

  let passphraseParts = [...selectedWords];

  if (includeNumbers) {
    const num = getSecureRandomInt(90) + 10;
    const numPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[numPos] += num.toString();
  }

  if (includeSymbols) {
    const symbol = getRandomArrayElement(SYMBOLS.split(''));
    const symPos = getSecureRandomInt(passphraseParts.length);
    passphraseParts[symPos] += symbol;
  }

  const rawPassphrase = passphraseParts.join(separator);

  // Apply master sanitizer to guarantee zero disabled characters appear
  return sanitizePassword(rawPassphrase, {
    reqLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  });
}

/**
 * Generates a random character string based on active character sets.
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

  const rawPassword = secureShuffleArray(passwordChars).join('');

  return sanitizePassword(rawPassword, {
    reqLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  });
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
      length: Math.max(24, reqLength)
    });
  } else {
    return generateStrongPassword({ ...options, length: reqLength });
  }
}
