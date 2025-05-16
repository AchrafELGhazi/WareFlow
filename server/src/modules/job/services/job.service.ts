import JobQueries from "../queries/job.query";
import { JobInfoResult } from "../dtos/job.dto";

class JobServices {
  async getJobInfoService(jobCode: string): Promise<JobInfoResult | null> {
    const results = await JobQueries.getJobInfoQuery(jobCode);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as JobInfoResult;
    }
    return null;
  }

  async updateJobService(
    jobCode: string,
    jobDescription: string,
    jobChargeHour: string
  ): Promise<JobInfoResult | null> {
    const results = await JobQueries.updateJobQuery(
      jobCode,
      jobDescription,
      jobChargeHour
    );

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as JobInfoResult;
    }

    return null;
  }

  async deleteJobService(jobId: string): Promise<null> {
    await JobQueries.deleteJobQuery(jobId);

    return null;
  }

  async createJobService(
    jobCode: string,
    jobDescription: string,
    jobChargeHour: string
  ): Promise<null> {
    await JobQueries.createJobQuery(jobCode, jobDescription, jobChargeHour);

    return null;
  }
}

export default new JobServices();
