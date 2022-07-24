import styled from "styled-components"
import CommentForm from "../Forms/CommentForm/CommentForm";
import moment from "moment";

const Comment = ({setPostComments, postComments, post}) => {

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

    const filteredComments = postComments.filter(
      (comment) => comment.postId === post._id
    );
    return (
      <CommentContainer>
        <CommentForm setPostComments={setPostComments} />
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
       
      </CommentContainer>
    );
}

export default Comment

const CommentContainer = styled.section`
  width: 100%;
  
`;

const CommentAmount = styled.h4`
  padding-left: 1rem;
  margin-bottom: 1.5rem;
`;

const Comments = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 10rem;
  
`

const CommentWrapper = styled.div`
  border: 0.1rem solid black;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  margin: 1rem 0;
`;

const CommentUser = styled.h4`
  font-weight: 300;
  padding: 1rem;
  font-style: italic;
`;

const CommentContent = styled.p`
  padding: 1rem;
`;

