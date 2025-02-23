import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../commonUtils";
import { useForgotPasswordMutation } from "../services/authApi";

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
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const initData = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
  });
  // const postData = async (formData: any) => {
  //   axios.defaults.withCredentials = true;
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/auth/forgot-password",
  //       formData
  //     );

  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const handleSubmit = (values, { setSubmitting }) => {
    forgotPassword(values).then(() => {
      // navigate("/login");
    });
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const user = getFromLocalStorage("user");
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user]);
  return (
    <Container>
      <form id="signup-form" onSubmit={formik.handleSubmit}>
        <Typography variant="h1" fontWeight="bold" gutterbottom>
          Forgot Password
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

        <Button type="submit" isDisabled={formik.isSubmitting}>
          Send Email
        </Button>
        <Link id="forgot" to="/login">
          Back to log in
        </Link>
      </form>
    </Container>
  );
};

export default ForgotPassword;
