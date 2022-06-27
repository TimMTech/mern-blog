import styled from "styled-components";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  FormContainer,
  FieldContainer,
  StyledLabel,
  StyledField,
  StyledForm,
  FormTitle
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";

const LoginForm = () => {
  const contentType = "application/json";
  const [loginValue, setLoginValues] = useState({
    username: "",
    password: "",
  });

    const validationSchema = Yup.object({
      username: Yup.string()
        .required("*Required")
        .min(1, "*Please Enter a Valid Username"),
      password: Yup.string()
        .required("*Required")
        .min(1, "*Please Enter a Valid Password"),
    
    });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: JSON.stringify(loginValue),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.error) {
          console.log("FAILED LOGIN");
        }
        if (data && data.token) {
          console.log("Success");
          Cookies.set("token", data.token, { expires: 1 });
          window.location.href = `/user/${data._id}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={loginValue}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleLoginSubmit}
    >
      <FormContainer>
        <StyledForm method="POST">
          <FormTitle>Login to Your Account</FormTitle>
          <FieldContainer>
            <StyledLabel>Username</StyledLabel>
            <StyledField
              value={loginValue.username}
              type="text"
              name="username"
              onChange={(e) => handleLoginChange(e)}
            />
            <ErrorMessage name="username" render={renderError} />
          </FieldContainer>
          <FieldContainer>
            <StyledLabel>Password</StyledLabel>
            <StyledField
              value={loginValue.password}
              type="password"
              name="password"
              onChange={(e) => handleLoginChange(e)}
            />
            <ErrorMessage name="password" render={renderError} />
          </FieldContainer>
          <LoginButton type="submit">Login</LoginButton>
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default LoginForm;

const LoginButton = styled.button`
  border: 0.05rem solid rgb(0, 0, 0);
  padding: 0.5rem 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
`;
