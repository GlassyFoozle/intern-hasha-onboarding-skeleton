import { Checkbox } from '@/components/ui/checkbox';
import type { RolesFilterCategory } from '@/entities/filter';
import type { JobMinorCategory } from '@/entities/post';
import { useGuardContext } from '@/shared/context/hooks';
import { RolesFilterContext } from '@/shared/context/RolesFilterContext';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { formatMinorJobToLabel } from '@/util/format';

type RolesFilterProps = {
  roles: JobMinorCategory[] | undefined;
  onChangeRoles: (roles: JobMinorCategory[]) => void;
};

const jobCategoryList = {
  개발: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  기획: ['PLANNER'],
  디자인: ['DESIGN'],
  마케팅: ['MARKETING'],
} as const;

export const RolesFilter = ({
  roles = [],
  onChangeRoles,
}: RolesFilterProps) => {
  const { landingService } = useGuardContext(ServiceContext);
  const { activeCategory } = useGuardContext(RolesFilterContext);

  const isAllSelected = (category: keyof typeof jobCategoryList) => {
    return jobCategoryList[category].every((role) => roles.includes(role));
  };

  const handleCategoryClick = (category: RolesFilterCategory) => {
    landingService.saveRolesFilter({ rolesFilter: category });
  };

  const handleSelectAll = (
    category: keyof typeof jobCategoryList,
    checked: boolean,
  ) => {
    const checkedCategory = [
      ...jobCategoryList[category],
    ] as JobMinorCategory[];
    const updatedRoles = checked
      ? [...new Set([...roles, ...checkedCategory])]
      : roles.filter((role) => !checkedCategory.includes(role));

    onChangeRoles(updatedRoles);
  };

  const handleCheckboxChange = (role: JobMinorCategory, checked: boolean) => {
    const updatedRoles = checked
      ? [...roles, role]
      : roles.filter((otherRoles) => otherRoles !== role);

    onChangeRoles(updatedRoles);
  };

  return (
    <div className="flex flex-col w-[220px] gap-[10px]">
      {Object.keys(jobCategoryList).map((category: string) => {
        const typedCategory = category as keyof typeof jobCategoryList;
        const allSelected = isAllSelected(typedCategory);

        return (
          <div key={typedCategory}>
            <div
              className={`flex justify-between items-center cursor-pointer transition-colors duration-300 px-[20px] py-[10px] rounded-[10px] ${activeCategory === typedCategory ? 'bg-white' : ''} hover:bg-grey-light-active`}
              onClick={() => {
                handleCategoryClick(typedCategory);
              }}
            >
              <span className="text-lg font-semibold text-grey-darker">
                {typedCategory}
              </span>
            </div>

            <div
              className={`flex flex-col gap-[12px] mt-[10px] px-[30px] overflow-hidden transition-all duration-300 ease-in-out ${activeCategory === typedCategory ? 'h-full oacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="flex items-center gap-[10px]">
                <Checkbox
                  id={`select-all-${typedCategory}`}
                  checked={allSelected}
                  onCheckedChange={(checked) => {
                    if (checked === false || checked === true) {
                      handleSelectAll(typedCategory, checked);
                    }
                  }}
                />
                <label
                  htmlFor={`select-all-${typedCategory}`}
                  className="text-sm text-grey-darker cursor-pointer hover:text-grey-dark-hover font-medium"
                >
                  전체 선택
                </label>
              </div>
              {jobCategoryList[typedCategory].map((role) => (
                <div key={role} className="flex items-center gap-[12px]">
                  <Checkbox
                    id={role}
                    checked={roles.includes(role)}
                    onCheckedChange={(checked) => {
                      if (checked === false || checked === true) {
                        handleCheckboxChange(role, checked);
                      }
                    }}
                  />
                  <label
                    htmlFor={role}
                    className="text-sm text-grey-darker cursor-pointer hover:text-grey-dark-hover font-medium"
                  >
                    {formatMinorJobToLabel(role)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
