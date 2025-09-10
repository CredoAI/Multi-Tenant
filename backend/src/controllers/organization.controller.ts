import { OrganizationsModel } from '../models/organizations.model';
import { IOrganization } from '../types/organization';

export class OrganizationController {
  constructor() {}
  static async createOrganization(data: Omit<IOrganization, 'id'>) {
    return await OrganizationsModel.create(data);
  }
  static async getOrganization(id: string) {}
  static async updateOrganization(id: string, data: any) {}
}
