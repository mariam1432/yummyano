import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/usersApi";
import { authApi } from "./services/authApi";
import { recipeApi } from "./services/recipesApi";
import { ImageApi } from "./services/imageApi";
import { categoryApi } from "./services/categoriesApi";

export const store = configureStore({
    reducer: {

        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [ImageApi.reducerPath]: ImageApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, authApi.middleware, recipeApi.middleware, categoryApi.middleware, ImageApi.middleware),
});