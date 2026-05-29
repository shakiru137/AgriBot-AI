<div align="center">

# 🌾 AgriBot AI

### Intelligent Agriculture Assistant for African Smallholder Farmers

*Expert farming advice in English & Nigerian Pidgin — on web and smartwatch*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Teams & Responsibilities](#-teams--responsibilities)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Farming Categories](#-farming-categories)
- [Language Support](#-language-support)
- [Wearable Experience](#-wearable-experience)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

**AgriBot AI** is a multilingual, AI-powered agriculture assistant built specifically for African smallholder farmers. It delivers expert, practical farming advice through a conversational interface accessible on **web**, **mobile**, and **smartwatch** — making agricultural knowledge available to farmers who need it most, in the language they speak every day.

Powered by **Google Gemini AI**, AgriBot answers questions about crop management, pest control, soil health, weather adaptation, market prices, livestock, and post-harvest storage — in plain **English** or **Nigerian Pidgin (Naija)**.

> *"E good make every farmer get expert wey go guide am. Na so AgriBot take born."*

---

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Chat** — Real-time farming advice via Google Gemini
- 🌍 **Bilingual** — Full support for English and Nigerian Pidgin
- 📂 **Smart Category Detection** — Auto-detects farming topic from message
- 💬 **Multi-turn Conversations** — Context-aware chat history
- ⌚ **Smartwatch Interface** — Wearable-optimised farming assistant
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop

### Farmer Experience
- Voice-to-text input for farmers with limited typing ability
- Offline-friendly architecture for low-connectivity environments
- Simple, low-data UI optimised for rural network conditions
- Culturally relevant responses with local context

### Technical
- Rate-limited API to prevent abuse
- Secure environment variable management
- Modular prompt engineering system
- Comprehensive test coverage with mocked AI calls

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  Web App     │  │  Mobile App  │  │  Smartwatch   │  │
│  │  (Next.js)   │  │  (React)     │  │  (Wearable)   │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
└─────────┼─────────────────┼──────────────────┼──────────┘
          │                 │                  │
          └─────────────────┼──────────────────┘
                            │  HTTPS / REST API
┌───────────────────────────▼─────────────────────────────┐
│                    BACKEND LAYER                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │             Express.js Server                    │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │    │
│  │  │  Routes  │→ │Controllers│→ │   Services   │  │    │
│  │  └──────────┘  └──────────┘  └──────┬───────┘  │    │
│  │  Middleware: Helmet · CORS · Rate Limit · Auth  │    │
│  └──────────────────────────────────────┼──────────┘    │
└─────────────────────────────────────────┼───────────────┘
                                          │
┌─────────────────────────────────────────▼───────────────┐
│                    AI LAYER                              │
│              Google Gemini 1.5 Flash                     │
│     Prompt Engineering · Farming Categories              │
│     English & Pidgin System Prompts                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 14 + React 18 | Web application |
| Styling | TailwindCSS | Utility-first styling |
| Backend | Node.js + Express.js | REST API server |
| AI | Google Gemini 1.5 Flash | Language model |
| Testing | Jest + Supertest | Unit & integration tests |
| Security | Helmet + express-rate-limit | API hardening |
| Dev Tools | Nodemon + ESLint | Developer experience |

---

## 📁 Project Structure

```
agribot-ai/
│
├── frontend/                    # Next.js / React application
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # Reusable UI components
│   │   │   ├── chat/            # Chat interface components
│   │   │   ├── ui/              # Base UI primitives
│   │   │   └── wearable/        # Smartwatch UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilities and API client
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   └── tailwind.config.js
│
├── backend/                     # Node.js / Express API
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js           # Environment configuration
│   │   │   └── gemini.js        # Gemini AI client
│   │   ├── controllers/
│   │   │   ├── aiController.js
│   │   │   ├── farmingController.js
│   │   │   └── healthController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── validate.js
│   │   ├── routes/
│   │   │   ├── aiRoutes.js
│   │   │   ├── farmingRoutes.js
│   │   │   └── healthRoutes.js
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   ├── utils/
│   │   │   ├── farmingCategories.js
│   │   │   └── responseFormatter.js
│   │   ├── app.js
│   │   └── index.js
│   ├── tests/
│   │   ├── ai.test.js
│   │   ├── farming.test.js
│   │   └── health.test.js
│   └── .env.example
│
├── docs/                        # Project documentation
│   ├── api.md
│   ├── prompts.md
│   └── wireframes/
│
└── README.md
```

---

## 👥 Teams & Responsibilities

### 🎨 UI/UX Team
Responsible for the complete visual and interaction design of AgriBot.

**Scope:**
- Low-fidelity wireframes for all screens
- Wearable (smartwatch) experience design
- User flow and navigation mapping
- Typography and color system
- Moodboard and design direction
- Smartwatch UI concepts

**Deliverables:** Wireframes · Moodboard · Design System · UI Direction

---

### ⚛️ Frontend Team
Builds the React/Next.js web and mobile interfaces.

**Scope:**
- Next.js project initialisation and configuration
- TailwindCSS setup and custom theme
- Reusable component library
- Routing and page layout
- Smartwatch UI integration
- API integration with backend

**Deliverables:** Frontend Architecture · Initial Screens · Component Library

---

### ⚙️ Backend Team
Builds and maintains the Express.js REST API.

**Scope:**
- Node.js/Express server setup
- REST API architecture and routing
- Gemini AI integration and service layer
- Environment and security configuration
- Rate limiting and request validation
- Error handling and logging

**Deliverables:** API Server · Gemini Integration · Backend Architecture

---

### 🤖 AI Team
Designs and engineers the AI behaviour of AgriBot.

**Scope:**
- Agriculture prompt research and engineering
- Farming category taxonomy
- Conversation flow design
- Pidgin language prompt tuning
- AI response quality evaluation
- System prompt iteration

**Deliverables:** Prompt Architecture · Farming Categories · AI Behaviour Spec

---

### ✍️ Content Team
Crafts the product narrative, branding, and demo story.

**Scope:**
- Product storytelling and description
- Branding direction and tone of voice
- Demo scenario definition
- In-app copy and microcopy
- Documentation writing

**Deliverables:** Product Narrative · Demo Concept · Brand Guide

---

### 🔍 QA Team
Ensures quality and reliability across the entire product.

**Scope:**
- Testing strategy and checklist
- Bug reporting and issue tracking system
- API endpoint testing
- UI/UX review
- AI response quality checks
- Cross-device and cross-browser testing

**Deliverables:** QA Framework · Bug Report Template · Test Coverage Report

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key → [Get one here](https://ai.google.dev)

### 1. Clone the repository

```bash
git clone https://github.com/your-org/agribot-ai.git
cd agribot-ai
```

### 2. Set up the Backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and add your GEMINI_API_KEY
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

### Health Endpoints

```http
GET /health
```
Returns server status and uptime.

```http
GET /health/gemini
```
Tests live Gemini API connection.

---

### AI Endpoints

#### Chat with AgriBot
```http
POST /ai/chat
```

**Request body:**
```json
{
  "message": "When should I plant maize?",
  "language": "english",
  "category": "crop_management",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "model", "content": "Hello! How can I help you?" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "AI response generated",
  "data": {
    "reply": "Maize grows best when planted at the onset of the rainy season...",
    "language": "english",
    "category": "crop_management",
    "tokensUsed": 120
  }
}
```

#### Detect Farming Category
```http
POST /ai/detect-category
```

**Request body:**
```json
{ "message": "There are insects on my tomato leaves" }
```

**Response:**
```json
{
  "success": true,
  "data": { "category": "pest_control" }
}
```

---

### Farming Endpoints

```http
GET /farming/categories
```
Returns all farming categories with example questions.

```http
GET /farming/categories/:id
```
Returns a single category. Valid IDs: `crop_management`, `pest_control`, `soil_health`, `weather_adaptation`, `market_finance`, `livestock`, `storage_processing`.

---

## 🌾 Farming Categories

| Category | Description |
|----------|-------------|
| `crop_management` | Planting schedules, seed selection, irrigation, harvesting |
| `pest_control` | Identifying pests, diseases, weeds and safe treatment |
| `soil_health` | Soil testing, fertiliser, compost, nutrient management |
| `weather_adaptation` | Seasonal planning, drought resistance, flood management |
| `market_finance` | Selling produce, pricing, cooperatives, agri-loans |
| `livestock` | Animal husbandry, feeding, disease prevention, breeding |
| `storage_processing` | Post-harvest loss reduction, storage, value addition |

---

## 🌍 Language Support

AgriBot responds in two languages:

**English** — Clear, jargon-free agricultural English suited to farmers without formal education.

**Nigerian Pidgin (Naija)** — Warm, conversational Pidgin that feels like advice from a knowledgeable neighbour.

*Pidgin example:*
> *"E good make you add compost to your soil before you plant. Your crop go grow well-well and yield go be better pass before."*

Set the `language` field in your API request to `"english"` or `"pidgin"`.

---

## ⌚ Wearable Experience

AgriBot is designed to work on **smartwatches**, giving farmers hands-free access to farming advice in the field.

**Wearable design principles:**
- Maximum 2–3 lines of text per screen
- Large, readable typography
- Single-tap navigation
- Voice input support
- Glanceable response cards
- Works with dirty or gloved hands

---

## 🔄 Development Workflow

### Branch Strategy
```
main          → production-ready code
develop       → integration branch
feature/*     → individual features
fix/*         → bug fixes
```

### Commit Convention
```
feat: add pidgin language support
fix: correct maize planting response
docs: update API reference
test: add farming category tests
chore: update dependencies
```

### Sprint Cadence
- Sprint duration: 3–4 days
- Sprint review: Every Friday
- Each team presents: completions · demos · blockers · next goals

---

## 🧪 Testing

Tests use **Jest** + **Supertest**. Gemini is mocked — no API key needed.

```bash
cd backend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

**Test coverage targets:**
- Controllers: 90%+
- Services: 85%+
- Middleware: 95%+

---

## ⚙️ Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Gemini AI (required)
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-1.5-flash

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request to `develop`

Please follow the commit convention and ensure all tests pass before submitting.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ for African farmers

*"Every farmer deserves expert guidance."*

</div>
