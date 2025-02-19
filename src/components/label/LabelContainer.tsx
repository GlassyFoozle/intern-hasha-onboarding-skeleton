import { cn } from '@/lib/utils';

interface LabelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  className?: string;
}

export const LabelContainer = ({
  label,
  id,
  children,
  className,
}: LabelContainerProps) => {
  return (
    <div className={cn('flex flex-col gap-[8px]', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
};
