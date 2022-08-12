import styled from "styled-components";
import NextLink from "next/link";
import ContactForm from "../Forms/ContactForm/ContactForm";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <FooterContainer path={router.pathname}>
      <InfoContainer>
        <NextLink href="/">
          <Logo>EBLOG</Logo>
        </NextLink>

        <Copyright>&copy; {new Date().getFullYear()} TimMTech </Copyright>
        <LinkContainer>
          <NextLink href="/privacy">
            <Privacy>Privacy</Privacy>
          </NextLink>
          |
          <NextLink href="/terms">
            <Terms>Terms and Conditions</Terms>
          </NextLink>
          |
          <Portfolio
            target="_blank"
            rel="noreferrer"
            href="https://www.tmportfolio.io/"
          >
            Portfolio
          </Portfolio>
        </LinkContainer>
        <IconContainer>
          <IconWrapper>
            <LinkWrapper
              href="https://www.facebook.com/tim.mukhamedov"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillFacebook size={35} />
            </LinkWrapper>
          </IconWrapper>
          <IconWrapper>
            <LinkWrapper
              href="https://github.com/TimMTech"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub size={35} />
            </LinkWrapper>
          </IconWrapper>
          <IconWrapper>
            <LinkWrapper
              href="https://www.instagram.com/forevertech93/"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillInstagram size={35} />
            </LinkWrapper>
          </IconWrapper>
          <IconWrapper>
            <LinkWrapper
              href="https://www.linkedin.com/in/timur-mukhamedov-50b3b6221/"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillLinkedin size={35} />
            </LinkWrapper>
          </IconWrapper>
        </IconContainer>
      </InfoContainer>
      <ContactForm />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  text-align: center;
  width: 100%;
  padding: 2.5rem 0;
  line-height: 2.5rem;
  box-shadow: ${(props) => props.theme.boxShadowFooter};
  background-color: ${(props) => props.theme.footerBody};
  color: ${(props) => props.theme.footerText};
  display: ${(props) =>
    props.path === "/post/[_id]" || props.path === "/user/[_id]"
      ? "none"
      : "grid"};

  grid-template-columns: ${(props) =>
    props.path !== "/post/[_id]" && "repeat(2, minmax(0, 1fr))"};
  grid-template-columns: ${(props) =>
    props.path !== "/user/[_id]" && "repeat(2, minmax(0, 1fr))"};
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Logo = styled.a`
  font-size: 1.5rem;
`;

const Copyright = styled.p`
  font-weight: 900;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Terms = styled.a``;

const Privacy = styled.a``;

const Portfolio = styled.a``;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  line-height: 50%;
  padding: 0.4rem;
  transition: 200ms;
  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;
const LinkWrapper = styled.a``;
