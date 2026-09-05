import { api } from "@/api/api";
import { apiResponse } from "@/types/apiResponse";
import { ReqLoginType } from "@/types/auth/reqLoginType";
import axios from "axios";

import { useAuthStore } from "@/store/auth";

// login
export const postLogin = async (
  reqLoginType: ReqLoginType
): Promise<apiResponse> => {
  // 스토어는 반드시 함수 안에서 꺼낸다.
  // 모듈 최상위에서 부르면 main.ts의 .use(pinia)보다 먼저 실행될 수 있고,
  // 그러면 "getActivePinia() was called but there was no active Pinia"로 앱이 죽는다.
  const authStore = useAuthStore();

  try {
    const response = await api.post(`/login`, reqLoginType);

    // refresh 쿠키 값 확인(httpOnly라서 JS는 안 보임) : 개발자 도구 application > cookies
    // Access Token 저장 (로컬 스토리지)
    const accessToken = response.headers["access"];

    // 토큰 없이 성공 처리하면 로그인된 것처럼 보이지만 모든 API가 401로 튕긴다
    if (!accessToken) {
      return {
        code: 500,
        success: false,
        msg: "로그인 응답에 토큰이 없습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    // 서버가 본문으로 내려주는 회원 정보 (LoginFilter.successfulAuthentication)
    const { memberId, nickname } = response.data ?? {};
    const profile =
      typeof memberId === "number" ? { memberId, nickname } : undefined;

    authStore.login(accessToken, profile);

    return {
      code: 200,
      success: true,
      msg: "로그인에 성공하였습니다.",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        return {
          code: statusCode,
          success: false,
          msg: "아이디가 없거나 비밀번호가 일치하지 않습니다.",
        };
      }
    }
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};
