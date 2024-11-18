import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.denamu.shop",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
