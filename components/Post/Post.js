import styled from "styled-components";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostForm from "../Forms/PostForm/PostForm";
import CommentForm from "../Forms/CommentForm/CommentForm";
import likeIcon from "/public/static/icons/like.png";
import unlikeIcon from "/public/static/icons/unlike.png";
import NextImage from "next/image";

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
        <EditContainer>
          <PostForm
            editMode={editMode}
            postId={_id}
            setEditMode={setEditMode}
          />
        </EditContainer>
      ) : (
        <PostContainer>
          {user === username ? (
            <OptionContainer>
              <EditPost hidden={user ? false : true} onClick={handleEdit}>
                Edit
              </EditPost>
              <DeletePost hidden={user ? false : true} onClick={handleDelete}>
                Delete
              </DeletePost>
            </OptionContainer>
          ) : null}

          <PostTitle>{title}</PostTitle>
          <PostImageWrapper>
            <PostImage
              src={
                imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
          </PostImageWrapper>
          <PostContent>{content}</PostContent>
          <LikesWrapper hidden={user ? false : true} onClick={handlePostLike}>
            {liked ? (
              <NextImage src={likeIcon} alt="" />
            ) : (
              <NextImage src={unlikeIcon} alt="" />
            )}
            <PostLikeAmount>{postLikes.length}</PostLikeAmount>
          </LikesWrapper>
          <PostAuthor>
            by {username} / {dateFormat(date)}
          </PostAuthor>
          <CommentForm setPostComments={setPostComments} />
          <CommentContainer>
            <CommentAmount>Comments ({filteredComments.length})</CommentAmount>
            {filteredComments.map((comment) => {
              const { _id, user, content, date } = comment;
              return (
                <CommentWrapper key={_id}>
                  <CommentUser>
                    {user} / {date}
                  </CommentUser>
                  <CommentContent>{content}</CommentContent>
                </CommentWrapper>
              );
            })}
          </CommentContainer>
        </PostContainer>
      )}
    </>
  );
};

export default Post;

const EditContainer = styled.main``;

const PostContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const OptionContainer = styled.div``;

const EditPost = styled.button`
  font-size: 1.2em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding: 0.5rem 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  margin: 0.5rem;
`;

const DeletePost = styled.button`
  margin: 0.5rem;
  font-size: 1.2em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding: 0.5rem 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
`;
const PostTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const PostImageWrapper = styled.div`
  width: 50%;
`;

const PostImage = styled.img`
  width: 100%;
`;

const LikesWrapper = styled.button`
  margin-top: 1.5rem;
  border: none;
  background-color: transparent;
  width: 1rem;
  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

const PostLikeAmount = styled.span``;

const PostAuthor = styled.p`
  align-self: flex-start;
  padding-left: 1.5rem;
`;

const PostContent = styled.p`
  padding-top: 0.5rem;
  padding-left: 2rem;
  min-height: 20rem;
  width: 100%;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
`;

const CommentContainer = styled.section`
  width: 100%;
`;

const CommentAmount = styled.h3`
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
`;

const CommentWrapper = styled.div`
  border: 0.1rem solid black;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  margin: 1rem 0;
`;

const CommentUser = styled.h4`
  font-weight: 200;
  padding: 1rem;

`;

const CommentContent = styled.p`
  padding: 1rem;
`;
