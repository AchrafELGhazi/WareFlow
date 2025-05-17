import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import CompanyList from '../components/CompanyList';
import CompanyDetails from '../components/CompanyDetails';
import CompanyHeader from '../components/CompanyHeader';
import { useGetCompaniesQuery } from '../api/companyApi';
import CompanyEmptyState from '../components/CompanyEmptyState';
import { Layout, Spin } from 'antd';

const { Content } = Layout;

/**
 * Main page component for the Companies module
 * Shows either the list of all companies or details of a selected company
 */
const CompaniesPage: React.FC = () => {
  // Get the selected company ID from Redux store
  const selectedCompanyId = useSelector(
    (state: RootState) => state.company.selectedCompanyId
  );

  // Get companies data to check if there are any companies
  const { data: companies, isLoading } = useGetCompaniesQuery();

  // Determine the title and content based on the selected company and data
  const title = selectedCompanyId ? 'Company Details' : 'Company Management';

  let content;
  if (isLoading) {
    content = (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}
      >
        <Spin size='large' tip='Loading companies...' />
      </div>
    );
  } else if (!companies || companies.length === 0) {
    content = (
      <CompanyEmptyState message='No companies found. Add your first company to get started.' />
    );
  } else if (selectedCompanyId) {
    content = <CompanyDetails companyId={selectedCompanyId} />;
  } else {
    content = <CompanyList />;
  }

  return (
    <Layout className='companies-page'>
      <CompanyHeader title={title} showCreateButton={!selectedCompanyId} />

      <Content style={{ padding: '0 16px', marginBottom: 16 }}>
        {content}
      </Content>
    </Layout>
  );
};

export default CompaniesPage;
