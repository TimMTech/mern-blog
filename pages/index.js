import styled from "styled-components";
import Blog from "../components/Blogs/Blog";
import Link from "next/link";

const home = ({ posts }) => {
  

  return (
    <HomePageWrapper>
      <BlogHeaderWrapper>
        <BlogTitle>What is going on in the tech world today....</BlogTitle>
        <BlogDescription>
          Welcome to the home of tech writers, where experts from the tech field
          share their insights on modern technology. Blogify will help you stay
          up-to-date with the latest developments in the tech field so you can
          always stay ahead of the curve.
        </BlogDescription>
        <NavSignUp href="/account/signup">
          <SignUp>GET STARTED</SignUp>
        </NavSignUp>
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
  min-height: 100vh;
`;

const BlogHeaderWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 100%;
  padding: 5rem;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
`;

const BlogTitle = styled.h2`
  text-align: left;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.9em;
  padding-bottom: 1.5rem;
`;

const BlogDescription = styled.p`
  max-width: 30rem;
  padding-bottom: 2rem;
`;

const NavSignUp = styled(Link)``;

const SignUp = styled.a`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 3rem;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(52, 97, 235);
  cursor: pointer;
  background-color: rgb(255, 255, 255);
`;
