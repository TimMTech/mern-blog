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
  DeleteButton,
  ButtonContainer,
  LineBreakContainer,
  Line,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import { signIn, signOut } from "next-auth/react";
import { toast } from "react-toastify";

const SignupForm = ({ profileEditMode, userId, setProfileEditMode }) => {
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
    setProfileEditMode(false);
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteUser = () => {
    if (profileEditMode) {
      fetch(`/api/user/${userId}/delete`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          toast.success("User Deleted");
          signOut();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignUpSubmit = () => {
    if (profileEditMode) {
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
            toast.error("Server Error Occurred");
          }
          if (data) {
            setEditMode(false);
            router.push(`/user/${data._id}`);
            console.log("PROFILE EDITED");
            toast.success("Saved!");
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
            toast.error("Server Error Occurred.");
          }
          if (data && data.success) {
            router.push("/auth/login");
            toast.success("Sign up successfull!");
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
          {profileEditMode ? (
            <EditTitle>Edit Profile</EditTitle>
          ) : (
            <FormTitle>Create your account</FormTitle>
          )}
          {!profileEditMode && (
            <SubmitButton
              onClick={() =>
                signIn(
                  "google",

                  { prompt: "login" }
                )
              }
            >
              Google
            </SubmitButton>
          )}
          <StyledForm method="POST">
            {!profileEditMode && (
              <LineBreakContainer>
                <Line />
                or
                <Line />
              </LineBreakContainer>
            )}
            <FieldContainer signupform="true">
              <StyledLabel>Username</StyledLabel>
              <StyledField
                value={signUpValue.username}
                type="text"
                name="username"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="username" render={renderError} />
            </FieldContainer>
            <FieldContainer signupform="true">
              <StyledLabel>Email</StyledLabel>
              <StyledField
                value={signUpValue.email}
                type="email"
                name="email"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="email" render={renderError} />
            </FieldContainer>
            <FieldContainer signupform="true">
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
                {profileEditMode ? "Save" : "Sign up"}
              </SubmitButton>
              {profileEditMode && (
                <ExitButton onClick={handleExitEdit}>Exit</ExitButton>
              )}
            </ButtonContainer>
          </StyledForm>
          {profileEditMode && (
            <DeleteButton onClick={handleDeleteUser}>Delete User</DeleteButton>
          )}
        </FormContainer>
      )}
    </Formik>
  );
};

export default SignupForm;
