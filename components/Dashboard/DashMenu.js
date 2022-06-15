import styled from "styled-components";
import Link from "next/link";

const DashMenu = () => {
  return (
    <DashMenuWrapper>
      <CreatePostButton href="/post">
        <CreatePost>Create Post</CreatePost>
      </CreatePostButton>
      <ViewYourPostsButton href="/account">
        <ViewPosts>View Posts</ViewPosts>
      </ViewYourPostsButton>
      <LogoutButton href="/account/login">
        <Logout>Logout</Logout>
      </LogoutButton>
    </DashMenuWrapper>
  );
};

export default DashMenu;

const DashMenuWrapper = styled.nav`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
`;

const CreatePostButton = styled(Link)``;


const CreatePost = styled.a`
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;

const ViewYourPostsButton = styled(Link)``;
const ViewPosts = styled.a`
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;

const LogoutButton = styled(Link)``;
const Logout = styled.a`
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;


