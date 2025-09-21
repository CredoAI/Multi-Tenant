import type { WhatSappConnectionStatus } from "../data/data-types";

export interface IWhatSappSettings {
  id: string;
  organizationId: string | null;
  whatsappBusinessId: string;
  whatsappPhoneNumberIds: string[];
  connectionStatus: `${WhatSappConnectionStatus}`;
  isSubscribedToWebhook: boolean;
  whatsappTemplates: string[];
  catalogId?: string;
}