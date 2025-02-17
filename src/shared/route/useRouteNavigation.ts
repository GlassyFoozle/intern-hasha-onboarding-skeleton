import { useNavigate } from "react-router";

import { PATH } from '@/entities/route';

type VerifyMailBody = {
  authProvider: 'LOCAL';
  localId: string;
  password: string;
  username: string;
};

type PreviousForm = {
  authProvider: 'LOCAL';
  localId: string;
  password: string;
  username: string;
}

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    SIGN_UP_SELECT,
    VERIFY_EMAIL,
    SIGN_UP_LOCAL,
    SIGN_UP_COMPLETE,
  } = PATH;

  return {
    toMain: () => {
      void navigate(INDEX);
    },
    toSignUpSelect: () => {
      void navigate(SIGN_UP_SELECT);
    },
    toVerifyEmail: ({ body }: { body: VerifyMailBody }) => {
      void navigate(VERIFY_EMAIL, { state: { body }});
    },
    toSignUpLocal: ({ body }: { body?: PreviousForm }) => {
      void navigate(SIGN_UP_LOCAL, { state: { body }});
    },
    toSignUpComplete: () => {
      void navigate(SIGN_UP_COMPLETE);
    }
  }
}