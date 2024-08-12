// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import { AudioProvider } from '~/context/AudioContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AudioProvider>
    <Component {...pageProps} />
  </AudioProvider>
);

export default MyApp;
