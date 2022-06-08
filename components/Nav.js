import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";



const Nav = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await fetch("/api/me");
    const json = await res.json();
    setUser(json);
  };

  useEffect(() => {
    if (user === null || user.message === "FAILED AUTH") {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
  
  };

  return (
    <NavWrapper>
      <Home href="/">
        <StyledE>
          E<StyledBlog>BLOG</StyledBlog>
        </StyledE>
      </Home>
      <NavLinkWrapper>
        {isAuth ? (
          <LoggedIn>
            <Username>{user.username}</Username>
            <LogoutButton href="/account/login">
              <Logout onClick={logout}>Log Out</Logout>
            </LogoutButton>
          </LoggedIn>
        ) : (
          <LoggedOut>
            <LoginButton href="/account/login">
              <LogIn>Log In</LogIn>
            </LoginButton>
            <SignUpButton href="/account/signup">
              <SignUp>Sign Up</SignUp>
            </SignUpButton>
          </LoggedOut>
        )}
      </NavLinkWrapper>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  position: fixed;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-bottom: 0.05rem solid rgb(0, 0, 0);
`;

const StyledE = styled.a`
  color: rgb(52, 97, 235);
  font-weight: 900;
  font-size: 5rem;
  cursor: pointer;
  letter-spacing: 0.8rem;
`;

const StyledBlog = styled.span`
  color: rgb(0, 0, 0);
  font-size: 2rem;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Username = styled.h1``;

const LogoutButton = styled(Link)``;

const Logout = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
`;

const LoginButton = styled(Link)``;

const LogIn = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
`;

const SignUpButton = styled(Link)``;

const SignUp = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
`;

const Home = styled(Link)``;

const LoggedIn = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const LoggedOut = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
