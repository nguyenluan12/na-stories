import { NextAuthProvider } from './provider';
import LoginPage from './loginpage';
import React from 'react';

export default function AppLogin() {
  return (
    <NextAuthProvider>
      <LoginPage />
    </NextAuthProvider>
  );
}
