import { Router } from "express";
import warehouseController from "../controllers/warehouse.controller";

const warehouseRouter = Router()

warehouseRouter.get('/:warehouseId', warehouseController.getWarehouseInfoController)
warehouseRouter.patch("/:warehouseId/:managerId", warehouseController.updateWarehouseManagerController)
warehouseRouter.delete("/:warehouseId", warehouseController.deleteWarehouseController)

export default warehouseRouter;