"use client"
import { useEffect, useState } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import React from "react";

// const prisma = new PrismaClient();
export default function LoginPage() {
  const { data: session, status } = useSession();
  const [isExistUser, setIsExistUser] = useState(false);
//   const user = await prisma.user.findFirst({
//     where:{

//     }
//   })
  useEffect(() => {
    if (status === "authenticated") {
       
      redirect("/home");
    }
  }, [status]);

  return (
 
    <div className="flex items-center justify-center min-h-screen">
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <div>
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <p className="text-center">
                Attention, you cannot login with your Duolingo account.
            </p>
            <p className="text-center">
                You have to register for the unofficial stories separately, as they
                are an independent project.
            </p>
            </div>
            <div className="mb-2">
            <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <div className="mb-2">
            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                required
            />
            </div>
            <button
            type="submit"
            className="w-full p-1 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
            Login
            </button>
            <div onClick={() => signIn("google")}
            className="flex flex-row items-center cursor-pointer justify-around w-full p-2 my-2 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow-lg transition-transform duration-300 hover:bg-blue-50 hover:border-blue-50 hover:shadow-xl hover:scale-105 active:scale-95"
            >
            Login with Google
            <img src="/img/google.png" className="w-7" />
            </div>
            {/* <Link href={"/api/auth/signin"}
                className="flex flex-row items-center cursor-pointer justify-around w-full p-2 my-2 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow-lg transition-transform duration-300 hover:bg-blue-50 hover:border-blue-50 hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <div>
                Login with Google
            <img src="/img/google.png" className="w-7" />
            </div>
            </Link> */}
            <div className="flex">
            <p>Don't have an account?</p>
            <p className="px-2 text-blue-400 cursor-pointer">Sign Up</p>
            </div>
            <div className="flex">
            <p>Forgot Password?</p>
            <p className="px-2 text-blue-400 cursor-pointer">Reset</p>
            </div>
        </form>
    </div>
  
  );
}
