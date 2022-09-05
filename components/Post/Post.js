import styled from "styled-components";
import moment from "moment";
import { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Comment from "../Comment/Comment";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const {
    title,
    content,
    user: { username },
    date,
    imageUrl,
    socialMedia: { twitterLink, facebookLink, instagramLink },
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
          if (!response.ok) console.log("Server Error Occured");
          return response.json();
        })
        .then((data) => {
          if (data && data.error) {
            toast.info("Please Login to Dislike Posts");
          } else {
            setPostLikes(data);
            setLiked(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`/api/post/${post._id}/like`, {
        method: "PUT",
      })
        .then((response) => {
          if (!response.ok) console.log("Server Error Occured");
          return response.json();
        })
        .then((data) => {
          if (data && data.error) {
            toast.info("Please Login to Like Posts");
          } else {
            setPostLikes(data);
            setLiked(true);
          }
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
        if (!response.ok) console.log("Server Error Occured");
        return response.json();
      })
      .then((data) => {
        if (data && data.post) {
          setPostLikes(data.post);

          if (data.post.some((element) => element === session.user?.email))
            setLiked(true);
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

        <PostContent>{ReactHtmlParser(content)}</PostContent>
        <PostInfoContainer>
          <PostAuthor>
            by {username} / {dateFormat(date)}
          </PostAuthor>
          <SocialMediaContainer>
            <LinkWrapper href={twitterLink} target="_blank" rel="noreferrer">
              <AiFillTwitterSquare size={40} />
            </LinkWrapper>

            <LinkWrapper href={facebookLink} target="_blank" rel="noreferrer">
              <AiFillFacebook size={40} />
            </LinkWrapper>

            <LinkWrapper href={instagramLink} target="_blank" rel="noreferrer">
              <AiFillInstagram size={40} />
            </LinkWrapper>
          </SocialMediaContainer>
        </PostInfoContainer>
        <LikesContainer onClick={handlePostLike}>
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

  @media (max-width: 750px) {
    margin: 0 1rem;
  }
`;
const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const PostTitle = styled.h1`
  padding: 3.5rem 0 1.5rem 0;
  text-align: left;
  @media (max-width: 750px) {
    padding: 2.5rem 0 0.1rem 0;
  }
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
  padding-right: 1rem;
`;

const LikesContainer = styled.div`
  gap: 0.2rem;
  border: none;
  background-color: transparent;
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;

const SocialMediaContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: center;
`;

const LinkWrapper = styled.a`
  color: ${(props) => props.theme.text};
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
  padding-top: 1rem;
`;

const PostContent = styled.div`
  width: 100%;
  line-height: 1.5rem;

  & > ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
    overflow: auto;
  }
`;
