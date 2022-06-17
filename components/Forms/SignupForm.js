import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renderSignupError } from "../Validations/SignupError";

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
        <FormWrapper>
          <StyledForm method="POST">
            <FormTitle>
              Welcome to{" "}
              <StyledE>
                E<StyledBlog>BLOG</StyledBlog>
              </StyledE>
            </FormTitle>
            <FieldWrapper>
              <StyledLabel>Username</StyledLabel>
              <StyledField
                value={signUpValue.username}
                type="text"
                name="username"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="username" render={renderSignupError} />
            </FieldWrapper>
            <FieldWrapper>
              <StyledLabel>Email</StyledLabel>
              <StyledField
                value={signUpValue.email}
                type="email"
                name="email"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="email" render={renderSignupError} />
            </FieldWrapper>
            <FieldWrapper>
              <StyledLabel>Password</StyledLabel>
              <StyledField
                value={signUpValue.password}
                type="password"
                name="password"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="password" render={renderSignupError} />
            </FieldWrapper>
            <SignUpButton type="submit">Sign Up</SignUpButton>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default SignupForm;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

const FormTitle = styled.p`
  font-size: 4rem;
  text-align: center;
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
  padding: 1rem;
`;
const StyledE = styled.span`
  color: rgb(52, 97, 235);
  font-size: 6rem;
  cursor: pointer;
  letter-spacing: 0.8rem;
`;

const StyledBlog = styled.span`
  color: rgb(0, 0, 0);
  font-size: 4rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  gap: 1.5rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  height: 3rem;
  font-size: 1.5rem;
`;

const SignUpButton = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;
