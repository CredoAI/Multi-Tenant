import { ProductOptionChoiceModel } from '../models/product-option-choice.model';
import { ProductOptionChoice } from '../types/product-option';

export class ProductOptionChoiceService {
  async create(data: Omit<ProductOptionChoice, 'id'>): Promise<ProductOptionChoiceModel> {
    return await ProductOptionChoiceModel.create(data);
  }

  async update(id: string, data: Partial<Omit<ProductOptionChoice, 'id'>>): Promise<ProductOptionChoiceModel | null> {
    const choice = await ProductOptionChoiceModel.findByPk(id);
    if (!choice) return null;

    return await choice.update(data);
  }

  async remove(id: string): Promise<boolean> {
    const deleted = await ProductOptionChoiceModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }

  async getOne(id: string): Promise<ProductOptionChoiceModel | null> {
    return await ProductOptionChoiceModel.findByPk(id, {
      include: [
        {
          association: 'productOption',
        },
      ],
    });
  }

  async getMany(filters?: { productOptionId?: string; isDefault?: boolean }): Promise<ProductOptionChoiceModel[]> {
    const where: any = {};

    if (filters?.productOptionId) {
      where.productOptionId = filters.productOptionId;
    }
    if (filters?.isDefault !== undefined) {
      where.isDefault = filters.isDefault;
    }

    return await ProductOptionChoiceModel.findAll({
      where,
      include: [
        {
          association: 'productOption',
        },
      ],
    });
  }
}
