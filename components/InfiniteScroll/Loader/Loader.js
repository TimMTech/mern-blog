import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components"
const Loader = () => {
  return (
    <LoaderContainer>
      <Title>Loading comments...</Title>
      <AiOutlineLoading3Quarters size={30}/>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  background-color: rgba(255,255,255,0.5);
`;

const Title = styled.h3`
    color: ${(props) => props.theme.color}
`;


