import express from 'express';
import { validatecreateOrganizationSchemaBody } from '../middleware/validation/organization';
import { OrganizationController } from '../controllers/organization.controller';
import { APIResponseFormat } from '../types/apiTypes';
import { IOrganization } from '../types/organization';
import { errorLogger } from '../helpers/logger';

const route = express.Router();

route.post('/create', validatecreateOrganizationSchemaBody(), async (req, res): Promise<void> => {
  try {
    const body = req.body;
    const data = (await OrganizationController.createOrganization(body)) as any;

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

export { route };
