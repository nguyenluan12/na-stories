"use client";

import { signIn } from "next-auth/react";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "~/app/actions/auth";
import LogoNaschool from "~/components/HomePage/LogoNaschool";



export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const router = useRouter();
  const [state, action, pending] = useActionState(signin, undefined);
  const [isShow, setIsShow] =useState(false)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form action={action} className="bg-white p-6  rounded-lg shadow-lg w-full max-w-sm">
        <div className="w-full flex items-center justify-center p-5">
          <LogoNaschool />
        </div>
        
        <h1 className="text-2xl font-semibold mb-6 text-center border-b-2 border-black">Welcome back</h1>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="email">Email</label>
          <input className="border-2 rounded-lg p-2" id="email" name="email" placeholder="Email" />
          {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>
        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="password">Password</label>
            <div className="flex flex-row w-full items-center">
              <input className="border-2 w-11/12 rounded-lg p-2" id="password" name="password" placeholder="Password" type={isShow?'text':'password'} />
              <img onClick={()=>{setIsShow((prev)=>(!prev))}} className='w-5 h-5 ml-2 cursor-pointer' src={isShow?'/img/close-eye.png':'/img/open_eye.png'} />
          </div>
          {state?.errors?.password && (
            <div className="text-red-500">
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-1 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Login
        </button>

        <div 
          onClick={() => signIn('google')}
          className="flex items-center justify-center w-full p-2 my-2 border-2 border-gray-50 rounded-xl bg-white text-lg shadow-lg cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <img src="/img/google.png" alt="Google" className="w-6 h-6 mr-2" />
          Login with Google
        </div>

        <div className="flex justify-center mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={() => router.push('./register-page')}
            className="ml-2 text-blue-500 hover:text-blue-700 underline"
          >
            Signup
          </button>
          
        </div>
      </form>
    </div>
  );
}
