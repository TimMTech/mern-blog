import styled from "styled-components";
import NextLink from "next/link";
import NextImage from "next/image";
import viewIcon from "/public/static/icons/views.png";
import likesIcon from "/public/static/icons/likes.png";
import moment from "moment";
import { useRouter } from "next/router";

const Card = ({ post, user, index, showPublished, showUnpublished }) => {
  const router = useRouter();

  const handleUnpublish = (_id) => {
    fetch(`/api/post/${_id}/unpublish`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.push(`/user/${user._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePublish = (_id) => {
    fetch(`/api/post/${_id}/publish`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.push(`/user/${user._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const dateFormat = (date) => {
    return moment(date).format("lll");
  };
  return (
    <NextLink href={`/post/${post._id}`} key={post._id}>
      <PostContainer>
        <PostImage
          src={
            post.imageUrl ||
            "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
          }
        />
        <OverlayContainer>
          <PostHeaderContainer>
            <PostNumber>{index + 1}</PostNumber>
            <PostTitle>{post.title}</PostTitle>
          </PostHeaderContainer>
          <PostFooterContainer>
            <PostAuthor>
              By {post.user.username} / {dateFormat(post.date)}
            </PostAuthor>
            <PostIconContainer>
              <PostIconWrapper>
                <NextImage src={likesIcon} alt="" />
              </PostIconWrapper>
              <PostLikes>{post.likes.length}</PostLikes>
              <PostIconWrapper>
                <NextImage src={viewIcon} alt="" />
              </PostIconWrapper>
              <PostViews>{post.viewCounter}</PostViews>
            </PostIconContainer>
          </PostFooterContainer>
          <ButtonOverlay>
            {showPublished && (
              <UnpublishButton onClick={() => handleUnpublish(post._id)}>
                Unpublish
              </UnpublishButton>
            )}
            {showUnpublished && (
              <PublishButton onClick={() => handlePublish(post._id)}>
                Publish
              </PublishButton>
            )}
          </ButtonOverlay>
        </OverlayContainer>
      </PostContainer>
    </NextLink>
  );
};

export default Card;

const PostNumber = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(40%, 10%);
`;

const PostTitle = styled.h1`
  font-size: 2rem;
`;

const PostImage = styled.img`
  
`;

const PostHeaderContainer = styled.div``;

const PostFooterContainer = styled.div``;

const PostContainer = styled.div`
  position: relative;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
  border-radius: 0.2rem;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  opacity: 0;
  transition: opacity 0.25s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const PostIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const PostIconWrapper = styled.div`
  width: 1.2rem;
  &:nth-child(1) {
    width: 1rem;
  }
`;

const PostViews = styled.span``;

const PostLikes = styled.span`
  margin-right: 1rem;
`;

const PostAuthor = styled.p`
  text-align: center;
`;

const ButtonOverlay = styled.div``;

const PublishButton = styled.button`
  border-radius: 0.25rem;
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const UnpublishButton = styled.button`
  border-radius: 0.25rem;
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
