import styled from "styled-components";
import moment from "moment";

import { useState, useEffect } from "react";

import Comment from "../Comment/Comment";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSession } from "next-auth/react";

const Post = ({ post }) => {
  const {
    title,
    content,
    user: { username, email },
    date,
    imageUrl,
  } = post;

  const { data: session } = useSession();
  const [postLikes, setPostLikes] = useState([]);
  const [liked, setLiked] = useState(false);

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
        if (data && data.post) {
          setPostLikes(data.post);
          if (data.post.some((element) => element === email)) setLiked(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLikes();
  }, [liked]);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  return (
    <PostContainer>
      <PostCardContainer>
        <PostTitle>{title}</PostTitle>
        <PostImage src={imageUrl || "/static/images/default.png"} />

        <PostContent>{content}</PostContent>
        <PostAuthor>
          by {username} / {dateFormat(date)}
        </PostAuthor>
        <LikesContainer
          hidden={session ? false : true}
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
      </PostCardContainer>

      <Comment post={post} />
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.main`
  margin: 0 5rem;
  padding-top: 1rem;
  @media (max-width: 750px) {
    margin: 0 1rem;
  }
`;

const PostTitle = styled.h1`
  padding-top: 0.5rem;
  text-align: left;
`;

const PostCardContainer = styled.div`
  margin-top: 1rem;
`;

const PostImage = styled.img`
  @media (max-width: 750px) {
    border-radius: 0;
    width: 100%;
    padding: 0.5rem 0;
    float: none;
  }

  float: left;
  width: 50%;
  padding-right: 2rem;
`;

const LikesContainer = styled.div`
  gap: 0.2rem;
  border: none;
  background-color: transparent;
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;

const ImageWrapper = styled.div`
  cursor: pointer;
`;

const PostLikeAmount = styled.span`
  display: in-line;
`;

const PostAuthor = styled.h4`
  font-weight: 700;
  opacity: 0.5;
  padding: 1rem 0;
`;

const PostContent = styled.p`
  width: 100%;
  text-align: left;
  line-height: 1.5rem;
`;
