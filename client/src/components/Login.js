import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const Login = ({ setIsAuth }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');

  const cookies = new Cookies();

  const login = () => {
    Axios.post('http://localhost:3001/login', { userName, password }).then(
      (res) => {
        const { firstName, lastName, userName, token, userId } = res.data;
        cookies.set('token', token);
        cookies.set('userId', userId);
        cookies.set('userName', userName);
        cookies.set('firstName', firstName);
        cookies.set('lastName', lastName);
        setIsAuth(true);
      }
    );
  };

  return (
    <div className='login max-w-lg bg-gray-50 rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto text-left'>
      <span className='block w-full text-xl uppercase font-bold mb-4'>
        Login
      </span>
      <div className='mb-4'>
        <div className='mb-4 md:w-full'>
          <label className='block text-xs mb-1' htmlFor='userName'>
            Username
          </label>
          <input
            type='text'
            id='userName'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            placeholder='User Name'
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </div>
        <div className='mb-6 md:w-full'>
          <label className='blocl text-xs mb-1' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='w-full border rounded p-2 outline-none focus:shadow-outline'
            onChange={(event) => {
              setPassWord(event.target.value);
            }}
          />
        </div>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 roudned'
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
