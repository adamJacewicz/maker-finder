# Maker finder

An application that helps to find people with specific skills for your project.

## Screenshots
![screenshot-localhost_3000-2023 04 20-20_23_53](https://user-images.githubusercontent.com/35642115/233459086-5f68f16a-1bbf-47d0-a502-7e47683f9c5d.png)
![screenshot-localhost_3000-2023 04 20-20_25_52](https://user-images.githubusercontent.com/35642115/233459101-6dec4eeb-1a59-4662-a06c-39cb2d9acd92.png)
![screenshot-localhost_3000-2023 04 20-20_42_05](https://user-images.githubusercontent.com/35642115/233459112-25dee340-ab08-43bd-af6f-840a26fe7d60.png)

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
