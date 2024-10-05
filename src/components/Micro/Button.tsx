import { Link } from 'react-router-dom';
import React from 'react';

// Define the props type for the Button component
interface ButtonProps {
  children: React.ReactNode;
  id?: number; // id is optional and can be a string
}

const Button: React.FC<ButtonProps> = ({ children, id }) => {
  return (
    <>
      {id ? (
        <Link to={`/${id}`}>
          <button className='bg-white rounded-full px-6 py-3 text-black font-bold text-[20px]'>
            {children}
          </button>
        </Link>
      ) : (
        <button className='bg-white rounded-full px-6 py-3 text-black font-bold text-[20px]'>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
