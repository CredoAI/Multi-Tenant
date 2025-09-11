import express from 'express';
import { validatecreateOrganizationSchemaBody } from '../middleware/validation/organization';
import { OrganizationController } from '../controllers/organization.controller';
import { APIResponseFormat } from '../types/apiTypes';
import { IOrganization } from '../types/organization';
import { errorLogger } from '../helpers/logger';
import { authMiddleware } from '../middleware/authentication';

const organizationRoute = express.Router();

organizationRoute.post(
  '/create',
  validatecreateOrganizationSchemaBody(),
  authMiddleware,
  async (req, res): Promise<void> => {
    try {
      const body = req.body;
      const user = req.user;
      const data = (await OrganizationController.createOrganization(body, user!)) as any;

      const response: APIResponseFormat<IOrganization> = {
        message: 'organization created successfully',
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
  }
);

organizationRoute.post('/update-organization', authMiddleware, async (req, res) => {
  try {
    const organizationId = req.body.organizationId;
    const data = await OrganizationController.updateOrganization(organizationId, req.body);
    const response: APIResponseFormat<IOrganization> = {
      message: 'organization created successfully',
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

organizationRoute.get('/get-organization', authMiddleware, async (req, res) => {
  try {
    const data = await OrganizationController.getOrganization(req.query.id as string);
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

export { organizationRoute };
