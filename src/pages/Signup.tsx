import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../services/authApi";
import { setinLocalStorage } from "../commonUtils";
const Container = styled.div`
  height: 100vh;
  display: flex;
  //   align-items: center;
  justify-content: center;
  #signup-form {
    margin: 50px 0;
    max-width: 600px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: fit-content;
    gap: 10px;
  }
  #link {
    color: #555555;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 50px;
    #signup-form {
      width: 100%;
    }
  }
`;
const Signup = () => {
  const initData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        console.log(value);
        return this.parent.password === value;
      }
    ),
  });
  const [signup] = useSignupMutation();

  const navigate = useNavigate();
  // const postData = async (formData: any) => {
  //   axios.defaults.withCredentials = true;

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/auth/signup",
  //       formData
  //     );
  //     if (response?.data) {
  //       navigate("/admin");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = (values: any, { setSubmitting }: any) => {
    delete values.confirmPassword;
    signup(values).then((response) => {
      if (response && response?.data) {
        setinLocalStorage("user", response.data.user);
        navigate("/admin");
      }
    });

    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <form id="signup-form" onSubmit={formik.handleSubmit}>
        <Typography variant="h1" fontWeight="bold" gutterbottom>
          Signup
        </Typography>
        <Textfield
          type="text"
          name="firstName"
          placeholder={"Enter Firstname"}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.firstName && formik.errors.firstName}
        />
        <Textfield
          type="text"
          name="lastName"
          placeholder={"Enter Lastname"}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.lastName && formik.errors.lastName}
        />
        <Textfield
          type="text"
          name="username"
          placeholder={"Enter username"}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.username && formik.errors.username}
        />
        <Textfield
          type="email"
          name="email"
          placeholder={"Enter email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.email && formik.errors.email}
        />

        <Textfield
          type="password"
          name="password"
          placeholder={"Enter password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.password && formik.errors.password}
        />
        <Textfield
          type="password"
          name="confirmPassword"
          placeholder={"Confirm password"}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik?.touched?.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button type="submit" isDisabled={formik.isSubmitting}>
          Signup
        </Button>
        <Typography variant="smbody">
          Already have an account?{" "}
          <Link id="link" to="/login">
            Login
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Signup;
