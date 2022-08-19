import SignUpForm from "../../components/Forms/SignupForm/SignupForm";
import styled from "styled-components";
import NextImage from "next/image";
import formBG from "./../../public/static/images/formBG.png";

const signup = () => {
  return (
    <SignUpPageContainer>
      <ImageWrapper>
        <NextImage src={formBG} layout="fill" objectFit="cover" quality={100} />
      </ImageWrapper>
      <FormContainer>
        <SignUpForm />
      </FormContainer>
    </SignUpPageContainer>
  );
};

export default signup;

const SignUpPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  min-width: calc(100vw - 50%);
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  @media (max-width: 750px) {
    display: none;
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1.5rem;
`;

const Title = styled.h2``;

const Paragraph = styled.p``;
