// src/modules/warehouses/components/ConfirmDeleteDialog.tsx
import React from 'react';

interface ConfirmDeleteDialogProps {
  open: boolean;
  warehouseName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  warehouseName,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-opacity-5 backdrop-blur-sm  flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg max-w-md w-full mx-4'>
        <div className='p-6'>
          <div className='flex items-center mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-red-600 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <h2 className='text-xl font-semibold'>Confirm Deletion</h2>
          </div>

          <p className='mb-4 text-gray-700'>
            Are you sure you want to delete the warehouse:{' '}
            <span className='font-bold'>{warehouseName}</span>?
          </p>

          <p className='text-sm text-red-600 mb-4'>
            This action will delete all products and inventory transaction
            records associated with this warehouse. This cannot be undone.
          </p>

          {isLoading && (
            <div className='flex justify-center mb-4'>
              <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8'></div>
            </div>
          )}
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
            onClick={onConfirm}
            className={`px-4 py-2 bg-red-600 text-white rounded-md ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Warehouse'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
