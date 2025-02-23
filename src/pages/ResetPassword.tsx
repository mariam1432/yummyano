import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLocalStorage } from "../commonUtils";
import { useResetPasswordMutation } from "../services/authApi";
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
const ResetPassword = () => {
  const { token } = useParams();
  const initData = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
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
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  // const postData = async (formData: any) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/auth/reset-password/" + token,
  //       { password: formData.password }
  //     );
  //     //   navigate("/login");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    delete values.confirmPassword;
    resetPassword({ token, body: values });
    navigate("/login");

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
          Reset Password
        </Typography>
        {JSON.stringify(token)}
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
          Reset Password
        </Button>
      </form>
    </Container>
  );
};

export default ResetPassword;
