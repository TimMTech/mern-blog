import LoginForm from "../../components/Forms/LoginForm"
import styled from "styled-components";
import Link from "next/link";


const login = () => {
  
  return (
    <LoginPageWrapper>
      <LoginHeaderWrapper>
        <LoginTitle>Welcome Back!</LoginTitle>
        <LoginDescription>
          Please enter your username and password and continue to read and share
          ideas from independent voices, world-class publications, and experts
          from around the globe!
        </LoginDescription>
        <SignUpDescription>
          If new, sign up and join our community!
        </SignUpDescription>
        <NavSignUp href="/account/signup">
          <SignUp>SIGNUP</SignUp>
        </NavSignUp>
      </LoginHeaderWrapper>
      <LoginForm />
    </LoginPageWrapper>
  );
};



export default login;

const LoginPageWrapper = styled.main`
  min-height: 100vh;
`

const LoginHeaderWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 100%;
  padding: 5rem;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
`;

const LoginTitle = styled.h2`
  text-align: left;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1.5rem;
`;

const LoginDescription = styled.p`
  max-width: 30rem;
`;

const SignUpDescription = styled.h3`
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const NavSignUp = styled(Link)``;

const SignUp = styled.a`
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
