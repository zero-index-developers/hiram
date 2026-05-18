# <p align="center"><img src="https://img.shields.io/badge/UniShare-Student--to--Student%20Item%20Sharing-800000?style=for-the-badge" alt="UniShare Logo" /><br/><br/>🔄 UniShare — Monorepo</p>

<p align="center">
  <a href="https://github.com/TombstonePUP/u_share_web">
    <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Android-800000?style=flat-square&logo=react" alt="Platforms" />
  </a>
  <img src="https://img.shields.io/badge/PUP-Iskolar--Powered-FFD700?style=flat-square&labelColor=800000&logoColor=white" alt="PUP Powered" />
  <img src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen?style=flat-square" alt="Maintained" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

---

## 📌 Project Overview

**UniShare** is a student-powered item sharing and trading platform built specifically for the **Polytechnic University of the Philippines (PUP)**. Designed as a campus-based micro-economy, the platform empowers students (*Iskos* and *Iskas*) to lend, borrow, and trade academic, creative, and everyday tools (such as calculators, review books, tripods, draft boards, etc.) securely and efficiently.

### 🎯 Key Objectives
* **Verification:** Restricted strictly to verified PUP students via their official university email (`@iskolar.pup.edu.ph`).
* **Micro-Economy:** Reduce student expenses by encouraging a local sharing culture.
* **Accessibility:** Available on both modern Web browsers and Android mobile devices.

---

## 🛠️ Monorepo Architecture

UniShare uses a highly structured monorepo pattern that enables fast development, shared schema validation, and synchronized types.

```
/unishare
├── 📂 backend          # Node.js + Express + Prisma REST API + Socket.io
├── 📂 web              # React + Vite frontend web client
├── 📂 mobile           # React Native + Expo (Android / iOS)
├── 📂 shared           # Shared TypeScript types, Zod schemas, and utilities
├── 📄 package.json      # Monorepo workspaces config
├── 📄 turbo.json        # Turborepo task pipeline execution (optional)
└── 📂 docs              # Documentation & context assets
```

### Flow & Data Distribution

```mermaid
graph TD
    subgraph Client Apps
        W[React + Vite Web App]
        M[React Native + Expo App]
    end

    subgraph Common
        S[Shared Types & Schemas]
    end

    subgraph Service Layer
        B[Node.js + Express API Server]
        SO[Socket.io Real-time Server]
    end

    subgraph Storage & Infrastructure
        DB[(Prisma + MySQL Database)]
        S3[(AWS S3 Bucket)]
    end

    W -.->|Uses schemas/types| S
    M -.->|Uses schemas/types| S
    W <-->|REST / Socket.io| B
    M <-->|REST / Socket.io| B
    B <-->|Socket.io events| SO
    B <-->|ORM Queries| DB
    B <-->|Image Uploads| S3
```

---

## 💻 Tech Stack

### Monorepo Overview

| Layer | Primary Tech | Role |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express, Prisma ORM, MySQL | Core REST API, socket server, db transactions |
| **Web** | React 18, Vite, React Router v6, Tailwind CSS | High-fidelity, responsive web application |
| **Mobile** | React Native, Expo, NativeWind | Android-first cross-platform native app |
| **Shared** | TypeScript, Zod | Source of truth for types, constants, schemas |

---

## 🚀 Core Features (MVP)

* **🔐 Academic Auth:** Single sign-on verification using official PUP student email domains.
* **📦 Item Listings:** Complete CRUD capabilities for sharing tools with description, category, and condition tracking.
* **🤝 Request Flow:** Send, accept, or decline borrow and trade requests with integrated return calendar schedules.
* **💬 Real-Time Chat:** Immediate peer-to-peer message exchanges directly tied to active item transactions.
* **⭐ Community Ratings:** Post-transaction star-rating system to maintain safety and trust on campus.

---

## ⚙️ Quick Start & Installation

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* **Node.js 20 LTS**
* **MySQL** (or preferred relational database server)
* **Git**

### 2. Setup Repository
```bash
# Clone the repository
git clone https://github.com/TombstonePUP/u_share_web.git
cd u_share_web

# Install workspaces dependencies
npm install
```

### 3. Environment Variables Setup
Configure your environment keys before starting the server.

* Create `backend/.env` based on `backend/.env.example`:
  ```env
  PORT=4000
  NODE_ENV=development
  DATABASE_URL="mysql://user:password@localhost:3306/unishare"
  JWT_SECRET=your_super_secret_key
  JWT_EXPIRES_IN=7d
  CLIENT_URL=http://localhost:5173
  ```
* Set web and mobile variables:
  * For Web (`/web/.env`): `VITE_API_URL=http://localhost:4000/api/v1`
  * For Mobile (`/mobile/.env`): `EXPO_PUBLIC_API_URL=http://localhost:4000/api/v1`

### 4. Database Setup & Migrations
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed # Optional: seed sample student data
cd ..
```

### 5. Running the Application
You can run all components simultaneously or spin them up individually:

#### Run All (Recommended)
```bash
npm run dev
```

#### Run Specific Workspace
```bash
# Spin up Express Server (Backend)
npm run dev --workspace=backend

# Spin up Vite Server (Web UI)
npm run dev --workspace=web

# Spin up Expo Go (Mobile UI)
npm run dev --workspace=mobile
```

---

## 🛡️ Security Best Practices
To keep the PUP micro-economy safe, UniShare implements the following measures:
* **Helmet.js:** Enforced secure HTTP headers.
* **CORS Limits:** Restricted strictly to trusted origins.
* **Rate Limiting:** Enforced on login/register routes to prevent brute-force attacks.
* **Strict Validation:** Request validation powered globally by shared **Zod** models.
* **Secure Hashing:** Password data protected with **bcrypt** (salt rounds ≥ 12).

---

## 🤝 Contributing Guidelines

We follow a clean, standardized development lifecycle:
1. **Branching:** Never push directly to `main`. Create feature branches (`feat/feature-name`, `fix/bug-name`).
2. **Conventional Commits:** Style commit logs to maintain clear history:
   * `feat: add ratings filter to items query`
   * `fix: handle expired jwt session gracefully`
   * `docs: update onboarding steps`
3. **Code Quality:** Ensure all new code matches the shared ESLint configurations and TypeScript guidelines.

---

<p align="center">
  <i>Developed for the UniShare Hackathon MVP — May 2026. Made with ❤️ by Iskos and Iskas.</i>
</p>
