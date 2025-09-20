import express from 'express';
import { errorLogger } from '../helpers/logger';
import { validateSignUpSchema } from '../middleware/validation/sign-up';
import { UserController } from '../controllers/user.controller';
import { APIResponseFormat } from '../types/apiTypes';
import { authMiddleware } from '../middleware/authentication';

const userRoute = express.Router();

userRoute.post('/sign-up', validateSignUpSchema(), async (req, res) => {
  try {
    const data = await UserController.signUp(req.body);
    const response: APIResponseFormat<any> = {
      message: 'user created successfully',
      data,
    };
    res.cookie('auth_tokens', data.tokens, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.get('/sign-up-with-google', async (req, res) => {
  try {
    const data = await UserController.signUpWithGoogle();
    const response: APIResponseFormat<any> = {
      message: 'google auth url created successfully',
      data,
    };
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.get('/sign-in-with-google', async (req, res) => {
  try {
    const data = await UserController.signInWithGoogle();
    const response: APIResponseFormat<any> = {
      message: 'google auth url created successfully',
      data,
    };
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.post('/exchange-google-auth-code-signup', async (req, res) => {
  try {
    const data = await UserController.exchangeGoogleAuthCodeForSignUp(req.body.code);
    const response: APIResponseFormat<any> = {
      message: 'google auth is successfully',
      data,
    };
    res.cookie('auth_tokens', data.tokens, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.post('/exchange-google-auth-code-signin', async (req, res) => {
  try {
    const data = await UserController.exchangeGoogleAuthCodeForSignIn(req.body.code);
    const response: APIResponseFormat<any> = {
      message: 'google auth is successfully',
      data,
    };
    res.cookie('auth_tokens', data.tokens, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.post('/login', async (req, res) => {
  try {
    const data = await UserController.login(req.body);
    const response: APIResponseFormat<any> = {
      message: 'login successfully',
      data,
    };
    res.cookie('auth_tokens', data.tokens, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const data = await UserController.refreshToken(refreshToken);
    const response: APIResponseFormat<any> = {
      message: 'token refreshed successfully',
      data,
    };
    res.cookie('auth_tokens', data, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

userRoute.get('/current-user', authMiddleware, async (req: any, res) => {
  try {
    const data = await UserController.getCurrentUser(req.user);
    const response: APIResponseFormat<any> = {
      message: 'user retrieved successfully',
      data,
    };
    res.status(201).json(response);
  } catch (error: any) {
    const response: APIResponseFormat<null> = {
      message: error.message,
      error: error,
    };
    errorLogger(error);
    res.status(500).json(response);
  }
});

export { userRoute };
