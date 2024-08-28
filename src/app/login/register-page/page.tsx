'use client';


import { redirect } from 'next/navigation';
import { useActionState, useState } from 'react';
import { signup } from '~/app/actions/auth';
import LogoNaschool from '~/components/HomePage/LogoNaschool';
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', date: '' });
  const [state, action, pending] = useActionState(signup, undefined);
  const router = useRouter();
  const [password,setPassword]=useState('');
  const [isShow,setIsShow]=useState(false)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form action={action} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="w-full flex items-center justify-center p-5">
          <LogoNaschool />
        </div>

        <h1 className="text-2xl font-semibold mb-6 text-center border-b-2 border-black">Create an Account</h1>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="name">Name</label>
          <input
            className="border-2 rounded-lg p-2"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {state?.errors?.name && <p className="text-red-500 text-xs">{state.errors.name}</p>}
        </div>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="email">Email</label>
          <input
            className="border-2 rounded-lg p-2"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {state?.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
        </div>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="password">Password</label>
          <div className="flex flex-row w-full items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
               className="border-2 w-11/12 rounded-lg p-2" id="password" name="password" placeholder="Password" type={isShow?'text':'password'} />
              <img onClick={()=>{setIsShow((prev)=>(!prev))}} className='w-5 h-5 ml-2 cursor-pointer' src={isShow?'/img/close-eye.png':'/img/open_eye.png'} />
          </div>
          {state?.errors?.password && (
            <div className="text-red-500 text-xs">
              
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}> {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="verifyPassword"> Verify Password</label>
          <div className="flex flex-row w-full items-center">
              <input className="border-2 w-full rounded-lg p-2" id="verifyPassword" name="verifyPassword" placeholder="Password" type={isShow?'text':'password'} />
          </div>
          {state?.errors?.verifyPassword && (
            <div className="text-red-500 text-xs">
              
              <ul>
                {state.errors.verifyPassword.map((error) => (
                  <li key={error}> {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="phone">Phone</label>
          <input
            type='text'
            className="border-2 rounded-lg p-2"
            id="phone"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {state?.errors?.phoneNumber && <p className="text-red-500 text-xs">{state.errors.phoneNumber}</p>}
        </div>

        <div className="flex flex-col justify-between py-1">
          <label className="font-semibold" htmlFor="date">Birthday</label>
          <input
            className="border-2 rounded-lg p-2"
            id="date"
            name="date"
            type="date"
            placeholder="Birthday"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full p-1 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
          aria-disabled={pending}
        >
          {pending ? 'Submitting...' : 'Sign up'}
          
        </button>
        <div className='flex flex row hover:text-blue-500 cursor-pointer mt-3' onClick={()=>(router.push('./signin'))}>
          <img className='w-5' src='/img/back.png'/>
          Back to Login</div>
      </form>
      

    </div>
  );
}
