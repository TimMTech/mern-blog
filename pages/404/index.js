import styled from "styled-components"

const error404 = () => {
    return (
        <ErrorContainer>Session Timed Out.  Please Re-Login</ErrorContainer>
    )
}

const ErrorContainer = styled.main`
    margin-top: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default error404;