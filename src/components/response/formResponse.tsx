import type { ReactNode } from 'react';

export const FormErrorResponse = ({ children }: { children: ReactNode }) => {
  return <span className="text-red-normal text-[13px]">{children}</span>;
};

export const FormInfoResponse = ({ children }: { children: ReactNode }) => {
  return <span className="text-blue-normal text-[13px]">{children}</span>;
};
