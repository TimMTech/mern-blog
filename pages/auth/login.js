import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import styled from "styled-components";
import NextImage from "next/image";
import NextLink from "next/link";
import formBG2 from "./../../public/static/images/formBG2.png";
import { AiOutlineHome } from "react-icons/ai";

const login = () => {
  return (
    <LoginPageContainer>
      <NextLink href={"/"}>
        <IconWrapper>
          <AiOutlineHome size={50} style={{cursor: "pointer"}}/>
        </IconWrapper>
      </NextLink>

      <LinkWrapper>
        <NextLink href={"/auth/signup"}>
          <Span>Sign up!</Span>
        </NextLink>
      </LinkWrapper>

      <FormContainer>
        <LoginForm />
      </FormContainer>
      <ImageWrapper>
        <NextImage
          src={formBG2}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
        <OverlayContainer>
          <Title>Connect With People All Over The World!</Title>
          <Paragraph>
            Read about new tech discoveries and features in any branch of
            software known today!
          </Paragraph>
          <NextLink href={"/auth/signup"}>Join us!</NextLink>
        </OverlayContainer>
      </ImageWrapper>
    </LoginPageContainer>
  );
};

export default login;

const LoginPageContainer = styled.main`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const FormContainer = styled.div`
  min-width: 400px;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  color: rgb(255, 255, 255);

  @media (max-width: 750px) {
    display: none;
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
  & > * {
    color: rgb(255, 255, 255);
  }
`;

const Title = styled.div`
  text-align: left;
  font-size: 3rem;
  width: 400px;
  @media (max-width: 1024px) {
    font-size: 2rem;
    width: 270px;
  }
`;

const Paragraph = styled.div`
  width: 420px;
  font-size: 1.5rem;
  @media (max-width: 1024px) {
    font-size: 1rem;
    width: 290px;
  }
`;

const Span = styled.span`
  
  cursor: pointer;
  display: block;
  color: ${(props) => props.theme.text};
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 8.5%;
  right: 9%;
  z-index: 1;
  
  color: rgb(255, 255, 255);
  @media (max-width: 750px) {
    color: rgb(0, 0, 0);
    color: ${(props) => props.theme.text};
  }
`;

const LinkWrapper = styled.div`
  position: absolute;
  bottom: 2%;
  left: 0;
  padding: 4rem;
  color: rgb(0,0,0);
  font-weight: 800;
`;
