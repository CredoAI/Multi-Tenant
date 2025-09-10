import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { supportedBusinessTypes, WhatSappConnectionStatus } from '../../data/business-type';

export const createOrganizationSchema = z.object({
  businessType: z.enum(supportedBusinessTypes as any),
  whatsappBusinessId: z.string().trim().optional(),
  whatsappPhoneNumberId: z.string().trim().optional(),
  whatsappStatus: z.enum(Object.values(WhatSappConnectionStatus) as any).optional(),
  whatsappTemplates: z.array(z.string()).optional(),
  AIAssistantName: z.string().trim().optional(),
  brandTone: z.string().trim().optional(),
});

export function validatecreateOrganizationSchemaBody() {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = createOrganizationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'validation failed',
        errors: parsed.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.body = parsed.data; // use the parsed/typed data
    next();
  };
}
