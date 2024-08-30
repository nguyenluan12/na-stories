import { useActionState, useState } from 'react';
import { updateInfor } from '~/app/actions/auth';



type User = {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string | null;
  date: string | null;
} | null;

export default function ChangeInfor({imgSrc, user }: {imgSrc:string, user: User }) {
  console.log(user)
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(user?.date || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [state, action, pending] = useActionState(updateInfor, undefined);
  const [showPassword, setShowPassword] = useState(false);
  console.log(email)
  return (
    <div className="w-1/2 min-w-72 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-3 pt-3 text-2xl font-semibold">
        <p>{name}</p>
        <img className="w-7" src="https://ardslot.com/s/vi.svg" alt="country-img" />
      </div>

      <form action={action} className="flex flex-col w-full m-5 p-3 border-2 rounded-lg">
        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Email</strong></p>
          <input id='email' name='email'  className=" justify-around h-1/2 w-full p-2 my-3 focus:outline-none border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-gray-300 text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50"
          value={email} 
          >
            
          </input>
        </div>

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Password</strong></p>
          <div className='flex flex-row items-center'>
            <input
              id="password"
              name="password"
              type={showPassword?"text":"password"}
              placeholder="*********"
              className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={()=>setShowPassword((prev)=>(!prev))}>
              <img className='w-7 cursor-pointer' src={showPassword?'/img/close-eye.png':'/img/open_eye.png'} />
            </div>
          </div>
          {(state?.errors?.password && password!='') ? (
            <div className="text-red-500 w-1/2">
              
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error} className='text-sm'> {error}</li>
                ))}
              </ul>
            </div>
          ):<></>}
        </div>

       {password!=''? <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Verify Password</strong></p>
          <div className='flex flex-row items-center'>
            <input
              id="verifyPassword"
              name="verifyPassword"
              type={showPassword?"text":"password"}
              placeholder="*********"
              className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          
          </div>
          {(state?.errors?.verifyPassword && password!='') ? (
            <div className="text-red-500">
            
              <ul>
                {state.errors.verifyPassword?.map((error) => (
                  <li key={error}> {error}</li>
                ))}
              </ul>
            </div>
          ):<></>}
        </div>:<></>}

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Birthday</strong></p>
          <input
            id="date"
            name="date"
            type="date"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Phone</strong></p>
          <input
            type="text"
            id="phone"
            name="phone"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {(state?.errors?.phoneNumber) ? (
            <div className="text-red-500">
            
              <ul>
                {state.errors.phoneNumber.map((error) => (
                  <li key={error}> {error}</li>
                ))}
              </ul>
            </div>
          ):<></>}
        </div>
        {/* <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Change Avatar</strong></p>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={imgSrc}
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div> */}
        <button
          type='submit'
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
          
        >
          {state?.errors?'updated': 'Save'}
        </button>
      </form>
    </div>
  );
}
