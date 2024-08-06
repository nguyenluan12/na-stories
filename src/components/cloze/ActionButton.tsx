import React from 'react';
import Link from 'next/link';

interface ActionButtonProps {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionButton: React.FC<ActionButtonProps> = ({ isClick, setIsClick }) => {
  return (
    <div className="m-5 w-full text-center">
      {isClick ? (
        <Link href="/" className="w-1/2 px-4 py-1 border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
          Finish
        </Link>
      ) : (
        <button
          onClick={() => setIsClick(true)}
          className="p-0 px-4 my-2 border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default ActionButton;
