import React from "react";
import { Table, Typography } from "../../components";
import { recipeColumns } from "../../data/tableData";
import {
  useRecipesQuery,
  useDeleteRecipeMutation,
} from "../../services/recipesApi";
import { Loader } from "../../components";
import { useNavigate } from "react-router";
import { getFromLocalStorage } from "../../commonUtils";
import { useSearchParams } from "react-router-dom";

const ManageRecipes = () => {
  const navigate = useNavigate();
  const user = getFromLocalStorage("user");

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  let params = {
    search: searchTerm,
    sort: "title",
    order: "asc",
    page,
    limit, // Make dynamic based on pagination
  };
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  const {
    data = { recipes: [], pagination: {} },
    isLoading,
    isFetching,
  } = useRecipesQuery(params);
  const newData =
    data && data.recipes
      ? data.recipes.map((recipe) => ({
          ...recipe,
          authorName: recipe?.author?.name || "Unknown",
          createdAt: new Date(recipe.createdAt).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          }),
        }))
      : [];
  const handleAction = (type, actionData) => {
    switch (type) {
      case "edit":
        navigate(`/admin/edit-recipe/${actionData._id}`);
        break;
      case "delete":
        deleteRecipe({
          id: actionData._id,
          body: { currentUserId: user.currentUserId, isAdmin: user.isAdmin },
        });
        break;
      case "search":
        setSearchParams(actionData.trim() ? { search: actionData } : {});
        break;
      case "paginate":
        setSearchParams({
          search: searchTerm,
          page: actionData.page,
          limit: actionData.limit,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {(isLoading || isFetching || isDeleting) && <Loader />}
      <Typography variant="h2" gutterbottom>
        Manage Recipes
      </Typography>
      <Table
        columns={recipeColumns}
        data={newData}
        handleAction={handleAction}
        pagination={
          (data && data.pagination && data?.pagination) || {
            totalItems: 0,
            totalPages: 1,
            currentPage: 1,
            limit: 10,
          }
        }
      />
    </div>
  );
};

export default ManageRecipes;
