
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
  FormTitle,
  SubmitButton
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import LoginError from "../../Validations/LoginError";

const LoginForm = () => {
  const contentType = "application/json";
  const [loginValue, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const [loginFailed, setLoginFailed] = useState(false)

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

  const handleLoginSubmit = () => {
    
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
          setLoginFailed(true)
        }
        if (data && data.token) {
          console.log("Success");
          setLoginFailed(false)
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
          {loginFailed && <LoginError/>}
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
          <SubmitButton type="submit">Login</SubmitButton>
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default LoginForm;


