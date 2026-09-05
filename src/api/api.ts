import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import router from "@/router";
import { useAuthStore } from "@/store/auth";

export const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  headers: {
    //"Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // 쿠키 허용 (refresh token 자동 포함)
});

// 재발급 전용 인스턴스
// api를 그대로 쓰면 재발급 요청이 401일 때 응답 인터셉터가 자기 자신을 다시 호출한다.
const reissueClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  withCredentials: true, // refresh 토큰은 HttpOnly 쿠키라 이 옵션이 없으면 서버로 안 나간다
});

// 재발급으로 401을 해소할 수 없는 경로 (여기서 나는 401은 그대로 호출부에 돌려준다)
const NO_REISSUE_URLS = ["/login", "/logout", "/api/v1/auth/reissue"];

// 재시도 여부를 기록하기 위한 확장 타입
type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

let isReissuing = false;
// 재발급이 진행되는 동안 도착한 401 요청들이 결과를 기다리는 큐
let waitingQueue: ((token: string | null) => void)[] = [];

const flushQueue = (token: string | null) => {
  waitingQueue.forEach((notify) => notify(token));
  waitingQueue = [];
};

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

// 응답 인터셉터 - access 토큰 만료(401) 시 refresh 토큰으로 재발급 후 원 요청을 재시도한다.
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    // 401이 아니거나, 설정이 없거나, 이미 재시도한 요청이면 그대로 실패시킨다 (무한 재시도 방지)
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retried
    ) {
      return Promise.reject(error);
    }

    // 로그인 실패나 재발급 자체의 401은 재발급으로 풀리지 않는다
    const url = originalRequest.url ?? "";
    if (NO_REISSUE_URLS.some((path) => url.includes(path))) {
      return Promise.reject(error);
    }

    originalRequest._retried = true;

    // 이미 다른 요청이 재발급 중이면, 그 결과를 기다렸다가 새 토큰으로 재시도한다.
    // (동시에 여러 요청이 401을 받아도 재발급은 한 번만 호출된다 - RTR이라 중복 호출 시 토큰이 어긋난다)
    if (isReissuing) {
      return new Promise((resolve, reject) => {
        waitingQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          originalRequest.headers.Access = token;
          resolve(api(originalRequest));
        });
      });
    }

    isReissuing = true;
    try {
      // 서버는 새 access를 응답 헤더로, 새 refresh를 쿠키로 회전시켜 내려준다
      const response = await reissueClient.post("/api/v1/auth/reissue");
      const newAccessToken = response.headers["access"];

      if (!newAccessToken) {
        throw new Error("재발급 응답에 access 헤더가 없습니다.");
      }

      useAuthStore().login(newAccessToken); // pinia 상태와 localStorage 동시 갱신
      flushQueue(newAccessToken);

      originalRequest.headers.Access = newAccessToken;
      return await api(originalRequest);
    } catch (reissueError) {
      // refresh까지 만료/무효면 더 할 수 있는 게 없다. 만료된 토큰을 지워야
      // 다음 요청에 다시 붙어 나가지 않고, 화면도 로그인 상태로 남지 않는다.
      flushQueue(null);
      useAuthStore().logout();

      if (router.currentRoute.value.path !== "/auth/login") {
        router.push("/auth/login");
      }

      return Promise.reject(reissueError);
    } finally {
      isReissuing = false;
    }
  }
);
