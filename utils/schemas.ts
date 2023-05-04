import { z } from "zod";

export const credentialsSchema = z.object({
	password: z.string().min(3).max(24),
	email: z.string().min(3).max(64).email(),
});


export const messageSchema = z.object({
	message: z.string().min(1).max(512),
});