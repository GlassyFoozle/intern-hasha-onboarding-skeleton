type ProgressBarProps = {
  totalProgress: number;
  present: number;
};

export const ProgressBar = ({ totalProgress, present }: ProgressBarProps) => {
  const segmentStyle = (isActive: boolean): string =>
    isActive
      ? 'flex-1 bg-grey-darker rounded-[10px]'
      : 'flex-1 bg-grey-light-active rounded-[10px]';

  return (
    <div className="flex w-full h-[2px] gap-[6px]">
      {Array.from({ length: totalProgress }).map((_, index) => (
        <div key={index} className={segmentStyle(index < present)} />
      ))}
    </div>
  );
};
