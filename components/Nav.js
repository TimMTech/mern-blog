import { useState, useEffect } from "react";
import {
  NavWrapper,
  StyledE,
  StyledBlog,
  NavLinkWrapper,
  ViewDash,
  Username,
  LogoutButton,
  Logout,
  LoginButton,
  LogIn,
  SignUpButton,
  SignUp,
  Home,
  LoggedIn,
  LoggedOut,
} from "./Nav.styled";

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
