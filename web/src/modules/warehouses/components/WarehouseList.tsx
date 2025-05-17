import React from 'react';
import { Warehouse } from '../api/warehouseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../store/warehouseSlice';
import { RootState } from '@/app/store';

interface WarehouseListProps {
  warehouses: Warehouse[];
  isLoading: boolean;
  onView: (warehouseId: string) => void;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouseId: string) => void;
  onUpdateManager: (warehouse: Warehouse) => void;
}

const WarehouseList: React.FC<WarehouseListProps> = ({
  warehouses,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onUpdateManager,
}) => {
  const dispatch = useDispatch();
  const filterText = useSelector(
    (state: RootState) => state.warehouse.filterText
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterText(e.target.value));
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.warehouse_name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold'>Warehouses</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Filter warehouses'
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className='flex justify-center p-8'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
        </div>
      ) : filteredWarehouses.length === 0 ? (
        <p className='text-center p-8 text-gray-500'>No warehouses found</p>
      ) : (
        <div className='overflow-x-auto bg-white rounded-lg shadow'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Warehouse Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Manager
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Products Count
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredWarehouses.map(warehouse => (
                <tr key={warehouse.warehouse_id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {warehouse.warehouse_name}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {warehouse.manager_info ? (
                      <div className='flex items-center'>
                        <div className='text-sm font-medium text-gray-900'>
                          {`${warehouse.manager_info.first_name} ${warehouse.manager_info.last_name}`}
                        </div>
                        <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          {warehouse.manager_info.job_description}
                        </span>
                      </div>
                    ) : (
                      <div className='text-sm text-gray-500'>
                        No manager assigned
                      </div>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>
                      {warehouse.products?.length || 0}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                    <button
                      onClick={() => onView(warehouse.warehouse_id)}
                      className='text-blue-600 hover:text-blue-900 mr-3'
                      title='View Details'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onEdit(warehouse)}
                      className='text-yellow-600 hover:text-yellow-900 mr-3'
                      title='Edit Warehouse'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onUpdateManager(warehouse)}
                      className='text-green-600 hover:text-green-900 mr-3'
                      title='Update Manager'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
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
                    </button>
                    <button
                      onClick={() => onDelete(warehouse.warehouse_id)}
                      className='text-red-600 hover:text-red-900'
                      title='Delete Warehouse'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WarehouseList;
