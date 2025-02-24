import { createContext } from 'react';

type TokenContext = {
  token: string | null;
};

export const TokenContext = createContext<TokenContext | null>(null);
