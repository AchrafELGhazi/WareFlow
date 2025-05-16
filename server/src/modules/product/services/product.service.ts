import ProductQueries from "../queries/product.query";
import { ProductInfoResult } from "../dtos/product.dto";

class ProductServices {
  async getProductInfoService(
    productId: string
  ): Promise<ProductInfoResult | null> {
    const results = await ProductQueries.getProductInfoQuery(productId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as ProductInfoResult;
    }
    return null;
  }

  async updateProductService(
    productId: string,
    productName: string,
    warehouseId: string,
    categoryId: string,
    clientId: string
  ): Promise<ProductInfoResult | null> {
    const results = await ProductQueries.updateProductQuery(
      productId,
      productName,
      warehouseId,
      categoryId,
      clientId
    );

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as ProductInfoResult;
    }

    return null;
  }

  async deleteProductService(productId: string): Promise<null> {
    await ProductQueries.deleteProductQuery(productId);

    return null;
  }

  async createProductService(
    productName: string,
    warehouseId: string,
    categoryId: string,
    clientId: string
  ): Promise<null> {
    await ProductQueries.createProductQuery(
      productName,
      warehouseId,
      categoryId,
      clientId
    );

    return null;
  }
}

export default new ProductServices();
