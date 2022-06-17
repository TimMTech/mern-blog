import { useState, useEffect } from "react";

import styled from "styled-components";
import Link from "next/link";
const cookies = require("js-cookie");

const Nav = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = () => {
    fetch("/api/session", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsAuth(false);
    if (user === null) {
      getUser();
    } else {
      setIsAuth(true);
    }
  }, [user]);

  const logout = () => {
    cookies.remove("token");
    window.location.href = "/account/login";
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
            <ViewDash href={`/user/${user._id}`}>
              <Username>{user.username}</Username>
            </ViewDash>
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
  z-index: 999;
  width: 100%;
  background-color: rgb(0, 0, 0);
  border-bottom: 0.05rem solid rgb(0, 0, 0);
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  
`;

const StyledE = styled.a`
  color: rgb(52, 97, 235);
  font-weight: 900;
  font-size: 2.5rem;
  cursor: pointer;
  letter-spacing: 0.8rem;
`;

const StyledBlog = styled.span`
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ViewDash = styled(Link)``;

const Username = styled.a`
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const LogoutButton = styled(Link)``;

const Logout = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const LoginButton = styled(Link)``;

const LogIn = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const SignUpButton = styled(Link)``;

const SignUp = styled.a`
  cursor: pointer;
  font-size: 1.2rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const Home = styled(Link)``;

const LoggedIn = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  color: rgb(255, 255, 255);
`;

const LoggedOut = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  color: rgb(255, 255, 255);
`;
