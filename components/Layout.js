import Nav from "./Nav/Nav"

const Layout = ({ children, toggleTheme, isDark }) => {
  return (
    <>
      <Nav toggleTheme={toggleTheme} isDark={isDark}/>
      <>{children}</>
    </>
  );
};

export default Layout;
