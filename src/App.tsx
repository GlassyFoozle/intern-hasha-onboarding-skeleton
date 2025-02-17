import './index.css';

import { Route, Routes } from 'react-router';

import { PATH } from '@/entities/route';
import { LandingPage } from '@/pages/LandingPage';
import { LocalSignUpPage } from '@/pages/LocalSignUpPage';
import { SignUpSelectPage } from '@/pages/SignUpSelectPage';

const RouterProvider = () => {
  return (
    <Routes>
      <Route path={PATH.INDEX} element={<LandingPage />} />
      <Route path={PATH.SIGN_UP_SELECT} element={<SignUpSelectPage />} />
      <Route path={PATH.SIGN_UP_LOCAL} element={<LocalSignUpPage />} />
    </Routes>
  );
};

export const App = () => {
  return <RouterProvider />;
};
