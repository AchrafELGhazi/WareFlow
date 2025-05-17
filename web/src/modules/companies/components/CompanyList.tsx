import React from 'react';
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from '../api/companyApi';
import { useDispatch } from 'react-redux';
import { setSelectedCompany } from '../store/companySlice';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tag,
  message,
  Skeleton,
  Alert,
  Card,
  Typography,
} from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

// Add a proper interface for the Company type
interface Company {
  company_id: string;
  company_name: string;
  industry: string | null;
  manager_name: string | null;
  clients: any[];
  suppliers: any[];
}

const CompanyList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: companies, isLoading, error } = useGetCompaniesQuery();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const handleViewDetails = (companyId: string) => {
    dispatch(setSelectedCompany(companyId));
  };

  const handleDelete = async (companyId: string) => {
    try {
      await deleteCompany(companyId).unwrap();
      message.success('Company deleted successfully');
    } catch (error) {
      message.error('Failed to delete company');
    }
  };

  if (isLoading) {
    return (
      <Card style={{ margin: '16px' }}>
        <Skeleton active />
        <Skeleton active />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert
        message='Error Loading Companies'
        description='There was a problem loading the company data. Please try again later.'
        type='error'
        showIcon
        style={{ margin: '16px' }}
      />
    );
  }

  // Generate industry filters, excluding null/undefined values and properly typing
  const industryFilters = companies
    ? Array.from(
        new Set(
          companies
            .map(c => c.industry)
            .filter((industry): industry is string => !!industry)
        )
      ).map(industry => ({
        text: industry,
        value: industry,
      }))
    : [];

  const columns: ColumnsType<Company> = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      filters: industryFilters,
      onFilter: (value, record) => record.industry === value,
      render: (text: string | null) => <Tag color='blue'>{text || 'N/A'}</Tag>,
    },
    {
      title: 'Manager',
      dataIndex: 'manager_name',
      key: 'manager_name',
      render: (text: string | null) => text || 'N/A',
    },
    {
      title: 'Clients',
      key: 'clients',
      render: (_, record) => <Tag color='green'>{record.clients.length}</Tag>,
    },
    {
      title: 'Suppliers',
      key: 'suppliers',
      render: (_, record) => (
        <Tag color='purple'>{record.suppliers.length}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type='primary'
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.company_id)}
          >
            View
          </Button>
          <Popconfirm
            title='Delete this company?'
            description='Are you sure you want to delete this company? This action cannot be undone.'
            onConfirm={() => handleDelete(record.company_id)}
            okText='Yes'
            cancelText='No'
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} loading={isDeleting}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: '16px' }}>
      <Title level={4}>Companies</Title>
      <Table
        dataSource={companies || []}
        columns={columns}
        rowKey='company_id'
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};

export default CompanyList;
