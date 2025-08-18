import axios, { type AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: String(import.meta.env.BUN_PUBLIC_DRAGONBALL_URL),
  timeout: 10000
});

export const api2: AxiosInstance = axios.create({
  baseURL: String(process.env.BUN_PUBLIC_AUTH_URL),
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});