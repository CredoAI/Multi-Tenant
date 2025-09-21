import type { BusinessType } from '../data/data-types';
import type { IWhatSappSettings } from './whatsapp';

export interface IOrganization {
  id: string; // uuid
  name: string;
  brandTone: string;
  businessType: `${BusinessType}`;
  AIAssistantName:string
  Whatsappsettings: IWhatSappSettings[];
}
