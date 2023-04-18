import { object, string, } from 'yup';

export const credentialsSchema = object({
	password: string().required().min(3).max(24),
	email: string().required().min(3).max(64).email(),
});