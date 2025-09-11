import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const { id, organizationId, email, userType } = verifyToken(token, 'access') as any;
    req.user = { id, organizationId, email, userType };
    next();
  } catch (err: any) {
    return res.status(403).json({ message: err.message, error: err });
  }
};
