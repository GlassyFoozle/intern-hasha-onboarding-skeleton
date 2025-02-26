import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { type ExternalCallParams, implApi } from '@/api';
import { PATH } from '@/entities/route';
import { implAuthService } from '@/feature/auth';
import { EmailVerifyPage } from '@/pages/EmailVerifyPage';
import { LandingPage } from '@/pages/LandingPage';
import { LocalSignUpPage } from '@/pages/LocalSignUpPage';
import { SignUpSelectPage } from '@/pages/SignUpSelectPage';
import { EnvContext } from '@/shared/context/EnvContext';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';

import type { RolesFilterCategory } from './entities/filter';
import { implLandingService } from './feature/landing/service/landingService';
import { SignUpCompletePage } from './pages/SignUpCompletePage';
import { RolesFilterContext } from './shared/context/RolesFilterContext';
import { TokenContext } from './shared/context/TokenContext';
import { implRolesFilterLocalStorageRepository } from './shared/rolesFilter/localstorage';
import { implRolesFilterStateRepository } from './shared/rolesFilter/state';
import { implTokenStateRepository } from './shared/token/state';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<LandingPage />} />
      <Route path={PATH.SIGN_UP_SELECT} element={<SignUpSelectPage />} />
      <Route path={PATH.SIGN_UP_LOCAL} element={<LocalSignUpPage />} />
      <Route path={PATH.VERIFY_EMAIL} element={<EmailVerifyPage />} />
      <Route path={PATH.SIGN_UP_COMPLETE} element={<SignUpCompletePage />} />
    </Routes>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  const rolesFilterLocalStorageRepository =
    implRolesFilterLocalStorageRepository();

  const [token, setToken] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<RolesFilterCategory>(
    rolesFilterLocalStorageRepository.getActiveJobCategory,
  );
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(
    rolesFilterLocalStorageRepository.getIsFilterDropdownOpen,
  );

  const ENV = useGuardContext(EnvContext);
  const tokenStateRepository = implTokenStateRepository({ setToken });
  const rolesFilterStateRepository = implRolesFilterStateRepository({
    setActiveCategory,
    setIsFilterDropdownOpen,
  });

  const localServerCall = async (content: ExternalCallParams) => {
    const response = await fetch(
      `${ENV.APP_ENV === 'prod' ? ENV.API_BASE_URL : ''}/api/${content.path}`,
      {
        method: content.method,
        headers: content.headers,
        ...(content.body !== undefined
          ? { body: JSON.stringify(content.body) }
          : {}),
      },
    );

    const responseBody = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      if (response.status === 401) {
        tokenStateRepository.removeToken();
      }
    }

    return {
      status: response.status,
      data: responseBody,
    };
  };

  const apis = implApi({ externalCall: localServerCall });
  const services = {
    authService: implAuthService({
      apis,
      tokenStateRepository,
    }),
    landingService: implLandingService({
      rolesFilterStateRepository,
      rolesFilterLocalStorageRepository,
    }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ServiceContext.Provider value={services}>
        <TokenContext.Provider value={{ token }}>
          <RolesFilterContext.Provider
            value={{ activeCategory, isFilterDropdownOpen }}
          >
            <RouterProvider />
          </RolesFilterContext.Provider>
        </TokenContext.Provider>
      </ServiceContext.Provider>
    </QueryClientProvider>
  );
};
