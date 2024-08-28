
import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import { NextAuthProvider } from "../../signin/provider";
import ProfileContent from "./ProfileContent";
import {prisma} from "~/lib/prisma"
import { cookies } from "next/headers";
import { decrypt } from "~/lib/session";
import { JWT } from "next-auth/jwt";
import { JwtPayload } from "jsonwebtoken";
import { useSession } from "next-auth/react";
import { Session } from "inspector";


async function ProfileWrapper() {
  
    
    const cookie = await cookies().get('session')?.value;
    const cook = await decrypt(cookie||'')
      const users =cook ? await prisma.user.findMany({
        where:{
          id:cook.userId||'',
        }
      }):
          await prisma.user.findMany();
   
          
  return (
    <>
      <HomeHeader />
      <ProfileContent users={users} cookie={cookie}/>
    </>
  );
}

export default function Profile() {

  return (
    <NextAuthProvider>
      <ProfileWrapper />
    </NextAuthProvider>
  );
}
