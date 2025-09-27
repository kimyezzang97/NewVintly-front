import { api } from "@/api/api";
import axios from "axios";
import { apiResponse } from "@/types/apiResponse";
import { ReqCreateVintageType } from "@/types/vintage/reqCreateVintage";

const buildVintageFormData = (req: ReqCreateVintageType) => {
  const fd = new FormData();
  fd.append("name", req.name.trim());
  fd.append("state", req.state.trim());
  fd.append("district", req.district.trim());
  fd.append("detailAddr", req.detailAddr.trim());
  // 숫자/문자 어떤 타입이 와도 서버가 BigDecimal로 읽을 수 있게 문자열로 변환
  fd.append("lat", String(req.lat));
  fd.append("lon", String(req.lon));
  // images: File[]
  req.images.forEach((file) => fd.append("images", file));
  return fd;
};

// vintage 샵 등록
export const createVintage = async (
  reqType: ReqCreateVintageType
): Promise<apiResponse> => {
  try {
    const formData = buildVintageFormData(reqType);

    const response = await api.post(`/api/v1/vintages`, formData);
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

// 빈티지 샵 리스트 조회
export const getVintageList = async (
): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/vintages`);
    console.log('response : ', response)
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
      data: response.data.data
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