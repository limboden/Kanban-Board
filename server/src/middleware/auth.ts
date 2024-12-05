import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // verify the token exists and add the user data to the request object
  const authArray = req.headers.authorization?.split(" ");
  if (!authArray) return res.status(401).json({ message: "Token not found" });
  const token = authArray[1];
  const secret = process.env.JWT_SECRET_KEY as string;
  if (!secret || secret == "")
    return res
      .status(500)
      .json({ message: "Server did not respond as expected" });
  try {
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;
    if (!decoded.username)
      return res.status(500).json({ message: "Could not find username in token" });
    req.user = decoded;
    next();
  } catch (error: any) {
    return res;
  }
  return res;
};
