import { cookies } from "next/headers";
import HomePage from "~/components/HomePage/NotSignIn/HomePage";

import AppLogin from "~/components/signin/page";
// import HomePage from "./home/page";


export default function Home(){
  // const cookieStore = cookies()
  // return cookieStore.getAll().map((cookie) => (
  //   <div key={cookie.name}>
  //     <p>Name: {cookie.name}</p>
  //     <p>Value: {cookie.value}</p>
  //   </div>
  // ))
  return(
    <HomePage />
  )
}