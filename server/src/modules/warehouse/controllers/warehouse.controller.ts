import { Request, Response } from "express";
import WarehouseServices from "../services/warehouse.services";

class WarehouseController {

  getWarehouseInfoController = async (req: Request, res: Response): Promise<void> => {
    const { warehouseId } = req.params;
    try {
      const warehouse = await WarehouseServices.getWarehouseInfoService(warehouseId);
      if (!warehouse) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        warehouse,
      });
    } catch (error) {
      console.error("Error fetching warehouse info:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  updateWarehouseManagerController = async (req: Request, res: Response): Promise<void> => {
      const { warehouseId, managerId } = req.params;
  
      try {
        await WarehouseServices.updateWarehouseManagerService(warehouseId, managerId);
        res.status(200).json({
          success: true,
        });
      } catch (error) {
        console.error("Error updating manager of the warehouse:", error);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    };

    deleteWarehouseController = async (req: Request, res: Response): Promise<void> => {

        const { warehouseId } = req.params;
        try {
            await WarehouseServices.deleteWarehouseService(warehouseId);
            res.status(200).json({
              success: true,
            });
          } catch (error) {
            console.error("Error deleting warehouse:", error);
            res.status(500).json({
              success: false,
              message: "Server Error",
            });
          }
    }
}

export default new WarehouseController();
