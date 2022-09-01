import NextLink from "next/link"
import styled from "styled-components"

const ToastReplyInfo = () => {
    return (
        <NextLink href={"/auth/login"}>
            <Span>Login to comment</Span>
        </NextLink>
    )
}

export default ToastReplyInfo;

const Span = styled.span`
    text-decoration: underline;
`