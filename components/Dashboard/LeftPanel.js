import styled from "styled-components";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LeftPanel = () => {
  return (
    <LeftPanelWrapper>
      <CreatePostButton href="/post">
        <CreatePost>Create Post</CreatePost>
      </CreatePostButton>
      <ViewYourPostsButton href="/account">
        <ViewPosts>View Posts</ViewPosts>
      </ViewYourPostsButton>
      <LogoutButton href="/account/login">
        <Logout>Logout</Logout>
      </LogoutButton>
    </LeftPanelWrapper>
  );
};

export default LeftPanel;

const LeftPanelWrapper = styled.nav`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 20%;
  background-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  padding-top: 2rem;
`;

const CreatePostButton = styled(Link)`
`;
const CreatePost = styled.a`
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    cursor: pointer;
  }
`;

const ViewYourPostsButton = styled(Link)``;
const ViewPosts = styled.a`
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    cursor: pointer;
  }
`;

const LogoutButton = styled(Link)``;
const Logout = styled.a`
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    cursor: pointer;
  }
`;
