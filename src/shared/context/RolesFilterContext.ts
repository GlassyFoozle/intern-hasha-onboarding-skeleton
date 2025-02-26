import { createContext } from 'react';

import type { RolesFilterCategory } from '@/entities/filter';

type RolesFilterContext = {
  activeCategory: RolesFilterCategory;
  isFilterDropdownOpen: boolean;
};

export const RolesFilterContext = createContext<RolesFilterContext | null>(
  null,
);
