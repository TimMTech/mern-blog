import styled from "styled-components";
import { keyframes } from "styled-components";
import CommentForm from "../Forms/CommentForm/CommentForm";
import moment from "moment";
import { useRef, useEffect } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useState } from "react";
import { array } from "yup";

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
        <Scroll ref={ref}>
          <ReverseScroll>
            <CommentAmount>Comments ({filteredComments.length})</CommentAmount>
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

const CommentAmount = styled.h4``;

const ScrollContainer = styled.div`
  box-shadow: ${(props) => props.theme.boxShadowComment};

  border-radius: 0.75rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin: 1rem 1rem 0 1rem;
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
  box-shadow: ${(props) => props.theme.boxShadowComment};
  padding: 1rem;
  border-radius: 0.75rem;
  margin: 0.75rem 0;
`;

const CommentUser = styled.h4`
  font-weight: 300;
  padding: 1rem;
  font-style: italic;
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
