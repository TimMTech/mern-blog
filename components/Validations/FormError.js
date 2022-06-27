import styled from "styled-components";

export const renderError = (message) => (
  <Error>{message}</Error>
);

const Error = styled.p`
  color: rgb(255, 0, 0);
`;
