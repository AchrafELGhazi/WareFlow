import CategoryQueries from "../queries/category.query";
import { CategoryInfoResult } from "../dtos/category.dto";

class CategoryServices {
  async getCategoryInfoService(
    categoryId: string
  ): Promise<CategoryInfoResult | null> {
    const results = await CategoryQueries.getCategoryInfoQuery(categoryId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as CategoryInfoResult;
    }
    return null;
  }

  async updateCategoryService(
    categoryId: string,
    categoryName: string,
    categoryDescription: string,
  ): Promise<CategoryInfoResult | null> {
    const results = await CategoryQueries.updateCategoryQuery(
      categoryId,
      categoryName,
      categoryDescription
    );

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as CategoryInfoResult;
    }

    return null;
  }

  async deleteCategoryService(categoryId: string): Promise<null> {
    await CategoryQueries.deleteCategoryQuery(categoryId);

    return null;
  }

  async createCategoryService(
    categoryName: string,
    categoryDescription: string,
  ): Promise<null> {
    await CategoryQueries.createCategoryQuery(
      categoryName,
      categoryDescription
    );

    return null;
  }
}

export default new CategoryServices();
