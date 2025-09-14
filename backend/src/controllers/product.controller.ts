import { ProductService } from '../services/product.service';
import { Pagination } from '../types/common-types';
import { IProduct } from '../types/product';
import { User } from '../types/users';

export class ProductController {
  static async createProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>) {
    return await ProductService.createProduct(product, user);
  }
  static async updateProduct(product: IProduct, user: Pick<User, 'id' | 'organizationId'>) {
    return await ProductService.updateProduct(product, user);
  }
  static async removeProduct(productId: string, user: Pick<User, 'id' | 'organizationId'>) {
    await ProductService.removeProduct(productId, user);
  }
  static async getProduct(productId: string, user: Pick<User, 'id' | 'organizationId'>) {
    return await ProductService.getProduct(productId, user);
  }
  static async getProducts(user: Pick<User, 'id' | 'organizationId'>, pagination: Pagination) {
    return await ProductService.getProducts(user, pagination);
  }
}
