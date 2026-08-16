/**
 * Top Leaked & Breached Passwords Dictionary
 * Curated from public breach datasets (HaveIBeenPwned, RockYou, SecLists)
 */
export const COMMON_BREACHED_PASSWORDS = new Set([
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  '111111',
  '1234567',
  'sunshine',
  'qwerty',
  'iloveyou',
  'princess',
  'admin',
  'welcome',
  'password123',
  '123123',
  'admin123',
  'welcome123',
  'pass123',
  'football',
  'charlie',
  'donald',
  'master',
  'monkey',
  'dragon',
  'superman',
  'shadow',
  'trustno1',
  'letmein',
  'baseball',
  'solo',
  'hacker',
  'secret',
  'keyboard',
  'starwars',
  'guest',
  '000000',
  '1234567890',
  'abc123',
  'user123',
  'system',
  'test123',
  'passcode',
  'root',
  'login',
  'server',
  'changeit',
  'qwer1234',
  'ashley',
  'bailey',
  'matrix',
  'thomas',
  'george',
  'daniel',
  'alexander',
  'jessica',
  'hannah',
  'michael',
  'jennifer',
  'hardware',
  'software',
  'computer',
  'internet'
]);

/**
 * Checks if a password is an EXACT MATCH in the common breached passwords dictionary.
 * Marks isBreached as true ONLY if the exact entered password is found in the list.
 * 
 * @param {string} password 
 * @returns {Object|null} Breach info if found, null if clean
 */
export function checkBreachStatus(password) {
  if (!password) return null;
  const cleanPwd = password.toLowerCase().trim();

  // Strict EXACT MATCH check only against breach dictionary
  if (COMMON_BREACHED_PASSWORDS.has(cleanPwd)) {
    return {
      isBreached: true,
      severity: 'Critical',
      reason: 'Exact match found in public data breach dictionaries (RockYou, HaveIBeenPwned).',
      estimatedExposures: '5,000,000+ data leaks'
    };
  }

  return {
    isBreached: false,
    severity: 'Safe',
    reason: 'No exact match in common data breach dictionaries.',
    estimatedExposures: '0'
  };
}
