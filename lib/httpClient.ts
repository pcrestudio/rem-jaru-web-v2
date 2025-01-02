import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Your NestJS backend URL
  withCredentials: true,
});

// Optionally, intercept requests/responses:
httpClient.interceptors.request.use((config) => {
  // Could attach token automatically from localStorage if desired
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
