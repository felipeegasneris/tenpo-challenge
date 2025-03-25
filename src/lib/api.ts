import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { TokenCache, CustomSession } from '@/types/auth';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});


const tokenCache: TokenCache = {
  token: null,
  expiresAt: null
};

const getToken = async (): Promise<string | null> => {
  if (tokenCache.token && tokenCache.expiresAt && new Date() < new Date(tokenCache.expiresAt)) {
    return tokenCache.token;
  }

  const session = await getSession() as CustomSession | null;
  if (session?.user?.id) {
    tokenCache.token = session.user.id;
    // Set expiration to 1 hour from now
    tokenCache.expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();
    return tokenCache.token;
  }

  return null;
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});


export default api;