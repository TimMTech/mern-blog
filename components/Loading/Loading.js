import styled from "styled-components"

const Loading = () => {
    return (
        <Overlay>
            Loading..
        </Overlay>
    )
}

export default Loading;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vh;
  min-height: 100vh;
  background-color: #000000dd;
  z-index: 9;
`;