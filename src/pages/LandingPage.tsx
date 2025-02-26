import { useState } from 'react';

import { GlobalNavigationBar } from '@/components/nav/GlobalNavigationBar';
import type { FilterElements, JobMinorCategory } from '@/entities/post';
import { RolesFilter } from '@/feature/landing/ui/RolesFilter';

export const LandingPage = () => {
  const [filterElements, setFilterElements] = useState<FilterElements>({
    roles: undefined,
  });

  const handleRolesChange = (updatedRoles: JobMinorCategory[]) => {
    setFilterElements((prev) => ({ ...prev, roles: updatedRoles }));
  };

  return (
    <>
      <div className="min-h-screen bg-grey-light">
        <GlobalNavigationBar />

        <div className="flex flex-col w-full sm:w-screen-sm md:w-screen-md lg:w-screen-lg xl:max-w-screen-xl md:flex-row m-auto px-2 py-[42px] gap-2">
          <div className="hidden md:block md:flex-col order-1 md:order-none md:mt-[70px]">
            <RolesFilter
              roles={filterElements.roles}
              onChangeRoles={handleRolesChange}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">인턴 공고</h2>
            LandingPage
          </div>
        </div>
      </div>
    </>
  );
};
