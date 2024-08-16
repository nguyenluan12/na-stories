"use client";

import HomeNotSign from "~/components/HomePage/NotSignIn/HomeNotSign";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MainContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lessons, setLessons] = useState([
    {
      id: 0,
      lesson: [
        {
          name: "Good Morning",
          icon: "https://ardslot.com/s/en.svg",
        },
        {
          name: "A Date",
          icon: "https://ardslot.com/s/ja.svg",
        },
        {
          name: "One Thing",
          icon: "https://ardslot.com/s/vi.svg",
        },
        {
          name: "The Honeymoon",
          icon: "https://ardslot.com/s/uk.svg",
        },
      ],
    },
  ]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return <HomeNotSign lessons={lessons} />;
}
