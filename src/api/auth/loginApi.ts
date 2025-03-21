import { api } from "@/api/api";
import { apiResponse } from "@/types/apiResponse";
import { ReqLoginType } from "@/types/auth/reqLoginType";
import axios from "axios";

// login
export const postLogin = async (
  reqLoginType: ReqLoginType
): Promise<apiResponse> => {
  try {
    const response = await api.post(`/login`, reqLoginType);

    // refresh 쿠키 값 확인(httpOnly라서 JS는 안 보임) : 개발자 도구 application > cookies
    // Access Token 저장 (로컬 스토리지)
    const accessToken = response.headers["access"];
    if (accessToken) localStorage.setItem("access", accessToken);

    return {
      status: "OK",
      msg: "로그인에 성공하였습니다.",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        return {
          status: "fail",
          msg: "아이디가 없거나 비밀번호가 일치하지 않습니다.",
        };
      }
    }
    return {
      status: "fail",
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};
