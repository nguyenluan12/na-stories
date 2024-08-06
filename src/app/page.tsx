import Link from "next/link";
import Header from "~/components/Header";
import LogoNaschool from "~/components/HomePage/LogoNaschool";
import MainBlock from "~/components/HomePage/MainBlock";
import { AppleSvg,
  BigCloseSvg,
  BoySvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
  LessonFastForwardStartSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
  WomanSvg,
  StarSvg } from "~/components/Svgs";
export default function HomePage() {
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
        {
          name: "A Date",
          icon: "https://ardslot.com/s/ja.svg",
        }
        
      ],
    },
    {
      id: 1,
      lesson: [
        {
          name: "Greetings",
          icon: "https://ardslot.com/s/it.svg",
        },
        {
          name: "Travel Tips",
          icon: "https://ardslot.com/s/es.svg",
        },
        {
          name: "Family Ties",
          icon: "https://ardslot.com/s/pt.svg",
        },
        {
          name: "Work and Play",
          icon: "https://ardslot.com/s/ru.svg",
        },
        
      ],
    },
    {
      id: 2,
      lesson: [
        {
          name: "Food and Drink",
          icon: "https://ardslot.com/s/nl.svg",
        },
        {
          name: "Emergency Situations",
          icon: "https://ardslot.com/s/el.svg",
        },
        {
          name: "City Tour",
          icon: "https://ardslot.com/s/ko.svg",
        },
        {
          name: "Business Meeting",
          icon: "https://ardslot.com/s/tr.svg",
        },
        
      ],
    },
  ];
  
  return (
    <MainBlock lessons={lessons}/>
  );
}
