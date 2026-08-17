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

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ningappa889/simple_passwd_gen.git
cd simple_passwd_gen