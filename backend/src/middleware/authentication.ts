import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/users.service';

interface tokenPayload {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  const tokens = req.cookies['auth_tokens'] as tokenPayload | undefined;
  if (!token || !tokens) return res.status(401).json({ message: 'No token provided' });
  const userToken = tokens.access_token || token;

  try {
    const { id, organizationId, email, userType } = verifyToken(userToken, 'access') as any;
    req.user = { id, organizationId, email, userType };
    next();
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      UserService.refreshToken(tokens.refresh_token)
        .then((data) => {
          res.cookie('auth_tokens', data, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          });
        })
        .catch((error) => {
          return res.status(401).json({ message: 'Refresh Token expired', error: error });
        });
    }
    return res.status(403).json({ message: err.message, error: err });
  }
};
