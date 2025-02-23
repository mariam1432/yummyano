import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "../models/userModel";
import { getFromLocalStorage } from "../commonUtils";
import { baseQuery } from "./authApi";
export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery,

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    users: builder.query<{
      users: User[],
      pagination: { totalItems: number; totalPages: number; currentPage: number; limit: number }
    }, { page?: number; limit?: number; search?: string; sort?: string; order?: string; filters?: Record<string, string> }>({
      query: ({ page = 1, limit = 10, search, sort = "createdAt", order = "desc", filters }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search && search != "") params.append("search", search);
        if (sort) params.append("sort", sort);
        if (order) params.append("order", order);

        // Append additional filters
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            params.append(key, value);
          });
        }

        return `/users?${params.toString()}`;
      },

      providesTags: ["Users"],
      transformResponse: (responseData: any) => {
        const user = getFromLocalStorage("user");
    
        return {
          ...responseData,
          users: responseData.users
            .filter((u) => u._id !== user._id)
            .map((u) => ({
              ...u,
              name: `${u.firstName} ${u.lastName}`,
              admin: u.isAdmin ? "Yes" : "No",
            })),
        };
      },
    }),

  // users: builder.query<User[], void>({
  //   query: () => "/users",
  //   providesTags: ["Users"],
  //   transformResponse: (responseData: User[]) => {
  //     const user = getFromLocalStorage("user");
  //     return responseData
  //       .filter((u) => u._id !== user._id)
  //       .map((user) => ({
  //         ...user,
  //         name: `${user.firstName} ${user.lastName}`,
  //         admin: user.isAdmin ? "Yes" : "No",
  //       }));
  //   },
  // }),
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
