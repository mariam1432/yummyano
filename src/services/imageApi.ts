import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./authApi"; // Ensure this is correctly set up for your base query

export const ImageApi = createApi({
    reducerPath: "ImageApi",
    baseQuery,
    tagTypes: ["Images"],
    endpoints: (builder) => ({
        // Fetch a single image by ID
        Image: builder.query({
            query: (id) => `/images/${id}`,
        }),

        // Upload an image
        uploadImage: builder.mutation({
            query: ({ file, type, referenceId }) => {
                const formData = new FormData();
                formData.append('file', file); // File field
                formData.append('type', type); // Additional data
                // formData.append('referenceId', referenceId); // Additional data

                return {
                    url: '/api/images/upload',
                    method: 'POST',
                    body: formData,
                    // No need to set Content-Type, browser handles this for FormData
                };
            },
            invalidatesTags: ["Images"],
        }),

        // Edit an image
        editImage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/images/edit/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Images"],
        }),

        // Delete an image
        deleteImage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/images/${id}`,
                method: "DELETE",
                body: {
                    currentUserId: body.id,
                    isAdmin: body.isAdmin,
                },
            }),
            invalidatesTags: ["Images"],
        }),
    }),
});

export const {
    useUploadImageMutation,
    useImageQuery,
    useEditImageMutation,
    useDeleteImageMutation,
} = ImageApi;
