import { Router } from "express";
import ProductController from "../controllers/product.controller";

const productRouter = Router()

productRouter.post('/', ProductController.createProductController)
productRouter.get('/:productId', ProductController.getProductInfoController)
productRouter.patch("/:productId", ProductController.updateProductController)
productRouter.delete("/:productId", ProductController.deleteProductController)

export default productRouter;