import { useState } from 'react';
import axios from 'axios';

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

export default function ChangeInfor({ user }: { user: User }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(user?.date || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/user', {
        id: user?.id,
        name,
        email,
        password,
        date,
        phoneNumber,
      });
      console.log('User updated:', response.data);
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Failed to update user information.');
    }
  };

  return (
    <div className="w-1/2 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-3 pt-3 text-2xl font-semibold">
        <p>{name}</p>
        <img className="w-7" src="https://ardslot.com/s/vi.svg" alt="country-img" />
      </div>

      <div className="flex flex-col w-full m-5 p-3 border-2 rounded-lg ">
        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Email</strong></p>
          <div className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-gray-300 text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
            {email}
          </div>
        </div>

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Password</strong></p>
          <input
            type="text"
            placeholder="*********"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Birthday</strong></p>
          <input
            type="date"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50">
          <p><strong>Phone</strong></p>
          <input
            type="number"
            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-200"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
