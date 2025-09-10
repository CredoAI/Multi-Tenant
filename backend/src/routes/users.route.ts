import express from 'express';
import { errorLogger } from '../helpers/logger';
import { validateSignUpSchema } from '../middleware/validation/sign-up';
import { UserController } from '../controllers/user.controller';
import { APIResponseFormat } from '../types/apiTypes';

const userRoute = express.Router();

userRoute.post('/sign-up', validateSignUpSchema(), async (req, res) => {
  try {
    const data = await UserController.signUp(req.body);
    const response: APIResponseFormat<any> = {
      message: 'user created successfully',
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

userRoute.post('/login', async (req, res) => {
  try {
    const data = await UserController.login(req.body);
    const response: APIResponseFormat<any> = {
      message: 'login successfully',
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

userRoute.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const data = await UserController.refreshToken(refreshToken);
    const response: APIResponseFormat<any> = {
      message: 'token refreshed successfully',
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
