import styled from "styled-components";
import Link from "next/link";
import Cookies from "js-cookie";

const DashMenu = () => {

   const logout = () => {
     Cookies.remove("token");
     window.location.href = "/account/login";
   };

  return (
    <DashMenuWrapper>
      <MenuTitle>Menu</MenuTitle>
      <CreatePostButton href="/post">
        <CreatePost>Create Post</CreatePost>
      </CreatePostButton>
      <ViewYourPostsButton href="/account">
        <ViewPosts>View Posts</ViewPosts>
      </ViewYourPostsButton>
      <LogoutButton href="/account/login">
        <Logout onClick={logout}>Logout</Logout>
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
  color: rgb(255, 255, 255);
  
`;

const MenuTitle = styled.p`
  text-align: center;
  padding: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 0.05rem solid rgb(255, 255, 255);
  width: 75%;
`;

const CreatePostButton = styled(Link)``;

const CreatePost = styled.a`
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
  text-align: center;
  font-size: 2rem;
  width: 100%;
  &: hover {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
`;
