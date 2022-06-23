import SignUpForm from "../../components/Forms/SignupForm/SignupForm";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import formBG from "/public/static/images/formBG.png";

const signup = () => {
  return (
    <SignUpPageWrapper>
      <SignUpForm />
      <SignUpRightWrapper>
        <Image layout="fill" src={formBG} priority alt="" objectFit="cover" />
        <SignUpTitle>Already a Member?</SignUpTitle>
        <LoginDescription>
          If you are part of our community, login below!
        </LoginDescription>
        <NavLogin href="/account/login">
          <Login>LOGIN</Login>
        </NavLogin>
      </SignUpRightWrapper>
    </SignUpPageWrapper>
  );
};

export default signup;

const SignUpPageWrapper = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;

const SignUpRightWrapper = styled.div`
  width: 30%;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SignUpTitle = styled.h2`
  text-align: center;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1rem;
  position: relative;
`;

const LoginDescription = styled.h3`
  text-align: center;
  padding: 1rem;
  position: relative;
`;

const NavLogin = styled(Link)``;

const Login = styled.a`
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
  position: relative;
`;
