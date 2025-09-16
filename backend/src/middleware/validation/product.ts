import { z } from "zod";
import { Request, Response, NextFunction } from 'express';
import { ProductStatusTypes } from "../../data/data-types";

// Product schema
const supportStatuses = Object.values(ProductStatusTypes)
export const productSchema = z.object({
  id: z.string().uuid().optional(),
  sku: z.string().min(1, "SKU is required").optional(),
  status: z.enum(supportStatuses as any).optional(),
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
  description: z.string(),
  currency: z.string().length(3, "Currency must be 3 letters"),
  metaProductId: z.string().optional(),
  imageUrl: z.string().url().optional(),
  fileFullPath: z.string().optional(),
});

export function validatecreateProductSchemaBody() {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = productSchema.safeParse(req.body);
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