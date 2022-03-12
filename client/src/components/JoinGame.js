import { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState('');
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });
    if (response.users.length === 0) {
      alert('User not found');
      return;
    }

    const newChannel = await client.channel('messaging', {
      members: [client.userId, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className='joinGame'>
          <h4>Create Game</h4>
          <input
            placeholder='Username of rival...'
            onChange={(event) => setRivalUsername(event.target.value)}
          />
          <button
            onClick={createChannel}
            className='bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 roudned'
          >
            Join Game
          </button>
        </div>
      )}
    </>
  );
};
export default JoinGame;