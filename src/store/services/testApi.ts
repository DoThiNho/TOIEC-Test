import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['Tests'],

  endpoints: (build) => ({
    getTests: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/tests?${queryParams}`;
      },
      providesTags: ['Tests']
    }),
    getTest: build.query({
      query: (id) => `api/tests/${id}`
    }),
    addTest: build.mutation({
      query: (data) => ({
        url: 'api/tests',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Tests']
    }),
    deleteTestById: build.mutation({
      query: (id) => ({
        url: `api/tests/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Tests']
    })
  })
});

export const { useGetTestsQuery, useGetTestQuery, useAddTestMutation, useDeleteTestByIdMutation } =
  testApi;
