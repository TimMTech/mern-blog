import { useState, useEffect } from "react";
import NextLink from "next/link";
import styled from "styled-components";
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
    <NavContainer>
      <NextLink href="/">
        <Logo>EBLOG</Logo>
      </NextLink>

      <NavLinkContainer>
        {isAuth ? (
          <LoggedInContainer>
            <NextLink href={`/user/${user._id}`}>
              <Username>{user.username}</Username>
            </NextLink>
            <NextLink href="/account/login">
              <Logout onClick={logout}>Log Out</Logout>
            </NextLink>
          </LoggedInContainer>
        ) : (
          <LoggedOutContainer>
            <NextLink href="/account/login">
              <Login>Log In</Login>
            </NextLink>
            <NextLink href="/account/signup">
              <Login>Sign Up</Login>
            </NextLink>
          </LoggedOutContainer>
        )}
      </NavLinkContainer>
    </NavContainer>
  );
};

export default Nav;

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 1.2rem;
 
`;

export const Logo = styled.a`
  color: rgb(52, 97, 235);
  cursor: pointer;
  letter-spacing: 0.8rem;
`;

export const NavLinkContainer = styled.ul`
  display: flex;
  list-style: none;
`;

export const LoggedInContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
`;

export const LoggedOutContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.li`
  cursor: pointer;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const Logout = styled.li`
  cursor: pointer;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const Login = styled.li`
  cursor: pointer;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const Signup = styled.li`
  cursor: pointer;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
