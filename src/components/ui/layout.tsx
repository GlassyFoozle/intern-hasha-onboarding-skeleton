import type { ReactNode } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import { cn } from '@/lib/utils';

export const ModalBackgroundWithHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalNavigationBar />
      <div
        className={cn(
          'flex flex-col flex-1 justify-center items-center bg-gray-100',
          className,
        )}
      >
        <div className="flex flex-col w-full max-w-[428px] pt-10 pb-[30px] px-[34px] gap-5 bg-white rounded-2xl shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface ModalProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  isVisible?: boolean;
  onOutsideClick?: () => void;
}

export const ModalFloatBackground = ({
  children,
  isVisible,
  onOutsideClick,
}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-grey-light-active"
      onClick={onOutsideClick}
    >
      <div
        className={`flex flex-col gap-[50px] bg-white rounded-2xl shadow-lg max-w-sm w-full px-[34px] pt-[40px] pb-[30px] text-center ${isVisible === undefined || isVisible ? 'animate-popup' : 'animate-popout'}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
