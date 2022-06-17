import styled from "styled-components";
import { useState } from "react";
import Cookies from "js-cookie";

const LoginForm = () => {
  const contentType = "application/json";
  const [loginValue, setLoginValues] = useState({
    username: "",
    password: "",
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
    <FormWrapper>
      <Form method="POST" onSubmit={handleLoginSubmit}>
        <FormTitle>Login to Your Account</FormTitle>
        <FieldWrapper>
          <StyledLabel>Username</StyledLabel>
          <Input
            value={loginValue.username}
            type="text"
            name="username"
            onChange={(e) => handleLoginChange(e)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <StyledLabel>Password</StyledLabel>
          <Input
            value={loginValue.password}
            type="password"
            name="password"
            onChange={(e) => handleLoginChange(e)}
          />
        </FieldWrapper>
        <LoginButton type="submit">Login</LoginButton>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;

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

const Form = styled.form`
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  height: 3rem;
  font-size: 1.5rem;
`;

const LoginButton = styled.button`
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
