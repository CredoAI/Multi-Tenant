import { ImageUploadHelper } from '../helpers/image-upload';
import { validateFile } from '../middleware/validation/file';
import { ProductModel } from '../models/products.model';
import { Pagination } from '../types/common-types';
import { File } from '../types/file';
import { IProduct } from '../types/product';
import { User } from '../types/users';

export class ProductService {
  static async createProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>, file: File) {
    if (!user.organizationId) throw new Error('kindly create an organization to continue');
    const { valid, errors } = validateFile(file);
    if (!valid) throw new Error(errors.join(', '));
    const manageImageFile = new ImageUploadHelper();
    const createdProduct = await ProductModel.create({
      ...product,
      organizationId: user.organizationId,
      metaProductId: 'ddedde',
    });
    const { imgUrl, path } = await manageImageFile.uploadImage(file);
    return await ProductModel.update(
      { imageUrl: imgUrl, filePath: path },
      { where: { id: createdProduct.id }, returning: true }
    );
  }
  static async updateProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>, file: File) {
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
