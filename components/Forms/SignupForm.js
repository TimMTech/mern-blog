import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const SignupForm = () => {
  const router = useRouter();
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
        console.log(response)
        return response.json();
      })
      .then((data) => {
        if (data && data.error) {
          console.log("SIGN UP ERROR");
          
        }
        if (data) {
          console.log("success");
          router.reload();
         
        }
      })
      .catch((error) => {
        console.log(error)
        
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
