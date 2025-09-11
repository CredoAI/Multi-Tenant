// adjust import to your project

import { UserTypes } from '../data/data-types';

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      organizationId?: string;
      email: string;
      userType: `${UserTypes}`;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
