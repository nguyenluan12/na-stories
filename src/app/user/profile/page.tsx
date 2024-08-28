import React from "react";
import Profile from "../../../components/user/profile/Profile";
import { useSession } from "next-auth/react";

export default function ProfilePage(){
    
    return(
        <Profile />
    )
}