import styled from "styled-components";
import PostForm from "../../components/Forms/PostForm"

const blog = () => {
  return (
    <PostPageWrapper>
      <PostHeaderWrapper>
        <PostTitle>What is on your mind....</PostTitle>
      </PostHeaderWrapper>
      <PostForm />
    </PostPageWrapper>
  );
};

export default blog;

const PostPageWrapper = styled.main`
  min-height: 100vh;
`;

const PostHeaderWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.06);
  height: 100%;
  padding: 5rem;
  border-bottom: 0.05rem solid rgb(0, 0, 0);
`;

const PostTitle = styled.h2`
  text-align: left;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1.5rem;
`;
