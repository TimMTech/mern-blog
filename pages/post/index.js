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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
`;

const PostTitle = styled.h2`
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 4rem;
  margin-top: 5rem;
  max-width: 40rem;
  line-height: 0.8em;
  padding-bottom: 1.5rem;
`;
