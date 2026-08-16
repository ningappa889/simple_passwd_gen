/**
 * Cryptographically Secure Random Utilities
 * Uses window.crypto.getRandomValues exclusively.
 * ZERO use of Math.random().
 */

/**
 * Returns a cryptographically secure random integer in the range [0, max - 1].
 * @param {number} max Upper bound (exclusive)
 * @returns {number}
 */
export function getSecureRandomInt(max) {
  if (!max || max <= 0) return 0;
  const cryptoObj = (typeof globalThis !== 'undefined' && globalThis.crypto) ? globalThis.crypto : (typeof window !== 'undefined' ? window.crypto : null);

  if (!cryptoObj || !cryptoObj.getRandomValues) {
    throw new Error("Cryptographically secure random number generator (crypto.getRandomValues) is not available.");
  }

  // To prevent rejection sampling bias, find nearest power of 2 or use Uint32
  const array = new Uint32Array(1);
  const maxUint32 = 0xFFFFFFFF;
  const limit = maxUint32 - (maxUint32 % max);

  let randomVal;
  do {
    cryptoObj.getRandomValues(array);
    randomVal = array[0];
  } while (randomVal >= limit);

  return randomVal % max;
}

/**
 * Selects a random element from an array using crypto random integer.
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export function getRandomArrayElement(array) {
  if (!array || array.length === 0) return null;
  const index = getSecureRandomInt(array.length);
  return array[index];
}

/**
 * Shuffles an array in place using Fisher-Yates shuffle with crypto randomness.
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function secureShuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
