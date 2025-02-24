type UserDTO = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  snuMail: string;
  profileImageLink: string;
  isMerged: boolean;
};

export type IdRequest = {
  id: string;
};

export type SnuMailRequest = {
  snuMail: string;
};

export type EmailVerifyRequest = {
  snuMail: string;
  code: string;
};

export type SignUpRequest = {
  authType: 'LOCAL_NORMAL';
  info: {
    type: 'LOCAL_NORMAL';
    name: string;
    localLoginId: string;
    snuMail: string;
    password: string;
  };
};

export type UserWithTokenResponse = {
  user: UserDTO;
  token: string;
};
