import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyUserQuery } from "../../services/usersApi";
import { useUpdateProfileMutation } from "../../services/authApi";
import { getFromLocalStorage } from "../../commonUtils";
const Wrapper = styled.div`
  #form-container {
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
      #profile-container {
        display: flex;
        gap: 20px;
        #img {
          position: relative;
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid #555;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          i {
            position: absolute;
            background-color: #555;
            cursor: pointer;
            border-radius: 50%;
            bottom: 0;
            right: 5px;
            padding: 10px;
            color: #fff;
            &:hover {
              color: blue;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 700px) {
    #form-container {
      display: flex;
      flex-direction: column;
      width: "100%";
      form {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 500px) {
    #form-container {
      form {
        #profile-container {
          flex-direction: column;
          #img {
            width: 100%;
          }
        }
      }
    }
  }
`;
const Profile = () => {
  const initData = {
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
  };
  const user = getFromLocalStorage("user");
  const [fetchUser, { data }, isLoading] = useLazyUserQuery();
  const [upateProfile] = useUpdateProfileMutation();
  useEffect(() => {
    if (user && user._id) fetchUser(user._id);
  }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    bio: Yup.string().min(15).max(250),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    upateProfile({ id: data._id, body: values });
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (user && data) {
      // If there is response data and id is provided, set formik initialValues with response data
      formik.setValues(data);
    }
  }, [data]);
  return (
    <Wrapper>
      <div id="form-container">
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h2" gutterbottom>
            Profile
          </Typography>
          <div id="profile-container">
            <div
              id="img"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              }}
            >
              <i className="ri-edit-fill" />
            </div>
            <div id="info">
              <Typography>
                <b>Email </b>
                {data && data?.email ? data?.email : "---"}
              </Typography>
              <Typography>
                <b>Recipes </b>30
              </Typography>
              <Typography>
                <b>Articles </b>5
              </Typography>
            </div>
          </div>
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
            placeholder={"Enter Lastname"}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik?.touched?.lastName && formik.errors.lastName}
          />
          <Textfield
            type="text"
            name="username"
            label="Username"
            placeholder={"Enter username"}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik?.touched?.username && formik.errors.username}
          />

          <Textfield
            multiline
            label="Bio"
            name="bio"
            placeholder={"Enter Bio"}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik?.touched?.bio && formik.errors.bio}
          />

          <Button size={"lg"} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Profile;
