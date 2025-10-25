import { api } from "@/api/api";
import axios from "axios";
import { apiResponse } from "@/types/apiResponse";

// vintage 샵 좋아요
export const createVintageLike = async (
  vintageId: number
): Promise<apiResponse> => {
  try {
    const response = await api.post(`/api/v1/vintages/${vintageId}/likes`);
    console.log('response : ', response)

    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status; // error.response.data
      console.log('statusCode :: ', statusCode)
      console.log(error)
    }

    // 모든 예외에 대한 기본 return
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};

// vintage 샵 좋아요 취소
export const deleteVintageLike = async (
  vintageId: number
): Promise<apiResponse> => {
  try {
    const response = await api.delete(`/api/v1/vintages/${vintageId}/likes`);
    console.log('response : ', response)

    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status; // error.response.data
      console.log('statusCode :: ', statusCode)
      console.log(error)
    }

    // 모든 예외에 대한 기본 return
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};

// vintage 샵 좋아요 조회
export const getVintageLike = async (
  vintageId: number
): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/vintages/${vintageId}/likes`);
    console.log('response : ', response)

    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status; // error.response.data
      console.log('statusCode :: ', statusCode)
      console.log(error)
    }

    // 모든 예외에 대한 기본 return
    return {
      code: 500,
      success: false,
      msg: "서버 오류가 발생했습니다. 잠시 후 이용해주세요.",
    };
  }
};