import { OrganizationsModel } from '../models/organizations.model';

export class OrganizationService {
  constructor() {}
  async createOrganization() {
    const organization = await OrganizationsModel.create({
      name: '',
    });
  }
  async getOrganization(id: string) {}
  async updateOrganization(id: string, data: any) {}
}
