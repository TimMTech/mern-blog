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
      .required("Required!")
      .min(6, "Must be 6 Characters or More")
      .max(15, "Must be 15 Characters or Less"),
    password: Yup.string()
      .required("Required!")
      .min(6, "Must be 6 Characters or More")
      .max(15, "Must be 15 Characters or Less"),
    email: Yup.string().required("Required").email("Must be a Valid Email "),
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
            <FieldWrapper>
              <StyledField
                value={signUpValue.username}
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="username" render={renderSignupError} />
            </FieldWrapper>
            <FieldWrapper>
              <StyledField
                value={signUpValue.email}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleSignUpChange(e)}
              />
              <ErrorMessage name="email" render={renderSignupError} />
            </FieldWrapper>
            <FieldWrapper>
              <StyledField
                value={signUpValue.password}
                type="password"
                name="password"
                placeholder="Password"
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
  padding: 2rem 0;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  width: 50%;
  height: 25em;
  gap: 3rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 3rem;
`;


const StyledField = styled(Field)`
  width: 75%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.5rem;
  height: 3rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
    display: flex;
    font-family: "Prompt", sans-serif;
    font-weight: 200;
  }
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
