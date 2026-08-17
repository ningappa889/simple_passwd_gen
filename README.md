# SmartPass — Cryptographic & Memorable Password Generator

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg" width="80" alt="SmartPass Logo" />
</p>

<p align="center">
  <strong>SmartPass</strong> is a modern, cybersecurity-focused web application designed to generate and analyze high-entropy, memorable passwords and passphrases tailored to your account types. Passwords are generated 100% client-side using browser-native cryptography (<code>crypto.getRandomValues()</code>) with zero server reliance or data persistence.
</p>

<p align="center">
  <a href="https://github.com/ningappa889/simple_passwd_gen"><img src="https://img.shields.io/badge/Security-100%25%20Client--Side%20Crypto-10b981?style=for-the-badge&logo=shield-check&logoColor=white" alt="Security Badge" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.2-06b6d4?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge" /></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite&logoColor=646CFF" alt="Vite Badge" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS Badge" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" /></a>
  <a href="https://github.com/ningappa889/simple_passwd_gen/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License Badge" /></a>
</p>

---

## 🛠️ Technology Stack & Dependencies

| Technology | Badge | Description | Official Docs |
| :--- | :---: | :--- | :---: |
| **React** | ![React](https://img.shields.io/badge/React-18.2-06b6d4?style=flat-square&logo=react&logoColor=61DAFB) | Frontend UI component library | [react.dev](https://react.dev) |
| **Vite** | ![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite&logoColor=646CFF) | Next-generation frontend build tooling | [vitejs.dev](https://vitejs.dev) |
| **Tailwind CSS** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=38BDF8) | Utility-first CSS framework | [tailwindcss.com](https://tailwindcss.com) |
| **Web Crypto API** | ![Crypto](https://img.shields.io/badge/Web_Crypto_API-Native-10b981?style=flat-square&logo=shield&logoColor=10b981) | Hardware-level OS entropy RNG | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) |
| **Lucide Icons** | ![Lucide](https://img.shields.io/badge/Lucide_Icons-0.344-ff69b4?style=flat-square&logo=feather&logoColor=ff69b4) | Sleek, modern vector icon set | [lucide.dev](https://lucide.dev) |

---

## 🌟 Key Features

### 1. 🔒 Cryptographically Secure Passphrase & Password Generator
- **Hardware Entropy**: Uses `window.crypto.getRandomValues()` exclusively. ZERO reliance on predictable functions like `Math.random()`.
- **Diceware-Inspired Passphrases**: Combines 1,200+ curated English words with numbers and symbols (e.g. `Orbit-Mango7!River-Cactus`, `Silver!Falcon82-Cloud`).
- **Account-Specific Policies**: Tailored rules for **Email**, **Google**, **GitHub**, **Banking**, **UPI**, **Social Media**, **College**, **Work**, **Shopping**, **Wi-Fi**, and **Custom** accounts without appending predictable site names.

### 2. 🎯 Targeted OSINT Personal Metadata Vulnerability Audit
- **Target Data Detection**: Audit passwords against user personal metadata (Name, Birth Year, Pet Name).
- **L33t-Speak Normalization**: Detects dictionary rule attacks incorporating l33t-speak variants (e.g., `B@s@v@r@j2005` or `Basavaraj_05`).
- **OSINT Risk Warning**: Flags passwords vulnerable to targeted dictionary attacks (e.g. Hashcat rule attacks using social media info).

### 3. ⚡ Real-Time Entropy & Strength Metrics
- **Mathematical Bit Entropy**: Calculates Shannon & Diceware entropy bits in real time.
- **Crack Time Estimator**: Displays estimated brute-force duration at 100 billion guesses/sec.
- **Memorability Score**: Evaluates cognitive human load (Very High, High, Medium, Low) with structure breakdown.

### 4. 🎨 Sleek Glassmorphic & Symmetrical Design
- **Responsive Layout**: Aligned grid system (`max-w-7xl`) across Header, Main Content, and Footer.
- **In-Memory Session History**: View recent generated and checked passwords in a side drawer (cleared automatically on page refresh).
- **Batch Generator**: Generate up to 6 custom passwords simultaneously with one click.

---

## 🚀 Quick Start & Local Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ningappa889/simple_passwd_gen.git
   cd simple_passwd_gen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` (or `http://localhost:5173`).

---

## 📜 Available Scripts

- **`npm run dev`**: Launch Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Build optimized production bundle to `dist/`.
- **`npm run preview`**: Preview production build locally.

---

## 🔐 Security & Privacy Commitment

1. **100% Client-Side Execution**: All cryptography occurs strictly within your browser's local JavaScript engine.
2. **Zero Server Dependency**: No API calls, no databases, no tracking, and no external requests.
3. **Zero Persistence**: Passwords are never saved to `LocalStorage`, `Cookies`, or disk.

---

## 📄 License & Credits

Distributed under the [MIT License](LICENSE). Created with ❤️ by [Ningappa](https://github.com/ningappa889).
