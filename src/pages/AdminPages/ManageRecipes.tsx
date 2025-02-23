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

const ManageRecipes = () => {
  const navigate = useNavigate();
  const user = getFromLocalStorage("user");
  const [deleteRecipe,isDeleting] = useDeleteRecipeMutation();
  const { data = [], isLoading, isFetching } = useRecipesQuery();
  const newData = data.map((recipe) => ({
    ...recipe,
    authorName: recipe?.author?.name || "Unknown",
    createdAt: new Date(recipe.createdAt).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }),
  }));
  const handleAction = (type, data) => {
    console.log(type, data);
    switch (type) {
      case "edit":
        navigate(`/admin/edit-recipe/${data._id}`);
        break;
      case "delete":
        deleteRecipe({
          id: data._id,
          body: { currentUserId: user.currentUserId, isAdmin: user.isAdmin },
        });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {(isLoading || isFetching) && <Loader />}
      <Typography variant="h2" gutterbottom>
        Manage Recipes
      </Typography>
      <Table
        columns={recipeColumns}
        data={newData}
        handleAction={handleAction}
      />
    </div>
  );
};

export default ManageRecipes;
