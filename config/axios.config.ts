"use client";

import axios, { AxiosInstance } from "axios";

import { environment } from "@/environment/environment";

const api: AxiosInstance = axios.create({
  baseURL: environment.baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token: string = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("JWToken="))
      .split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
