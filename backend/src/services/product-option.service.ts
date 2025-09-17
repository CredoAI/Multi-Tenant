import { ProductOptionModel } from '../models/product-option.model';
import { ProductOption } from '../types/product-option';

export class ProductOptionService {
  async create(data: Omit<ProductOption, 'id'>): Promise<ProductOptionModel> {
    return await ProductOptionModel.create(data);
  }

  async update(id: string, data: Partial<Omit<ProductOption, 'id'>>): Promise<ProductOptionModel | null> {
    const option = await ProductOptionModel.findByPk(id);
    if (!option) return null;

    return await option.update(data);
  }

  async remove(id: string): Promise<boolean> {
    const deleted = await ProductOptionModel.destroy({
      where: { id },
    });
    return deleted > 0;
  }

  async getOne(id: string): Promise<ProductOptionModel | null> {
    return await ProductOptionModel.findByPk(id, {
      include: [
        {
          association: 'productOptionChoice',
        },
      ],
    });
  }

  async getMany(filters?: {
    productId?: string;
    isRequired?: boolean;
    type?: ProductOption['type'];
  }): Promise<ProductOptionModel[]> {
    const where: any = {};

    if (filters?.productId) {
      where.productId = filters.productId;
    }
    if (filters?.isRequired !== undefined) {
      where.isRequired = filters.isRequired;
    }
    if (filters?.type) {
      where.type = filters.type;
    }

    return await ProductOptionModel.findAll({
      where,
      include: [
        {
          association: 'productOptionChoice',
        },
      ],
    });
  }
}
