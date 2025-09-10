import { appConfig } from '../config';
import { UsersModel } from '../models/users.model';
import { ISignUp, User } from '../types/users';
import { generateTokens, verifyToken } from '../utils/jwt';

import { OAuth2Client } from 'google-auth-library';

export class UserService {
  constructor() {}
  private static oauth2Client = new OAuth2Client(
    appConfig.googleAuth.GOOGLE_CLIENT_ID,
    appConfig.googleAuth.GOOGLE_CLIENT_SECRET,
    appConfig.googleAuth.GOOGLE_REDIRECT_URI
  );

  static async signUp(data: Omit<ISignUp, 'id'>) {
    const user: User = await UsersModel.create(data);

    // JWT payload
    const payload = {
      id: user.id,
      organizationId: user.organizationId || '',
      email: user.email,
      userType: user.userType,
    };

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(payload);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 900, // 15 minutes = 900 seconds
      },
    };
  }

  static async signUpWithGoogle() {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly', // Gmail only
      'openid',
      'email',
      'profile',
    ];

    const url = this.oauth2Client.generateAuthUrl({
      access_type: 'offline', // ensures refresh_token
      prompt: 'consent', // ensures refresh_token every time
      scope: scopes,
    });
    return { authUrl: url };
  }

  static async exchangeGoogleAuthCode(code: string) {
    // exchange code for tokens
    const { tokens } = await this.oauth2Client.getToken(code);

    // get user profile info
    this.oauth2Client.setCredentials(tokens);
    // verify ID token (this contains user profile info)
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Google login failed');

    // payload will have: { sub, email, email_verified, name, picture }
    const userInfo = {
      id: payload.sub,
      email: payload.email,
      verified: payload.email_verified,
      name: payload.name,
      picture: payload.picture,
    };
  }

  static async login(data: Pick<ISignUp, 'email' | 'password'>) {
    const user = await UsersModel.findOne({ where: { email: data.email } });
    if (!user) throw new Error('user does not exist');
    const isPasswordMatched = await user.comparePassword(data.password);
    if (!isPasswordMatched) throw new Error('wrong password');

    // JWT payload
    const payload = {
      id: user.id,
      organizationId: user.organizationId || '',
      email: user.email,
      userType: user.userType,
    };

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(payload);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 900, // 15 minutes = 900 seconds
      },
    };
  }

  static async refreshToken(refreshToken: string) {
    if (!refreshToken) throw new Error('No refresh token provided');

    const decoded = verifyToken(refreshToken, 'refresh') as any;
    const payload = {
      id: decoded.id,
      organizationId: decoded.organizationId || '',
      email: decoded.email,
      userType: decoded.userType,
    };

    const { accessToken, refreshToken: newRefresh, expiresIn } = generateTokens(payload);

    return {
      access_token: accessToken,
      refresh_token: newRefresh,
      expires_in: expiresIn,
    };
  }
}
