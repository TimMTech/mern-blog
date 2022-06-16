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
        <Input
          value={loginValue.username}
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleLoginChange(e)}
        />
        <Input
          value={loginValue.password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleLoginChange(e)}
        />
        <LoginButton type="submit">Login</LoginButton>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  width: 50%;
  height: 25em;
  gap: 3rem;
`;

const Input = styled.input`
  width: 75%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.25rem;
  height: 3rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
    display: flex;
    font-family: "Prompt", sans-serif;
    font-weight: 200;
  }
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
