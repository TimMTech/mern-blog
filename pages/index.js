import styled from "styled-components";
import Blog from "../components/Blog/Blog";
import NextLink from "next/link";
import NextImage from "next/image";
import heroBG from "/public/static/images/heroBG.png";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

const home = ({ posts }) => {
  return (
    <HomeContainer>
      <HeaderContainer>
        <BlogImageWrapper>
          <NextImage src={heroBG} layout="fill" objectFit="cover" priority />
        </BlogImageWrapper>
        <Title>TECHNOLOGY FOR INOVATORS</Title>
        <SubTitle>Where Developers Push Limits</SubTitle>
        <NextLink href="/account/signup">
          <SignupButton>GET STARTED</SignupButton>
        </NextLink>
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
      </HeaderContainer>
      <Blog posts={posts} />
    </HomeContainer>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const json = await res.json();

  return {
    props: { posts: json },
  };
};

export default home;

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0);
  position: relative;
`;

const BlogImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  opacity: 0.2;
`;

const Title = styled.h1`
  line-height: 3rem;
  position: absolute;
  color: rgb(255, 255, 255);
  font-weight: 300;
  letter-spacing: 0.2rem;
`;

const SubTitle = styled.h2`
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  top: 63%;
  font-weight: 300;
  font-style: italic;
`;

const SignupButton = styled.button`
  position: absolute;
  top: 73%;
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  bottom: 0;
  padding-bottom: 1.5rem;
`;

const IconWrapper = styled.div`
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0.4rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  line-height: 50%;
  padding: 0.4rem;
  transition: 200ms;
  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

const LinkWrapper = styled.a`
  color: rgba(255, 255, 255, 0.6);
`;
