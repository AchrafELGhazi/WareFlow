import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyState {
  selectedCompanyId: string | null;
}

const initialState: CompanyState = {
  selectedCompanyId: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<string | null>) => {
      state.selectedCompanyId = action.payload;
    },
  },
});

export const { setSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
