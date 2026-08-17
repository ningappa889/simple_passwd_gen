# SmartPass — Password & Passphrase Generator

SmartPass is a simple, secure, 100% client-side password generator and security checker. Passwords are generated directly in your browser using secure browser cryptography (`crypto.getRandomValues()`). No passwords are ever sent to any server or saved to any database.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/ningappa889/simple_passwd_gen.git
cd simple_passwd_gen
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in your browser.

---

## ⭐ Features

- 🔒 **Cryptographic Generator**: Generates strong passwords and memorable passphrases (e.g. `Orbit-Mango7!River-Cactus`).
- 🎯 **OSINT Personal Data Check**: Detects if a password contains personal info like your name or birth year.
- 📊 **Real-Time Strength Meter**: Shows bit entropy, crack time estimation, and memorability score.
- 📑 **Session History & Batch Generator**: Quick history drawer and 6-password batch generator.
- 🛡️ **100% Private**: Zero server calls, zero tracking, zero disk storage.

---

## 🛠️ Built With

- <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
- <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
- <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer">Web Crypto API</a>
- <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide Icons</a>

---

## 📜 Available Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server |
| `npm run build` | Builds production bundle |
| `npm run preview` | Previews built app |

---

## 📄 License

This project is licensed under the <a href="https://github.com/ningappa889/simple_passwd_gen/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>. Created by <a href="https://github.com/ningappa889" target="_blank" rel="noopener noreferrer">Ningappa</a>.
