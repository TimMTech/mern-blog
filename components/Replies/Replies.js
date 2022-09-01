import styled from "styled-components";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";

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
              <ReplyContent>{ReactHtmlParser(content)}</ReplyContent>
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

const ReplyContent = styled.div`
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
