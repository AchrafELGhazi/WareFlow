import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("i entred user controller")
      const users = await UserService.getAllUsersService();
      console.log(users)
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
  getUserInfo = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
      const user = await UserService.getUserInfoService(userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  updateUserRole = async (req: Request, res: Response): Promise<void> => {
    const { userId, role } = req.params;

    try {
      await UserService.updateUserRoleService(userId, role);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
}

export default new UserController();
