import { useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import NextLink from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
const cookies = require("js-cookie");
const Framer = require("framer-motion");

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const menu = {
  hidden: { x: "100%" },
  visible: { x: "0" },
};

const Nav = ({ toggleTheme, isDark }) => {
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
            <NavLinkContainer
              variants={menu}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
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

export const Logo = styled.a`
  cursor: pointer;
  letter-spacing: 0.4rem;
  color: ${(props) => (props.backgroundColor ? "black" : "white")};
  color: ${(props) => props.path !== "/" && "white"};
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: ${(props) => props.backgroundColor ? "black" : "white"};
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

export const NavLinkContainer = styled(Framer.motion.ul)`
  z-index: 10;
  list-style: none;
  color: ${(props) => (props.backgroundColor ? "black" : "white")};
  border: 0.05rem solid rgb(255, 255, 255);
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.showBurger && "white"};
  }
`;

export const HamburgerMenu = styled.div`
  display: flex;
  cursor: pointer;
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
