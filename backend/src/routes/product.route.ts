import express from 'express';
import { authMiddleware } from '../middleware/authentication';
import { APIResponseFormat } from '../types/apiTypes';
import { errorLogger } from '../helpers/logger';
import { ProductController } from '../controllers/product.controller';

export const productRoute = express.Router();

productRoute.post('/create-product', authMiddleware, async (req, res) => {
  try {
    const data = await ProductController.createProduct(req.body, req.user!);
    const response: APIResponseFormat<any> = {
      message: 'product created successfully',
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

productRoute.put('/products/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductController.updateProduct({ ...req.body, id }, req.user!);
    const response: APIResponseFormat<any> = {
      message: 'product updated successfully',
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

productRoute.delete('/products/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    await ProductController.removeProduct(id, req.user!);
    const response: APIResponseFormat<any> = {
      message: 'product updated successfully',
      data: null,
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

productRoute.get('/products/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductController.getProduct(id, req.user!);
    const response: APIResponseFormat<any> = {
      message: 'product updated successfully',
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

productRoute.get('/branches', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // calculate offset
    const offset = (page - 1) * limit;
    const data = await ProductController.getProducts(req.user!, { page, limit, offset });
    const response: APIResponseFormat<any> = {
      message: 'product retreived successfully',
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
