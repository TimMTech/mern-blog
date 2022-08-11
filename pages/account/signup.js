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
  display: flex;
  min-height: 100vh;
`;

