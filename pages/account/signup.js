import SignUpForm from "../../components/Forms/SignupForm/SignupForm";
import styled from "styled-components";
import NextLink from "next/link";
import NextImage from "next/image";
import formBG from "/public/static/images/formBG.png";

const signup = () => {
  return (
    <SignUpPageContainer>
      <SignUpForm />
      <RightContainer>
        <NextImage
          layout="fill"
          src={formBG}
          priority
          alt=""
          objectFit="cover"
        />
        <SignUpTitle>Already a Member?</SignUpTitle>
        <LoginDescription>
          If you are part of our community, login below!
        </LoginDescription>
        <NextLink href="/account/login">
          <LoginButton>LOGIN</LoginButton>
        </NextLink>
      </RightContainer>
    </SignUpPageContainer>
  );
};

export default signup;

const SignUpPageContainer = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;

const RightContainer = styled.div`
  border-bottom: 0.05rem solid rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 750px) {
    display: none;
  }
`;

const SignUpTitle = styled.h1`
  padding-bottom: 1rem;
  position: relative;
`;

const LoginDescription = styled.p`
  text-align: center;
  padding: 1rem;
  position: relative;
`;

const LoginButton = styled.button`
  position: relative;
`;
