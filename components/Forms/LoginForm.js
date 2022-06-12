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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data && data.error) {
          console.log("FAILED LOGIN");
          return data.error;
        }
        if (data && data.token) {
          console.log("Success");
          Cookies.set("token", data.token, { expires: 1 });
          window.location.href = `/user/${data._id}`;
          return data;
        }
      })
      .catch((error) => {
        console.log(error);
        return error
      });
  };

  return (
    <FormWrapper>
      <Form method="POST">
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
        <LoginButton type="button" onClick={handleLoginSubmit}>
          Login
        </LoginButton>
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
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  width: 75%;
  height: 30rem;
  padding: 5rem;
  gap: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.5rem;
  height: 5rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
    display: flex;
    font-family: "Prompt", sans-serif;
    font-weight: 200;
  }
`;

const LoginButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5rem;
  font-size: 3rem;
  color: rgb(52, 97, 235);
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.5rem;
  background-color: rgb(255, 255, 255);
`;
