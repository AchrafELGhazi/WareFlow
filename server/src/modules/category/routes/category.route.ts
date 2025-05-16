import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.post('/', CategoryController.createCategoryController);
categoryRouter.get(
  '/:categoryId',
  CategoryController.getCategoryInfoController
);
categoryRouter.patch(
  '/:categoryId',
  CategoryController.updateCategoryController
);
categoryRouter.delete(
  '/:categoryId',
  CategoryController.deleteCategoryController
);

export default categoryRouter;
