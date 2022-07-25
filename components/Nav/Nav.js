import { useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import NextLink from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
const cookies = require("js-cookie");
const Framer = require("framer-motion");

const Nav = ({ toggleTheme, isDark }) => {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const menu = {
    hidden: { x: "100%" },
    visible: { x: "0" },
  };
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const getUser = () => {
    fetch("/api/session", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
          setIsAuth(true);
        }
      })
      .catch((error) => {
        console.log(error);
        cookies.remove("token");
        router.push("/404");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const changeNav = () => {
      if (
        document.body.scrollTop >= 75 ||
        document.documentElement.scrollTop >= 75
      ) {
        setBackgroundColor(true);
      } else {
        setBackgroundColor(false);
      }
    };
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, [backgroundColor, router.pathname]);

  const logout = () => {
    cookies.remove("token");
    window.location.href = "/account/login";
  };

  return (
    <NavContainer backgroundColor={backgroundColor} path={router.pathname}>
      <NextLink href="/">
        <Logo backgroundColor={backgroundColor} path={router.pathname}>
          EBLOG
        </Logo>
      </NextLink>
      <SwitchLabel backgroundColor={backgroundColor} path={router.pathname}>
        <SwitchInput type="checkbox" />
        <Switch onClick={toggleTheme} />
        {isDark ? "Dark" : "Light"}
      </SwitchLabel>
      <NavLinkContainer
        backgroundColor={backgroundColor}
        path={router.pathname}
      >
        {isAuth ? (
          <LoggedInContainer>
            <NextLink href={`/user/${user._id}`}>
              <Username>{user.username}</Username>
            </NextLink>
            <NextLink href="/account/login">
              <Logout onClick={logout}>LOGOUT</Logout>
            </NextLink>
          </LoggedInContainer>
        ) : (
          <LoggedOutContainer showBurger={hamburgerOpen}>
            <NextLink href="/account/login">
              <Login>LOGIN</Login>
            </NextLink>
            <NextLink href="/account/signup">
              <Login>SIGN-UP</Login>
            </NextLink>
          </LoggedOutContainer>
        )}
      </NavLinkContainer>
      <Framer.AnimatePresence>
        {hamburgerOpen && (
          <>
            <Overlay
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ ease: "easeOut", duration: 0.5 }}
            />
            <Modal
              variants={menu}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <NextLink href="/">
                <Logo showBurger={hamburgerOpen}>EBLOG</Logo>
              </NextLink>
              <Paragraph>Let us discover new tech together!</Paragraph>
              {isAuth ? (
                <LoggedInContainer>
                  <NextLink href={`/user/${user._id}`}>
                    <Username>{user.username}</Username>
                  </NextLink>
                  <NextLink href="/account/login">
                    <Logout onClick={logout}>LOGOUT</Logout>
                  </NextLink>
                </LoggedInContainer>
              ) : (
                <LoggedOutContainer showBurger={hamburgerOpen}>
                  <NextLink href="/account/login">
                    <Login>LOGIN</Login>
                  </NextLink>
                  <NextLink href="/account/signup">
                    <Login>SIGN-UP</Login>
                  </NextLink>
                </LoggedOutContainer>
              )}
              <Paragraph>Connect with me!</Paragraph>
              <IconContainer>
                <IconWrapper>
                  <AiFillFacebook size={35} />
                </IconWrapper>
                <IconWrapper>
                  <AiFillGithub size={35} />
                </IconWrapper>
                <IconWrapper>
                  <AiFillInstagram size={35} />
                </IconWrapper>
                <IconWrapper>
                  <AiFillLinkedin size={35} />
                </IconWrapper>
              </IconContainer>
            </Modal>
          </>
        )}
      </Framer.AnimatePresence>

      <HamburgerMenu onClick={toggleHamburger}>
        <Hamburger
          backgroundColor={backgroundColor}
          showBurger={hamburgerOpen}
        />
      </HamburgerMenu>
    </NavContainer>
  );
};

export default Nav;

const Overlay = styled(Framer.motion.div)`
  @media (min-width: 750px) {
    display: none;
  }
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000dd;
  z-index: 9;
`;

export const NavContainer = styled.nav`
  z-index: 11;
  overflow-y: scroll;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  position: fixed;
  width: 100%;
  background-color: ${(props) =>
    props.backgroundColor ? "white" : "transparent"};
  background-color: ${(props) => props.path !== "/" && "rgb(21,23,30)"};
  transition: background-color 0.2s ease-out;
  color: rgb(255, 255, 255);
  font-size: 1.2rem;
  top: 0;
`;

export const NavLinkContainer = styled.div`
  @media (max-width: 750px) {
    display: none;
  }

  color: ${(props) => (props.backgroundColor ? "black" : "white")};
  color: ${(props) => props.path !== "/" && "white"};
`;

export const Logo = styled.a`
  cursor: pointer;
  font-weight: 900;
  color: ${(props) => (props.backgroundColor ? "black" : "white")};
  color: ${(props) => props.path !== "/" && "white"};
  color: ${(props) => props.showBurger && "black"};
  font-size: ${(props) => props.showBurger && "2.5rem"};
  
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${(props) => (props.backgroundColor ? "black" : "white")};
  color: ${(props) => props.path !== "/" && "white"};
`;

const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 32px;
  background-color: #b3b3b3;
  border-radius: 32px;

  padding: 4px;
  transition: 300ms all;
  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background-color: rgb(255, 255, 255);
    transform: translate(0, -50%);
  }
`;
const SwitchInput = styled.input`
  opacity: 0;
  position: absolute;
  display: none;

  &:checked + ${Switch} {
    background-color: #b3b3b3;
    &:before {
      transform: translate(32px, -50%);
      background-color: #15171e;
    }
  }
`;

export const Modal = styled(Framer.motion.div)`
  @media (min-width: 750px) {
    display: none;
  }
  padding: 4rem 2rem 2rem;
  z-index: 10;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  & > ul {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    font-size: 2rem;
    font-weight: 700;
    
  }
`;

export const Paragraph = styled.p`
  padding: 4rem;
  text-transform: uppercase;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.5);
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 750px) {
    display: flex;
  }
`;

export const LoggedInContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: flex-start;
  
`;

export const LoggedOutContainer = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
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

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
`;

export const IconWrapper = styled.div`
  box-shadow: 0 0.4rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  padding: 0.75rem;
  transition: 200ms;
  &:hover {
    transform: scale(1.1,1.1);
    cursor: pointer;
  }
`;