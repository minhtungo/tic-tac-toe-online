import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreanChat } from 'stream-chat';

function App() {
  return (
    <div className='App'>
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
