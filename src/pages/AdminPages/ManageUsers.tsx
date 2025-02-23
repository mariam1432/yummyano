import React from "react";
import { Table, Typography } from "../../components";
import { userColumns } from "../../data/tableData";
import { useUsersQuery, useDeleteUserMutation } from "../../services/usersApi";
import { useNavigate } from "react-router";
import { getFromLocalStorage } from "../../commonUtils";
import { Loader } from "../../components";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const { data, isLoading, isFetching } = useUsersQuery(params);
  const [deleteUser] = useDeleteUserMutation();
  const user = getFromLocalStorage("user");
  console.log(data);
  const handleAction = (type, actionData) => {
    console.log(type, data);
    switch (type) {
      case "edit":
        navigate(`/admin/edit-user/${actionData._id}`);
        break;
      case "delete":
        deleteUser({
          id: actionData._id,
          body: { currentUserId: user.currentUserId, isAdmin: user.isAdmin },
        });
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
        break;
      default:
        break;
    }
  };
  return (
    <>
      {(isLoading || isFetching) && <Loader />}

      <Typography variant="h2" gutterbottom>
        Manage Users
      </Typography>
      <Table
        columns={userColumns}
        data={data?.users || []}
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
    </>
  );
};

export default Dashboard;
