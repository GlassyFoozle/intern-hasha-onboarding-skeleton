import { useState } from 'react';
import { useLocation } from 'react-router';

import { FormContainer } from '@/components/form/FormContainer';
import { LabelContainer } from '@/components/label/LabelContainer';
import { ProgressBar } from '@/components/progressBar/ProgressBar';
import {
  FormErrorResponse,
  FormInfoResponse,
} from '@/components/response/formResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICON_SRC } from '@/entities/asset';
import { authPresentation } from '@/feature/auth/presentation/authPresentation';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

type LocalSignUpInitialBody = {
  body:
    | {
        localId: string;
        password: string;
        username: string;
      }
    | undefined;
};

export const LocalSignUpForm = () => {
  const location = useLocation();
  const state = location.state as LocalSignUpInitialBody | null;
  const { toVerifyEmail } = useRouteNavigation();
  const { password, passwordConfirm, localId, username } =
    authPresentation.useValidator({ initialState: state?.body });
  const [localIdCheckSuccess, setLocalIdCheckSuccess] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const checkLocalIdDisable = localId.isError || localIdCheckSuccess;
  const signUpDisable =
    username.isError ||
    localId.isError ||
    password.isError ||
    passwordConfirm.isError;

  const handleClickUsernameDuplicateCheck = () => {
    if (checkLocalIdDisable) return;
    setResponseMessage('');
  };

  const onSubmit = () => {
    toVerifyEmail({
      body: {
        localId: localId.value,
        password: password.value,
        username: username.value,
      },
    });
  };

  return (
    <>
      <FormContainer id="SignUpForm" handleSubmit={onSubmit}>
        <ProgressBar totalProgress={2} present={1} />
        <div className="flex flex-col gap-6">
          <LabelContainer label="이름" id="username">
            <Input
              id="username"
              value={username.value}
              onChange={(e) => {
                username.onChange(e.target.value);
              }}
              onFocus={() => {
                setIsUsernameFocused(true);
              }}
              onBlur={() => {
                setIsUsernameFocused(false);
              }}
              placeholder="이름을 입력해주세요."
            />
            {isUsernameFocused && username.isError && (
              <FormErrorResponse>
                한글명 또는 영문명을 작성해주세요.
              </FormErrorResponse>
            )}
          </LabelContainer>
          <LabelContainer label="아이디" id="localId">
            <div className="flex gap-[6px]">
              <Input
                id="localId"
                value={localId.value}
                onChange={(e) => {
                  setLocalIdCheckSuccess(false);
                  localId.onChange(e.target.value);
                }}
                placeholder="아이디를 입력해주세요."
              />
              <Button
                variant="outline"
                onClick={(event) => {
                  event.preventDefault();
                  handleClickUsernameDuplicateCheck();
                }}
                disabled={checkLocalIdDisable}
              >
                중복확인
              </Button>
            </div>
            {localIdCheckSuccess && (
              <FormInfoResponse>사용할 수 있는 아이디예요.</FormInfoResponse>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호" id="password">
            <Input
              id="password"
              type="password"
              value={password.value}
              onChange={(e) => {
                password.onChange(e.target.value);
              }}
              onFocus={() => {
                setIsPasswordFocused(true);
              }}
              onBlur={() => {
                setIsPasswordFocused(false);
              }}
              placeholder="비밀번호를 입력해주세요."
            />
            {isPasswordFocused && password.isError && (
              <div className="flex flex-col gap-1">
                {[
                  { key: 'englishError', text: '영문 대소문자 각각 1개 이상' },
                  { key: 'numberError', text: '숫자 1개 이상' },
                  {
                    key: 'specialCharError',
                    text: '특수문자(@, #, $, !, ^, *) 1개 이상',
                  },
                  { key: 'lengthError', text: '길이는 8~20자리' },
                ].map(({ key, text }) => {
                  const isValid = !(password.detailedError[key] as boolean);
                  return (
                    <div key={key} className="flex gap-[6px]">
                      <img
                        src={isValid ? ICON_SRC.CHECK : ICON_SRC.CLOSE.GREY}
                        alt={isValid ? '통과 아이콘' : '재작성 아이콘'}
                      />
                      <span
                        className={
                          isValid
                            ? 'text-[13px] text-black'
                            : 'text-[13px] text-grey-normal'
                        }
                      >
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </LabelContainer>
          <LabelContainer label="비밀번호 확인" id="passwordConfirm">
            <Input
              id="passwordCheck"
              type="password"
              value={passwordConfirm.value}
              onChange={(e) => {
                if (e.target.value === '') {
                  setIsPasswordConfirmFocused(false);
                } else {
                  setIsPasswordConfirmFocused(true);
                }
                passwordConfirm.onChange(e.target.value);
              }}
              placeholder="비밀번호를 한 번 더 입력해주세요."
            />
            {isPasswordConfirmFocused &&
              (passwordConfirm.isError ? (
                <FormErrorResponse>
                  비밀번호가 일치하지 않아요.
                </FormErrorResponse>
              ) : (
                <FormInfoResponse>비밀번호가 일치해요.</FormInfoResponse>
              ))}
          </LabelContainer>
        </div>
        {responseMessage !== '' && (
          <FormErrorResponse>{responseMessage}</FormErrorResponse>
        )}
        <Button form="SignUpForm" disabled={signUpDisable}>
          다음
        </Button>
      </FormContainer>
    </>
  );
};
