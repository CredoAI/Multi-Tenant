import express from 'express';
import { APIResponseFormat } from '../types/apiTypes';
import { errorLogger } from '../helpers/logger';
import { ProductOptionChoiceController } from './productOption-choice.controller';
export const productOptionChoiceRoute = express.Router();

productOptionChoiceRoute.post('/create', async (req, res) => {
  try {
    const data = await ProductOptionChoiceController.create(req.body, req.user!);
    const response: APIResponseFormat<any> = {
      message: 'product option choice created successfully',
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

productOptionChoiceRoute.patch('/update', async (req, res) => {
  try {
    const data = await ProductOptionChoiceController.update(req.body);
    const response: APIResponseFormat<any> = {
      message: 'product option choice created successfully',
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

productOptionChoiceRoute.delete('/delete/:id', async (req, res) => {
  try {
    const data = await ProductOptionChoiceController.remove(req.params.id);
    const response: APIResponseFormat<any> = {
      message: 'product option choice deleted successfully',
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

productOptionChoiceRoute.get('/get-one/:id', async (req, res) => {
  try {
    const data = await ProductOptionChoiceController.getOne(req.params.id);
    const response: APIResponseFormat<any> = {
      message: 'request successfully',
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

productOptionChoiceRoute.get('/get-many', async (req, res) => {
  try {
    const data = await ProductOptionChoiceController.getMany();
    const response: APIResponseFormat<any> = {
      message: 'request successfully',
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
