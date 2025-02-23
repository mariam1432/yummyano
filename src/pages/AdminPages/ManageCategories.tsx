import React, { useState } from "react";
import { Table, Typography, Loader } from "../../components";
import { categoriesColumns } from "../../data/tableData";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../services/categoriesApi";
import { getFromLocalStorage } from "../../commonUtils";

const ManageCategories = () => {
  const navigate = useNavigate();
  const user = getFromLocalStorage("user") || {}; // Prevent null user
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
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

  const { data, isLoading, isFetching } = useCategoriesQuery(params);

  const newData =
    data?.categories?.map((category) => ({
      ...category,
      authorName: category?.author?.name || "Unknown",
      createdAt: new Date(category?.createdAt).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
    })) || [];

  const handleAction = (type, actionData) => {
    switch (type) {
      case "edit":
        navigate(`/admin/edit-category/${actionData._id}`);
        break;
      case "delete":
        if (!user.currentUserId || !user.isAdmin) {
          alert("Unauthorized action");
          return;
        }
        deleteCategory({
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

  if (isLoading || isFetching) return <Loader />; // Prevents rendering while loading

  return (
    <div>
      <Typography variant="h2" gutterbottom>
        Manage Categories
      </Typography>

      <Table
        columns={categoriesColumns}
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

export default ManageCategories;
