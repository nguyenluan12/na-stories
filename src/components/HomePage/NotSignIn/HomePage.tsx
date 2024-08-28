"use server"

import React from 'react';
import MainContent from './MainContent';
import { NextAuthProvider } from '~/components/signin/provider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function Homepage() {
  const cookie = await cookies().get('session')?.value;
  if(cookie){
    redirect("/home")
  }
  return (
    <NextAuthProvider>
      <MainContent/>
    </NextAuthProvider>
  );
}
