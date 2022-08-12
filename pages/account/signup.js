import SignUpForm from "../../components/Forms/SignupForm/SignupForm";
import styled from "styled-components";
import NextLink from "next/link";
import NextImage from "next/image";
import formBG from "/public/static/images/formBG.png";

const signup = () => {
  return (
    <SignUpPageContainer>
      <SignUpForm />
      
    </SignUpPageContainer>
  );
};

export default signup;

const SignUpPageContainer = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  height: 100vh;
`;

