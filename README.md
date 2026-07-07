# Fluxo

Fluxo is a modern workflow automation platform built with Next.js, Prisma, Better Auth, tRPC, Inngest, and Razorpay. The app combines authenticated dashboard pages, workflow management, background jobs, AI integrations, and payments into a single full-stack product.

## Overview

This repository contains the web application for Fluxo, including:

- Authentication and session management with Better Auth
- A dashboard for workflows, credentials, executions, and pricing
- Database access through Prisma with a PostgreSQL backend
- tRPC APIs for typed client/server communication
- Background job execution with Inngest
- Razorpay payment order creation and subscription billing flows
- AI-related integrations via OpenAI, Google Gemini, and Anthropic

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth
- tRPC
- Inngest
- Razorpay
- Tailwind CSS
- shadcn/ui and Radix UI primitives

## Key Features

- Email/password authentication
- Protected dashboard routes
- Workflow listing and workflow creation entry points
- Credentials and executions pages
- Subscription plans for Starter, Pro, and Business
- Razorpay order creation and payment tracking
- Inngest-powered job orchestration
- Server-side metadata, SEO, and app shell configuration

## Project Structure

- `app/` - Next.js App Router pages, layouts, and API routes
- `components/` - Reusable UI and feature components
- `config/` - App configuration such as pricing and payment setup
- `db/` - Prisma client setup
- `inngest/` - Event client and background functions
- `lib/` - Auth, Prisma, utility, and integration helpers
- `prisma/` - Schema and migration history
- `trpc/` - tRPC client, server, and routers

## Database Model

The Prisma schema currently defines these core entities:

- `User`
- `Session`
- `Account`
- `Verification`
- `Workflow`
- `Subscription`
- `Payment`
- `Invoice`
- `WebhookEvent`

## Environment Variables

Create a `.env` file in the project root and set the following values:

```env
DATABASE_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

Notes:

- `DATABASE_URL` is required by Prisma and the PostgreSQL adapter.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are used on the server.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is returned to the client when creating Razorpay orders.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`.

3. Generate the Prisma client:

```bash
npx prisma generate
```

4. Apply database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Biome
- `npm run inngest:dev` - Run the local Inngest dev server
- `npm run dev:all` - Start the full local multi-process setup with mprocs

## API Surfaces

The app includes these API routes and server entry points:

- `/api/auth/*` - Better Auth handler
- `/api/trpc/*` - tRPC endpoint
- `/api/inngest` - Inngest event runner
- `/api/razorpay/create-order` - Razorpay order creation endpoint
- `/api/test-session` - Session inspection route

## Deployment Notes

- The project uses a checked-in custom Prisma client output under `lib/generated/prisma`.
- The `postinstall` script runs `prisma generate`, which helps keep the generated client available in CI and on Vercel.
- Ensure all production environment variables are configured before deployment.

## License

No license file is currently included in the repository.
