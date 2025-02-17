import { Button } from '@/components/ui/button';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const GlobalNavigationBar = () => {
  const { toSignUpSelect, toMain } = useRouteNavigation();

  return (
    <header className="flex justify-center sticky top-0 z-50 bg-grey-light shadow-md">
      <div className="flex w-full sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl px-6 py-4 justify-between items-center">
        <h1
          onClick={toMain}
          className="text-xl font-bold text-gray-800 transition-colors duration-150 cursor-pointer hover:text-blue-normal"
        >
          인턴하샤
        </h1>
        <div className="flex gap-5">
          <Button onClick={toSignUpSelect} variant="ghost">
            회원가입
          </Button>
          <Button variant="ghost">로그인</Button>
        </div>
      </div>
    </header>
  );
};
