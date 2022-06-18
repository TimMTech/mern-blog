import styled from "styled-components";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostForm from "../../Forms/PostForm";

import CommentForm from "../../Forms/CommentForm";

const Post = ({ post }) => {
  const {
    _id,
    title,
    content,
    user: { username },
    date,
    imageUrl,
  } = post;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const filteredComments = postComments.filter(
    (comment) => comment.postId === post._id
  );

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    fetch(`/api/post/${post._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostLike = () => {
    if (liked) {
      fetch(`/api/post/${post._id}/dislike`, {
        method: "PUT",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPostLikes(data);
          setLiked(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`/api/post/${post._id}/like`, {
        method: "PUT",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPostLikes(data);
          setLiked(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getLikes = () => {
    fetch(`/api/post/${post._id}/like`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
          setPostLikes(data.post);
          if (data.post.some((id) => id === data.decoded)) setLiked(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getComments = () => {
    fetch(`/api/comment/${post._id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getComments();
    getLikes();
  }, [liked]);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  return (
    <>
      {editMode ? (
        <EditModeWrapper>
          <PostForm
            editMode={editMode}
            postId={_id}
            setEditMode={setEditMode}
          />
        </EditModeWrapper>
      ) : (
        <PostWrapper>
          <PostContainer>
            {user === username ? (
              <EditMode>
                <EditPost hidden={user ? false : true} onClick={handleEdit}>
                  Edit
                </EditPost>
                <DeletePost hidden={user ? false : true} onClick={handleDelete}>
                  Delete
                </DeletePost>
              </EditMode>
            ) : null}

            <PostTitle>{title}</PostTitle>
            <PostImageWrapper>
              <PostImage src={imageUrl} />
            </PostImageWrapper>
            <PostContent>{content}</PostContent>
            <PostLikes hidden={user ? false : true} onClick={handlePostLike}>
              {postLikes.length}
            </PostLikes>
            <PostAuthor>
              by {username} / <PostDate>{dateFormat(date)}</PostDate>
            </PostAuthor>
            <CommentForm setPostComments={setPostComments} />
            <PostComments>
              <ShownComments>
                Comments ({filteredComments.length})
              </ShownComments>
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
      )}
    </>
  );
};

export default Post;

const EditModeWrapper = styled.main`
  padding: 2rem;
`;

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

const EditMode = styled.div`
  margin: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditPost = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.2em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`;

const DeletePost = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.2em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
  margin-left: 0.5rem;
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
  align-items: center;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const PostLikes = styled.button`
  align-self: flex-start;
  margin-left 1.5rem;
  margin-top: 2rem;
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
  width: 100%;
`;

const ShownComments = styled.p`
  font-weight: 500;
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
`;

const CommentWrapper = styled.div`
  margin: 2rem;
  border: 0.1rem solid black;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
`;

const Comment = styled.div``;

const CommentUser = styled.p`
  font-weight: 200;
  padding: 1rem;
`;

const CommentDate = styled.span``;

const CommentContent = styled.p`
  padding: 1rem;
`;
