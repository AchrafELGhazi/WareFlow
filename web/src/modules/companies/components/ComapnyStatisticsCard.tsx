import React from 'react';
import { Card, Row, Col, Statistic, Tooltip } from 'antd';
import {
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { Company } from '../api/companyApi';

interface CompanyStatisticsCardProps {
  company: Company;
}

const CompanyStatisticsCard: React.FC<CompanyStatisticsCardProps> = ({
  company,
}) => {
  // Calculate how many days since the company was founded
  const daysSinceFounded = company.founded_date
    ? Math.floor(
        (new Date().getTime() - new Date(company.founded_date).getTime()) /
          (1000 * 3600 * 24)
      )
    : null;

  // Calculate active clients percentage
  const activeClients = company.clients.filter(
    client => client.accountStatus === 'active'
  ).length;
  const activeClientsPercentage =
    company.clients.length > 0
      ? Math.round((activeClients / company.clients.length) * 100)
      : 0;

  return (
    <Card className='company-statistics-card' style={{ marginBottom: 24 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Tooltip title='Total number of clients associated with this company'>
            <Statistic
              title='Clients'
              value={company.clients.length}
              prefix={<TeamOutlined />}
              suffix={
                company.clients.length > 0 &&
                `(${activeClientsPercentage}% active)`
              }
            />
          </Tooltip>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Tooltip title='Total number of suppliers associated with this company'>
            <Statistic
              title='Suppliers'
              value={company.suppliers.length}
              prefix={<ShopOutlined />}
            />
          </Tooltip>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Tooltip title='User profiles linked to this company'>
            <Statistic
              title='Profiles'
              value={company.profiles.length}
              prefix={<UserOutlined />}
            />
          </Tooltip>
        </Col>

        {daysSinceFounded !== null && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Tooltip
              title={`Founded on: ${new Date(
                company.founded_date!
              ).toLocaleDateString()}`}
            >
              <Statistic
                title='Days in Business'
                value={daysSinceFounded}
                prefix={<ClockCircleOutlined />}
              />
            </Tooltip>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default CompanyStatisticsCard;
