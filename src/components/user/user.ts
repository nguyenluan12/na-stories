import Email from "next-auth/providers/email"
import { getSession } from "next-auth/react"
import { emit } from "process"
import {prisma as prisma} from "~/lib/prisma"


export const getUserByEmail = async(Email:string)=>{
  console.log(Email)  
    
        return(
            await prisma.user.findFirst({
                where:{
                    email:Email,
                }
            })
        )
    
}
