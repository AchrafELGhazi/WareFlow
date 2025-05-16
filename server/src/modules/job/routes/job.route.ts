import { Router } from "express";
import JobController from "../controllers/job.controller";

const jobRouter = Router()

jobRouter.post('/', JobController.createJobController)
jobRouter.get('/:jobCode', JobController.getJobInfoController)
jobRouter.patch("/:jobCode", JobController.updateJobController)
jobRouter.delete("/:jobCode", JobController.deleteJobController)

export default jobRouter;