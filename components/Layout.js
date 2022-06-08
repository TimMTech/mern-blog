
import styled from "styled-components";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};

export default Layout;

const MainWrapper = styled.main``;
