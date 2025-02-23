import React from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../components";
import bullet from "../assets/bullet.png";
import phone from "../assets/phone.png";
import * as Yup from "yup";
import { useFormik } from "formik";
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    max-width:600px;
    padding: 20px 40px;
    background-color: #fdf5e6;
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='black' stroke-width='6' stroke-dasharray='23%2c 14' stroke-dashoffset='2' stroke-linecap='square'/%3e%3c/svg%3e");
    @media only screen and (max-width: 700px){
      background:none;
    }
    #head {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 5px;
    }
    #phone{
        height:50px;
        width:60px;
        object-fit:cover;
    }
    #fields {
      display: flex !important;
      align-items: center;
      justify-content: center; /* Align center horizontally */
      flex-direction: column;
      width: 100%; /* Set width to 100% to take full width */
    }
  }
 
  }
 
`;

function Contactus() {
  const initData = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email address is required"),
    name: Yup.string().required("Name is required"),
    subject: Yup.string(),
    message: Yup.string().required("Message is required"),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values));
    }, 400);
  };
  const formik = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <div id="head">
          <img src={bullet} />
          <Typography variant="h2" fontface="goth" underline>
            Keep In Touch
          </Typography>
          <img src={bullet} />
        </div>
        <img src={phone} id="phone" />
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
          type="text"
          name="name"
          placeholder={"Enter name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.name && formik.errors.name}
        />{" "}
        <Textfield
          type="text"
          name="subject"
          placeholder={"Enter subject"}
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.subject && formik.errors.subject}
        />{" "}
        <Textfield
          type="message"
          name="message"
          placeholder={"Enter message"}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik?.touched?.message && formik.errors.message}
          multiline
        />
        <Button variant="outlined" size="lg" type={"submit"}>
          Send
        </Button>
      </form>
    </Container>
  );
}

export default Contactus;
