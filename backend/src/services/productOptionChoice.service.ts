import { ProductOptionChoiceModel } from '../models/product-option-choice.model';
import { ProductOptionChoice } from '../types/product-option';
import { User } from '../types/users';

export class ProductOptionChoiceService {
  static async create(
    data: Omit<ProductOptionChoice, 'id'>,
    user: Pick<User, 'id' | 'organizationId'>
  ): Promise<ProductOptionChoiceModel> {
    if (user.organizationId) throw new Error('kindly create an organization to continue');
    return await ProductOptionChoiceModel.create(data);
  }

  static async update(data: Partial<ProductOptionChoice>): Promise<ProductOptionChoiceModel | null> {
    const choice = await ProductOptionChoiceModel.findByPk(data.id);
    if (!choice) throw new Error('Product option choice not found');
    return await choice.update(data, { returning: true });
  }

  static async remove(id: string): Promise<boolean> {
    const deleted = await ProductOptionChoiceModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }

  static async getOne(id: string): Promise<ProductOptionChoiceModel | null> {
    return await ProductOptionChoiceModel.findByPk(id, {
      include: [
        {
          association: 'productOption',
        },
      ],
    });
  }

  static async getMany(filters?: {
    productOptionId?: string;
    isDefault?: boolean;
  }): Promise<ProductOptionChoiceModel[]> {
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
