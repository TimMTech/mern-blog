
import styled from "styled-components";
import { useState } from "react";
import Cookies from "js-cookie";

const SignupForm = () => {
  const contentType = "application/json";
  const [signUpValue, setSignUpValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
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
        console.log(data);
        if (data && data.error) {
          console.log("SIGN UP ERROR");
        }
        if (data && data.token) {
          console.log("success");
          Cookies.set("token", data.token, { expires: 1 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormWrapper>
      <Form method="POST">
        <Input
          value={signUpValue.username}
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handleSignUpChange(e)}
        />
        <Input
          value={signUpValue.email}
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleSignUpChange(e)}
        />
        <Input
          value={signUpValue.password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleSignUpChange(e)}
        />
        <SignUpButton type="button" onClick={handleSignUpSubmit}>
          Sign Up
        </SignUpButton>
      </Form>
    </FormWrapper>
  );
};

export default SignupForm;

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

const SignUpButton = styled.button`
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
