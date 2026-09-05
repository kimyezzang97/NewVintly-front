// 이미지 업로드 정책.
// 서버(application.yml의 spring.servlet.multipart)와 값을 맞춰야 한다.
// 여기서 먼저 걸러야 100MB짜리를 다 올려보낸 뒤에야 거절당하는 낭비를 막을 수 있다.

export const MIN_IMAGE_COUNT = 1;
export const MAX_IMAGE_COUNT = 10; // 서버 VintageRequest.CreateVintage 의 @Size(max = 10)
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 서버 max-file-size: 10MB
export const MAX_TOTAL_SIZE_BYTES = 100 * 1024 * 1024; // 서버 max-request-size: 100MB

const toMb = (bytes: number) => Math.round((bytes / (1024 * 1024)) * 10) / 10;

/**
 * 업로드 전 이미지 목록을 검사한다.
 * @returns 문제가 있으면 사용자에게 보여줄 메시지, 없으면 null
 */
export const validateImages = (files: File[]): string | null => {
  if (files.length < MIN_IMAGE_COUNT) {
    return "최소 한 장의 이미지를 업로드해주세요.";
  }

  if (files.length > MAX_IMAGE_COUNT) {
    return `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있습니다. (현재 ${files.length}장)`;
  }

  // 확장자가 없는 파일은 서버가 S3 키를 만들 때 깨지므로 여기서 막는다
  const notImage = files.find((file) => !file.type.startsWith("image/"));
  if (notImage) {
    return `이미지 파일만 업로드할 수 있습니다. (${notImage.name})`;
  }

  const tooLarge = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);
  if (tooLarge) {
    return `'${tooLarge.name}'의 용량이 ${toMb(tooLarge.size)}MB입니다. 장당 ${toMb(MAX_FILE_SIZE_BYTES)}MB 이하로 올려주세요.`;
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_SIZE_BYTES) {
    return `전체 용량이 ${toMb(totalSize)}MB입니다. 합계 ${toMb(MAX_TOTAL_SIZE_BYTES)}MB 이하로 올려주세요.`;
  }

  return null;
};
