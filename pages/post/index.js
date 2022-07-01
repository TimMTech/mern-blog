import styled from "styled-components";
import PostForm from "../../components/Forms/PostForm/PostForm"

const blog = () => {
  return (
    <PostFormPageContainer>
      <PostForm />
    </PostFormPageContainer>
  );
};

export default blog;

const PostFormPageContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;


