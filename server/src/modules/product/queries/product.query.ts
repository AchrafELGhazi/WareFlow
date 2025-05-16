import { PrismaClient } from "@prisma/client";
class ProductQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getProductInfoQuery = (productId: string) => {
    return this.prisma.$queryRaw`
        SELECT *
        FROM products
        WHERE product_id = ${productId}
      `;
  };

  createProductQuery = (
    productName: string,
    warehouseId: string,
    categoryId: string,
    clientId: string
  ) => {
    return this.prisma.$queryRaw`
      INSERT INTO products (product_id, product_name, warehouse_id, category_id, client_id)
      VALUES (gen_random_uuid(), ${productName}, ${warehouseId}, ${categoryId}, ${clientId})
      RETURNING *;
    `;
  };

  updateProductQuery = (
    productId: string,
    productName: string,
    warehouseId: string,
    categoryId: string,
    clientId: string
  ) => {
    return this.prisma.$queryRaw`
      UPDATE products
      SET 
        product_name = ${productName},
        warehouse_id = ${warehouseId},
        category_id = ${categoryId},
        client_id = ${clientId}
        WHERE product_id = ${productId}
    `;
  };

  async deleteProductQuery(productId: string) {
    return this.prisma.$queryRaw`
    DELETE FROM products 
    WHERE product_id = ${productId}
    `;
  }
}

export default new ProductQueries();
