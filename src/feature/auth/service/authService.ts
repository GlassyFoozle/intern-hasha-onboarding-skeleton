import type { Apis } from '@/api';
import type { ServiceResponse } from '@/entities/response';
import type { User } from '@/entities/user';
import type { TokenStateRepository } from '@/shared/token/state';

export type AuthService = {
  checkLocalIdDuplicate({
    localId,
  }: {
    localId: string;
  }): ServiceResponse<void>;
  sendEmailCode({ snuMail }: { snuMail: string }): ServiceResponse<void>;
  verifyCode({
    snuMail,
    code,
  }: {
    snuMail: string;
    code: string;
  }): ServiceResponse<void>;
  signUp({
    authType,
    info,
  }: {
    authType: 'LOCAL_NORMAL';
    info: {
      type: 'LOCAL_NORMAL';
      name: string;
      localLoginId: string;
      snuMail: string;
      password: string;
    };
  }): ServiceResponse<{
    user: Omit<User, 'createdAt' | 'updatedAt'>;
    token: string;
  }>;
};

export const implAuthService = ({
  apis,
  tokenStateRepository,
}: {
  apis: Apis;
  tokenStateRepository: TokenStateRepository;
}): AuthService => ({
  checkLocalIdDuplicate: async ({ localId }) => {
    const body = { id: localId };
    const { status, data } = await apis['POST /user/signup/check-id']({
      body,
    });

    if (status === 200) return { type: 'success', data };
    return { type: 'error', code: data.code, message: data.message };
  },
  sendEmailCode: async ({ snuMail }) => {
    const body = { snuMail };
    const { status, data } = await apis[
      'POST /user/snu-mail-verification/request'
    ]({ body });

    if (status === 200) return { type: 'success', data };
    return { type: 'error', code: data.code, message: data.message };
  },
  verifyCode: async ({ snuMail, code }) => {
    const body = { snuMail, code };
    const { status, data } = await apis[
      'POST /user/snu-mail-verification/verify'
    ]({ body });

    if (status === 200) return { type: 'success', data };
    return { type: 'error', code: data.code, message: data.message };
  },
  signUp: async ({ authType, info }) => {
    const body = { authType, info };
    const { status, data } = await apis['POST /user/signup']({ body });

    if (status === 200) {
      const token = data.token;
      tokenStateRepository.setToken({ token });
      return { type: 'success', data };
    }
    return { type: 'error', code: data.code, message: data.message };
  },
});
