// src/modules/warehouses/components/WarehouseDetail.tsx
import React from 'react';
import { Warehouse } from '../api/warehouseApi';

interface WarehouseDetailProps {
  warehouse: Warehouse | null;
  isLoading: boolean;
  error?: string;
  onBack: () => void;
  onUpdateManager: (warehouse: Warehouse) => void;
}

const WarehouseDetail: React.FC<WarehouseDetailProps> = ({
  warehouse,
  isLoading,
  error,
  onBack,
  onUpdateManager,
}) => {
  if (isLoading) {
    return (
      <div className='flex justify-center items-center p-10'>
        <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <button
          onClick={onBack}
          className='flex items-center mb-4 text-blue-600 hover:text-blue-800'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Warehouses
        </button>
        <div className='bg-red-100 text-red-700 p-4 rounded-md'>{error}</div>
      </div>
    );
  }

  if (!warehouse) {
    return (
      <div className='p-6'>
        <button
          onClick={onBack}
          className='flex items-center mb-4 text-blue-600 hover:text-blue-800'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Warehouses
        </button>
        <div className='text-gray-500'>No warehouse selected</div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <button
        onClick={onBack}
        className='flex items-center mb-4 text-blue-600 hover:text-blue-800'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>
        Back to Warehouses
      </button>

      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>{warehouse.warehouse_name}</h2>
          <button
            onClick={() => onUpdateManager(warehouse)}
            className='flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200'
            title='Update Manager'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
            Update Manager
          </button>
        </div>
        <hr className='my-4' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-semibold mb-3'>Manager Information</h3>
            {warehouse.manager_info ? (
              <div className='space-y-2'>
                <p>
                  <span className='font-medium'>Name:</span>{' '}
                  {warehouse.manager_info.first_name}{' '}
                  {warehouse.manager_info.last_name}
                </p>
                <p>
                  <span className='font-medium'>Position:</span>{' '}
                  {warehouse.manager_info.job_description}
                </p>
                <p>
                  <span className='font-medium'>Staff ID:</span>{' '}
                  {warehouse.manager_info.staff_id}
                </p>
              </div>
            ) : (
              <p className='text-gray-500'>
                No manager assigned to this warehouse
              </p>
            )}
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-3'>Warehouse Summary</h3>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Total Products:</span>{' '}
                {warehouse.products?.length || 0}
              </p>
              <p>
                <span className='font-medium'>Recent Transactions:</span>{' '}
                {warehouse.inventory_transactions?.length || 0}
              </p>
              <p>
                <span className='font-medium'>Warehouse ID:</span>{' '}
                {warehouse.warehouse_id}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-3'>Products in Warehouse</h3>
        {warehouse.products?.length ? (
          <div className='bg-white shadow rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Product Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Category
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Product ID
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {warehouse.products.map(product => (
                  <tr key={product.product_id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {product.product_name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                        {product.category_name}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {product.product_id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-gray-500'>No products in this warehouse</p>
        )}
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-3'>
          Recent Inventory Transactions
        </h3>
        {warehouse.inventory_transactions?.length ? (
          <div className='bg-white shadow rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Product
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Staff
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Type
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Quantity
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {warehouse.inventory_transactions.map(transaction => (
                  <tr
                    key={transaction.transaction_id}
                    className='hover:bg-gray-50'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {transaction.product_name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {transaction.staff_name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          transaction.transaction_type === 'receive'
                            ? 'bg-green-100 text-green-800'
                            : transaction.transaction_type === 'ship'
                            ? 'bg-red-100 text-red-800'
                            : transaction.transaction_type === 'adjust'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {transaction.quantity}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(transaction.transaction_date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-gray-500'>No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default WarehouseDetail;
