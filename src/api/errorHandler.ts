import axios from "axios";
import { apiResponse } from "@/types/apiResponse";

const DEFAULT_MSG = "서버 오류가 발생했습니다. 잠시 후 이용해주세요.";

/**
 * 실패한 요청을 화면에 보여줄 apiResponse로 바꾼다.
 *
 * 기존에는 각 API가 상태 코드 몇 개만 따로 처리하고 나머지를 전부
 * "서버 오류가 발생했습니다"로 덮어써서, 실제 원인(용량 초과·인증 만료 등)이
 * 화면에도 콘솔에도 남지 않았다. 서버가 ApiResponse.msg로 사유를 내려주므로 그걸 우선 사용한다.
 */
export const toApiError = (
  error: unknown,
  fallbackMsg: string = DEFAULT_MSG
): apiResponse => {
  if (!axios.isAxiosError(error)) {
    return { code: 500, success: false, msg: fallbackMsg };
  }

  // 응답 자체가 없는 경우 - 네트워크 끊김, CORS 차단,
  // 업로드가 너무 커서 Nginx/톰캣이 커넥션을 끊어버린 경우가 여기 걸린다.
  if (!error.response) {
    return {
      code: 0,
      success: false,
      msg: "서버에 연결하지 못했습니다. 네트워크 상태를 확인해주세요.",
    };
  }

  const status = error.response.status;
  const data = error.response.data;

  // 백엔드가 내려준 ApiResponse면 서버 메시지를 그대로 보여준다
  if (data && typeof data === "object") {
    const body = data as Partial<apiResponse>;
    if (typeof body.msg === "string" && body.msg.length > 0) {
      return { code: body.code ?? status, success: false, msg: body.msg };
    }
  }

  // 여기부터는 백엔드까지 도달하지 못했거나 JSON이 아닌 응답이다.
  // 413은 Nginx의 client_max_body_size에 걸린 경우로, 본문이 HTML이라 msg가 없다.
  if (status === 413) {
    return {
      code: 413,
      success: false,
      msg: "이미지 용량이 너무 큽니다. 더 작은 이미지로 다시 시도해주세요.",
    };
  }

  if (status === 401) {
    return {
      code: 401,
      success: false,
      msg: "로그인이 필요합니다. 다시 로그인해주세요.",
    };
  }

  return { code: status, success: false, msg: fallbackMsg };
};
