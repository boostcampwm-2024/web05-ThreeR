import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export const axiosInstance = axios.create({
  baseURL: "https://api.denamu.shop",
  timeout: 10000,
});
