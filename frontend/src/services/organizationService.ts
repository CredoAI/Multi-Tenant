import type { IOrganization } from '../types/organization';
import { ApiClient } from './apiClient';

export class OrganizationService {
  constructor() {}

  async createOrganization(name: string, businessType: string): Promise<{ data: IOrganization; message: string }> {
    return await ApiClient('CREATE_ORGANIZATION', {
      method: 'POST',
      body: { name, businessType },
    });
  }

  async getOrganization(): Promise<{ data: IOrganization; message: string }> {
    return await ApiClient('GET_OGANIZATION');
  }
}
