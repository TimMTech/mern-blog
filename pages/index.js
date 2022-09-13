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

export const getServerSideProps = async () => {
 
  const res = await fetch("https://mern-blog-five.vercel.app/api/post");

  if (res.status !== 200) {
    console.log(res.status)
    throw String(`Error, ${res.status}, ${res.statusText}`)
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






