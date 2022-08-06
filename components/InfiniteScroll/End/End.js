import styled from "styled-components";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useRef } from "react";


const End = ({toggleScrollUp}) => {

    const ref = useRef(null)

  return (
    <EndContainer>
      <Title>End of comments...</Title>
      <FaAngleDoubleUp size={30} onClick={() => toggleScrollUp(ref)} style={{cursor: "pointer"}}/>
    </EndContainer>
  );
};

export default End;

const EndContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.body};
  gap: 0.5rem;
  padding: 1rem;
`;

const Title = styled.h3``;


