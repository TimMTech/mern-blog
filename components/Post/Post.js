import styled from "styled-components";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostForm from "../Forms/PostForm/PostForm";
import Comment from "../Comment/Comment";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

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
          <PostCardContainer>
            <LeftColumn>
              {user === username ? (
                <OptionContainer>
                  <EditPost hidden={user ? false : true} onClick={handleEdit}>
                    Edit
                  </EditPost>
                  <DeletePost
                    hidden={user ? false : true}
                    onClick={handleDelete}
                  >
                    Delete
                  </DeletePost>
                </OptionContainer>
              ) : null}
              <PostTitle>{title}</PostTitle>
              <PostImage
                src={
                  imageUrl ||
                  "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                }
              />
              <LikesContainer
                hidden={user ? false : true}
                onClick={handlePostLike}
              >
                {liked ? (
                  <ImageWrapper>
                    <AiFillLike size={17} />
                  </ImageWrapper>
                ) : (
                  <ImageWrapper>
                    <AiOutlineLike size={17} />
                  </ImageWrapper>
                )}
                <PostLikeAmount>{postLikes.length}</PostLikeAmount>
              </LikesContainer>
              <PostAuthor>
                by {username} / {dateFormat(date)}
              </PostAuthor>
            </LeftColumn>
            <PostContent>{content}</PostContent>
          </PostCardContainer>

          <Comment
            setPostComments={setPostComments}
            postComments={postComments}
            post={post}
          />
        </PostContainer>
      )}
    </>
  );
};

export default Post;

const EditContainer = styled.main``;

const PostContainer = styled.main`
  padding-top: 0.5rem;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const EditPost = styled.button``;

const DeletePost = styled.button``;
const PostTitle = styled.h1``;

const PostCardContainer = styled.div`
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 1rem 0;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 0.75rem;
`;

const PostImage = styled.img`
  @media (max-width: 750px) {
    border-radius: 0;
  }
  border-radius: 0.75rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
`;

const LikesContainer = styled.div`
  gap: 0.2rem;
  border: none;
  background-color: transparent;
  padding: 1rem;
  width: 100%;
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;

const ImageWrapper = styled.div`
  cursor: pointer;
 
`;

const PostLikeAmount = styled.span`
  display: in-line;
`;

const PostAuthor = styled.h4`
  padding: 1.5rem;
  font-weight: 300;
  font-style: italic;
`;

const PostContent = styled.p`
  padding: 1rem;
  width: 100%;
  max-height: 95%;
  text-align: left;
`;
