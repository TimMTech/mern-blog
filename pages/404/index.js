import styled from "styled-components"

const error404 = () => {
    return (
        <ErrorContainer>Session Timed Out.  Please Re-Login</ErrorContainer>
    )
}

const ErrorContainer = styled.main`
   
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export default error404;