import type { CookieType } from "@/types";
import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

const cookieName: CookieType = 'accessToken';

export const api: AxiosInstance = axios.create({
  baseURL: String(process.env.BUN_PUBLIC_DRAGONBALL_URL),
  timeout: 10000
});

export const api2: AxiosInstance = axios.create({
  baseURL: String(process.env.BUN_PUBLIC_AUTH_URL),
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

api2.interceptors.request.use((config) => {
  const token = Cookies.get(cookieName);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api2.interceptors.response.use((response) => {
  return response;
}, (error) => {

  if (error.response?.status === 401) {
    Cookies.remove(cookieName);
  }

  if (error instanceof Error) {
    return Promise.reject(error);
  }
  return Promise.reject(new Error(String(error)));
});