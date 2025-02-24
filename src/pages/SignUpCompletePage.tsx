import { Button } from '@/components/ui/button';
import { ModalFloatBackground } from '@/components/ui/layout';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const SignUpCompletePage = () => {
  const { toMain } = useRouteNavigation();
  return (
    <ModalFloatBackground>
      <div className="flex flex-col text-center gap-[14px]">
        <p className="text-[22px] font-bold">회원가입이 완료되었어요!</p>
        <p className="text-lg">지금 바로 서비스를 이용할 수 있어요.</p>
      </div>
      <Button onClick={toMain}>메인 화면으로</Button>
    </ModalFloatBackground>
  );
};
