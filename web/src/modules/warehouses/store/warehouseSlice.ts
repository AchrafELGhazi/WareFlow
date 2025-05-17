import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Warehouse } from '../api/warehouseApi';

interface WarehouseState {
  selectedWarehouse: Warehouse | null;
  filterText: string;
}

const initialState: WarehouseState = {
  selectedWarehouse: null,
  filterText: '',
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    setSelectedWarehouse: (state, action: PayloadAction<Warehouse | null>) => {
      state.selectedWarehouse = action.payload;
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    clearFilters: state => {
      state.filterText = '';
    },
  },
});

export const { setSelectedWarehouse, setFilterText, clearFilters } =
  warehouseSlice.actions;
export default warehouseSlice.reducer;
