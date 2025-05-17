import React from 'react';
import {
  useGetCompanyByIdQuery,
  useDeleteCompanyMutation,
} from '../api/companyApi';
import { useDispatch } from 'react-redux';
import { setSelectedCompany } from '../store/companySlice';
import {
  Card,
  Descriptions,
  Button,
  Tabs,
  Table,
  Skeleton,
  Alert,
  Typography,
  Popconfirm,
  message,
  Row,
  Col,
  Statistic,
  Space,
  Tag,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  GlobalOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface CompanyDetailsProps {
  companyId: string;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ companyId }) => {
  const dispatch = useDispatch();
  const { data: company, isLoading, error } = useGetCompanyByIdQuery(companyId);
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const handleBackToList = () => {
    dispatch(setSelectedCompany(null));
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(companyId).unwrap();
      message.success('Company deleted successfully');
      dispatch(setSelectedCompany(null));
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

  if (error || !company) {
    return (
      <Alert
        message='Error Loading Company'
        description='There was a problem loading the company details. Please try again later.'
        type='error'
        showIcon
        style={{ margin: '16px' }}
      />
    );
  }

  // Ensure these properties exist or default to empty arrays
  const clients = company.clients || [];
  const suppliers = company.suppliers || [];
  const profiles = company.profiles || [];

  const clientColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => `${record.user?.username || 'N/A'}`,
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Credit Limit',
      dataIndex: 'creditLimit',
      key: 'creditLimit',
      render: (value: any) => (value ? `$${value.toLocaleString()}` : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      render: (status: string) => {
        if (!status) return <Tag color='gray'>N/A</Tag>;
        let color = 'green';
        if (status === 'inactive') color = 'volcano';
        if (status === 'pending') color = 'geekblue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Products',
      key: 'products',
      render: (_: any, record: any) => (
        <Tag color='blue'>{record.products?.length || 0}</Tag>
      ),
    },
    {
      title: 'Orders',
      key: 'orders',
      render: (_: any, record: any) => (
        <Tag color='purple'>{record.clientOrders?.length || 0}</Tag>
      ),
    },
  ];

  const supplierColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => `${record.user?.username || 'N/A'}`,
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Vendors',
      key: 'vendors',
      render: (_: any, record: any) => (
        <Tag color='green'>{record.vendors?.length || 0}</Tag>
      ),
    },
    {
      title: 'Orders',
      key: 'orders',
      render: (_: any, record: any) => (
        <Tag color='blue'>{record.supplierOrders?.length || 0}</Tag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.user?.isActive ? 'green' : 'red'}>
          {record.user?.isActive ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
  ];

  const profileColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) =>
        `${record.firstName || ''} ${record.lastName || ''}`.trim() || 'N/A',
    },
    {
      title: 'Username',
      dataIndex: ['user', 'username'],
      key: 'username',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      render: (text: string) => text || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: any) => value || 'N/A',
    },
    {
      title: 'Role',
      dataIndex: ['user', 'role'],
      key: 'role',
      render: (role: string) => {
        if (!role) return <Tag color='gray'>N/A</Tag>;
        return (
          <Tag
            color={
              role === 'ADMIN' ? 'red' : role === 'STAFF' ? 'green' : 'blue'
            }
          >
            {role}
          </Tag>
        );
      },
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, record: any) =>
        record.address
          ? `${record.address.city || ''}, ${
              record.address.country || ''
            }`.replace(/, $|^, /, '')
          : 'N/A',
    },
  ];

  return (
    <Card style={{ margin: '16px' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type='default'
            icon={<ArrowLeftOutlined />}
            onClick={handleBackToList}
          >
            Back to Companies
          </Button>
          <Space>
            <Popconfirm
              title='Delete this company?'
              description='Are you sure you want to delete this company? This action cannot be undone.'
              onConfirm={handleDelete}
              okText='Yes'
              cancelText='No'
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} loading={isDeleting}>
                Delete Company
              </Button>
            </Popconfirm>
          </Space>
        </div>

        <div>
          <Title level={3}>{company.company_name || 'Unnamed Company'}</Title>
          <Text type='secondary'>{company.company_description || ''}</Text>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Statistic
              title='Clients'
              value={clients.length}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title='Suppliers'
              value={suppliers.length}
              prefix={<ShopOutlined />}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title='Profiles'
              value={profiles.length}
              prefix={<UserOutlined />}
            />
          </Col>
        </Row>

        <Descriptions
          title='Company Information'
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label='ID'>
            <Text copyable>{company.company_id}</Text>
          </Descriptions.Item>

          <Descriptions.Item label='Industry'>
            <Space>
              <Tag color='blue'>{company.industry || 'N/A'}</Tag>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Manager'>
            <Space>
              <UserOutlined />
              {company.manager_name || 'N/A'}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Tax ID'>
            <Space>
              <IdcardOutlined />
              <Text copyable={!!company.tax_id}>{company.tax_id || 'N/A'}</Text>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label='Website'>
            {company.website ? (
              <Space>
                <GlobalOutlined />
                <a
                  href={company.website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {company.website}
                </a>
              </Space>
            ) : (
              'N/A'
            )}
          </Descriptions.Item>

          <Descriptions.Item label='Founded'>
            {company.founded_date ? (
              <Space>
                <CalendarOutlined />
                {new Date(company.founded_date).toLocaleDateString()}
              </Space>
            ) : (
              'N/A'
            )}
          </Descriptions.Item>
        </Descriptions>

        <Tabs defaultActiveKey='clients'>
          <Tabs.TabPane
            tab={
              <span>
                <TeamOutlined /> Clients ({clients.length})
              </span>
            }
            key='clients'
          >
            <Table
              dataSource={clients}
              columns={clientColumns}
              rowKey='clientId'
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
              bordered
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <ShopOutlined /> Suppliers ({suppliers.length})
              </span>
            }
            key='suppliers'
          >
            <Table
              dataSource={suppliers}
              columns={supplierColumns}
              rowKey='supplierId'
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
              bordered
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <UserOutlined /> Profiles ({profiles.length})
              </span>
            }
            key='profiles'
          >
            <Table
              dataSource={profiles}
              columns={profileColumns}
              rowKey='profileId'
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
              bordered
            />
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </Card>
  );
};

export default CompanyDetails;
