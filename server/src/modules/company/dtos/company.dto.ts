export interface CompanyInfoResult {
    company_name: string;
    company_description: string | null;
    tax_id: string | null;
    industry: string | null;
    website: string | null;
    founded_date: string | null;
    manager_name: string | null;
}