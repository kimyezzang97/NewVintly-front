// store/auth.ts
import { defineStore } from "pinia";

interface AuthState {
  access: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    access: localStorage.getItem("access") || null, // localStorage와 연동됨
  }),
  actions: {
    login(token: string) {
      this.access = token;
      localStorage.setItem("access", token); // login 시 localStorage에 저장
    },
    logout() {
      this.access = null;
      localStorage.removeItem("access"); // logout 시 localStorage에서 제거
    },
  },
  getters: {
    // 인증 상태 확인
    isAuthenticated: (state): boolean => !!state.access,
  },
});
