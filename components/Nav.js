import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react"

const Nav = () => {

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user === null) {
      setIsLoggedIn(false)
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setIsLoggedIn(true)
    }
  }, [user])

 
  return (
    <NavWrapper>
      <Home href="/">
        <StyledE>
          E<StyledBlog>BLOG</StyledBlog>
        </StyledE>
      </Home>
      <NavLinkWrapper>
        {isLoggedIn ? (
          <h1>{user.username}</h1>
        ) : (
          <>
            <LoginButton href="/account/login">
              <LogIn>Log In</LogIn>
            </LoginButton>
            <SignUpButton href="/account/signup">
              <SignUp>Sign Up</SignUp>
            </SignUpButton>
          </>
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
  background-color: rgb(255,255,255);
  border-bottom: 0.05rem solid rgb(0,0,0);
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
