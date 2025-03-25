import { Session } from 'next-auth';
import { AxiosRequestConfig } from 'axios';

export interface TokenCache {
  token: string | null;
  expiresAt: string | null;
}

export interface CustomSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

export interface AuthenticatedRequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    [key: string]: string | undefined;
  };
}