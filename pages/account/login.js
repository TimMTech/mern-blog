import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import styled from "styled-components";
import NextImage from "next/image";
import formBG from "./../../public/static/images/formBG.png";

const login = () => {
  return (
    <LoginPageContainer>
      <LoginForm />
      <ImageWrapper>
        <NextImage src={formBG} layout="fill" objectFit="cover" />
      </ImageWrapper>
    </LoginPageContainer>
  );
};

export default login;

const LoginPageContainer = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(0,1fr));
  }
  height: 100vh;
`;


const ImageWrapper = styled.div`
  position: relative;
  @media (max-width: 750px) {
    display: none;
  }
  
`