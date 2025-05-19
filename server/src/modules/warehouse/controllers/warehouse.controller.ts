import { Request, Response } from 'express';
import WarehouseServices from '../services/warehouse.services';

class WarehouseController {
  getAllWarehousesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const warehousesData = await WarehouseServices.getAllWarehousesService();
      res.status(200).json({
        success: true,
        ...warehousesData,
      });
    } catch (error) {
      console.error('Error fetching all warehouses:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  getWarehouseInfoController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { warehouseId } = req.params;
    try {
      const warehouse = await WarehouseServices.getWarehouseInfoService(
        warehouseId
      );
      if (!warehouse) {
        res.status(404).json({
          success: false,
          message: 'Warehouse not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        warehouse,
      });
    } catch (error) {
      console.error('Error fetching warehouse info:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  createWarehouseController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { warehouseName, managerId } = req.body;

    try {
      const warehouse = await WarehouseServices.createWarehouseService(
        warehouseName,
        managerId
      );

      return res.status(201).json({
        success: true,
        warehouse,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Duplicate entry',
          error: e,
        });
      }

      console.error('Error creating warehouse:', e);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: e.message,
      });
    }
  };

  updateWarehouseManagerController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { warehouseId, managerId } = req.params;

    try {
      const warehouse = await WarehouseServices.updateWarehouseManagerService(
        warehouseId,
        managerId
      );

      if (!warehouse) {
        res.status(404).json({
          success: false,
          message: 'Warehouse or manager not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        warehouse,
      });
    } catch (error) {
      console.error('Error updating manager of the warehouse:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  deleteWarehouseController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { warehouseId } = req.params;
    try {
      const success = await WarehouseServices.deleteWarehouseService(
        warehouseId
      );

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Warehouse not found or could not be deleted',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Warehouse successfully deleted',
      });
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
}

export default new WarehouseController();
