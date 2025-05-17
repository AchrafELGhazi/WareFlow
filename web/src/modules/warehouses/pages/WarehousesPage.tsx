// src/modules/warehouses/pages/WarehousesPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllWarehousesQuery,
  useGetWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseManagerMutation,
  useDeleteWarehouseMutation,
  Warehouse,
} from '../api/warehouseApi';
import WarehouseList from '../components/WarehouseList';
import WarehouseDetail from '../components/WarehouseDetail';
import WarehouseForm from '../components/WarehouseForm';
import ManagerUpdateDialog from '../components/ManagerUpdateDialog';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setSelectedWarehouse } from '../store/warehouseSlice';
import { useGetAllStaffQuery } from '../api/staffApi';

const WarehousesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWarehouse = useSelector(
    (state: RootState) => state.warehouse.selectedWarehouse
  );

  // Fetch all warehouses
  const {
    data: warehousesData,
    isLoading: warehousesLoading,
    error: warehousesError,
    refetch: refetchWarehouses,
  } = useGetAllWarehousesQuery();

  // Fetch warehouse details when in detail view
  const {
    data: warehouseDetailData,
    isLoading: warehouseDetailLoading,
    error: warehouseDetailError,
  } = useGetWarehouseByIdQuery(selectedWarehouse?.warehouse_id || '', {
    skip: !selectedWarehouse || viewMode !== 'detail',
  });

  // Fetch staff list for manager selection
  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery();

  // Mutations
  const [createWarehouse, { isLoading: isCreating }] =
    useCreateWarehouseMutation();
  const [updateWarehouseManager, { isLoading: isUpdatingManager }] =
    useUpdateWarehouseManagerMutation();
  const [deleteWarehouse, { isLoading: isDeleting }] =
    useDeleteWarehouseMutation();

  // Format staff data for dropdown
  const staffList =
    staffData?.staff.map(staff => ({
      staffId: staff.staffId,
      firstName: staff.firstName,
      lastName: staff.lastName,
      jobDescription: staff.job.jobDescription,
    })) || [];

  // Update selected warehouse when detail data is fetched
  useEffect(() => {
    if (warehouseDetailData?.warehouse && viewMode === 'detail') {
      dispatch(setSelectedWarehouse(warehouseDetailData.warehouse));
    }
  }, [warehouseDetailData, dispatch, viewMode]);

  // Handler functions
  const handleViewWarehouse = (warehouseId: string) => {
    const warehouse = warehousesData?.warehouses.find(
      w => w.warehouse_id === warehouseId
    );
    if (warehouse) {
      dispatch(setSelectedWarehouse(warehouse));
      setViewMode('detail');
    }
  };

  const handleBack = () => {
    setViewMode('list');
    dispatch(setSelectedWarehouse(null));
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleEditClick = (warehouse: Warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
    setEditDialogOpen(true);
  };

  const handleUpdateManagerClick = (warehouse: Warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
    setManagerDialogOpen(true);
  };

  const handleDeleteClick = (warehouseId: string) => {
    const warehouse = warehousesData?.warehouses.find(
      w => w.warehouse_id === warehouseId
    );
    if (warehouse) {
      setWarehouseToDelete({
        id: warehouse.warehouse_id,
        name: warehouse.warehouse_name,
      });
      setDeleteDialogOpen(true);
    }
  };

  const handleCreateSubmit = async (warehouseData: {
    warehouseName: string;
    managerId: string;
  }) => {
    try {
      await createWarehouse(warehouseData).unwrap();
      setCreateDialogOpen(false);
      showNotification('Warehouse created successfully!', 'success');
    } catch (error) {
      console.error('Failed to create warehouse:', error);
      showNotification(
        'Failed to create warehouse. Please try again.',
        'error'
      );
    }
  };

  const handleEditSubmit = async (warehouseData: {
    warehouseName: string;
    managerId: string;
  }) => {
    if (!selectedWarehouse) return;

    try {
      await updateWarehouseManager({
        warehouseId: selectedWarehouse.warehouse_id,
        managerId: warehouseData.managerId,
      }).unwrap();

      setEditDialogOpen(false);
      showNotification('Warehouse updated successfully!', 'success');

      // Force refetch to get updated data
      refetchWarehouses();
    } catch (error) {
      console.error('Failed to update warehouse:', error);
      showNotification(
        'Failed to update warehouse. Please try again.',
        'error'
      );
    }
  };

  const handleManagerUpdate = async (
    warehouseId: string,
    managerId: string
  ) => {
    try {
      await updateWarehouseManager({ warehouseId, managerId }).unwrap();
      setManagerDialogOpen(false);
      showNotification('Warehouse manager updated successfully!', 'success');

      // Force refetch to get updated data
      refetchWarehouses();
    } catch (error) {
      console.error('Failed to update warehouse manager:', error);
      showNotification(
        'Failed to update warehouse manager. Please try again.',
        'error'
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!warehouseToDelete) return;

    try {
      await deleteWarehouse(warehouseToDelete.id).unwrap();
      setDeleteDialogOpen(false);
      setWarehouseToDelete(null);
      showNotification('Warehouse deleted successfully!', 'success');

      // If we're in detail view and deleted the current warehouse, go back to list
      if (
        viewMode === 'detail' &&
        selectedWarehouse?.warehouse_id === warehouseToDelete.id
      ) {
        handleBack();
      }
    } catch (error) {
      console.error('Failed to delete warehouse:', error);
      showNotification(
        'Failed to delete warehouse. Please try again.',
        'error'
      );
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Determine if there's an error from the queries
  const error = warehousesError
    ? 'Error loading warehouses'
    : warehouseDetailError && viewMode === 'detail'
    ? 'Error loading warehouse details'
    : '';

  return (
    <div className='container mx-auto px-4 py-8'>
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'
          role='alert'
        >
          <p>{error}. Please try refreshing the page.</p>
        </div>
      )}

      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}
          role='alert'
        >
          <div className='flex items-center'>
            {notification.type === 'success' ? (
              <svg
                className='h-5 w-5 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                className='h-5 w-5 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      <div className='bg-white rounded-lg shadow-md p-6'>
        {viewMode === 'list' && (
          <>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-2xl font-bold text-gray-800'>
                Warehouse Management
              </h1>
              <button
                onClick={handleCreateClick}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
                Add Warehouse
              </button>
            </div>

            <hr className='my-6' />

            <WarehouseList
              warehouses={warehousesData?.warehouses || []}
              isLoading={warehousesLoading}
              onView={handleViewWarehouse}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onUpdateManager={handleUpdateManagerClick}
            />
          </>
        )}

        {viewMode === 'detail' && (
          <WarehouseDetail
            warehouse={warehouseDetailData?.warehouse || selectedWarehouse}
            isLoading={warehouseDetailLoading}
            error={
              warehouseDetailError
                ? 'Error loading warehouse details'
                : undefined
            }
            onBack={handleBack}
            onUpdateManager={handleUpdateManagerClick}
          />
        )}
      </div>

      {/* Create Warehouse Dialog */}
      <WarehouseForm
        open={createDialogOpen}
        warehouse={null}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateSubmit}
        isLoading={isCreating}
        staffList={staffList}
        title='Create New Warehouse'
      />

      {/* Edit Warehouse Dialog */}
      <WarehouseForm
        open={editDialogOpen}
        warehouse={selectedWarehouse}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        isLoading={isUpdatingManager}
        staffList={staffList}
        title='Edit Warehouse'
      />

      {/* Update Manager Dialog */}
      <ManagerUpdateDialog
        open={managerDialogOpen}
        warehouse={selectedWarehouse}
        onClose={() => setManagerDialogOpen(false)}
        onSubmit={handleManagerUpdate}
        isLoading={isUpdatingManager}
        staffList={staffList}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        warehouseName={warehouseToDelete?.name || ''}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default WarehousesPage;
