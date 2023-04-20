# Maker finder

An application that helps to find people with specific skills for your project.

## Getting Started

Create `.env` file in root folder and fill it with variables:

```
DATABASE_URL=
GITHUB_SECRET=
GITHUB_ID=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Install all dependencies:

```bash
yarn
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run postgres:

```bash
yarn postgres
```

Run Next dev server:

```bash
yarn dev
```

## Technologies

- Next.js
- TypeScript
- Prisma
- NextAuth
- Tailwind
- Swr
