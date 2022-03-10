import React, { useState } from 'react';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');

  const login = () => {};
  return (
    <div className='login'>
      <label>Login</label>
      <input
        type='text'
        placeholder='User Name'
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(event) => {
          setPassWord(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default Login;
