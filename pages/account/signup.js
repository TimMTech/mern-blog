import SignUpForm from "../../components/account/SignupForm";
import styled from "styled-components";
import Link from "next/link";

const signup = () => {
  return (
    <SignUpPageWrapper>
      <SignUpHeaderWrapper>
        <SignUpTitle>Welcome To Our Community!</SignUpTitle>
        <SignUpDescription>
          Please enter a secure username and password. Please provide us a valid
          email address so you can receive our daily newsletter and most liked
          blog posts from around the world!
        </SignUpDescription>
        <LoginDescription>
          If you are part of our community, login below!
        </LoginDescription>
        <NavLogin href="/account/login">
          <Login>LOGIN</Login>
        </NavLogin>
      </SignUpHeaderWrapper>
      <SignUpForm />
    </SignUpPageWrapper>
  );
};

export default signup;

const SignUpPageWrapper = styled.main`
  min-height: 100vh;
`;

const SignUpHeaderWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 100%;
  padding: 5rem;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
`;

const SignUpTitle = styled.h2`
  text-align: left;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1.5rem;
`;

const SignUpDescription = styled.p`
  max-width: 30rem;
`

const LoginDescription = styled.h3`
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const NavLogin = styled(Link)``;

const Login = styled.a`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 3rem;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(52, 97, 235);
  cursor: pointer;
`;
