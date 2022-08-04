import styled from "styled-components";
import { Form, Field } from "formik";


export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const EditTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  padding-top: 3rem;
`;

export const FormTitle = styled.h1`
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
  padding: 1rem;
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

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.commentform?"100%" : "50%"};
`;

export const StyledLabel = styled.label`
  width: 100%;
`

export const StyledField = styled(Field)`
  border: 0.05rem solid rgb(0,0,0);
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const SubmitButton = styled.button``;

export const ExitButton = styled.button``;


