export interface apiResponse {
  code: number;
  success: boolean;
  msg: string;
  data?: any; // 선택적 프로퍼티
}
