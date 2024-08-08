import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Header from "~/components/Header";
import HomeNotSign from "~/components/HomePage/NotSignIn/HomeNotSign";
import LogoNaschool from "~/components/HomePage/LogoNaschool";
import MainBlock from "~/components/HomePage/MainBlock";

const prisma = new PrismaClient();
export default async function HomePage() {
  const lessons = [
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
  ]
  return (
    // <MainBlock lessons={lessons}/>
    <HomeNotSign lessons={lessons} />
  );
}
