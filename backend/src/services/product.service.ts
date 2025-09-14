import { ProductModel } from '../models/products.model';
import { Pagination } from '../types/common-types';
import { IProduct } from '../types/product';
import { User } from '../types/users';

export class ProductService {
  static async createProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>) {
    if (!user.organizationId) throw new Error('kindly create an organization to continue');
    return await ProductModel.create(product);
  }
  static async updateProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>) {
    const { id, ...productWithOutId } = product;
    if (!id) throw new Error('product id is required');
    if (!user.organizationId) throw new Error('kindly create an organization to continue');
    return await ProductModel.update(productWithOutId, { where: { id: id }, returning: true });
  }
  static async removeProduct(productId: string, user: Pick<User, 'id' | 'organizationId'>) {
    if (!productId) throw new Error('product id is required');
    return await ProductModel.destroy({ where: { id: productId } });
  }
  static async getProduct(productId: string, user: Pick<User, 'id' | 'organizationId'>) {
    if (!productId) throw new Error('product id is required');
    if (!user.organizationId) throw new Error('kindly create an organization to continue');
    return await ProductModel.findByPk(productId);
  }
  static async getProducts(user: Pick<User, 'id' | 'organizationId'>, { offset, limit, page }: Pagination) {
    const { rows: products, count: totalItems } = await ProductModel.findAndCountAll({
      where: { organizationId: user.organizationId! },
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    // prepare pagination info
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data: products,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
