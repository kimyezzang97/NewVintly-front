import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  headers: {
    //"Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 쿠키 허용 (refresh token 자동 포함)
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // 저장 위치는 프로젝트에 맞게(localStorage, sessionStorage, pinia 등)
    if (token) {
      config.headers.Access = `${token}`; // Bearer 
    }
    return config;
  },
  (error) => Promise.reject(error)
);