import { Resend } from 'resend';
import { env } from './env';

// ============================================================
// Email Client Configuration (Resend)
// ============================================================

export const resend = new Resend(env.RESEND_API_KEY);
export const FROM_EMAIL = env.FROM_EMAIL;
