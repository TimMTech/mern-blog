import styled from "styled-components";
import { Form, Field } from "formik";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
 
`;

export const EditTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  padding-top: 3rem;
`;

export const FormTitle = styled.h1`
  width: 90%;
  text-align: left;
  padding: 1rem 0;
  
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  gap: 1.5rem;
  margin: ${(props) => (props.commentform ? "1rem 0" : null)};
`;

export const StandardForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.loginform ? "center" : "flex-start")};
  width: ${(props) => (props.loginform ? "100%" : null)};
  gap: 1rem;
  
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.commentform ? "100%" : "50%")};
  width: ${(props) => props.loginform && "90%"};
  width: ${(props) => props.signupform && "90%"};
`;

export const StyledLabel = styled.label`
  width: 100%;
`;

export const StyledField = styled(Field)`
  border: 0.05rem solid rgb(0, 0, 0);
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.7;
  }
`;

export const StandardField = styled.input`
  width: 100%;
  font-size: 1.5rem;
  padding: 0.5rem;
`;

export const StandardTextarea = styled.textarea`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const LineBreakContainer = styled.div`
  display: flex;
  width: 75%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0.5;
`;

export const Line = styled.div`
  height: 0.1rem;
  border: 0.05rem solid;
  background-color: ${(props) => props.theme.borderBackground};

  width: 100%;
`;

export const SubmitButton = styled.button`
  width: ${(props) => (props.commentform ? "100%" : "90%")};
  width: ${(props) => props.contactform && "100%"};
`;

export const LogoutButton = styled.button`
  width: ${(props) => (props.commentform ? "100%" : "90%")};
`;

export const ExitButton = styled.button`
  width: ${(props) => (props.commentform ? "100%" : "90%")};
`;

export const DashButton = styled.button`
  width: ${(props) => (props.commentform ? "100%" : "90%")};
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: rgb(255, 0, 0);
`;
