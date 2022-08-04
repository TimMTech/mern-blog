import styled from "styled-components";
import moment from "moment";

const Replies = ({ _id, commentReply }) => {
  const dateFormat = (date) => {
    return moment(date).format("lll");
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
            </ReplyWrapper>
          );
        })}
    </ReplyContainer>
  );
};

export default Replies;

const ReplyContainer = styled.div`
  margin-left: 1.5rem;
  
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  margin: 0.75rem 0;
`;

const ReplyUser = styled.h4`
  padding-bottom: 0.5rem;
`;

const ReplyDate = styled.span`
  font-size: 0.8rem;
  opacity: 0.5;
`;

const ReplyContent = styled.p`
  word-break: break-all;
`;
