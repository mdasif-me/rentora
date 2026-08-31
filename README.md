# Rentora

**Rentora** is a modern car rental platform built as a full-stack monorepo. Customers can discover, compare, and book vehicles, while admins manage the fleet, categories, leads, and business analytics — all powered by AI-assisted search and insights.

---

## ✨ Features

### Customer-Facing
- **Hero & Search** — Location, pickup/dropoff dates with calendar pickers
- **Popular Deals** — Tabbed vehicle listings by category with pagination
- **AI Vehicle Recommendations** — Natural-language search powered by Gemini AI
- **Booking Inquiries** — Lead submission with customer details and trip info
- **Testimonials & Info** — Customer reviews and rental process explanation

### Admin Dashboard
- **Dashboard Overview** — Earnings, leads, fleet stats, and interactive charts
- **Vehicle Management** — Full CRUD with image uploads via Supabase
- **Category Management** — CRUD with slug generation, ordering, and images
- **Leads Management** — View, approve, and reject rental inquiries
- **AI Admin Chat** — Natural-language queries about leads, earnings, and fleet

### Backend
- **NestJS API** — Versioned REST API with Swagger docs at `/api/docs`
- **Prisma ORM** — PostgreSQL database with full type safety
- **Supabase Storage** — Image uploads for vehicles and categories
- **Event Automation** — Event-driven workflows for lead lifecycle
- **Global Error Handling** — Standardized `{ success, data, timestamp }` responses

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **Animation** | Motion (Framer Motion) |
| **Backend** | NestJS 12, TypeScript 6 |
| **Database** | PostgreSQL (via Supabase) |
| **ORM** | Prisma 6 |
| **Storage** | Supabase |
| **AI** | Gemini API |
| **Package Manager** | pnpm 11 |
| **Testing** | Vitest |
| **Linting** | Oxlint |

---

## 📁 Project Structure

```
rentora/
├── apps/
│   ├── web/                    # Next.js frontend (@rentora/web)
│   │   ├── app/
│   │   │   ├── (home)/         # Public landing page
│   │   │   ├── search/         # Vehicle search results
│   │   │   ├── admin/          # Admin dashboard
│   │   │   └── layout.tsx      # Root layout
│   │   ├── components/
│   │   │   ├── container/      # Nav, footer, cards
│   │   │   ├── customer/       # Booking modal, vehicles grid
│   │   │   ├── motion/         # Animated UI primitives
│   │   │   └── ui/             # shadcn/ui components
│   │   └── lib/                # Utilities
│   │
│   └── ssr/                    # NestJS backend (@rentora/ssr)
│       ├── src/
│       │   ├── ai/             # Gemini AI integration
│       │   ├── automation/     # Event listeners
│       │   ├── categories/     # Category CRUD
│       │   ├── dashboard/      # Stats & analytics
│       │   ├── leads/          # Lead management
│       │   ├── vehicles/       # Vehicle CRUD
│       │   ├── prisma/         # Prisma service
│       │   ├── supabase/       # Supabase service
│       │   └── common/         # Filters, interceptors
│       └── prisma/
│           └── schema.prisma   # Database schema
│
└── packages/
    └── types/                  # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (latest LTS)
- pnpm 11+
- PostgreSQL database (or Supabase account)

### Installation

```bash
pnpm install
```

### Environment Variables

Create `.env` files in both apps:

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

**`apps/ssr/.env`**
```env
PORT=4000
AI_API_KEY=sk-...
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

### Database Setup

```bash
pnpm --filter @rentora/ssr prisma generate
pnpm --filter @rentora/ssr prisma migrate dev
```

### Run Development

```bash
pnpm dev
```

This starts both frontend and backend concurrently:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000/api/v1
- **Swagger Docs:** http://localhost:4000/api/docs
- **Admin Dashboard:** http://localhost:3000/admin

### Run Individually

```bash
# Frontend only
pnpm --filter @rentora/web dev

# Backend only
pnpm --filter @rentora/ssr start:dev
```

---

## 🏗 Build & Deploy

### Build

```bash
pnpm build
```

### Backend Start (Production)

```bash
pnpm --filter @rentora/ssr start:prod
```

### Deploy

- **Frontend:** Deploy `apps/web` to Vercel
- **Backend:** Deploy `apps/ssr` using `nest deploy` (AWS/Mau)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/vehicles` | List vehicles with filters |
| GET | `/api/v1/vehicles/:id` | Get vehicle by ID |
| POST | `/api/v1/vehicles` | Create vehicle |
| GET | `/api/v1/categories` | List categories |
| POST | `/api/v1/categories` | Create category |
| GET | `/api/v1/leads` | List leads |
| POST | `/api/v1/leads` | Create lead |
| PATCH | `/api/v1/leads/:id/status` | Update lead status |
| GET | `/api/v1/dashboard/stats` | Dashboard statistics |
| POST | `/api/v1/ai/recommend` | AI vehicle recommendations |
| POST | `/api/v1/ai/chat` | Admin AI chat |

Full API docs available at `/api/docs` when the backend is running.

---

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

---

## 📝 License

UNLICENSED — Private project
