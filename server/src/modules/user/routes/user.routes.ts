import { Router } from "express";
import userController from "../controllers/user.controller";
import { getUserInfoSchema } from "../schemas/user.schema";
import { authenticate, validateSchema } from "../../../middlewares";

const userRouter = Router();

userRouter.get(
  "/:userId",
    validateSchema(getUserInfoSchema),
  userController.getUserInfo
);

userRouter.patch("/:userId/:role", userController.updateUserRole)

export default userRouter;
