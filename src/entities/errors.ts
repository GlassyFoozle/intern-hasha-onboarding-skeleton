const ERROR_MESSAGE_MAP = {
  USER_002: '동일한 ID로 가입한 유저가 이미 존재합니다.',
};

const ERRORS = Object.keys(ERROR_MESSAGE_MAP);

type Errors = keyof typeof ERROR_MESSAGE_MAP;

export const createErrorMessage = (error: string) => {
  if (ERRORS.includes(error)) return ERROR_MESSAGE_MAP[error as Errors];
  return '에러가 발생하였습니다. 잠시 후 다시 시도해주세요.';
};
