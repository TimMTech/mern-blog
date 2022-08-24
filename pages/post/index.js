import { getSession } from "next-auth/react";
import styled from "styled-components";
import PostForm from "../../components/Forms/PostForm/PostForm";

const postform = () => {
  return (
    <PostFormPageContainer>
      <PostForm />
    </PostFormPageContainer>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default postform;

const PostFormPageContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
