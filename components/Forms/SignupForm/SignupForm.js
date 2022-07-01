import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import {
  FormContainer,
  FieldContainer,
  StyledLabel,
  StyledField,
  StyledForm,
  FormTitle,
  EditTitle,
  SubmitButton,
  ExitButton,
  ButtonContainer,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";

const SignupForm = ({ editMode, userId, setEditMode }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [signUpValue, setSignUpValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("*Required")
      .min(6, "*Must be 6 Characters or More")
      .max(15, "*Must be 15 Characters or Less"),
    password: Yup.string()
      .required("*Required")
      .min(6, "*Must be 6 Characters or More")
      .max(15, "*Must be 15 Characters or Less"),
    email: Yup.string().required("*Required").email("*Must be a Valid Email "),
  });

  const handleExitEdit = () => {
    setEditMode(false)
  }

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = () => {
    if (editMode) {
      fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: JSON.stringify(signUpValue),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data && data.error) {
            console.log("FAILED EDIT");
          }
          if (data) {
            setEditMode(false);
            router.push(`/user/${data._id}`);
            console.log("PROFILE EDITED");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: JSON.stringify(signUpValue),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data && data.error) {
            console.log("SIGN UP ERROR");
          }
          if (data && data.success) {
            router.push("/account/login");
            console.log("success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Formik
      initialValues={signUpValue}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSignUpSubmit}
    >
      {() => (
        <FormContainer>
          <StyledForm method="POST">
            {editMode ? (
              <EditTitle>Edit Profile</EditTitle>
            ) : (
              <FormTitle>
                Welcome to Our Community!
              </FormTitle>
            )}
            <FieldContainer>
              <StyledLabel>Username</StyledLabel>
              <StyledField
                value={signUpValue.username}
                type="text"
                name="username"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="username" render={renderError} />
            </FieldContainer>
            <FieldContainer>
              <StyledLabel>Email</StyledLabel>
              <StyledField
                value={signUpValue.email}
                type="email"
                name="email"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="email" render={renderError} />
            </FieldContainer>
            <FieldContainer>
              <StyledLabel>Password</StyledLabel>
              <StyledField
                value={signUpValue.password}
                type="password"
                name="password"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="password" render={renderError} />
            </FieldContainer>
            <ButtonContainer>
              <SubmitButton type="submit">
                {editMode ? "Save" : "Sign up"}
              </SubmitButton>
              {editMode && (
                <ExitButton onClick={handleExitEdit}>Exit</ExitButton>
              )}
            </ButtonContainer>
          </StyledForm>
        </FormContainer>
      )}
    </Formik>
  );
};

export default SignupForm;




