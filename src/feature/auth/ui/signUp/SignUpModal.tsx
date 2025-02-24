import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const RedirectSignInModal = () => {
  const { toMain } = useRouteNavigation();

  return (
    <ModalFloatBackground>
      <div className="flex flex-col text-center gap-[14px]">
        <p className="text-[22px] font-bold">이미 회원가입이 되어있어요!</p>
        <p className="text-lg">바로 로그인하러 가요.</p>
      </div>
      <Button onClick={toMain}>로그인하러 가기(사실은 메인 페이지로)</Button>
    </ModalFloatBackground>
  );
};
