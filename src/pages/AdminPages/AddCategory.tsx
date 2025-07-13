import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Textfield, Typography, ImageUploader } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useLazyCategoryQuery,
} from "../../services/categoriesApi";
import { getFromLocalStorage } from "../../commonUtils";
import {
  handleDeleteImage,
  handleImageUpload,
} from "../../services/cloudinaryApi";

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

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    form {
      width: 100%;
    }
  }
`;
const AddCategory = () => {
  const { id } = useParams();
  const [fetchCategory, response, isLoading] = useLazyCategoryQuery();

  const [imagePreview, setImagePreview] = useState(
    response?.currentData?.imgUrl || null
  );
  const [updateImg, setUpdateImage] = useState(false);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (id && response && response.currentData && response.currentData.imgUrl) {
      setImagePreview(response.currentData.imgUrl);
    }
  }, [response]);

  const handleImageSelect = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader?.result); // Set the Data URL of the image
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
      setImgURL(file);
      setUpdateImage(true);
    }
  };

  const initData = {
    imgUrl: "",
    title: "",
    description: "",
  };
  const [createCategory] = useCreateCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  useEffect(() => {
    if (id) fetchCategory(id);
  }, [id]);
  const user = getFromLocalStorage("user");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    // type: Yup.string().required("type is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let imageUrl = values?.imgUrl || "";
    let imgPublicId = values?.imgPublicId || "";
    if (updateImg) {
      if (id && values.imgPublicId) {
        await handleDeleteImage(formik.values.imgPublicId);
      }
      const imageResponse = await handleImageUpload(imgURL);
      imageUrl = imageResponse?.url;
      imgPublicId = imageResponse?.public_id;
    }
    id
      ? editCategory({
          id,
          body: {
            ...values,
            imgUrl: imageUrl,
            updatedBy: user._id,
            imgPublicId,
          },
        })
      : createCategory({
          ...values,
          imgUrl: imageUrl,
          authorId: user._id,
          imgPublicId,
        });

    resetForm();
    setImagePreview(null);
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues:
      id && response && response.currentData ? response.currentData : initData,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" gutterbottom>
          Add Category
        </Typography>
        <ImageUploader onImageSelect={handleImageSelect} img={imagePreview} />

        <Textfield
          type="text"
          name="title"
          label="Title"
          placeholder={"Enter title"}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.title && formik.errors.title}
        />
        <Textfield
          multiline
          label="Description"
          placeholder={"Enter description"}
          type="text"
          name="description"
          onBlur={formik.handleBlur}
          value={formik.values.description}
          onChange={formik.handleChange}
          errorMessage={
            formik?.touched?.description && formik.errors.description
          }
        />
        <Button type="submit" size={"lg"}>
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default AddCategory;
