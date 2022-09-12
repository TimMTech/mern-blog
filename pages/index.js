import styled from "styled-components";
import Blog from "../components/Blog/Blog";
import NextImage from "next/image";
import heroBG from "/public/static/images/heroBG.png";



const home = ({ posts}) => {
  return (
    <HomeContainer>
      <HeaderContainer>
        <ImageWrapper>
          <NextImage src={heroBG} layout="fill" objectFit="cover" priority />
        </ImageWrapper>
        <Title>TECHNOLOGY FOR INOVATORS</Title>
        <SubTitle>Where Developers Push Limits</SubTitle>
        
        
      </HeaderContainer>
      <Blog posts={posts} />
    </HomeContainer>
  );
};

export const getStaticProps = async () => {
 
  const res = await fetch("https://mern-blog-jet.vercel.app/api/post", {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 200) {
    return res.status(400).json({message: "INVALID SERVER RESPONSE"})
  }
  const posts = await res.json();

  return {
    props: { posts },
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

const ImageWrapper = styled.div`
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






