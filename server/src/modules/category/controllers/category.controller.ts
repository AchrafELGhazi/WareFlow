import { Request, Response } from "express";
import CategoryServices from "../services/category.service";

class CategoryController {
  getCategoryInfoController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { categoryId } = req.params;
    try {
      const category = await CategoryServices.getCategoryInfoService(
        categoryId
      );
      if (!category) {
        res.status(404).json({
          success: false,
          message: "Category not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      console.error("Error fetching category info:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  createCategoryController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { categoryName, categoryDescription } = req.body;

    if (!categoryName) {
      return res.status(400).send({
        message: "All category fields are required",
        missingFields: Object.entries({
          categoryName,
          categoryDescription,
        })
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      });
    }

    try {
      const category = await CategoryServices.createCategoryService(
        categoryName,
        categoryDescription
      );

      return res.status(201).send({
        category,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send(e);
      }

      console.error("Error creating category:", e);
      return res
        .status(500)
        .send({ message: "Internal server error", error: e.message });
    }
  };

  updateCategoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { categoryId } = req.params;
    const { categoryName, categoryDescription } = req.body;

    try {
      await CategoryServices.updateCategoryService(
        categoryId,
        categoryName,
        categoryDescription
      );
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error updating manager of the category:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  deleteCategoryController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { categoryId } = req.params;
    try {
      await CategoryServices.deleteCategoryService(categoryId);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
}

export default new CategoryController();
