import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../../components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  useLazyUserQuery,
  useCreateUserMutation,
  useEditUserMutation,
} from "../../services/usersApi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 60%;
    #checkbox {
      display: flex;

      align-items: center;
      label {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: "100%";
    form {
      width: 100%;
    }
  }
`;
const AddUser = () => {
  const { id } = useParams();

  let initData: any = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    isAdmin: true,
  };
  const [fetchUser, response, isLoading] = useLazyUserQuery();
  const [editUser] = useEditUserMutation();
  const [createUser] = useCreateUserMutation();
  useEffect(() => {
    if (id) fetchUser(id);
  }, [id]);

  const addValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const editValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
  });
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log("here");

    id ? editUser({ id, body: values }) : createUser(values);

    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: initData,
    validationSchema: id ? editValidationSchema : addValidationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (id && response.data) {
      // If there is response data and id is provided, set formik initialValues with response data
      formik.setValues(response?.data);
    }
  }, [id, response.data]);

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" gutterbottom>
          {id ? "Edit User" : "Add User"}
        </Typography>
        <Textfield
          type="text"
          name="firstName"
          label="First name"
          placeholder={"Enter Firstname"}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.firstName && formik.errors.firstName}
        />
        <Textfield
          type="text"
          name="lastName"
          label="Last name"
          placeholder={"Enter lastname"}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.lastName && formik.errors.lastName}
        />
        <Textfield
          type="text"
          name="username"
          label="Username"
          placeholder={"Enter Username"}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.username && formik.errors.username}
        />{" "}
        <Textfield
          type="text"
          name="email"
          label="Email Address"
          placeholder={"Enter Email"}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.email && formik.errors.email}
        />
        <Textfield
          type="password"
          name="password"
          label="Password"
          placeholder={"Enter Password"}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.password && formik.errors.password}
        />
        <div id="checkbox">
          <label>Admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formik.values.isAdmin}
            onClick={formik.handleChange}
          />
        </div>
        <Button size={"lg"} type={"submit"}>
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default AddUser;
