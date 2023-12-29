/**
 * 오류 발생시 클라이언트에게 전달할 오류
 */
export class ResponseError extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
  }
}

/**
 * 400: 클라이언트의 요청이 유효하지 않을 때 발생하는 오류
 */
export class ValidationError extends ResponseError {
  constructor(
    public validation: Record<string, string> = {},
    public message: string = '값을 올바르게 입력해주세요'
  ) {
    super(400, message);
  }
}
