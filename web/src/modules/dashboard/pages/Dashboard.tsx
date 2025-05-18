import React from 'react';
import { UserRole } from '@/shared/types';

// Mock data based on schema
const mockData = {
  userStats: {
    total: 24,
    active: 22,
    inactive: 2,
    byRole: {
      [UserRole.ADMIN]: 2,
      [UserRole.STAFF]: 5,
      [UserRole.CLIENT]: 10,
      [UserRole.SUPPLIER]: 4,
      [UserRole.VENDOR]: 3,
    },
    recentLogins: [
      {
        username: 'Admin',
        lastLogin: '2025-05-17T10:58:33.317Z',
        role: UserRole.ADMIN,
      },
      {
        username: 'Test',
        lastLogin: '2025-05-17T02:35:53.465Z',
        role: UserRole.CLIENT,
      },
    ],
  },
  inventoryStats: {
    totalProducts: 157,
    lowStock: 12,
    categories: [
      { name: 'Electronics', count: 45 },
      { name: 'Furniture', count: 32 },
      { name: 'Office Supplies', count: 80 },
    ],
    warehouses: [
      { name: 'Main Warehouse', productCount: 98 },
      { name: 'Secondary Warehouse', productCount: 59 },
    ],
  },
  orderStats: {
    clientOrders: {
      total: 42,
      pending: 15,
      completed: 22,
      cancelled: 5,
    },
    supplierOrders: {
      total: 28,
      pending: 8,
      completed: 18,
      cancelled: 2,
    },
    recentOrders: [
      {
        id: 'CO-12345',
        client: 'TechCorp Inc.',
        date: '2025-05-16',
        status: 'pending',
        total: 2450.75,
      },
      {
        id: 'CO-12344',
        client: 'Office Solutions',
        date: '2025-05-15',
        status: 'completed',
        total: 1820.5,
      },
      {
        id: 'SO-45678',
        supplier: 'Global Supplies',
        date: '2025-05-14',
        status: 'pending',
        total: 5750.25,
      },
    ],
  },
  transactionStats: {
    monthly: [
      { month: 'Jan', value: 12500 },
      { month: 'Feb', value: 14200 },
      { month: 'Mar', value: 15800 },
      { month: 'Apr', value: 16900 },
      { month: 'May', value: 15200 },
    ],
    recentTransactions: [
      {
        id: 'T-98765',
        type: 'receive',
        product: 'Office Desk',
        quantity: 10,
        date: '2025-05-17',
      },
      {
        id: 'T-98764',
        type: 'ship',
        product: 'Laptop Dell XPS',
        quantity: 5,
        date: '2025-05-16',
      },
      {
        id: 'T-98763',
        type: 'adjust',
        product: 'Paper Reams',
        quantity: -2,
        date: '2025-05-15',
      },
    ],
  },
};

// Helper components
const StatCard: React.FC<{
  title: string;
  value: number | string;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}> = ({ title, value, change, positive, icon }) => (
  <div className='bg-white rounded-lg shadow p-6'>
    <div className='flex justify-between items-start'>
      <div>
        <p className='text-gray-500 text-sm'>{title}</p>
        <h3 className='text-2xl font-bold mt-1'>{value}</h3>
        {change && (
          <p
            className={`text-sm mt-2 ${
              positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {positive ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
      {icon && (
        <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>{icon}</div>
      )}
    </div>
  </div>
);

const BarChart: React.FC<{ data: { month: string; value: number }[] }> = ({
  data,
}) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className='flex items-end h-40 space-x-2'>
      {data.map((item, index) => (
        <div key={index} className='flex flex-col items-center flex-1'>
          <div
            className='w-full bg-blue-500 rounded-t'
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          ></div>
          <span className='text-xs mt-2'>{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const ProgressBar: React.FC<{
  completed: number;
  total: number;
  color?: string;
}> = ({ completed, total, color = 'bg-blue-500' }) => {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className='w-full bg-gray-200 rounded-full h-2.5'>
      <div
        className={`${color} h-2.5 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const TableRow: React.FC<{ data: any; headers: string[] }> = ({
  data,
  headers,
}) => (
  <tr className='border-b border-gray-200 hover:bg-gray-50'>
    {headers.map((header, i) => (
      <td key={i} className='px-4 py-3 text-sm'>
        {data[header.toLowerCase()]}
      </td>
    ))}
  </tr>
);

// Main Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6'>
        Warehouse Management Dashboard
      </h1>

      {/* Key metrics section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='Total Users'
          value={mockData.userStats.total}
          change='8% from last month'
          positive={true}
        />
        <StatCard
          title='Active Products'
          value={mockData.inventoryStats.totalProducts}
          change='5% from last month'
          positive={true}
        />
        <StatCard
          title='Client Orders'
          value={mockData.orderStats.clientOrders.total}
          change='12% from last month'
          positive={true}
        />
        <StatCard
          title='Supplier Orders'
          value={mockData.orderStats.supplierOrders.total}
          change='3% from last month'
          positive={false}
        />
      </div>

      {/* Charts and data section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Orders Status */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4'>Order Status</h2>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm'>Client Orders</span>
                <span className='text-sm'>
                  {mockData.orderStats.clientOrders.completed}/
                  {mockData.orderStats.clientOrders.total}
                </span>
              </div>
              <ProgressBar
                completed={mockData.orderStats.clientOrders.completed}
                total={mockData.orderStats.clientOrders.total}
                color='bg-green-500'
              />
            </div>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm'>Supplier Orders</span>
                <span className='text-sm'>
                  {mockData.orderStats.supplierOrders.completed}/
                  {mockData.orderStats.supplierOrders.total}
                </span>
              </div>
              <ProgressBar
                completed={mockData.orderStats.supplierOrders.completed}
                total={mockData.orderStats.supplierOrders.total}
                color='bg-blue-500'
              />
            </div>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm'>Pending Orders</span>
                <span className='text-sm'>
                  {mockData.orderStats.clientOrders.pending +
                    mockData.orderStats.supplierOrders.pending}
                  /
                  {mockData.orderStats.clientOrders.total +
                    mockData.orderStats.supplierOrders.total}
                </span>
              </div>
              <ProgressBar
                completed={
                  mockData.orderStats.clientOrders.pending +
                  mockData.orderStats.supplierOrders.pending
                }
                total={
                  mockData.orderStats.clientOrders.total +
                  mockData.orderStats.supplierOrders.total
                }
                color='bg-yellow-500'
              />
            </div>
          </div>
        </div>

        {/* Monthly Transactions */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4'>Monthly Transactions</h2>
          <BarChart data={mockData.transactionStats.monthly} />
        </div>
      </div>

      {/* Tables section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Orders */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold'>Recent Orders</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Client
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockData.orderStats.recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className='border-b border-gray-200 hover:bg-gray-50'
                  >
                    <td className='px-4 py-3 text-sm'>{order.id}</td>
                    <td className='px-4 py-3 text-sm'>
                      {order.client || order.supplier}
                    </td>
                    <td className='px-4 py-3 text-sm'>{order.date}</td>
                    <td className='px-4 py-3 text-sm'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='px-6 py-3 border-t border-gray-200 bg-gray-50 text-center'>
            <button className='text-sm text-blue-600 hover:text-blue-800'>
              View All Orders
            </button>
          </div>
        </div>

        {/* Recent Inventory Transactions */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold'>
              Recent Inventory Transactions
            </h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    ID
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Type
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Product
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Quantity
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockData.transactionStats.recentTransactions.map(
                  (transaction, index) => (
                    <tr
                      key={index}
                      className='border-b border-gray-200 hover:bg-gray-50'
                    >
                      <td className='px-4 py-3 text-sm'>{transaction.id}</td>
                      <td className='px-4 py-3 text-sm'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === 'receive'
                              ? 'bg-green-100 text-green-800'
                              : transaction.type === 'ship'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {transaction.product}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        <span
                          className={
                            transaction.quantity < 0
                              ? 'text-red-600'
                              : 'text-green-600'
                          }
                        >
                          {transaction.quantity > 0 && '+'}
                          {transaction.quantity}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm'>{transaction.date}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className='px-6 py-3 border-t border-gray-200 bg-gray-50 text-center'>
            <button className='text-sm text-blue-600 hover:text-blue-800'>
              View All Transactions
            </button>
          </div>
        </div>
      </div>

      {/* User and Inventory Distribution */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
        {/* User Roles */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4'>
            User Distribution by Role
          </h2>
          <div className='space-y-4'>
            {Object.entries(mockData.userStats.byRole).map(([role, count]) => (
              <div key={role}>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm'>{role}</span>
                  <span className='text-sm'>
                    {count}/{mockData.userStats.total}
                  </span>
                </div>
                <ProgressBar
                  completed={count as number}
                  total={mockData.userStats.total}
                  color={
                    role === UserRole.ADMIN
                      ? 'bg-purple-500'
                      : role === UserRole.STAFF
                      ? 'bg-blue-500'
                      : role === UserRole.CLIENT
                      ? 'bg-green-500'
                      : role === UserRole.SUPPLIER
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4'>Products by Category</h2>
          <div className='space-y-4'>
            {mockData.inventoryStats.categories.map((category, index) => (
              <div key={index}>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm'>{category.name}</span>
                  <span className='text-sm'>
                    {category.count}/{mockData.inventoryStats.totalProducts}
                  </span>
                </div>
                <ProgressBar
                  completed={category.count}
                  total={mockData.inventoryStats.totalProducts}
                  color={
                    index === 0
                      ? 'bg-indigo-500'
                      : index === 1
                      ? 'bg-green-500'
                      : 'bg-amber-500'
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
