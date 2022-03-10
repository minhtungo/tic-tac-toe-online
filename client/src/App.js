import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const api_key = 'fqtz34t65r7w';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get('token');
  const client = StreamChat.getInstance(api_key);

  const logOut = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('hashedPassword');
    cookies.remove('channelName');
    cookies.remove('username');
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get('userId'),
          name: cookies.get('userName'),
          firstName: cookies.get('firstName'),
          lastName: cookies.get('lastName'),
          hashedPassword: cookies.get('hashedPassword'),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className='App'>
      {isAuth ? (
        <button
          onClick={logOut}
          className='bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 roudned'
        >
          Log Out
        </button>
      ) : (
        <div className='w-full mx-auto'>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </div>
      )}
    </div>
  );
}

export default App;
