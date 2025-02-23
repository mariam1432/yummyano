import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../models/userModel";
import { getFromLocalStorage } from "../commonUtils";
import { baseQuery } from "./authApi";
export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery,

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    users: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
      transformResponse: (responseData: User[]) => {
        const user = getFromLocalStorage("user");
        return responseData
          .filter((u) => u._id !== user._id)
          .map((user) => ({
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            admin: user.isAdmin ? "Yes" : "No",
          }));
      },
    }),
    user: builder.query<any, number>({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      // Adjusted mutation definition
      query: (body) => ({
        url: `users/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    editUser: builder.mutation<User, { id: number; body: Partial<User> }>({
      // Adjusted mutation definition
      query: ({ id, body }) => ({
        url: `/users/edit/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "DELETE",
        body: {
          currentUserId: body.id,
          isAdmin: body.isAdmin,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useLazyUserQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
