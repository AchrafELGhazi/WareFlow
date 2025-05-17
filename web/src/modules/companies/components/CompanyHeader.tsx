import React from 'react';
import { Breadcrumb, Space } from 'antd';
import { HomeOutlined, TeamOutlined, BankOutlined } from '@ant-design/icons';
import CompanyCreateModal from './CompanyCreateModal';
import { Typography } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const { Title } = Typography;

interface CompanyHeaderProps {
  title?: string;
  showCreateButton?: boolean;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  title = 'Company Management',
  showCreateButton = true,
}) => {
  const location = useLocation();
  const isDetailView = location.pathname.split('/').length > 3; // Assumes /app/companies/:id pattern

  return (
    <div
      className='company-header'
      style={{ marginBottom: 16, padding: '0 16px' }}
    >
      <div style={{ marginBottom: 12 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/app/dashboard'>
              <HomeOutlined />
              <span style={{ marginLeft: 4 }}>Home</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/app/companies'>
              <BankOutlined />
              <span style={{ marginLeft: 4 }}>Companies</span>
            </Link>
          </Breadcrumb.Item>
          {isDetailView && (
            <Breadcrumb.Item>
              <TeamOutlined />
              <span style={{ marginLeft: 4 }}>Company Details</span>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          {title}
        </Title>
        {showCreateButton && !isDetailView && (
          <Space>
            <CompanyCreateModal />
          </Space>
        )}
      </div>
    </div>
  );
};

export default CompanyHeader;
