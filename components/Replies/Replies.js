import styled from "styled-components";
import moment from "moment";
import { AiOutlineLike } from "react-icons/ai";
import CommentForm from "../Forms/CommentForm/CommentForm";
import { useState } from "react";

const Replies = ({ _id, commentReply }) => {
  const [replyToComment, setReplyToComment] = useState(false);
  const [commentId, setCommentId] = useState("");
  

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  const handleReply = (_id) => {
    setCommentId(_id);
    setReplyToComment(!replyToComment);
  };

  return (
    <ReplyContainer>
      {commentReply
        .filter((replies) => replies.commentId === _id)
        .map((filtered) => {
          const { _id, user, content, date } = filtered;
          return (
            <ReplyWrapper key={_id}>
              <ReplyUser>
                {user} / <ReplyDate>{dateFormat(date)}</ReplyDate>
              </ReplyUser>
              <ReplyContent>{content}</ReplyContent>
              <ReplyLikeContainer>
                <AiOutlineLike size={17} />
                <ReplyButton onClick={() => handleReply(_id)}>
                  Reply
                </ReplyButton>
              </ReplyLikeContainer>
              {replyToComment && (
                <>
                  {commentId === _id && (
                    <>
                      <CommentForm
                     
                        commentId={_id}
                        replyToComment={replyToComment}
                        setReplyToComment={setReplyToComment}
                      />
                    </>
                  )}
                </>
              )}
            </ReplyWrapper>
          );
        })}
    </ReplyContainer>
  );
};

export default Replies;

const ReplyContainer = styled.div`
  padding-left: 1.5rem;
  width: 100%;
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  margin: 0.75rem 0;
`;

const ReplyUser = styled.h4``;

const ReplyDate = styled.span`
  font-size: 0.8rem;
  opacity: 0.5;
`;

const ReplyContent = styled.p`
  word-break: break-all;
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
  border: none;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;
