
import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import { NextAuthProvider } from "../../signin/provider";
import ProfileContent from "./ProfileContent";
import {prisma} from "~/lib/prisma"

async function ProfileWrapper() {
    const users = await prisma.user.findMany();

  return (
    <>
      <HomeHeader />
      <ProfileContent users={users} />
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
