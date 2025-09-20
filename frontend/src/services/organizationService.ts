import { ApiClient } from './apiClient';

export class OrganizationService {
  constructor() {}

  async createOrganization(name: string, businessType: string) {
    return await ApiClient('CREATE_ORGANIZATION', {
      method: 'POST',
      body: { name, businessType },
    });
  }
}
