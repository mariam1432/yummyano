import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/userModel";


export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    // Get the token from your state
    const token = getState()?.auth?.token;
    console.log(token)
    if (token) {
      // Add the token to the headers
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


// Define a function to include the token in the request headers

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      // Adjusted mutation definition
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),

    }),
    signup: builder.mutation<User, any>({
      // Adjusted mutation definition
      query: (body) => ({
        url: `/auth/signup`,
        method: "POST",
        body,

      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      // Adjusted mutation definition
      query: (body) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body,

      }),
    }),
    resetPassword: builder.mutation<any, any>({
      // Adjusted mutation definition
      query: ({ token, body }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body,

      }),
    }),
    logout: builder.query<any, any>({
      query: () => "/auth/logout",
    }),
    updateProfile: builder.mutation<User, { id: number; body: Partial<User> }>({
      // Adjusted mutation definition
      query: ({ id, body }) => ({
        url: `/auth/update/${id}`,
        method: "PUT",
        body,
      }),
    }),

  }),
});

export const {

  useLoginMutation, useSignupMutation, useUpdateProfileMutation, useForgotPasswordMutation, useResetPasswordMutation, useLazyLogoutQuery
} = authApi;
