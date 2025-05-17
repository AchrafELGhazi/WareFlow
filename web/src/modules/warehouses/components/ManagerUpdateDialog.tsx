// src/modules/warehouses/components/ManagerUpdateDialog.tsx
import React, { useState, useEffect } from 'react';
import { Warehouse } from '../api/warehouseApi';

interface Staff {
  staffId: string;
  firstName: string;
  lastName: string;
  jobDescription: string;
}

interface ManagerUpdateDialogProps {
  open: boolean;
  warehouse: Warehouse | null;
  onClose: () => void;
  onSubmit: (warehouseId: string, managerId: string) => void;
  isLoading: boolean;
  staffList: Staff[];
}

const ManagerUpdateDialog: React.FC<ManagerUpdateDialogProps> = ({
  open,
  warehouse,
  onClose,
  onSubmit,
  isLoading,
  staffList,
}) => {
  const [managerId, setManagerId] = useState('');

  useEffect(() => {
    if (warehouse) {
      setManagerId(warehouse.manager_id || '');
    } else {
      setManagerId('');
    }
  }, [warehouse, open]);

  const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setManagerId(e.target.value);
  };

  const handleSubmit = () => {
    if (warehouse) {
      onSubmit(warehouse.warehouse_id, managerId);
    }
  };

  if (!open || !warehouse) return null;

  return (
    <div className='fixed inset-0 bg-opacity-5 backdrop-blur-sm bg- flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg max-w-md w-full mx-4'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold'>Update Warehouse Manager</h2>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='space-y-4'>
            <div>
              <p className='font-medium text-gray-700'>
                Warehouse:{' '}
                <span className='font-normal'>{warehouse.warehouse_name}</span>
              </p>
              <p className='font-medium text-gray-700 mt-2'>
                Current Manager:
                <span className='font-normal'>
                  {warehouse.manager_info
                    ? ` ${warehouse.manager_info.first_name} ${warehouse.manager_info.last_name}`
                    : ' No manager assigned'}
                </span>
              </p>
            </div>

            <div>
              <label
                htmlFor='newManager'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                New Warehouse Manager
              </label>
              <select
                id='newManager'
                value={managerId}
                onChange={handleManagerChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={isLoading}
              >
                <option value=''>No manager assigned</option>
                {staffList.map(staff => (
                  <option key={staff.staffId} value={staff.staffId}>
                    {staff.firstName} {staff.lastName} - {staff.jobDescription}
                  </option>
                ))}
              </select>
            </div>

            {isLoading && (
              <div className='flex justify-center'>
                <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8'></div>
              </div>
            )}
          </div>
        </div>

        <div className='bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100'
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              isLoading || managerId === warehouse.manager_id
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
            disabled={isLoading || managerId === warehouse.manager_id}
          >
            {isLoading ? 'Updating...' : 'Update Manager'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerUpdateDialog;
