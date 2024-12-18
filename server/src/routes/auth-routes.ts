import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config();
const router = Router();

const JWTkey = process.env.JWT_SECRET_KEY
if (!JWTkey) {
  throw new Error('JWTkey is not defined in .env')
}
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: User | null = await User.findOne({ where: { username } });
    console.log("User found:", user);
    // checks if user exists, if it doesn't, invalid username or password
    if (!user) {
      res.status(401).json({ error: 'Invalid username of password' });
      return; // get out
    }

    //checking password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password valid:", validPassword);


    //invalid password
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid username of password' });
      return; //get out
    }

    //generate jwt token
    const token = jwt.sign({ username: user.username }, JWTkey, { expiresIn: '1h' });
    console.log("Generated JWT token: ", token);


    res.json({ token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }

};



// POST /login - Login a user
router.post('/login', login);

export default router;
