import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Table,
  Textfield,
  Typography,
  ImageUploader,
  AsyncSelect,
} from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { generateUniqueId, getFromLocalStorage } from "../../commonUtils";
import { ingredientColumns, directionColumns } from "../../data/tableData";
import {
  useCreateRecipeMutation,
  useEditRecipeMutation,
  useLazyRecipeQuery,
  
} from "../../services/recipesApi";
import { useLazyCategoryQuery } from "../../services/categoriesApi";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 60%;

    #ingredient-container {
      border: 1px solid #555;
      border-radius: 14px;
      padding: 10px 16px;
      display: flex;
      gap: 2px;
      flex-direction: column;
      button {
        margin-top: 5px;
        align-self: flex-end;
      }
      #ingredient-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #c72c41;
        margin-bottom: 5px;
        i {
          cursor: pointer;
          font-size: 20px;
        }
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
    width: ${(props) => (props.isOpen ? `calc(100% - 80px)` : "100%")};
    form {
      width: 100%;
    }
  }
`;

const AddRecipe = () => {
  const { id } = useParams();
  const [fetchRecipe, response, isLoading] = useLazyRecipeQuery();

  const [createRecipe] = useCreateRecipeMutation();
  const [editRecipe] = useEditRecipeMutation();

  const user = getFromLocalStorage("user");
  const [customErrors, setCustomErrors] = useState({
    ingredient: "",
    unit: "",
    quantity: "",
    step: "",
  });

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id]);

  const [imagePreview, setImagePreview] = useState(
    response?.currentData?.imgUrl || null
  );
  const [updateImg, setUpdateImage] = useState(false);
  useEffect(() => {
    if (id && response && response.currentData && response.currentData.imgUrl) {
      setImagePreview(response.currentData.imgUrl);
    }
  }, [response]);
  const validateIngredient = (data) => {
    let hasErrors = false;

    if (data) {
      if (data.ingredient.trim().length === 0) {
        setCustomErrors((prev) => {
          return { ...prev, ingredient: "Ingredient is required." };
        });
        hasErrors = true;
      } else if (isNaN(data.quantity) || data.quantity <= 0) {
        setCustomErrors((prev) => {
          return {
            ...prev,
            quantity: "Quantity for must be a positive number.",
          };
        });
        hasErrors = true;
      }
      if (data.unit.trim().length === 0) {
        setCustomErrors((prev) => {
          return { ...prev, unit: "Unit is required." };
        });
        hasErrors = true;
      }
    }
    return !hasErrors;
  };
  const initData = {
    imgUrl: "",
    title: "",
    difficultyLevel: "",
    category: "",
    servingPortions: "",
    prepTime: "",
    description: "",
    approved: true,
    archived: false,
    ingredients: [],
    directions: [],
    tempDirection: {
      step: "",
    },
    tempIngredient: {
      ingredient: "",
      quantity: "",
      unit: "",
    },
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    difficultyLevel: Yup.string().required("Difficulty Level is required"),
    category: Yup.string().required("Category is required"),

    servingPortions: Yup.number()
      .positive("Must be more than 0")
      .integer("Must be more than 0")
      .required("This field is required"),
    prepTime: Yup.string()
      .matches(
        /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
        "Invalid time format. Should be in HH:MM:SS format."
      )
      .required("Preparation time is required"),
    ingredients: Yup.array(
      Yup.object().shape({
        ingredient: Yup.string().required("Ingredient is required"),
        quantity: Yup.number()
          .positive("Quantity must be greater than zero")
          .required("Quantity is required")
          .test(
            "quantity-positive",
            "Quantity must be positive",
            function (value) {
              return value > 0;
            }
          ),
        unit: Yup.string().required("Unit is required"),
      })
    )
      .min(1, "Ingredients list is empty")
      .required("Ingredients are required"),
    directions: Yup.array(
      Yup.object().shape({
        step: Yup.string()
          .required("Step is required")
          .test("step-non-empty", "Step cannot be empty", function (value) {
            return value.trim().length > 0;
          }),
      })
    )
      .min(1, "Directions list is empty")
      .required("Directions are required"),
  });
  const [imgURL, setImgURL] = useState(null);

  const [tempDirection, setTempDirection] = useState({ step: "" });
  const [tempIngredient, setTempIngredient] = useState({
    ingredient: "",
    quantity: "",
    unit: "",
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    delete values.tempDirection;
    delete values.tempIngredient;
    let imageUrl = values?.imgUrl || "";

    if (updateImg) {
      const data = new FormData();
      data.append("file", imgURL);
      data.append("upload_preset", "test_folder");
      data.append("cloud_name", "dcuzggcsg");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dcuzggcsg/image/upload`,
        { method: "POST", body: data }
      );
      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const uploadImageResponse = await res.json();

      // Extract the image URL
      imageUrl = uploadImageResponse.url;
    }
    // Call createRecipe with the image URL and other form values
    id
      ? editRecipe({
          id,
          body: { ...values, imgUrl: imageUrl, updatedBy: user._id },
        })
      : createRecipe({ ...values, imgUrl: imageUrl, authorId: user._id });

    resetForm();
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues:
      id && response && response.currentData ? response.currentData : initData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const ingredientCrud = (type, data) => {
    switch (type) {
      case "delete":
        let temp = formik.values.ingredients;
        if (temp && temp.length > 0) {
          temp = formik.values.ingredients.filter((i) => i?.id !== data.id);
          formik.setFieldValue("ingredients", temp);
        }

        break;
      case "edit":
        setTempIngredient(data);
        break;

      default:
        break;
    }
  };

  const updateObject = (array, id, updatedObject) => {
    const index = array.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      const updatedArray = [...array];
      updatedArray[index] = updatedObject;
      return updatedArray;
    } else {
      return array;
    }
  };

  const directionCrud = (type, data) => {
    switch (type) {
      case "delete":
        let temp = formik.values.directions;
        if (temp && temp.length > 0) {
          temp = formik.values.directions.filter((i) => i?.id !== data.id);
          formik.setFieldValue("directions", temp);
        }

        break;
      case "edit":
        setTempDirection(data);
        break;

      default:
        break;
    }
  };

  const handleAddIngredient = () => {
    if (!validateIngredient(tempIngredient)) {
      return;
    }

    if (tempIngredient.id) {
      formik.setFieldValue(
        "ingredients",
        updateObject(
          formik.values.ingredients,
          tempIngredient?.id,
          tempIngredient
        )
      );
    } else {
      const newIngredient = {
        id: generateUniqueId(),
        ...tempIngredient,
      };
      formik.setFieldValue("ingredients", [
        ...formik.values.ingredients,
        newIngredient,
      ]);
    }
    setTempIngredient({ ingredient: "", quantity: "", unit: "" });
    setCustomErrors({ ingredient: "", quantity: "", unit: "" }); // Clear custom errors
  };
  const validateDirections = (data) => {
    let hasErrors = false;
    if (data) {
      if (data.step.trim().length === 0) {
        setCustomErrors((prev) => {
          return { ...prev, step: "Step is required." };
        });
        hasErrors = true;
      }
    }

    return !hasErrors;
  };
  const handleAddDirection = () => {
    if (!validateDirections(tempDirection)) {
      return;
    }
    if (tempDirection?.id) {
      formik.setFieldValue(
        "directions",
        updateObject(formik.values.directions, tempDirection?.id, tempDirection)
      );
    } else {
      const newdirection = {
        id: generateUniqueId(),
        ...tempDirection,
      };
      formik.setFieldValue("directions", [
        ...formik.values.directions,
        newdirection,
      ]);
    }
    setTempDirection({ step: "" });
    setCustomErrors({ step: "" }); // Clear custom errors
  };
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

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" gutterbottom>
          Add Recipe
        </Typography>
        <ImageUploader onImageSelect={handleImageSelect} img={imagePreview} />
        <Textfield
          label="Title"
          placeholder={"Enter Title"}
          name="title"
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.title && formik.errors.title}
        />
        <Textfield
          label="Difficulty Level"
          placeholder={"Enter Difficulty Level"}
          name="difficultyLevel"
          value={formik.values.difficultyLevel}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={
            formik?.touched?.difficultyLevel && formik.errors.difficultyLevel
          }
        />
        <Textfield
          label="Category"
          placeholder={"Enter Category"}
          name="category"
          value={formik.values.category}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.category && formik.errors.category}
        />
        <AsyncSelect list={[]} />
        <Textfield
          label="Serving Portions"
          placeholder={"Enter Serving Portions"}
          name="servingPortions"
          value={formik.values.servingPortions}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={
            formik?.touched?.servingPortions && formik.errors.servingPortions
          }
        />
        <Textfield
          label="Preparation Time"
          placeholder={"Enter Preparation Time"}
          name="prepTime"
          value={formik.values.prepTime}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={formik?.touched?.prepTime && formik.errors.prepTime}
        />
        <Textfield
          multiline
          label="Description"
          placeholder={"Enter description"}
          name="description"
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorMessage={
            formik?.touched?.description && formik.errors.description
          }
        />
        <div id="ingredient-container">
          <div id="ingredient-header">
            <Typography
              fontWeight="bold"
              variant="h5"
              color="#C72C41"
              align="center"
            >
              Ingredient Details{" "}
            </Typography>
            <i
              className={
                tempIngredient && tempIngredient.id
                  ? "ri-edit-circle-fill"
                  : "ri-add-box-line"
              }
              onClick={() => handleAddIngredient()}
            />
          </div>

          <Textfield
            label="Title"
            placeholder={"Enter Title"}
            size="lg"
            name="ingredient"
            value={tempIngredient?.ingredient || ""}
            onChange={(e) =>
              setTempIngredient((prev) => {
                return { ...prev, ingredient: e.target.value };
              })
            }
            errorMessage={customErrors.ingredient || ""}
          />
          <Textfield
            label="Quantity"
            placeholder={"Enter Quantity"}
            size="lg"
            name="quantity"
            value={tempIngredient?.quantity || ""}
            onChange={(e) =>
              setTempIngredient((prev) => {
                return { ...prev, quantity: e.target.value };
              })
            }
            errorMessage={customErrors.quantity || ""}
          />
          <Textfield
            label="Unit"
            placeholder={"Enter Unit"}
            size="lg"
            name="unit"
            value={tempIngredient?.unit || ""}
            onChange={(e) =>
              setTempIngredient((prev) => {
                return { ...prev, unit: e.target.value };
              })
            }
            errorMessage={customErrors.unit || ""}
          />
        </div>
        {formik.values.ingredients && formik.values.ingredients.length > 0 ? (
          <Table
            columns={ingredientColumns}
            data={formik.values.ingredients}
            handleAction={ingredientCrud}
          />
        ) : (
          <></>
        )}
        <Typography color="red" variant="smbody">
          {formik.errors.ingredients}
        </Typography>{" "}
        <div id="ingredient-container">
          <div id="ingredient-header">
            <Typography
              fontWeight="bold"
              variant="h5"
              color="#C72C41"
              align="center"
            >
              Direction Details{" "}
            </Typography>
            <i
              className={
                tempDirection && tempDirection.id
                  ? "ri-edit-circle-fill"
                  : "ri-add-box-line"
              }
              onClick={() => handleAddDirection()}
            />
          </div>

          <Textfield
            label="Step"
            name="tempDirection.step"
            placeholder={"Enter Step"}
            size="lg"
            value={tempDirection?.step || ""}
            onChange={(e) =>
              setTempDirection((prev) => {
                return { ...prev, step: e.target.value };
              })
            }
            errorMessage={customErrors.step || ""}
          />
        </div>
        {formik.values.directions && formik.values.directions.length > 0 ? (
          <Table
            handleAction={directionCrud}
            columns={directionColumns}
            data={formik.values.directions.map((d, i) => {
              return { ...d, sno: i + 1 };
            })}
          />
        ) : (
          <></>
        )}
        <Typography color="red" variant="smbody">
          {formik.errors.directions}
        </Typography>{" "}
        <Button
          type="submit"
          size="lg"
          isDisabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
        >
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default AddRecipe;
