import type { Apis } from "@/api";
import type { ServiceResponse } from '@/entities/response'

export type AuthService = {
  checkLocalIdDuplicate({
    localId,
  }: {
    localId: string;
  }): ServiceResponse<void>;
};

export const implAuthService = ({
  apis,
}: {
  apis: Apis;
}): AuthService => ({
  checkLocalIdDuplicate: async ({ localId }) => {
    const body = { id: localId};
    const { status, data } = await apis['POST /user/signup/check-id']({
      body,
    });

    if (status === 200) return { type: 'success', data,};
    return { type: 'error', code: data.code, message: data.message};
  },
});