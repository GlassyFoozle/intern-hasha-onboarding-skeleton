import { createContext } from "react";

import type { AuthService } from "@/feature/auth";

export type ServiceContext = {
  authService: AuthService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
