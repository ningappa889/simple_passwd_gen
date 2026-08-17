# 🔐 SmartPass — Password & Passphrase Generator

SmartPass is a simple, secure, and privacy-focused password generator and security checker.

It generates strong passwords and memorable passphrases directly in your browser using the native Web Crypto API. **No passwords are sent to a server, stored in a database, or uploaded anywhere.**

---

## ✨ Features

- 🔒 **Cryptographically Secure Password Generator**
  - Uses `crypto.getRandomValues()` for secure random generation.
  - Supports strong passwords with customizable character sets.

- 🧠 **Memorable Passphrase Generator**
  - Generates easy-to-remember passphrases such as:
    `Orbit-Mango7!River-Cactus`

- 🎯 **Personal Information / OSINT Check**
  - Detects whether a generated or entered password contains personal information such as:
    - Name
    - Birth year
    - Other user-provided personal data

- 📊 **Real-Time Password Strength**
  - Entropy estimation
  - Estimated crack time
  - Password strength level
  - Memorability score

- 📑 **Password History**
  - Keeps recently generated passwords available during the current session.

- ⚡ **Batch Generator**
  - Generate up to 6 passwords at once.

- 🛡️ **100% Client-Side**
  - No backend required.
  - No API calls.
  - No database.
  - No password tracking.

---

## 🛠️ Built With

*(💡 Tip: Hold **Ctrl** / **Cmd** or **middle-click** any link below to open it in a new tab on GitHub)*

- <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
- <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
- <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer">Web Crypto API</a>
- <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide Icons</a>

---

## 📅 Project Timeline & Version History

- **v2.5 (Current Release — August 2026)**
  - Integrated Targeted OSINT Personal Metadata Vulnerability Audit (Name & Birth Year detection with l33t-speak normalization).
  - Redesigned professional glassmorphic Header and aligned full-width page layout.
- **v2.0**
  - Added Memorable Diceware Passphrase engine and Account-Specific Policy Presets (Banking, GitHub, Google, UPI, Wi-Fi, etc.).
- **v1.5**
  - Implemented Real-Time Shannon & Diceware Entropy Bit Calculator, Crack Time Estimator, and Session History Drawer.
- **v1.0**
  - Initial Release — 100% Client-Side Web Cryptographic Password Engine.

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ningappa889/simple_passwd_gen.git
cd simple_passwd_gen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in your browser.

---

## 📜 Available Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server |
| `npm run build` | Builds production bundle |
| `npm run preview` | Previews compiled production build |

---

## 📄 License

This project is licensed under the <a href="https://github.com/ningappa889/simple_passwd_gen/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>. Created by <a href="https://github.com/ningappa889" target="_blank" rel="noopener noreferrer">Ningappa</a>.