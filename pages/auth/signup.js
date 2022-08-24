import SignUpForm from "../../components/Forms/SignupForm/SignupForm";
import styled from "styled-components";
import NextImage from "next/image";
import NextLink from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import formBG from "./../../public/static/images/formBG.png";

const signup = () => {
  return (
    <SignUpPageContainer>
      <NextLink href={"/"}>
        <IconWrapper>
          <AiOutlineHome size={50} style={{ cursor: "pointer" }} />
        </IconWrapper>
      </NextLink>

      <LinkWrapper>
        <NextLink href={"/auth/login"}>
          <Span>Have an account? log in here!</Span>
        </NextLink>
      </LinkWrapper>
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
  position: relative;
`;

const FormContainer = styled.div`
  min-width: calc(100vw - 50%);
  @media (max-width: 750px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: rgb(255, 255, 255);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Span = styled.span`
  cursor: pointer;
  display: block;
  color: ${(props) => props.theme.text};
  @media (max-width: 750px) {
    color: rgb(255, 255, 255);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  padding: 4rem;
  color: rgb(255, 255, 255);
  @media (max-width: 750px) {
    color: rgb(255, 255, 255);
  }
`;

const LinkWrapper = styled.div`
  position: absolute;
  bottom: 11%;

  right: 0;
  padding-right: 4rem;

  font-weight: 800;
  z-index: 1;
`;
