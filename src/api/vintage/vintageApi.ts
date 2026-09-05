import { api } from "@/api/api";
import { toApiError } from "@/api/errorHandler";
import { apiResponse } from "@/types/apiResponse";
import { ReqCreateVintageType } from "@/types/vintage/reqCreateVintage";
import { validateImages } from "@/utils/imageUpload";

// vintage 샵 등록 req
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
  // 한도를 넘는 요청은 보내기 전에 막는다.
  // 안 그러면 100MB를 다 올린 뒤에야 Nginx/서버에게 거절당한다.
  const imageError = validateImages(reqType.images);
  if (imageError) {
    return { code: 413, success: false, msg: imageError };
  }

  try {
    const formData = buildVintageFormData(reqType);

    const response = await api.post(`/api/v1/vintages`, formData);
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error) {
    return toApiError(error);
  }
};

// 빈티지 샵 리스트 조회
export const getVintageList = async (): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/vintages`);
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
      data: response.data.data,
    };
  } catch (error) {
    return toApiError(error);
  }
};

// // 빈티지 샵 상세 조회
export const getVintageDetail = async (
  vintageId: number
): Promise<apiResponse> => {
  try {
    const response = await api.get(`/api/v1/vintages/${vintageId}`);
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
      data: response.data.data,
    };
  } catch (error) {
    return toApiError(error);
  }
};

// vintage 샵 삭제
export const deleteVintage = async (
  vintageId: number
): Promise<apiResponse> => {
  try {
    const response = await api.delete(`/api/v1/vintages/${vintageId}`);
    return {
      code: response.data.code,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error) {
    return toApiError(error);
  }
};
