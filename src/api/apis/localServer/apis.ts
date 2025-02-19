import type {
  ErrorResponse,
  InternalCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '../../entities';
import type { IdRequest } from './schemas';

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
    'POST /user/signup/check-id': ({ body }: { body: IdRequest }) =>
      callWithoutToken<SuccessResponse<void>>({
        method: 'POST',
        path: 'user/signup/check-id',
        body,
      }),
  }) satisfies Record<string, Api>;
