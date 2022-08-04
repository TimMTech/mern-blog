import styled from "styled-components";
import { keyframes } from "styled-components";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Replies from "../Replies/Replies";
import moment from "moment";
import { useRef, useEffect } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

import { useState } from "react";
import { ExitButton } from "../Forms/GlobalFormStyle";

const Comment = ({ setPostComments, postComments, post }) => {
  const [showArrow, setShowArrow] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [replyMode, setReplyMode] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [commentReply, setCommentReply] = useState([]);

  const ref = useRef(null);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  

  const filteredCommentsLength = postComments.filter(
    (comment) => comment.postId === post._id
  );

  

  const toggleScrollBottom = (ref) => {
    ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
  };

  const handleViewRepliesClose = (_id) => {
    setViewReplies(false);
    setCommentReply([]);
  };

  const handleViewReplies = (_id) => {
    setCommentId(_id);
    setViewReplies(true);
    fetch(`/api/comment/${_id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCommentReply(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReply = (_id) => {
    setCommentId(_id);
    setReplyMode(!replyMode);
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
      <ScrollContainer>
        <CommentAmount>{filteredCommentsLength.length} Comments</CommentAmount>
        <CommentForm setPostComments={setPostComments} />
        <Scroll ref={ref}>
          <ReverseScroll>
            {postComments
              .filter((comment) => comment.postId === post._id)
              .map((filtered) => {
                const { _id, user, content, date } = filtered;
                return (
                  <CommentWrapper key={_id}>
                    <CommentUser>
                      {user} / <CommentDate>{dateFormat(date)}</CommentDate>
                    </CommentUser>
                    <CommentContent>{content}</CommentContent>
                    <RepliesContainer>
                      <ReplyLikeContainer>
                        <AiOutlineLike size={17} />
                        <ReplyButton onClick={() => handleReply(_id)}>
                          REPLY
                        </ReplyButton>
                      </ReplyLikeContainer>
                      {replyMode && (
                        <>
                          {commentId === _id && (
                            <>
                              <CommentForm
                                replyMode={replyMode}
                                commentId={commentId}
                                setCommentReply={setCommentReply}
                              
                              />
                              
                            </>
                          )}
                        </>
                      )}
                      <>
                        {commentId === _id && viewReplies ? (
                          <ViewButton
                            onClick={() => handleViewRepliesClose(_id)}
                          >
                            <MdOutlineArrowDropUp
                              size={28}
                              style={{ color: "rgb(62,166,255)" }}
                            />
                            VIEW REPLIES
                          </ViewButton>
                        ) : (
                          <ViewButton onClick={() => handleViewReplies(_id)}>
                            <MdOutlineArrowDropDown
                              size={28}
                              style={{ color: "rgb(62,166,255)" }}
                            />
                            VIEW REPLIES
                          </ViewButton>
                        )}
                      </>
                      <>
                        {viewReplies && (
                          <Replies _id={_id} commentReply={commentReply} />
                        )}
                      </>
                    </RepliesContainer>
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;

const CommentAmount = styled.h4`
  padding: 1rem 0;
  border-bottom: ${(props) => props.theme.borderColor};
`;

const ScrollContainer = styled.div`
  
  @media (max-width: 750px) {
    margin: 0.5rem;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (max-width: 750px) {
    overflow-y: scroll;
    max-height: 400px;
  }
`;

const ReverseScroll = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = styled.div`
  margin: 1rem 0;
  position: relative;
 
`;

const CommentUser = styled.h4`
  padding-bottom: 0.5rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  opacity: 0.5;
`;

const CommentContent = styled.p``;

const IconWrapper = styled.div`
  display: none;
  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 500ms;
    opacity: ${(props) => (props.showArrow ? "1" : "0")};
    transform: translateY(-50%);
  }
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

const RepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReplyLikeContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.5rem;
  width: 100%;
`;

const ReplyButton = styled.button`
  padding: 0;
  opacity: 0.5;
`;

const ViewButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(62, 166, 255);
  font-size: 0.8rem;
  margin-left: -0.5rem;
`;
