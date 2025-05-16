import { PrismaClient } from "@prisma/client";
class CompanyQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getCompanyInfoQuery = (companyId: string) => {
    return this.prisma.$queryRaw`
        SELECT *
        FROM companies c
        WHERE company_id = ${companyId}
      `;
  };

  createCompanyQuery = (
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ) => {
    console.log("Query values:", {
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName,
    });
    return this.prisma.$queryRaw`
      INSERT INTO companies (company_id, company_name, company_description, tax_id, industry, website, founded_date, manager_name)
      VALUES (gen_random_uuid(), ${companyName}, ${companyDescription}, ${taxId}, ${industry}, ${website}, ${foundedDate}::timestamp, ${managerName})
      RETURNING *;
    `;
  };

  updateCompanyQuery = (
    companyId: string,
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ) => {
    return this.prisma.$queryRaw`
      UPDATE companies
      SET 
        company_name = ${companyName},
        company_description = ${companyDescription},
        tax_id = ${taxId},
        industry = ${industry},
        website = ${website},
        founded_date = ${foundedDate}::timestamp,
        manager_name = ${managerName}
        WHERE company_id = ${companyId}
    `;
  };

  async deleteCompanyQuery(companyId: string) {
    return this.prisma.$queryRaw`
    DELETE FROM companies 
    WHERE company_id = ${companyId}
    `
  }
}

export default new CompanyQueries();
