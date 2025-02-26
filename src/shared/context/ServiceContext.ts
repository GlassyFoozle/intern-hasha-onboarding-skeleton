import { createContext } from 'react';

import type { AuthService } from '@/feature/auth';
import type { LandingService } from '@/feature/landing';

export type ServiceContext = {
  authService: AuthService;
  landingService: LandingService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
