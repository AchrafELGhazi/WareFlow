// src/modules/companies/components/CompanyTabs.tsx
import React from 'react';
import { Tabs, Table, Tag, Empty } from 'antd';
import { TeamOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import type { Company } from '../api/companyApi';

interface CompanyTabsProps {
  company: Company;
}

const CompanyTabs: React.FC<CompanyTabsProps> = ({ company }) => {
  // Ensure arrays exist before accessing them
  const clients = company?.clients || [];
  const suppliers = company?.suppliers || [];
  const profiles = company?.profiles || [];

  const clientColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => record?.user?.username || 'N/A',
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
      render: (value: any) => (value ? `${value.toLocaleString()}` : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      render: (status: string) => {
        let color = 'green';
        if (status === 'inactive') color = 'volcano';
        if (status === 'pending') color = 'geekblue';
        return <Tag color={color}>{(status || 'UNKNOWN').toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Products',
      key: 'products',
      render: (_: any, record: any) => (
        <Tag color='blue'>{record?.products?.length || 0}</Tag>
      ),
    },
    {
      title: 'Orders',
      key: 'orders',
      render: (_: any, record: any) => (
        <Tag color='purple'>{record?.clientOrders?.length || 0}</Tag>
      ),
    },
  ];

  const supplierColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) => record?.user?.username || 'N/A',
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
        <Tag color='green'>{record?.vendors?.length || 0}</Tag>
      ),
    },
    {
      title: 'Orders',
      key: 'orders',
      render: (_: any, record: any) => (
        <Tag color='blue'>{record?.supplierOrders?.length || 0}</Tag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record?.user?.isActive ? 'green' : 'red'}>
          {record?.user?.isActive ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      ),
    },
  ];

  const profileColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: any) =>
        `${record?.firstName || ''} ${record?.lastName || ''}`.trim() || 'N/A',
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
      render: (role: string) =>
        role ? (
          <Tag
            color={
              role === 'ADMIN' ? 'red' : role === 'STAFF' ? 'green' : 'blue'
            }
          >
            {role}
          </Tag>
        ) : (
          'N/A'
        ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, record: any) =>
        record?.address
          ? `${record.address.city}, ${record.address.country}`
          : 'N/A',
    },
  ];

  // Empty state component for tabs with no data
  const renderEmpty = (entity: string) => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={`No ${entity} found for this company`}
    />
  );

  return (
    <Tabs defaultActiveKey='clients'>
      <Tabs.TabPane
        tab={
          <span>
            <TeamOutlined /> Clients ({clients.length})
          </span>
        }
        key='clients'
      >
        {clients.length > 0 ? (
          <Table
            dataSource={clients}
            columns={clientColumns}
            rowKey={record => record.clientId || `client-${Math.random()}`}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
            bordered
          />
        ) : (
          renderEmpty('clients')
        )}
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={
          <span>
            <ShopOutlined /> Suppliers ({suppliers.length})
          </span>
        }
        key='suppliers'
      >
        {suppliers.length > 0 ? (
          <Table
            dataSource={suppliers}
            columns={supplierColumns}
            rowKey={record => record.supplierId || `supplier-${Math.random()}`}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
            bordered
          />
        ) : (
          renderEmpty('suppliers')
        )}
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={
          <span>
            <UserOutlined /> Profiles ({profiles.length})
          </span>
        }
        key='profiles'
      >
        {profiles.length > 0 ? (
          <Table
            dataSource={profiles}
            columns={profileColumns}
            rowKey={record => record.profileId || `profile-${Math.random()}`}
            pagination={{ pageSize: 5 }}
            scroll={{ x: 'max-content' }}
            bordered
          />
        ) : (
          renderEmpty('profiles')
        )}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CompanyTabs;
