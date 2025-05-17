import React from 'react';
import { Descriptions, Space, Tag, Typography } from 'antd';
import {
  GlobalOutlined,
  CalendarOutlined,
  IdcardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { Company } from '../api/companyApi';

const { Text } = Typography;

interface CompanyInfoProps {
  company: Company;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ company }) => {
  // Handle potential undefined properties
  const companyId = company?.company_id || '';
  const industry = company?.industry || null;
  const managerName = company?.manager_name || null;
  const taxId = company?.tax_id || null;
  const website = company?.website || null;
  const foundedDate = company?.founded_date || null;

  return (
    <Descriptions
      title='Company Information'
      bordered
      column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
      style={{ marginBottom: 24 }}
    >
      <Descriptions.Item label='ID'>
        <Text copyable>{companyId}</Text>
      </Descriptions.Item>

      <Descriptions.Item label='Industry'>
        <Space>
          <Tag color='blue'>{industry || 'N/A'}</Tag>
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label='Manager'>
        <Space>
          <UserOutlined />
          {managerName || 'N/A'}
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label='Tax ID'>
        <Space>
          <IdcardOutlined />
          <Text copyable={!!taxId}>{taxId || 'N/A'}</Text>
        </Space>
      </Descriptions.Item>

      <Descriptions.Item label='Website'>
        {website ? (
          <Space>
            <GlobalOutlined />
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          </Space>
        ) : (
          'N/A'
        )}
      </Descriptions.Item>

      <Descriptions.Item label='Founded'>
        {foundedDate ? (
          <Space>
            <CalendarOutlined />
            {new Date(foundedDate).toLocaleDateString()}
          </Space>
        ) : (
          'N/A'
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CompanyInfo;
