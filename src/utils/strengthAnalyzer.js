import { checkBreachStatus } from '../data/commonBreachedPasswords.js';

/**
 * Normalizes l33t-speak to plain lowercase text for pattern matching
 * e.g., 'B@s@v@r@j' -> 'basavaraj', 'P@ssw0rd' -> 'password'
 */
function normalizeL33t(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/4/g, 'a')
    .replace(/3/g, 'e')
    .replace(/1/g, 'i')
    .replace(/!/g, 'i')
    .replace(/0/g, 'o')
    .replace(/\$/g, 's')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b');
}

/**
 * Detects if any personal metadata tokens (name, birth year, keyword) exist inside password
 */
export function checkPersonalMetadataRisk(password, userMetaData) {
  if (!password || !userMetaData) {
    return { hasRisk: false, matchedTokens: [], warningMessage: null };
  }

  const { name, birthYear } = userMetaData;
  const matchedTokens = [];
  const normalizedPassword = normalizeL33t(password);
  const plainPasswordLower = password.toLowerCase();

  // Check Name / Keyword (minimum 2 chars)
  if (name && name.trim().length >= 2) {
    const cleanName = name.trim().toLowerCase();
    const normalizedName = normalizeL33t(cleanName);

    if (plainPasswordLower.includes(cleanName) || normalizedPassword.includes(normalizedName)) {
      matchedTokens.push({ type: 'Name/Keyword', value: name.trim() });
    }
  }

  // Check Birth Year / Date Pin (minimum 2 digits, e.g. 2005 or 05)
  if (birthYear && birthYear.trim().length >= 2) {
    const cleanYear = birthYear.trim();
    if (plainPasswordLower.includes(cleanYear.toLowerCase())) {
      matchedTokens.push({ type: 'Birth Year/Date', value: cleanYear });
    }
  }

  if (matchedTokens.length > 0) {
    return {
      hasRisk: true,
      matchedTokens,
      warningMessage: `⚠️ TARGETED OSINT VULNERABILITY: Password contains personal metadata (${matchedTokens.map(t => `"${t.value}"`).join(', ')}). Attackers using targeted dictionary rule attacks (e.g. Hashcat with OSINT wordlists) crack these in seconds!`
    };
  }

  return { hasRisk: false, matchedTokens: [], warningMessage: null };
}

/**
 * Password Strength & Memorability Real-Time Analyzer
 * 
 * @param {string} password 
 * @param {string} style ('passphrase' | 'strong' | 'max')
 * @param {number} initialEntropyBits 
 * @param {Object} [userMetaData] Optional { name, birthYear } for OSINT audit
 * @returns {Object}
 */
export function evaluatePasswordStrength(password, style, initialEntropyBits, userMetaData = null) {
  if (!password) {
    return {
      score: 0,
      label: 'Weak',
      color: 'bg-red-500',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/50',
      percent: 0,
      memorability: 'Low',
      memorabilityExplanation: 'No password generated.',
      breachInfo: { isBreached: false },
      personalRisk: { hasRisk: false, matchedTokens: [] },
      warnings: []
    };
  }

  const warnings = [];
  const uniqueCount = new Set(password.split('')).size;
  let effectiveBits = initialEntropyBits;

  // 1. Check breach status from dataset
  const breachInfo = checkBreachStatus(password);

  // 2. Check for personal metadata risk (Name / Birth Year OSINT audit)
  const personalRisk = checkPersonalMetadataRisk(password, userMetaData);

  // 3. Check for common bad patterns & dictionary words
  const isCommonPattern = /(password|admin|welcome|qwerty|1234|abcd|pass123|google|github|email|login|user|123456)/i.test(password);

  if (breachInfo && breachInfo.isBreached) {
    warnings.push(`🚨 COMPROMISED / BREACHABLE PASSWORD: ${breachInfo.reason}`);
    effectiveBits = 10.0;
  } else if (personalRisk.hasRisk) {
    warnings.push(personalRisk.warningMessage);
    effectiveBits = Math.min(effectiveBits, 22.0); // Heavily downgrade effective entropy due to OSINT predictability
  } else if (isCommonPattern) {
    if (password.length <= 16) {
      warnings.push('Contains a heavily leaked dictionary term or predictable sequence (e.g. "password", "123").');
      effectiveBits = Math.min(effectiveBits, 28.0);
    } else {
      warnings.push('Contains common word "password", but high-entropy random characters provide strong security.');
    }
  }

  if (/(.)\1{2,}/.test(password)) {
    warnings.push('Contains 3+ repeated characters in a row.');
  }

  if (uniqueCount <= 2 && password.length >= 4) {
    warnings.push(`Extremely low character diversity: Only ${uniqueCount} unique character(s) used.`);
  }

  // Determine Strength Label & Percent based on effective entropy bits, breach status, and personal risk
  let score = 0;
  let label = 'Weak';
  let color = 'bg-red-500';
  let textColor = 'text-red-400';
  let borderColor = 'border-red-500/30';
  let percent = 25;

  if (breachInfo && breachInfo.isBreached) {
    score = 0;
    label = 'Breachable';
    color = 'bg-rose-600 animate-pulse';
    textColor = 'text-rose-400';
    borderColor = 'border-rose-500/80';
    percent = 10;
  } else if (personalRisk.hasRisk) {
    score = 0;
    label = 'Vulnerable (Personal Info)';
    color = 'bg-amber-600 animate-pulse';
    textColor = 'text-amber-400';
    borderColor = 'border-amber-500/80';
    percent = 20;
  } else if ((uniqueCount <= 2 && password.length >= 4) || effectiveBits < 45) {
    score = 0;
    label = 'Weak';
    color = 'bg-red-500';
    textColor = 'text-red-400';
    borderColor = 'border-red-500/50';
    percent = 25;
  } else if (effectiveBits < 65) {
    score = 1;
    label = 'Moderate';
    color = 'bg-amber-500';
    textColor = 'text-amber-400';
    borderColor = 'border-amber-500/40';
    percent = 50;
  } else if (effectiveBits < 85) {
    score = 2;
    label = 'Strong';
    color = 'bg-emerald-500';
    textColor = 'text-emerald-400';
    borderColor = 'border-emerald-500/40';
    percent = 78;
  } else {
    score = 3;
    label = 'Very Strong';
    color = 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]';
    textColor = 'text-emerald-300';
    borderColor = 'border-emerald-400/50';
    percent = 100;
  }

  // Determine Memorability Score & Explanation
  let memorability = 'Low';
  let memorabilityExplanation = 'Random character sequences are high in randomness but hard for humans to remember without a password manager.';

  if (breachInfo && breachInfo.isBreached) {
    memorability = 'High';
    memorabilityExplanation = 'Extremely easy to remember, BUT EXTREMELY UNSAFE! This password has been exposed in public data leaks and is tested automatically by hacker botnets.';
  } else if (personalRisk.hasRisk) {
    memorability = 'High';
    memorabilityExplanation = `Very easy for you to remember, BUT VULNERABLE TO TARGETED OSINT ATTACKS! Because it contains your personal info (${personalRisk.matchedTokens.map(t => `"${t.value}"`).join(', ')}), an attacker who knows your name or social media details can guess this instantly using automated OSINT dictionary tools.`;
  } else if (isCommonPattern && password.length <= 16) {
    memorability = 'High';
    memorabilityExplanation = 'Very easy to remember, but unsafe because short dictionary words and predictable numbers are guessed instantly by automated hacker tools.';
  } else if (uniqueCount <= 2) {
    memorability = 'Low';
    memorabilityExplanation = 'Repetitive single-character patterns offer no security against automated guessing.';
  } else if (style === 'passphrase') {
    if (effectiveBits >= 75) {
      memorability = 'Very High';
      memorabilityExplanation = 'Uses randomly selected natural words combined with numbers and symbols, making it effortless to visualize and remember while remaining difficult to guess.';
    } else {
      memorability = 'High';
      memorabilityExplanation = 'Structure uses distinct words and hyphens which can be chunked easily by memory.';
    }
  } else if (style === 'strong') {
    if (password.length <= 14) {
      memorability = 'Medium';
      memorabilityExplanation = 'Shorter random string can be memorized with repeated practice, but passphrases are recommended for human memory.';
    } else {
      memorability = 'Low';
      memorabilityExplanation = 'Complex random string of high length; best stored directly in a secure password manager.';
    }
  } else if (style === 'max') {
    memorability = 'Low';
    memorabilityExplanation = 'Maximum security high-entropy string designed for maximum machine resistance. Recommended for auto-fill via password manager.';
  }

  return {
    score,
    label,
    color,
    textColor,
    borderColor,
    percent,
    memorability,
    memorabilityExplanation,
    breachInfo,
    personalRisk,
    warnings
  };
}
