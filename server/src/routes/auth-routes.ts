import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
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



  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
