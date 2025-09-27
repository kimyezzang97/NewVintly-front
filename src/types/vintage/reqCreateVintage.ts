export interface ReqCreateVintageType {
  name: string;
  state: string;
  district: string;

  detailAddr: string;
  lat: number;
  lon: number;
  images: File[];
}
