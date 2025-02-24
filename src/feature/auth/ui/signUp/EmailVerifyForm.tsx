import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import { FormErrorResponse } from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createErrorMessage } from '@/entities/errors';
import { PATH } from '@/entities/route';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import { RedirectSignInModal } from '@/feature/auth/ui/signUp/SignUpModal';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { RouteNavigator } from '@/shared/route/RouteNavigator';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';
import { formatNumberToTime } from '@/util/format';

type EmailVerifyLocationState = {
  body: {
    localId: string;
    password: string;
    username: string;
  };
};

export const EmailVerifyForm = () => {
  const location = useLocation();
  const state = location.state as EmailVerifyLocationState | null;
  const [showModal, setShowModal] = useState(false);
  const { snuMail, code } = authPresentation.useValidator({});

  const {
    sendCode,
    sendSuccess,
    isCodeExpired,
    timeLeft,
    responseMessage: codeResponseMessage,
    isPending: isPendingSend,
  } = useSendCode();

  const {
    emailVerify,
    verifySuccess,
    responseMessage: emailResponseMessage,
    isPending: isPendingVerify,
  } = useEmailVerify();

  const {
    localSignUp,
    responseMessage: localSignUpResponseMessage,
    isPending: isPendingSignUp,
  } = useSignUp({ setShowModal });

  const sendCodeDisable = snuMail.isError || sendSuccess;
  const verifyEmailDisable =
    snuMail.isError || !sendSuccess || code.isError || verifySuccess;
  const signUpDisable = snuMail.isError || code.isError || !verifySuccess;

  const isPending = isPendingSend || isPendingVerify || isPendingSignUp;

  if (state === null) {
    return <RouteNavigator link={PATH.SIGN_IN_SELECT} />;
  }
  const { body } = state;

  const handleClickSendEmailCodeButton = () => {
    sendCode({ snuMail: snuMail.postfix });
  };

  const handleClickVerifyEmailButton = () => {
    emailVerify({ snuMail: snuMail.postfix, code: code.value });
  };

  const onSubmit = () => {
    localSignUp({
      snuMail: snuMail.postfix,
      localId: body.localId,
      password: body.password,
      username: body.username,
    });
  };

  return (
    <>
      <FormContainer id="EmailVerifyForm" handleSubmit={onSubmit}>
        <ProgressBar totalProgress={2} present={2} />
        <LabelContainer label="이메일" id="email">
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-[8px] items-center">
              <div className="relative">
                <Input
                  id="email"
                  value={snuMail.value}
                  onChange={(e) => {
                    snuMail.onChange(e.target.value);
                  }}
                  placeholder="마이스누 아이디"
                  className="pr-[84px]"
                />
                <span
                  className={
                    sendCodeDisable
                      ? 'absolute top-[11px] right-3 text-grey text-sm'
                      : 'absolute top-[11px] right-3 text-black text-sm'
                  }
                >
                  @snu.ac.kr
                </span>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClickSendEmailCodeButton();
                }}
                disabled={sendCodeDisable || isPending}
                className="min-w-[102px]"
              >
                {sendSuccess ? '전송 완료' : '인증코드 전송'}
              </Button>
            </div>
            {codeResponseMessage !== '' && (
              <FormErrorResponse>{codeResponseMessage}</FormErrorResponse>
            )}
            <div className="flex relative gap-[8px]">
              <Input
                id="code"
                value={code.value}
                onChange={(e) => {
                  code.onChange(e.target.value);
                }}
                placeholder="인증코드"
              />
              {timeLeft !== null && !verifySuccess && (
                <div className="absolute top-[11px] left-[210px]">
                  <FormErrorResponse>
                    {formatNumberToTime({ time: timeLeft })}
                  </FormErrorResponse>
                </div>
              )}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClickVerifyEmailButton();
                }}
                disabled={isPending || verifyEmailDisable}
                className="min-w-[102px]"
              >
                {verifySuccess ? '확인 완료' : '인증코드 확인'}
              </Button>
            </div>
            {!verifySuccess && isCodeExpired && (
              <FormErrorResponse>인증코드가 만료되었습니다.</FormErrorResponse>
            )}
            {!verifySuccess && (
              <FormErrorResponse>{emailResponseMessage}</FormErrorResponse>
            )}
            {sendSuccess && (
              <p className="text-center mt-[8px]">
                <span className="text-grey text-sm">
                  인증코드가 오지 않았나요?{' '}
                </span>
                <a
                  onClick={handleClickSendEmailCodeButton}
                  className="underline-offset-4 hover:cursor-pointer hover:underline text-sm"
                >
                  재전송
                </a>
              </p>
            )}
          </div>
        </LabelContainer>
        <Button
          form="EmailVerifyForm"
          disabled={isPending || signUpDisable}
          className="mt-[22px]"
        >
          회원가입
        </Button>
        {localSignUpResponseMessage !== '' && (
          <FormErrorResponse>{localSignUpResponseMessage}</FormErrorResponse>
        )}
      </FormContainer>
      {showModal && <RedirectSignInModal />}
    </>
  );
};

const useSendCode = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const TIME_LIMIT = 180;

  const startTimer = () => {
    setTimeLeft(TIME_LIMIT);
    setIsCodeExpired(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          stopTimer();
          setIsCodeExpired(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(null);
  };

  const { mutate: sendCode, isPending } = useMutation({
    mutationFn: ({ snuMail }: { snuMail: string }) => {
      return authService.sendEmailCode({ snuMail });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setSendSuccess(true);
        startTimer();
      } else {
        stopTimer();
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '코드 전송에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setSendSuccess(false);
      stopTimer();
    },
  });

  return {
    sendCode,
    sendSuccess,
    isCodeExpired,
    timeLeft,
    responseMessage,
    isPending,
  };
};

const useEmailVerify = () => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);

  const { mutate: emailVerify, isPending } = useMutation({
    mutationFn: ({ snuMail, code }: { snuMail: string; code: string }) => {
      return authService.verifyCode({ snuMail, code });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setVerifySuccess(true);
      } else {
        setResponseMessage(createErrorMessage(response.code));
        setVerifySuccess(false);
      }
    },
    onError: () => {
      setResponseMessage(
        '이메일 인증에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
      setVerifySuccess(false);
    },
  });

  return { emailVerify, verifySuccess, responseMessage, isPending };
};

const useSignUp = ({
  setShowModal,
}: {
  setShowModal(input: boolean): void;
}) => {
  const { authService } = useGuardContext(ServiceContext);
  const [responseMessage, setResponseMessage] = useState('');
  const { toSignUpComplete } = useRouteNavigation();

  const { mutate: localSignUp, isPending } = useMutation({
    mutationFn: ({
      snuMail,
      username,
      localId,
      password,
    }: {
      snuMail: string;
      username: string;
      localId: string;
      password: string;
    }) => {
      return authService.signUp({
        authType: 'LOCAL_NORMAL',
        info: {
          type: 'LOCAL_NORMAL',
          name: username,
          snuMail,
          localLoginId: localId,
          password,
        },
      });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        toSignUpComplete();
      } else {
        if (response.code === 'USER_001' || response.code === 'USER_002') {
          setShowModal(true);
          return;
        }
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '회원가입에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return { localSignUp, responseMessage, isPending };
};
