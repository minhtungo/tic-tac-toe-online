import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post('http://localhost:3001/signup', user).then((res) => {
      const { firstName, lastName, userName, token, userId, hashedPassword } =
        res.data;
      cookies.set('token', token);
      cookies.set('userId', userId);
      cookies.set('userName', userName);
      cookies.set('firstName', firstName);
      cookies.set('lastName', lastName);
      cookies.set('hashedPassword', hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className='signUp max-w-lg bg-gray-50 rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto text-left'>
      <span className='block w-full text-xl uppercase font-bold mb-4'>
        Sign Up
      </span>
      <div className='mb-4'>
        <div className='mb-4 md:w-full'>
          <label className='block text-xs mb-1' htmlFor='firstName'>
            First Name
          </label>
          <input
            placeholder='First Name'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            id='firstName'
            onChange={(event) => {
              setUser({ ...user, firstName: event.target.value });
            }}
          />
        </div>
        <div className='mb-4 md:w-full'>
          <label className='block text-xs mb-1' htmlFor='lastName'>
            Last Name
          </label>
          <input
            placeholder='Last Name'
            id='lastName'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            onChange={(event) => {
              setUser({ ...user, lastName: event.target.value });
            }}
          />
        </div>

        <div className='mb-4 md:w-full'>
          <label className='block text-xs mb-1' htmlFor='userName'>
            Username
          </label>
          <input
            placeholder='Username'
            id='userName'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            onChange={(event) => {
              setUser({ ...user, userName: event.target.value });
            }}
          />
        </div>

        <div className='mb-4 md:w-full'>
          <label className='block text-xs mb-1' htmlFor='password'>
            Password
          </label>
          <input
            placeholder='Password'
            id='password'
            type='password'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
        </div>
      </div>

      <button
        onClick={signUp}
        className='bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 roudned'
      >
        {' '}
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
