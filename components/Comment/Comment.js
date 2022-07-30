import styled from "styled-components";
import { keyframes } from "styled-components";
import CommentForm from "../Forms/CommentForm/CommentForm";
import moment from "moment";
import { useRef, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useState } from "react";


const Comment = ({ setPostComments, postComments, post }) => {
  const [showArrow, setShowArrow] = useState(false);
  const ref = useRef(null);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  const filteredComments = postComments.filter(
    (comment) => comment.postId === post._id
  );

  const toggleScrollBottom = (ref) => {
    ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const arrowRef = ref.current;
    const toggleArrow = () => {
      if (ref.current.scrollTop < -100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };
    arrowRef.addEventListener("scroll", toggleArrow);
    return () => {
      arrowRef.removeEventListener("scroll", toggleArrow);
    };
  }, []);

  
  return (
    <CommentContainer>
      <CommentForm setPostComments={setPostComments} />
      <ScrollContainer>
        <CommentAmount>{filteredComments.length} Comments</CommentAmount>
        <Scroll ref={ref}>
          <ReverseScroll>
            {filteredComments.map((comment) => {
              const { _id, user, content, date } = comment;
              return (
                <CommentWrapper key={_id}>
                  <CommentUser>
                    {user} / {dateFormat(date)}
                  </CommentUser>
                  <CommentContent>{content}</CommentContent>
                </CommentWrapper>
              );
            })}
          </ReverseScroll>
        </Scroll>
        <IconWrapper showArrow={showArrow}>
          <StyledIcon onClick={() => toggleScrollBottom(ref)} size={25} />
        </IconWrapper>
      </ScrollContainer>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.section`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const CommentAmount = styled.h4`
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  margin: 2rem;
  width: 80%;
  border-bottom: 0.1rem solid rgba(0,0,0,0.2);
`;

const ScrollContainer = styled.div`
  box-shadow: ${(props) => props.theme.boxShadowComment};

  
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin: 1rem 0 0 1rem;
  @media (max-width: 750px) {
    margin: 1rem 0 0 0;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  max-height: 400px;
  padding: 1rem;
  
`;

const ReverseScroll = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const CommentWrapper = styled.div`
  padding: 1rem;
  margin: 0.75rem 0;
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);
`;

const CommentUser = styled.h4`
  padding: 1rem;
  
`;



const CommentContent = styled.p`
  padding: 1rem;
  
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 500ms;
  opacity: ${(props) => (props.showArrow ? "1" : "0")};
  transform: translateY(-30%);
`;

const scale = keyframes`
  0% {
    transform: scale(1,1);
  }

  50% {
    transform: scale(1.5,1.5);
  }
  
  100% {
    transform: scale(1,1);
  }
`;

const StyledIcon = styled(FaAngleDoubleDown)`
  animation: ${scale} 1s infinite;
`;
