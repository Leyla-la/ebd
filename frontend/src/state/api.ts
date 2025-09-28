import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchAuthSession } from '@aws-amplify/auth';
import {
  Admin,
  AuthenticatedUser,
  Department,
  Employee,
  Leave,
  Payroll,
  Policy,
  Shift,
  User,
  Camera,
} from '@/types/prismaTypes';

// Function to parse the JWT token
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers: Headers) => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.error('Not authenticated or error fetching session:', error);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Employee',
    'User',
    'Shift',
    'Payroll',
    'Leave',
    'Camera',
    'Policy',
    'Department',
  ],
  endpoints: (builder) => ({
    getAuthUser: builder.query<AuthenticatedUser | null, void>({
      async queryFn(_, { signal }) {
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) {
            return { error: { status: 401, data: { message: 'No idToken found in session. User is not authenticated.' } } };
          }
          const payload = parseJwt(idToken);
          if (!payload) {
            return { error: { status: 400, data: { message: 'Failed to parse idToken payload.' } } };
          }
          const cognitoId = payload.sub;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/cognito/${cognitoId}`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
              signal,
            }
          );
          if (!response.ok) {
            let errorMsg = `Failed to fetch user info. Status: ${response.status}`;
            let errorDetails = '';
            try {
              const errorJson = await response.json();
              errorDetails = errorJson?.error || JSON.stringify(errorJson);
            } catch (e) {
              errorDetails = '[getAuthUser] Could not parse error response JSON.';
            }
            if (response.status === 404) {
              errorMsg = `User with cognitoId ${cognitoId} not found in the database.`;
            }
            return { error: { status: response.status, data: { message: errorMsg, details: errorDetails } } };
          }
          const userInfo: AuthenticatedUser = await response.json();
          return { data: userInfo };
        } catch (error) {
          if ((error as Error).name !== 'AbortError') {
            console.error('[getAuthUser] Unexpected error:', error);
          }
          return { error: { status: 500, data: { message: '[getAuthUser] Unexpected error', details: (error as Error).message } } };
        }
      },
      providesTags: ['User'],
    }),
    getEmployees: builder.query<Employee[], void>({
      query: () => 'employees',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Employee' as const, id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => `employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: 'employees',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
    }),
    updateEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: ({ id, ...patch }) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    getShifts: builder.query<Shift[], void>({
      query: () => 'shifts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Shift' as const, id })),
              { type: 'Shift', id: 'LIST' },
            ]
          : [{ type: 'Shift', id: 'LIST' }],
    }),
    getPayrolls: builder.query<Payroll[], void>({
      query: () => 'payrolls',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Payroll' as const, id })),
              { type: 'Payroll', id: 'LIST' },
            ]
          : [{ type: 'Payroll', id: 'LIST' }],
    }),
    getLeaves: builder.query<Leave[], void>({
      query: () => 'leaves',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Leave' as const, id })),
              { type: 'Leave', id: 'LIST' },
            ]
          : [{ type: 'Leave', id: 'LIST' }],
    }),
    getCameras: builder.query<Camera[], void>({
      query: () => 'cameras',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Camera' as const, id })),
              { type: 'Camera', id: 'LIST' },
            ]
          : [{ type: 'Camera', id: 'LIST' }],
    }),
    getPolicies: builder.query<Policy[], void>({
      query: () => 'policies',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Policy' as const, id })),
              { type: 'Policy', id: 'LIST' },
            ]
          : [{ type: 'Policy', id: 'LIST' }],
    }),
    getDepartments: builder.query<Department[], void>({
      query: () => 'departments',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Department' as const, id })),
              { type: 'Department', id: 'LIST' },
            ]
          : [{ type: 'Department', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetShiftsQuery,
  useGetPayrollsQuery,
  useGetLeavesQuery,
  useGetCamerasQuery,
  useGetPoliciesQuery,
  useGetDepartmentsQuery,
} = api;
