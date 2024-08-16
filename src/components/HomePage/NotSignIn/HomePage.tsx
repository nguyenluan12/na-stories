

import React from 'react';
import MainContent from './MainContent';
import { NextAuthProvider } from '~/components/signin/provider';

export default function Homepage() {
  return (
    <NextAuthProvider>
      <MainContent/>
    </NextAuthProvider>
  );
}
