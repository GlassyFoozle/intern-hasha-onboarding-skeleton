import type { RolesFilterCategory } from '@/entities/filter';

const LOCAL_STORAGE_ACTIVE_CATEGORY_KEY = 'active-category';
const LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY = 'is-filter-dropdown';

export type RolesFilterLocalStorageRepository = {
  setActiveJobCategory: ({
    activeCategory,
  }: {
    activeCategory: RolesFilterCategory;
  }) => void;
  getActiveJobCategory: () => RolesFilterCategory;
  setIsFilterDropdownOpen: ({
    isFilterDropdownOpen,
  }: {
    isFilterDropdownOpen: boolean;
  }) => void;
  getIsFilterDropdownOpen: () => boolean;
};

export const implRolesFilterLocalStorageRepository =
  (): RolesFilterLocalStorageRepository => ({
    setActiveJobCategory: ({ activeCategory }) => {
      if (activeCategory !== null) {
        localStorage.setItem(LOCAL_STORAGE_ACTIVE_CATEGORY_KEY, activeCategory);
        return;
      }
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_CATEGORY_KEY);
    },
    getActiveJobCategory: () => {
      return localStorage.getItem(
        LOCAL_STORAGE_ACTIVE_CATEGORY_KEY,
      ) as RolesFilterCategory;
    },
    setIsFilterDropdownOpen: ({ isFilterDropdownOpen }) => {
      localStorage.setItem(
        LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY,
        JSON.stringify(isFilterDropdownOpen),
      );
    },
    getIsFilterDropdownOpen: () => {
      return (
        localStorage.getItem(LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY) === 'true'
      );
    },
  });
