// GUIDE: 작업하실 때는 주석을 푸시면 됩니다.

import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type {} from './schemas';

type GetApisProps = {
  callWithToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token: string },
  ) => Promise<R | ErrorResponse>;
  callWithoutToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: never },
  ) => Promise<R | ErrorResponse>;
  callWithOptionalToken: <R extends ResponseNecessary>(
    p: InternalCallParams & { token?: string },
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  body: never;
  token: string;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getLocalServerApis = ({
  callWithToken,
  callWithoutToken,
  callWithOptionalToken,
}: GetApisProps) =>
  // GUIDE: 예시 api들입니다.
  ({
    'GET /echo/:message': () =>
      callWithoutToken<SuccessResponse<never>>({
        method: 'GET',
        path: `echo`,
      }),
    'GET /echo/:message2': () =>
      callWithToken<SuccessResponse<never>>({
        method: 'GET',
        path: `echo`,
        token: '',
      }),
    'GET /echo/:message3': () =>
      callWithOptionalToken<SuccessResponse<never>>({
        method: 'GET',
        path: `echo`,
        token: '',
      }),
  }) satisfies Record<string, Api>;
