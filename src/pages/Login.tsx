import React from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { setinLocalStorage } from "../commonUtils";
// import { useLoginMutation } from "../app/features/authSlice";
import { useLoginMutation } from "../services/authApi";

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
  #forgot {
    color: #555555;
    font-weight: bold;
    align-self: flex-end;
    font-size: 12px;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 50px;
    #signup-form {
      width: 100%;
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const initData = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  // const postData = async (formData: any) => {
  //   axios.defaults.withCredentials = true;
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/auth/login",
  //       formData
  //     );
  //     if (response?.data.status) {
  //       navigate("/admin");
  //       setinLocalStorage("user", response.data.user);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // postLogin(values).then((e) => alert("posted"));
      login(values).then((response) => {
        if (response?.data) {
          navigate("/admin");
          setinLocalStorage("user", response?.data.user);
        }
      });
      setSubmitting(false);
    }, 400);
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
          Log in
        </Typography>

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

        <Button type="submit" isDisabled={formik.isSubmitting}>
          Log in
        </Button>
        <Link id="forgot" to="/forgot-password">
          Forgot Password?
        </Link>

        <Typography variant="smbody">
          Don't have an account yet?{" "}
          <Link id="link" to="/signup">
            Sign up
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
