import styled from "styled-components";
import Blog from "../components/Blog/Blog";
import Link from "next/link";

const home = ({ posts }) => {
  return (
    <HomePageWrapper>
      <BlogHeaderWrapper>
        <BlogHeader>
          <BlogLeft>
            <BlogTitle>What is going on in the tech world today....</BlogTitle>
            <NavSignUp href="/account/signup">
              <SignUp>GET STARTED</SignUp>
            </NavSignUp>
          </BlogLeft>
          <BlogImage src="/static/images/homeImage.png" />
        </BlogHeader>
      </BlogHeaderWrapper>
      <Blog posts={posts} />
    </HomePageWrapper>
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

const HomePageWrapper = styled.main`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const BlogHeaderWrapper = styled.div`
  padding: 2rem;
  border-bottom: 0.08rem solid rgba(0, 0, 0, 0.2);
`;

const BlogHeader = styled.div`
  display: flex;
`;

const BlogLeft = styled.div``;

const BlogImage = styled.img`
  padding-top: 3rem;
  display: block;
  width: 50%;
  max-height: 450px;
  @media (max-width: 850px) {
    display: none;
  }
`;

const BlogTitle = styled.h2`
  text-align: left;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.9em;
  padding-bottom: 5rem;
`;

const NavSignUp = styled(Link)``;

const SignUp = styled.a`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;
