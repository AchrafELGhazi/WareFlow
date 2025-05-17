import { baseApi } from '@/services/baseApi';

export interface Staff {
  staffId: string;
  firstName: string;
  lastName: string;
  jobCode: string;
  job: {
    jobDescription: string;
  };
  userId: string;
}

export interface StaffListResponse {
  success: boolean;
  staff: Staff[];
}

export const staffApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllStaff: builder.query<StaffListResponse, void>({
      query: () => 'staff',
      providesTags: ['Staff'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllStaffQuery } = staffApi;
