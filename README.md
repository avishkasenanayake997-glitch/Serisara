# Serisara 🌴

**Sri Lanka Tourism & Travel Platform**

A modern, production-ready web platform for discovering, exploring, and booking tourism experiences across Sri Lanka.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14+ (App Router), React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | Supabase PostgreSQL |
| Auth | Supabase Authentication |
| Payments | Stripe |
| Images | Cloudinary |
| Email | Resend |
| Maps | Leaflet + OpenStreetMap |

## Project Structure

```
serisara/
├── frontend/     # Next.js application
├── backend/      # Express API server
└── shared/       # Shared types, schemas, constants
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase account
- Stripe account
- Cloudinary account
- Resend account

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serisara
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```
   Fill in your actual credentials in both files.

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start them individually
   npm run dev:frontend   # http://localhost:3000
   npm run dev:backend    # http://localhost:5000
   ```

### API Health Check

```bash
curl http://localhost:5000/api/v1/health
```

## Development

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/v1
- **API Docs**: See `implementation-plan.md` for full API specification

## License

Private — All rights reserved.
