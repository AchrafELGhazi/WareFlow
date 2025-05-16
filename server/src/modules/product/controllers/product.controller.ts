import { Request, Response } from "express";
import ProductServices from "../services/product.service";

class ProductController {
  getProductInfoController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { productId } = req.params;
    try {
      const product = await ProductServices.getProductInfoService(productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error fetching product info:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  createProductController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { productName, warehouseId, categoryId, clientId } = req.body;

    if (!productName || !warehouseId || !categoryId || !clientId) {
      return res.status(400).send({
        message: "All product fields are required",
        missingFields: Object.entries({
          productName,
          warehouseId,
          categoryId,
        })
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      });
    }

    try {
      const product = await ProductServices.createProductService(
        productName,
        warehouseId,
        categoryId,
        clientId
      );

      return res.status(201).send({
        product,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send(e);
      }

      console.error("Error creating product:", e);
      return res
        .status(500)
        .send({ message: "Internal server error", error: e.message });
    }
  };

  updateProductController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { productId } = req.params;
    const { productName, warehouseId, categoryId, clientId } = req.body;

    try {
      await ProductServices.updateProductService(
        productId,
        productName,
        warehouseId,
        categoryId,
        clientId
      );
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error updating manager of the product:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  deleteProductController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { productId } = req.params;
    try {
      await ProductServices.deleteProductService(productId);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
}

export default new ProductController();
