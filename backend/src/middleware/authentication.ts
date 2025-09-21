import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/users.service";

export interface TokenPayload {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get token from header or cookie
    const headerToken = req.headers["authorization"]?.split(" ")[1];
    const tokens = req.cookies["auth_tokens"] as TokenPayload | undefined;

    if (!headerToken && !tokens) {
      return res.status(401).json({ message: "No token provided" });
    }

    const userToken = tokens?.access_token || headerToken;

    try {
      // 2. Verify token
      const { id, organizationId, email, userType } = verifyToken(userToken!, "access") as any;
      req.user = { id, organizationId, email, userType };
      return next();
    } catch (err: any) {
      // 3. If expired, try refresh
      if (err instanceof jwt.TokenExpiredError && tokens?.refresh_token) {
        try {
          const newTokens = await UserService.refreshToken(tokens.refresh_token);

          res.cookie("auth_tokens", newTokens, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
          });

          const { id, organizationId, email, userType } = verifyToken(newTokens.access_token, "access") as any;
          req.user = { id, organizationId, email, userType };
          return next();
        } catch (refreshErr) {
          return res.status(401).json({ message: "Refresh Token expired", error: refreshErr });
        }
      }

      // Other JWT errors
      return res.status(403).json({ message: err.message, error: err });
    }
  } catch (outerErr) {
    return res.status(500).json({ message: "Auth middleware error", error: outerErr });
  }
};
