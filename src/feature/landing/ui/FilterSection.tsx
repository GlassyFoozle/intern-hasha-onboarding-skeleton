import { Button } from '@/components/ui/button';
import { ICON_SRC } from '@/entities/asset';

export const FilterSection = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between gap-[6px]">
      <div className="flex flex-row items-center gap-[6px] md:gap-[16px]">
        <div className="flex gap-[6px] items-center">
          <Button variant="secondary" className="bg-white px-x py-2">
            모집 중
            <img src={ICON_SRC.ARROW} className="rotate-180 w-4 h-4" />
          </Button>
          <Button variant="secondary" className="bg-white px-x py-2">
            시리즈
            <img src={ICON_SRC.ARROW} className="rotate-180 w-4 h-4" />
          </Button>
          <Button variant="secondary" className="bg-white px-x py-2">
            투자 금액
            <img src={ICON_SRC.ARROW} className="rotate-180 w-4 h-4" />
          </Button>
        </div>
        <Button variant="secondary" size="sm" className="px-0">
          <img src={ICON_SRC.REFRESH} />
          초기화
        </Button>
      </div>
      <Button variant="secondary" className="bg-white px-x py-2">
        최신순
        <img src={ICON_SRC.ARROW} className="rotate-180 w-4 h-4" />
      </Button>
    </div>
  );
};
