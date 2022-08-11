import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import styled from "styled-components";


const login = () => {
  return (
    <LoginPageContainer>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default login;

const LoginPageContainer = styled.main`
  width: 100%;
  display: flex;
  min-height: 100vh;
`;


