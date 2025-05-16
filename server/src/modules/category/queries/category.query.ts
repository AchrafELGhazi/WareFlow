import { PrismaClient } from "@prisma/client";
class CategoryQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getCategoryInfoQuery = (categoryId: string) => {
    return this.prisma.$queryRaw`
        SELECT *
        FROM categories
        WHERE category_id = ${categoryId}
      `;
  };

  createCategoryQuery = (
    categoryName: string,
    categoryDescription: string,
  ) => {
    return this.prisma.$queryRaw`
      INSERT INTO categories (category_id, category_name, category_description)
      VALUES (gen_random_uuid(), ${categoryName}, ${categoryDescription})
      RETURNING *;
    `;
  };

  updateCategoryQuery = (
    categoryId: string,
    categoryName: string,
    categoryDescription: string,
  ) => {
    return this.prisma.$queryRaw`
      UPDATE categories
      SET 
        category_name = ${categoryName},
        category_description = ${categoryDescription}
        WHERE category_id = ${categoryId}
    `;
  };

  async deleteCategoryQuery(categoryId: string) {
    return this.prisma.$queryRaw`
    DELETE FROM categories
    WHERE category_id = ${categoryId}
    `;
  }
}

export default new CategoryQueries();
