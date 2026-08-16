import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import AccountSelector from './components/AccountSelector';
import PasswordOptions from './components/PasswordOptions';
import PasswordResult from './components/PasswordResult';
import StrengthMeter from './components/StrengthMeter';
import EntropyDisplay from './components/EntropyDisplay';
import BatchGenerator from './components/BatchGenerator';
import HistoryDrawer from './components/HistoryDrawer';
import HowItWorks from './components/HowItWorks';
import SecurityInfo from './components/SecurityInfo';
import About from './components/About';
import PasswordChecker from './components/PasswordChecker';
import Footer from './components/Footer';

import { ACCOUNT_TYPES } from './data/accountPolicies';
import { generatePassword } from './utils/passwordGenerator';
import { calculateEntropy } from './utils/entropyCalculator';
import { evaluatePasswordStrength } from './utils/strengthAnalyzer';
import { ShieldCheck, Lock, Sparkles, KeyRound, Cpu, ChevronRight } from 'lucide-react';

export default function App() {
  // App navigation
  const [activeTab, setActiveTab] = useState('generator');

  // Generator Options State
  const [selectedAccount, setSelectedAccount] = useState('email');
  const [style, setStyle] = useState('passphrase');
  const [length, setLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Initial default options
  const defaultOpts = {
    style: 'passphrase',
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  };

  // Password & Analysis State initialized safely
  const initialPassword = generatePassword(defaultOpts);
  const initialEntropy = calculateEntropy(initialPassword, 'passphrase');
  const initialStrength = evaluatePasswordStrength(initialPassword, 'passphrase', initialEntropy.bits);

  const [password, setPassword] = useState(initialPassword);
  const [entropyInfo, setEntropyInfo] = useState(initialEntropy);
  const [strengthInfo, setStrengthInfo] = useState(initialStrength);

  // Modals & History State
  const [sessionHistory, setSessionHistory] = useState([]);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Generate password callback
  const handleGenerate = useCallback((customOpts = null) => {
    const opts = customOpts || {
      style,
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    };

    const newPassword = generatePassword(opts);
    setPassword(newPassword);

    // Calculate metrics
    const entropy = calculateEntropy(newPassword, opts.style);
    const strength = evaluatePasswordStrength(newPassword, opts.style, entropy.bits);

    setEntropyInfo(entropy);
    setStrengthInfo(strength);

    // Add to session history (in memory only)
    const accObj = ACCOUNT_TYPES.find(a => a.id === selectedAccount);
    const historyItem = {
      password: newPassword,
      accountName: accObj ? accObj.name : 'Custom',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setSessionHistory(prev => [historyItem, ...prev.slice(0, 19)]); // Max 20 items
  }, [style, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, selectedAccount]);

  // When account type changes, apply default account policy
  const handleSelectAccount = (accId) => {
    setSelectedAccount(accId);
    const accPolicy = ACCOUNT_TYPES.find(a => a.id === accId);
    if (accPolicy) {
      setStyle(accPolicy.recommendedStyle);
      setLength(accPolicy.recommendedLength);
      setIncludeUppercase(accPolicy.defaultUppercase);
      setIncludeLowercase(accPolicy.defaultLowercase);
      setIncludeNumbers(accPolicy.defaultNumbers);
      setIncludeSymbols(accPolicy.defaultSymbols);

      // Generate with newly selected policy immediately
      handleGenerate({
        style: accPolicy.recommendedStyle,
        length: accPolicy.recommendedLength,
        includeUppercase: accPolicy.defaultUppercase,
        includeLowercase: accPolicy.defaultLowercase,
        includeNumbers: accPolicy.defaultNumbers,
        includeSymbols: accPolicy.defaultSymbols
      });
    }
  };

  // Auto-generate password whenever style, length, or character sets change
  useEffect(() => {
    handleGenerate();
  }, [style, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={sessionHistory.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {activeTab === 'generator' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Subtitle Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Client-Side Cryptographic Password Engine</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Smart Passwords. Memorable by Design.
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate high-entropy passwords and passphrases tailored to your account type. Resistant to dictionary attacks, easy to remember, and generated 100% locally.
              </p>
            </div>

            {/* Generator Card Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Account & Generator Controls */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Account Selector */}
                <AccountSelector
                  selectedAccount={selectedAccount}
                  onSelectAccount={handleSelectAccount}
                />

                {/* 2. Password Options (Style, Length, Chars) */}
                <PasswordOptions
                  style={style}
                  setStyle={setStyle}
                  length={length}
                  setLength={setLength}
                  includeUppercase={includeUppercase}
                  setIncludeUppercase={setIncludeUppercase}
                  includeLowercase={includeLowercase}
                  setIncludeLowercase={setIncludeLowercase}
                  includeNumbers={includeNumbers}
                  setIncludeNumbers={setIncludeNumbers}
                  includeSymbols={includeSymbols}
                  setIncludeSymbols={setIncludeSymbols}
                />

              </div>

              {/* Right Column: Password Output & Real-time Analysis */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Generated Password Result Box */}
                <PasswordResult
                  password={password}
                  onGenerate={handleGenerate}
                  onOpenBatch={() => setIsBatchOpen(true)}
                  onOpenHistory={() => setIsHistoryOpen(true)}
                />

                {/* Strength Meter & Memorability Score */}
                <StrengthMeter strengthInfo={strengthInfo} />

                {/* Cryptographic Entropy & Breakdown */}
                <EntropyDisplay entropyInfo={entropyInfo} />

              </div>

            </div>

          </div>
        )}

        {activeTab === 'checker' && <PasswordChecker />}
        {activeTab === 'how-it-works' && <HowItWorks />}
        {activeTab === 'security' && <SecurityInfo />}
        {activeTab === 'about' && <About />}

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals & Drawers */}
      <BatchGenerator
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
        currentOptions={{
          style,
          length,
          includeUppercase,
          includeLowercase,
          includeNumbers,
          includeSymbols
        }}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={sessionHistory}
        onClearHistory={() => setSessionHistory([])}
      />

    </div>
  );
}
