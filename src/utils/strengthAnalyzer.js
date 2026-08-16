/**
 * Password Strength & Memorability Real-Time Analyzer
 */

/**
 * Evaluates strength score, memorability score, and potential risks.
 * 
 * @param {string} password 
 * @param {string} style ('passphrase' | 'strong' | 'max')
 * @param {number} entropyBits 
 * @returns {Object}
 */
export function evaluatePasswordStrength(password, style, initialEntropyBits) {
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
      warnings: []
    };
  }

  const warnings = [];
  const uniqueCount = new Set(password.split('')).size;
  let effectiveBits = initialEntropyBits;

  // Check for common bad patterns & dictionary words
  const isCommonPattern = /(password|admin|welcome|qwerty|1234|abcd|pass123|google|github|email|login|user|123456)/i.test(password);

  if (/(.)\1{2,}/.test(password)) {
    warnings.push('Contains 3+ repeated characters in a row.');
  }

  if (uniqueCount <= 2 && password.length >= 4) {
    warnings.push(`Extremely low character diversity: Only ${uniqueCount} unique character(s) used.`);
  }

  if (isCommonPattern) {
    warnings.push('Contains a heavily leaked dictionary term or predictable sequence (e.g. "password", "123").');
    effectiveBits = Math.min(effectiveBits, 28.0); // Heavy penalty for common dictionary words
  }

  // Determine Strength Label & Percent based on effective entropy bits and pattern warnings
  let score = 0;
  let label = 'Weak';
  let color = 'bg-red-500';
  let textColor = 'text-red-400';
  let borderColor = 'border-red-500/30';
  let percent = 25;

  // Force WEAK rating if character diversity is extremely low or contains common dictionary words
  if ((uniqueCount <= 2 && password.length >= 4) || isCommonPattern || effectiveBits < 45) {
    score = 0;
    label = 'Weak';
    color = 'bg-red-500';
    textColor = 'text-red-400';
    borderColor = 'border-red-500/50';
    percent = isCommonPattern ? 15 : 25;
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

  if (isCommonPattern) {
    memorability = 'High';
    memorabilityExplanation = 'Very easy to remember, but extremely unsafe because dictionary words and predictable numbers are guessed instantly by automated hacker tools.';
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
    warnings
  };
}
