import { OrganizationService } from '../services/organization.service';
import { IOrganization } from '../types/organization';
import { User } from '../types/users';

export class OrganizationController {
  constructor() {}
  static async createOrganization(data: Omit<IOrganization, 'id'>, user: Pick<User, 'id'>): Promise<any> {
    return await OrganizationService.createOrganization(data, user);
  }
  static async getOrganization(organizationId: string): Promise<any> {
    if (!organizationId) throw new Error('organizationId is required');
    return await OrganizationService.getOrganization(organizationId);
  }
  static async updateOrganization(organizationId: string, data: any): Promise<any> {
    if (!organizationId) throw new Error('organizationId is required');
    return await OrganizationService.updateOrganization(organizationId, data);
  }
}
