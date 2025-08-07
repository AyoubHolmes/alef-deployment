# Database Setup Guide

This guide explains how to set up PostgreSQL database for the dynamic content system.

## Prerequisites

- Node.js installed (v18+ recommended)
- PostgreSQL installed locally or access to a PostgreSQL database

## Database Options

### Option 1: Local PostgreSQL Installation

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a new database:
```bash
psql -U postgres
CREATE DATABASE association_alef;
\q
```

### Option 2: Using Docker

Run PostgreSQL in a Docker container:
```bash
docker run --name postgres-alef \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=association_alef \
  -p 5432:5432 \
  -d postgres:15
```

### Option 3: Cloud Database Services

You can use cloud services like:
- Supabase (https://supabase.com)
- Neon (https://neon.tech)
- Railway (https://railway.app)
- Render (https://render.com)

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update the DATABASE_URL in your `.env` file:
```
DATABASE_URL="postgresql://username:password@localhost:5432/association_alef?schema=public"
```

Replace:
- `username`: Your PostgreSQL username (default: postgres)
- `password`: Your PostgreSQL password
- `localhost:5432`: Your database host and port
- `association_alef`: Your database name

## Database Setup

1. Run database migrations to create tables:
```bash
npm run db:migrate
```

2. Seed the database with sample data:
```bash
npm run db:seed
```

Or run both commands at once:
```bash
npm run db:setup
```

## Available Scripts

- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with sample data
- `npm run db:studio` - Open Prisma Studio to view/edit data
- `npm run db:setup` - Run migrations and seed in one command

## API Endpoints

The following API endpoints are now available:

### Art Exhibitions
- `GET /api/art-exhibitions` - Get all exhibitions
- `GET /api/art-exhibitions?status=CURRENT` - Filter by status (CURRENT, UPCOMING, PAST)
- `POST /api/art-exhibitions` - Create new exhibition

### Education Articles
- `GET /api/education` - Get all education articles
- `POST /api/education` - Create new education article

### Educational Activities
- `GET /api/educational-activities` - Get all categories and workshops
- `GET /api/educational-activities?type=categories` - Get only categories
- `GET /api/educational-activities?type=workshops` - Get only workshops
- `POST /api/educational-activities` - Create new category or workshop

### Literary Gatherings
- `GET /api/literary-gatherings` - Get all events
- `GET /api/literary-gatherings?status=UPCOMING` - Filter by status (UPCOMING, PAST, CANCELLED)
- `POST /api/literary-gatherings` - Create new event

### Literary Thought Articles
- `GET /api/literary-thought` - Get all literary thought articles
- `POST /api/literary-thought` - Create new article

### Visual Arts Articles
- `GET /api/visual-arts` - Get all visual arts articles
- `POST /api/visual-arts` - Create new article

## Database Schema

The database includes the following tables:

- `art_exhibitions` - Art exhibition information
- `articles` - Articles for education, literary thought, and visual arts
- `workshop_categories` - Categories for educational workshops
- `workshops` - Educational workshop details
- `literary_events` - Literary gathering events

## Troubleshooting

### Connection Issues
If you get connection errors:
1. Ensure PostgreSQL is running
2. Check your DATABASE_URL is correct
3. Verify the database exists
4. Check firewall/network settings

### Migration Issues
If migrations fail:
1. Check database permissions
2. Ensure the database is empty for first migration
3. Run `npx prisma migrate reset` to reset (WARNING: This deletes all data)

### Viewing Data
Use Prisma Studio to view and edit data:
```bash
npm run db:studio
```

This opens a web interface at http://localhost:5555

## Production Deployment

For production deployment:
1. Use a production database service
2. Set DATABASE_URL in your production environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Do NOT run seed in production (unless you want sample data)

## Support

For database-related issues:
- Check Prisma documentation: https://www.prisma.io/docs
- PostgreSQL documentation: https://www.postgresql.org/docs/