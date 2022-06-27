import styled from "styled-components";
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
  FormTitle
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";

const SignupForm = () => {
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

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = () => {
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
            <FormTitle>
              Welcome to <StyledE>EBLOG</StyledE>
            </FormTitle>
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
            <SignUpButton type="submit">Sign Up</SignUpButton>
          </StyledForm>
        </FormContainer>
      )}
    </Formik>
  );
};

export default SignupForm;

const StyledE = styled.span`
  color: rgb(52, 97, 235);
  cursor: pointer;
  letter-spacing: 0.8rem;
`;

const SignUpButton = styled.button`
  border: 0.05rem solid rgb(0, 0, 0);
  padding: 0.5rem 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
`;
