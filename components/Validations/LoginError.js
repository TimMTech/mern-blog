import styled from "styled-components"

const LoginError = () => {
    return (
        <Error>Incorrect Username/Password</Error>
    )
}

export default LoginError;

const Error = styled.p`
  color: rgb(255, 0, 0);
`;