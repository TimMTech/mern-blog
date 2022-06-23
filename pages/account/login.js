import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import formBG from "/public/static/images/formBG.png";

const login = () => {
  return (
    <LoginPageWrapper>
      <LoginForm />
      <LoginRightWrapper>
        <Image layout="fill" src={formBG} priority alt="" objectFit="cover" />
        <LoginTitle>New?</LoginTitle>
        <SignUpDescription>
          Sign up and discover a great amount of stories and ideas!
        </SignUpDescription>
        <NavSignUp href="/account/signup">
          <SignUp>SIGNUP</SignUp>
        </NavSignUp>
      </LoginRightWrapper>
    </LoginPageWrapper>
  );
};

export default login;

const LoginPageWrapper = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;

const LoginRightWrapper = styled.div`
  width: 30%;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LoginTitle = styled.h2`
  text-align: center;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1rem;
  position: relative;
`;

const SignUpDescription = styled.h3`
  text-align: center;
  padding: 1rem;
  position: relative;
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
  position: relative;
`;
