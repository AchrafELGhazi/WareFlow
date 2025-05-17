import { Request, Response } from "express";
import CompanyServices from "../services/company.service";

class CompanyController {
  getAllCompaniesController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const companies = await CompanyServices.getAllCompaniesService();
      res.status(200).json({
        success: true,
        companies,
      });
    } catch (error) {
      console.error('Error fetching all companies:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  getCompanyInfoController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { companyId } = req.params;
    try {
      const company = await CompanyServices.getCompanyInfoService(companyId);
      if (!company) {
        res.status(404).json({
          success: false,
          message: 'Company not found',
        });
        return;
      }
      res.status(200).json({
        success: true,
        company,
      });
    } catch (error) {
      console.error('Error fetching company info:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  createCompanyController = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const {
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName,
    } = req.body;

    if (
      !companyName ||
      !companyDescription ||
      !taxId ||
      !industry ||
      !website ||
      !foundedDate ||
      !managerName
    ) {
      return res.status(400).send({
        message: 'All company fields are required',
        missingFields: Object.entries({
          companyName,
          companyDescription,
          taxId,
          industry,
          website,
          foundedDate,
          managerName,
        })
          .filter(([_, value]) => !value)
          .map(([key]) => key),
      });
    }

    try {
      const company = await CompanyServices.createCompanyService(
        companyName,
        companyDescription,
        taxId,
        industry,
        website,
        foundedDate,
        managerName
      );

      return res.status(201).send({
        company,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        return res.status(409).send(e);
      }

      console.error('Error creating company:', e);
      return res
        .status(500)
        .send({ message: 'Internal server error', error: e.message });
    }
  };

  updateCompanyController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { companyId } = req.params;
    const {
      companyName,
      companyDescription,
      taxId,
      industry,
      website,
      foundedDate,
      managerName,
    } = req.body;

    try {
      await CompanyServices.updateCompanyService(
        companyId,
        companyName,
        companyDescription,
        taxId,
        industry,
        website,
        foundedDate,
        managerName
      );
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error('Error updating manager of the company:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };

  deleteCompanyController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { companyId } = req.params;
    try {
      await CompanyServices.deleteCompanyService(companyId);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
  };
}

export default new CompanyController();
