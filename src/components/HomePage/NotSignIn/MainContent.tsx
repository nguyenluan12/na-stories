"use client";

import HomeNotSign from "~/components/HomePage/NotSignIn/HomeNotSign";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function MainContent() {
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const lessons=[
    {
      id: 0,
      lesson: [
        {
          name: "Greetings",
          icon: "https://i.pinimg.com/564x/88/6b/fb/886bfbedfd243fc3eaf16e615802d6fe.jpg",
        },
        {
          name: "Number",
          icon: "https://i.pinimg.com/564x/51/d5/57/51d55732e46415196a6a782d05c05d7b.jpg",
        },
        {
          name: "Weather",
          icon: "https://i.pinimg.com/564x/6b/57/89/6b57898029df299e2fd144831edeaeaa.jpg",
        },
        {
          name: "Colors",
          icon: "https://i.pinimg.com/564x/9a/d8/c0/9ad8c0136f569a6d8cfe605bb6394858.jpg",
        },
      ],
    },
  ];

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return <HomeNotSign lessons={lessons} />;
}
