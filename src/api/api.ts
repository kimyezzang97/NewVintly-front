import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  withCredentials: true, // cookie나 token이 같이 전송 됨
  headers: {
    "Content-Type": "application/json",
  },
});
