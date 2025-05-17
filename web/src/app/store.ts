import { baseApi } from '@/services/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/modules/auth/store/authSlice';
import companyReducer from '@/modules/companies/store/companySlice';
import warehouseReducer from '@/modules/warehouses/store/warehouseSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,

    auth: authReducer,
    company: companyReducer,
    warehouse: warehouseReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
