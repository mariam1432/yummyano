import React from "react";
import { Table, Typography } from "../../components";
import { userColumns } from "../../data/tableData";
import { useUsersQuery, useDeleteUserMutation } from "../../services/usersApi";
import { useNavigate } from "react-router";
import { getFromLocalStorage } from "../../commonUtils";
import { Loader } from "../../components";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data = [], isLoading, isFetching } = useUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const user = getFromLocalStorage("user");
  console.log(data);
  const handleAction = (type, data) => {
    console.log(type, data);
    switch (type) {
      case "edit":
        navigate(`/admin/edit-user/${data._id}`);
        break;
      case "delete":
        deleteUser({
          id: data._id,
          body: { currentUserId: user.currentUserId, isAdmin: user.isAdmin },
        });
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
      <Table columns={userColumns} data={data} handleAction={handleAction} />
    </>
  );
};

export default Dashboard;
