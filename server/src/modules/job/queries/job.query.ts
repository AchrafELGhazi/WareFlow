import { PrismaClient } from "@prisma/client";
class JobQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getJobInfoQuery = (jobCode: string) => {
    return this.prisma.$queryRaw`
        SELECT *
        FROM jobs
        WHERE job_code = ${jobCode}
      `;
  };

  createJobQuery = (
    jobCode: string,
    jobDescription: string,
    jobChargeHour: string
  ) => {
    return this.prisma.$queryRaw`
      INSERT INTO jobs (job_code, job_description, job_charge_hour)
      VALUES (${jobCode}, ${jobDescription}, ${parseInt(jobChargeHour)})
      RETURNING *;
    `;
  };

  updateJobQuery = (
    jobCode: string,
    jobDescription: string,
    jobChargeHour: string
  ) => {
    return this.prisma.$queryRaw`
      UPDATE jobs
      SET 
        job_description = ${jobDescription},
        job_charge_hour = ${parseInt(jobChargeHour)}
        WHERE job_code = ${jobCode}
    `;
  };

  async deleteJobQuery(jobId: string) {
    return this.prisma.$queryRaw`
    DELETE FROM jobs 
    WHERE job_code = ${jobId}
    `;
  }
}

export default new JobQueries();
