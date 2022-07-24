import styled from "styled-components"
import { useRouter } from "next/router";

const Hamburger = ({backgroundColor, showBurger}) => {
  const router = useRouter()
  return (
    <HamburgerContainer>
      <Burger
        backgroundColor={backgroundColor}
        showBurger={showBurger}
        path={router.pathname}
      />
      <Burger
        backgroundColor={backgroundColor}
        showBurger={showBurger}
        path={router.pathname}
      />
      <Burger
        backgroundColor={backgroundColor}
        showBurger={showBurger}
        path={router.pathname}
      />
    </HamburgerContainer>
  );
};

export default Hamburger

const HamburgerContainer = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 10;
    
`;

const Burger = styled.div`
  width: 2rem;
  height: 0.25rem;
  border-radius: 10px;
  background-color: ${(props) => (props.backgroundColor ? "black" : "white")};
  background-color: ${(props) => props.showBurger && "black"};
  background-color: ${(props) => props.path !== "/" && "white"};
  background-color: ${(props) => props.pathname !== "/" && props.showBurger && "black"};
  transform-origin: 1px;
  transition: all 0.3s linear;
`;