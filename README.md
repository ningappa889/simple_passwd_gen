# SmartPass — Cryptographic & Memorable Password Generator

**SmartPass** is a modern, cybersecurity-themed web application designed to generate strong, unique, and memorable passwords and passphrases tailored to specific account types. Passwords are generated 100% client-side using `crypto.getRandomValues()` with zero data persistence or server transmission.

![SmartPass](https://img.shields.io/badge/Security-Client--Side%20Crypto-10b981?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/React-18.2-06b6d4?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-8b5cf6?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=for-the-badge&logo=vite)

---

## 🌟 Core Features

- **🔒 Cryptographically Secure Randomness**: Uses `window.crypto.getRandomValues()` exclusively. ZERO reliance on `Math.random()`.
- **💡 Memorable Passphrases**: Diceware-inspired 3–6 word passphrases combining 670+ curated English words with numbers and symbols (e.g. `Orbit-Mango7!River-Cactus`, `Silver!Falcon82-Cloud`).
- **🛡️ Account-Specific Policies**: Tailored preset rules for **Email**, **Google**, **GitHub**, **Banking**, **UPI**, **Social Media**, **College**, **Work**, **Shopping**, **Wi-Fi**, and **Custom** accounts without appending predictable site names.
- **⚡ Real-Time Entropy & Strength Meter**: Live calculation of Shannon & Diceware bit entropy, visual strength score meter, and estimated brute-force crack duration.
- **🧠 Memorability Rating**: Human cognitive load rating (Very High, High, Medium, Low) with structure breakdown.
- **📑 UX Conveniences**:
  - One-click copy with animated feedback.
  - Show/Hide visibility password masking (`••••••••`).
  - Regenerate button with rotation animation.
  - Multiple Password Batch Generator modal (creates 6 options at once).
  - In-memory session history drawer (erased automatically on page refresh).
- **🛡️ 100% Client-Side Privacy**: Zero server dependency, zero database storage, zero analytics, zero network requests.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ningappa889/smartpass.git
   cd smartpass
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Production Build

To compile a production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🔐 Security Principles

1. **No Predictable Suffixes**: Does NOT generate `Email@1234` or `Google@2026`.
2. **Zero Storage**: Generated credentials are never saved to `LocalStorage`, `Cookies`, or remote databases.
3. **No Network Transmission**: Passwords never leave your local browser context.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
