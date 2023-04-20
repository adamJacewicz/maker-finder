export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string
			GITHUB_SECRET: string
			GITHUB_ID: string
			NEXTAUTH_URL: string
			NEXTAUTH_SECRET: string
		}
	}
}