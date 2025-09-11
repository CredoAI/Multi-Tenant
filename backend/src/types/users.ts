import { AuthType, UserTypes } from '../data/data-types';

export interface ISignUp {
  id: string; // uuid
  name: string;
  email: string;
  password: string;
  bussinessName: string;
  userType: `${UserTypes}`;
  authType: `${AuthType}`;
}

export interface User {
  id: string;
  organizationId?: string | null;
  name: string;
  email: string;
  password: string;
  userType: `${UserTypes}`;
}
