# <p align="center"><img src="https://img.shields.io/badge/Hiram-Student--to--Student%20Item%20Sharing-800000?style=for-the-badge" alt="Hiram Logo" /><br/><br/>🔄 Hiram — Monorepo</p>

<p align="center">
  <a href="https://github.com/TombstonePUP/hiram">
    <img src="https://img.shields.io/badge/Platform-Web%20%7C%20Android-800000?style=flat-square&logo=react" alt="Platforms" />
  </a>
  <img src="https://img.shields.io/badge/PUP-Iskolar--Powered-FFD700?style=flat-square&labelColor=800000&logoColor=white" alt="PUP Powered" />
  <img src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen?style=flat-square" alt="Maintained" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

---

## 📌 Project Overview

**Hiram** is a student-powered item sharing and trading platform built specifically for the **Polytechnic University of the Philippines (PUP)**. Designed as a campus-based micro-economy, the platform empowers students (_Iskos_ and _Iskas_) to lend, borrow, and trade academic, creative, and everyday tools (such as calculators, review books, tripods, draft boards, etc.) securely and efficiently.

### 🎯 Key Objectives

- **Verification:** Restricted strictly to verified PUP students via their official university email (`@iskolar.pup.edu.ph`).
- **Micro-Economy:** Reduce student expenses by encouraging a local sharing culture.
- **Accessibility:** Available on both modern Web browsers and Android mobile devices.

---

## 🛠️ Monorepo Architecture

Hiram uses a highly structured monorepo pattern that enables fast development, shared schema validation, and synchronized types.

```
/hiram
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

| Layer       | Primary Tech                                  | Role                                          |
| :---------- | :-------------------------------------------- | :-------------------------------------------- |
| **Backend** | Node.js, Express, Prisma ORM, MySQL           | Core REST API, socket server, db transactions |
| **Web**     | React 18, Vite, React Router v6, Tailwind CSS | High-fidelity, responsive web application     |
| **Mobile**  | React Native, Expo, NativeWind                | Android-first cross-platform native app       |
| **Shared**  | TypeScript, Zod                               | Source of truth for types, constants, schemas |

---

## 🚀 Core Features (MVP)

- **🔐 Academic Auth:** Single sign-on verification using official Studentemail domains.
- **📦 Item Listings:** Complete CRUD capabilities for sharing tools with description, category, and condition tracking.
- **🤝 Request Flow:** Send, accept, or decline borrow and trade requests with integrated return calendar schedules.
- **💬 Real-Time Chat:** Immediate peer-to-peer message exchanges directly tied to active item transactions.
- **⭐ Community Ratings:** Post-transaction star-rating system to maintain safety and trust on campus.

---

## ⚙️ Quick Start & Installation

### 1. Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js 20 LTS**
- **Docker & Docker Compose** (for PostgreSQL database) — OR PostgreSQL 16+ installed locally
- **Git**

### 2. Setup Repository

```bash
# Clone the repository
git clone https://github.com/TombstonePUP/hiram.git
cd hiram

# Install workspaces dependencies
npm install
```

### 3. Environment Variables Setup

Configure your environment keys before starting the server.

- Create `backend/.env` based on `backend/.env.example`:

  ```env
  PORT=4000
  NODE_ENV=development
  # PostgreSQL database URL (adjust credentials based on your setup)
  DATABASE_URL="postgresql://laravel:secret@localhost:5432/hiram?schema=public"
  JWT_SECRET=9b714c732651338ba25adfa4127a81b10a629d11b00d762ed5ecaff52a3e7a90
  JWT_EXPIRES_IN=7d
  CLIENT_URL=http://localhost:5173
  STORAGE_PROVIDER=local
  UPLOAD_DIR=uploads
  MAX_FILE_SIZE=5242880
  ```

  **Note:** If using Docker Compose, credentials are `laravel:secret`. If using local PostgreSQL with default setup, adjust accordingly.

  Generate a strong `JWT_SECRET` (do NOT commit it). Example commands:

  ```bash
  # Node
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

  # OpenSSL
  openssl rand -hex 32
  ```

- Set web and mobile variables:
  - For Web (`/web/.env`): `VITE_API_URL=http://localhost:4000/api/v1`
  - For Mobile (`/mobile/.env`): `EXPO_PUBLIC_API_URL=http://localhost:4000/api/v1`

### 4. Database Setup & Migrations

#### Option A: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL container in background
docker-compose up -d

# Create the hiram database
docker exec hiram-postgres psql -U laravel -d postgres -c "CREATE DATABASE hiram;"

# Run migrations and seed
cd backend
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

#### Option B: Using Local PostgreSQL

```bash
# Ensure PostgreSQL 16+ is running on localhost:5432
# Create the hiram database and user, then update DATABASE_URL in backend/.env

cd backend
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

**Notes:**

- The seed script uses `ts-node prisma/seed.ts` and will connect to `DATABASE_URL` defined in `backend/.env`
- Ensure your PostgreSQL server is running before running migrations/seed
- Seed data (`backend/prisma/seed.ts`) upserts mock users and items from `@hiram/shared`
- Docker container name: `hiram-postgres`, exposed on port `5432`

Uploads & Avatars:

- Local uploads are stored under `backend/uploads` and served at `/uploads` by the backend. The upload endpoint returns absolute URLs (e.g. `http://localhost:4000/uploads/<file>`). Ensure `web/.env` `VITE_API_URL` points to your backend (`http://localhost:4000/api/v1`) so the frontend can resolve avatar URLs correctly.

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

To keep the PUP micro-economy safe, Hiram implements the following measures:

- **Helmet.js:** Enforced secure HTTP headers.
- **CORS Limits:** Restricted strictly to trusted origins.
- **Rate Limiting:** Enforced on login/register routes to prevent brute-force attacks.
- **Strict Validation:** Request validation powered globally by shared **Zod** models.
- **Secure Hashing:** Password data protected with **bcrypt** (salt rounds ≥ 12).

---

## 🤝 Contributing Guidelines

We follow a clean, standardized development lifecycle:

1. **Branching:** Never push directly to `main`. Create feature branches (`feat/feature-name`, `fix/bug-name`).
2. **Conventional Commits:** Style commit logs to maintain clear history:
   - `feat: add ratings filter to items query`
   - `fix: handle expired jwt session gracefully`
   - `docs: update onboarding steps`
3. **Code Quality:** Ensure all new code matches the shared ESLint configurations and TypeScript guidelines.

---

<p align="center">
  <i>Developed for the Hiram Hackathon MVP — May 2026. Made with ❤️ by Iskos and Iskas.</i>
</p>
