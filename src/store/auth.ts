// store/auth.ts
import { defineStore } from "pinia";

interface AuthState {
  access: string | null;
  memberId: number | null;
  nickname: string | null;
}

// 로그인 응답 본문으로 서버가 내려주는 값 (LoginFilter.successfulAuthentication)
export interface AuthProfile {
  memberId: number;
  nickname: string;
}

const ACCESS_KEY = "access";
const PROFILE_KEY = "authProfile";

/**
 * access 토큰에서 role을 꺼낸다.
 *
 * 로그인 응답 본문에도 role이 있지만, 토큰을 진실의 원천으로 삼는다.
 * 재발급(reissue)으로 토큰이 바뀌어도 항상 최신 값이 따라오고,
 * 저장된 프로필이 없거나 깨져도 로그인 상태만 있으면 판정할 수 있기 때문이다.
 */
const readRole = (token: string | null): string | null => {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    // JWT는 base64url이라 base64로 바꿔서 디코딩한다
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const role = JSON.parse(json)?.role;
    return typeof role === "string" ? role : null;
  } catch {
    return null; // 형식이 깨진 토큰은 권한 없음으로 취급
  }
};

const readProfile = (): AuthProfile | null => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as AuthProfile) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    const profile = readProfile();
    return {
      access: localStorage.getItem(ACCESS_KEY) || null, // localStorage와 연동됨
      memberId: profile?.memberId ?? null,
      nickname: profile?.nickname ?? null,
    };
  },
  actions: {
    // profile은 로그인할 때만 넘어온다. 재발급은 토큰만 갱신하므로 생략된다.
    login(token: string, profile?: AuthProfile) {
      this.access = token;
      localStorage.setItem(ACCESS_KEY, token);

      if (profile) {
        this.memberId = profile.memberId;
        this.nickname = profile.nickname;
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      }
    },
    logout() {
      this.access = null;
      this.memberId = null;
      this.nickname = null;
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(PROFILE_KEY);
    },
  },
  getters: {
    // 인증 상태 확인
    isAuthenticated: (state): boolean => !!state.access,
    role: (state): string | null => readRole(state.access),
    isAdmin: (state): boolean => readRole(state.access) === "ROLE_ADMIN",
  },
});
