import React from "react";
import HomeHeader from "../HomePage/HomeHeader"
import { getUserByEmail } from "./user";
import { getSession } from "next-auth/react";
export default async function Profile(){
    
    return(
        <div>
            <HomeHeader />
            <div>this is setting page...</div>
        </div>
    )
}