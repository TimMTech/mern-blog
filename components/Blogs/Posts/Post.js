import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import CommentForm from "../../Forms/CommentForm";

const Post = ({ post }) => {
  const {
    _id,
    title,
    content,
    user: { username },
    date,
    comments,
    published,
    likes,
    imageUrl
  } = post;

  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState(likes)

  const filteredComments = postComments.filter((comment) => comment.postId === post._id)

  const getComments = () => {
    
    fetch("/api/comment", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostComments(...comments, data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments()
  }, []);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  return (
    <PostWrapper>
      <PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostImageWrapper>
          <PostImage src={imageUrl} />
        </PostImageWrapper>
        <PostContent>{content}</PostContent>
        <PostAuthor>
          by {username} / <PostDate>{dateFormat(date)}</PostDate>
        </PostAuthor>
        <CommentForm />
        <PostComments>
          <ShownComments>Comments ({filteredComments.length})</ShownComments>
          {filteredComments.map((comment) => {
            const { _id, user, content, date } = comment;
            return (
              <CommentWrapper key={_id}>
                <Comment>
                  <CommentUser>
                    {user} / <CommentDate>{date}</CommentDate>
                  </CommentUser>
                  <CommentContent>{content}</CommentContent>
                </Comment>
              </CommentWrapper>
            );
          })}
        </PostComments>
      </PostContainer>
    </PostWrapper>
  );
};

export default Post;

const PostWrapper = styled.main`
  min-height: 100vh;
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  height: 100%;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
`;

const PostTitle = styled.h1`
  font-size: 3rem;
  padding-bottom: 2rem;
  font-weight: 500;
`;

const PostImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  
`

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const PostAuthor = styled.p`
  align-self: flex-start;
  padding-left: 1.5rem;
  padding-top: 2rem;
  font-weight: 200;
`;

const PostDate = styled.span``;

const PostContent = styled.p`
  padding-top: 0.5rem;
  padding-left: 2rem;
  min-height: 20rem;
  width: 100%;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
`;

const PostComments = styled.section`
  width: 100%
`;

const ShownComments = styled.p`
  font-weight: 500;
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
`


const CommentWrapper = styled.div`
  margin: 2rem;
  border: 0.1rem solid black;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
`;

const Comment = styled.div`
  
`

const CommentUser = styled.p`
  font-weight: 200;
  padding: 1rem;
`

const CommentDate = styled.span``

const CommentContent = styled.p`
  padding: 1rem;
`;