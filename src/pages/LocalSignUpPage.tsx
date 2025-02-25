import { ModalBackgroundWithHeader } from '@/components/ui/layout';
import { LocalSignUpForm } from '@/feature/auth';

export const LocalSignUpPage = () => {
  return (
    <ModalBackgroundWithHeader>
      <h2 className="text-[22px] font-bold text-center">회원가입</h2>
      <LocalSignUpForm />
    </ModalBackgroundWithHeader>
  );
};
