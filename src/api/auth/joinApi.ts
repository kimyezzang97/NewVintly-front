import { api } from "@/api/api";
import axios from "axios";
import { ReqJoinType } from "@/types/auth/reqJoinType";
import { apiResponse } from "@/types/apiResponse";

// nickname 중복 조회
export const getCheckNickname = async (
  nickname: string
): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/members/nickname/${nickname}`);
    console.log('response : ', response)
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status; // error.response.data

      if (statusCode === 403) {
        return {
          code: statusCode,
          success: false,
          msg: "닉네임을 규칙에 맞게 입력해주세요.",
        };
      }
    }
    // 모든 예외에 대한 기본 return
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};

// email 중복 조회
export const getCheckEmail = async (email: string): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/members/email/${email}`);

    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 403) {
        return {
          code: statusCode,
          success: false,
          msg: "이메일을 규칙에 맞게 입력해주세요.",
        };
      }
    }
    // 모든 예외에 대한 기본 return
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};

// 회원가입 API
export const postJoin = async (
  reqJoinType: ReqJoinType
): Promise<apiResponse> => {
  try {
    const response = await api.post(`/api/v1/members/join`, reqJoinType);
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 403) {
        return {
          code: statusCode,
          success: false,
          msg: "각 항목을 규칙에 맞게 입력해주세요.",
        };
      }

      // 모든 예외에 대한 기본 return
    }
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};
