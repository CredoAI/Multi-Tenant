import { WhatSappSettingsService } from '../services/whatapp-settings.service';
import { WhatSappAuthPayload } from '../types/whatsapp-settings';

export class WhatSappSettingsController {
  static getWhatSappAuthUrl() {
    return WhatSappSettingsService.getWhatSappAuthUrl();
  }
  static async exchangeWhatSappCodeForAccessTokens(data: WhatSappAuthPayload) {
    return await WhatSappSettingsService.exchangeWhatSappCodeForAccessTokens(data);
  }
}
