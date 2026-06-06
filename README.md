# SnapCode

A minimal code snippet sharer with auto syntax highlighting. Snippets auto-expire after 7 days.

## Stack
- **Frontend:** React + Vite + Tailwind CSS + Monaco Editor
- **Backend:** Node.js + Express + MongoDB (Mongoose)

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your MONGO_URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

## Features
- Syntax highlighting for 10+ languages via Monaco Editor
- Short 8-char slug URLs (nanoid)
- Auto-expiry after 7 days (MongoDB TTL index)
- One-click copy to clipboard
