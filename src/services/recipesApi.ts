import { createApi } from "@reduxjs/toolkit/query/react";
import { Recipe } from "../models/recipeModel";
import { baseQuery } from "./authApi";
export const recipeApi = createApi({
  reducerPath: "recipeApi",

  baseQuery,

  tagTypes: ["Recipes"],

  endpoints: (builder) => ({
    recipes: builder.query<Recipe[], void>({
      query: () => "/recipes",
      providesTags: ["Recipes"],
    }),
    recipe: builder.query<any, number>({
      query: (id) => `/recipes/${id}`,
    }),
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      // Adjusted mutation definition
      query: (body) => ({
        url: `recipes/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipes"],
    }),
    editRecipe: builder.mutation<Recipe, { id: number; body: Partial<Recipe> }>(
      {
        // Adjusted mutation definition
        query: ({ id, body }) => ({
          url: `/recipes/update/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Recipes"],
      }
    ),
    deleteRecipe: builder.mutation({
      query: ({ id, body }) => ({
        url: `/recipes/delete/${id}`,
        method: "DELETE",
        body: {
          isAdmin: body.isAdmin,
        },
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useRecipeQuery,
  useRecipesQuery,
  useEditRecipeMutation,
  useDeleteRecipeMutation,
  useLazyRecipeQuery
} = recipeApi;
