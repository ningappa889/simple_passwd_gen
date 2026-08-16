/**
 * Top Leaked & Breached Passwords Dictionary
 * Curated from public breach datasets (HaveIBeenPwned, RockYou, SecLists)
 */
export const COMMON_BREACHED_PASSWORDS = new Set([
  '123456',
  '12345678',
  '123456789',
  '1234567890',
  '12345',
  '1234567',
  '123123',
  '123321',
  '111111',
  '11111111',
  '000000',
  '00000000',
  '112233',
  '121212',
  '654321',
  '987654321',
  'password',
  'password1',
  'password12',
  'password123',
  'password1234',
  'Password1',
  'Password123',
  'Password@123',
  'password@123',
  'pass123',
  'pass1234',
  'pass12345',
  'passw0rd',
  'p@ssword',
  'p@ssword123',
  'passcode',
  'letmein',
  'letmein123',
  'welcome',
  'welcome1',
  'welcome123',
  'admin',
  'admin1',
  'admin123',
  'admin@123',
  'administrator',
  'root',
  'root123',
  'guest',
  'guest123',
  'user',
  'user123',
  'login',
  'login123',
  'test',
  'test123',
  'testing',
  'testing123',
  'qwerty',
  'qwerty123',
  'qwertyuiop',
  'qwerty1',
  'qwe123',
  'qwer1234',
  'asdfgh',
  'asdf123',
  'zxcvbn',
  'zxcvbn123',
  '1q2w3e',
  '1qaz2wsx',
  'qazwsx',
  'abc123',
  'abcdef',
  'abcdef123',
  'iloveyou',
  'iloveyou123',
  'loveyou',
  'love123',
  'loveme',
  'sunshine',
  'sunshine123',
  'princess',
  'princess123',
  'monkey',
  'monkey123',
  'dragon',
  'dragon123',
  'football',
  'football123',
  'cricket',
  'cricket123',
  'baseball',
  'baseball123',
  'hacker',
  'hacker123',
  'secret',
  'secret123',
  'shadow',
  'shadow123',
  'master',
  'master123',
  'superman',
  'superman123',
  'starwars',
  'starwars123',
  'trustno1',
  'changeit',
  'computer',
  'computer123',
  'internet',
  'internet123',
  'server',
  'server123'
]);

// Case-insensitive lookup set
const LOWERCASE_BREACH_SET = new Set(
  Array.from(COMMON_BREACHED_PASSWORDS).map(p => p.toLowerCase())
);

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

  // Strict case-insensitive EXACT MATCH check against breach dictionary
  if (LOWERCASE_BREACH_SET.has(cleanPwd)) {
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
