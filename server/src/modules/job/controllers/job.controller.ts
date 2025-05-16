import { Request, Response } from "express";
import JobServices from "../services/job.service";

class JobController {

  getJobInfoController = async (req: Request, res: Response): Promise<void> => {
    const { jobCode } = req.params;
    try {
      const job = await JobServices.getJobInfoService(jobCode);
      if (!job) {
        res.status(404).json({
          success: false,
          message: "Job not found",
        });
        return;
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      console.error("Error fetching job info:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  createJobController = async (req: Request, res: Response): Promise<any> => {
    const { jobCode, jobDescription, jobChargeHour } = req.body;

    if (!jobDescription || !jobChargeHour) {
      return res.status(400).send({
        message: "All job fields are required",
        missingFields: Object.entries({
          jobDescription,
          jobChargeHour,
        })
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      });
    }

    try {
      const job = await JobServices.createJobService(
        jobCode,
        jobDescription,
        jobChargeHour
      );

      return res.status(201).send({
        job,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send(e);
      }

      console.error("Error creating job:", e);
      return res
        .status(500)
        .send({ message: "Internal server error", error: e.message });
    }
  };

  updateJobController = async (req: Request, res: Response): Promise<void> => {
    const { jobCode } = req.params;
    const { jobDescription, jobChargeHour } = req.body;

    try {
      await JobServices.updateJobService(jobCode, jobDescription, jobChargeHour);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error updating the job:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  deleteJobController = async (req: Request, res: Response): Promise<void> => {
    const { jobCode } = req.params;
    try {
      await JobServices.deleteJobService(jobCode);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
}

export default new JobController();
