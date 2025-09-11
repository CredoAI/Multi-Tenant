import { BusinessType, WhatSappConnectionStatus } from '../data/data-types';

export interface IOrganization {
  id: string; // uuid
  name: string;
  email: string;
  password: string;
  brandTone: string;
  businessType: `${BusinessType}`;
  whatsappBusinessId?: string | null;
  whatsappPhoneNumberId?: string | null;
  whatsappStatus: `${WhatSappConnectionStatus}`;
  whatsappTemplates: string[];
  AIAssistantName?: string | null;
}
