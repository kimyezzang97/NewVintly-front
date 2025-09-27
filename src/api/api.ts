import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  headers: {
    //"Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 쿠키 허용 (refresh token 자동 포함)
});
