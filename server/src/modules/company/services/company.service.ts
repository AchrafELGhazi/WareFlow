import CompanyQueries from "../queries/company.query";
import { CompanyInfoResult, CompanyWithRelationsResult } from "../dtos/company.dto";

class CompanyServices {
  async getAllCompaniesService(): Promise<CompanyWithRelationsResult[]> {
    return await CompanyQueries.getAllCompaniesQuery();
  }

  async getCompanyInfoService(
    companyId: string
  ): Promise<CompanyInfoResult | null> {
    const results = await CompanyQueries.getCompanyInfoQuery(companyId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as CompanyInfoResult;
    }
    return null;
  }

  async updateCompanyService(
    companyId: string,
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ): Promise<CompanyInfoResult | null> {
    const results = await CompanyQueries.updateCompanyQuery(
      companyId,
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName
    );

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as CompanyInfoResult;
    }

    return null;
  }

  async deleteCompanyService(companyId: string): Promise<null> {
    await CompanyQueries.deleteCompanyQuery(companyId);

    return null;
  }

  async createCompanyService(
    companyName: string,
    companyDescription: string,
    taxId: string,
    industry: string,
    website: string,
    foundedDate: string,
    managerName: string
  ): Promise<null> {
    await CompanyQueries.createCompanyQuery(
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName
    );

    return null;
  }
}

export default new CompanyServices();
