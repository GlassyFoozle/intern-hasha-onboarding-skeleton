import { Skeleton } from '@/components/ui/skeleton';
import { ICON_SRC } from '@/entities/asset';

export const SkeletonPostCard = () => {
  return (
    <div className="rounded-2xl bg-white cursor-pointer hover:shadow-md">
      <div className="flex relative justify-between items-center rounded-t-2xl px-[22px] bg-gray-200">
        <div className="flex items-center gap-2">
          <img src={ICON_SRC.PERSON} className="w-6 h-6" />
          <Skeleton className="h-5 w-[120px]" />
        </div>
        <Skeleton className="h-6 w-8" />
        <div
          className="absolute text-lg bottom-[-9.6px] right-6
                  w-0 h-0 border-l-[10px] border-l-transparent
                  border-r-[10px] border-r-transparent
                  border-t-[10px] border-t-gray-200"
        />
      </div>

      <section className="flex flex-col gap-[12px] px-[22px] py-[18px]">
        <div className="flex items-center gap-[14px]">
          <div className="w-[40px] h-[40px] rounded-lg">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>
    </div>
  );
};
