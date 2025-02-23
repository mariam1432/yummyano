import { createApi } from "@reduxjs/toolkit/query/react";
import { Category } from "../models/categoryModel";
import { baseQuery } from "./authApi";
export const categoryApi = createApi({
    reducerPath: "categoryApi",

    baseQuery,

    tagTypes: ["Categories"],

    endpoints: (builder) => ({
        categories: builder.query<{
            categories: Category[],
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

                return `/categories?${params.toString()}`;
            },
            providesTags: ["Categories"],
        }),


        category: builder.query<any, number>({
            query: (id) => `/categories/${id}`,
        }),
        createCategory: builder.mutation<Category, Partial<Category>>({
            // Adjusted mutation definition
            query: (body) => ({
                url: `categories/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Categories"],
        }),
        editCategory: builder.mutation<Category, { id: number; body: Partial<Category> }>(
            {
                // Adjusted mutation definition
                query: ({ id, body }) => ({
                    url: `/categories/update/${id}`,
                    method: "PUT",
                    body,
                }),
                invalidatesTags: ["Categories"],
            }
        ),
        deleteCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/categories/delete/${id}`,
                method: "DELETE",
                body: {
                    isAdmin: body.isAdmin,
                },
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useCategoryQuery,
    useCategoriesQuery,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
    useLazyCategoryQuery
} = categoryApi;
