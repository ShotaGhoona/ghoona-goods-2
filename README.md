# Ghoona Goods

A modern full-stack web application built with Next.js and FastAPI.

## Tech Stack

### Frontend
- **Framework**: Next.js (React) with TypeScript
- **UI Library**: shadcn/ui + Tailwind CSS
- **Authentication**: Clerk
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Clerk integration
- **Deployment**: Railway

## Project Structure

```
project-root/
├── backend/
│   ├── app/
│   │   ├── api/v1/
│   │   ├── cli/
│   │   ├── model/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── constants/
│   │   │   ├── display/
│   │   │   ├── modal/
│   │   │   └── ui/
│   │   ├── feature/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── services/
│   └── Dockerfile
├── supabase/
│   ├── insert-table/
│   └── insert-dummy-data/
├── docs/
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Quick Start with Docker

1. Clone the repository
2. Run the application using Docker Compose:

```bash
docker compose up --build
```

This will start:
- Frontend at http://localhost:3000
- Backend API at http://localhost:8000
- PostgreSQL database at localhost:5432

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLERK_WEBHOOK_SECRET=
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/ghoonagoods
SUPABASE_URL=
SUPABASE_KEY=
CLERK_SECRET_KEY=
JWT_SECRET_KEY=your-jwt-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 📱 **Responsive Design**: Mobile-first responsive design
- 🎨 **Modern UI**: Beautiful UI components with shadcn/ui
- 🚀 **Fast API**: High-performance backend with FastAPI
- 🐳 **Containerized**: Easy deployment with Docker
- 📊 **Database**: PostgreSQL with Supabase integration

## Color Scheme

- **Primary**: #f3a522
- **Secondary**: #322c2c
- **Background**: #f7f9fc
- **Foreground**: #404749

## API Documentation

When running the backend, visit http://localhost:8000/docs for interactive API documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
