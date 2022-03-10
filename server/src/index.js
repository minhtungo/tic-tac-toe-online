import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, userName, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, firstName, lastName, userName, userId, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: userName });
    if (users.length === 0) {
      return res.json({ message: 'User not found' });
    }

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        userName,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
