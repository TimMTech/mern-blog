import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import styled from "styled-components";
import NextLink from "next/link";
import NextImage from "next/image";
import formBG from "/public/static/images/formBG.png";

const login = () => {
  return (
    <LoginPageContainer>
      <LoginForm />
      <RightContainer>
        <NextImage
          layout="fill"
          src={formBG}
          priority
          alt=""
          objectFit="cover"
        />
        <LoginTitle>New?</LoginTitle>
        <SignUpDescription>
          Sign up and discover a great amount of stories and ideas!
        </SignUpDescription>
        <NextLink href="/account/signup">
          <SignupButton>SIGNUP</SignupButton>
        </NextLink>
      </RightContainer>
    </LoginPageContainer>
  );
};

export default login;

const LoginPageContainer = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;

const RightContainer = styled.div`
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

const LoginTitle = styled.h1`
  padding-bottom: 1rem;
  position: relative;
`;

const SignUpDescription = styled.p`
  text-align: center;
  padding: 1rem;
  position: relative;
`;

const SignupButton = styled.button`
  position: relative;
`;
