export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POSTGRES_USER: string
			POSTGRES_PASSWORD: string
			POSTGRES_DB: string
			POSTGRES_PORT: number
			DATABASE_URL: string
			GITHUB_SECRET: string
			GITHUB_ID: string
			NEXTAUTH_URL: string
			NEXTAUTH_SECRET: string
		}
	}
}