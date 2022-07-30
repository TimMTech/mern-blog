import styled from "styled-components";
import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineEye,
  AiOutlineMenu,
  AiOutlineFieldNumber,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdPublishedWithChanges, MdUnpublished } from "react-icons/md";
import moment from "moment";
import { useRouter } from "next/router";

const menu = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Card = ({ post, user, index, showPublished, showUnpublished }) => {
  const router = useRouter();
  const [showCardMenu, setShowCardMenu] = useState(false);

  const toggleCardMenu = () => {
    setShowCardMenu(!showCardMenu);
  };

  const handleUnpublish = (_id) => {
    fetch(`/api/post/${_id}/unpublish`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
    <PostContainer key={post._id}>
      <PostImage
        src={
          post.imageUrl ||
          "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
        }
      />

      <OverlayContainer>
        <PostHeaderContainer>
          <IconOverlay>
            <PostIconWrapper>
              <AiOutlineFieldNumber size={20} />
              <PostNumber>{index + 1}</PostNumber>
            </PostIconWrapper>
            <PostIconWrapper>
              <AiOutlineLike size={20} />
              <PostLikes>{post.likes.length}</PostLikes>
            </PostIconWrapper>

            <PostIconWrapper>
              <AiOutlineEye size={20} />
              <PostViews>{post.viewCounter}</PostViews>
            </PostIconWrapper>
          </IconOverlay>
          {user && (
            <ButtonOverlay>
              
              <AiOutlineMenu size={30} onClick={toggleCardMenu} />
              <AnimatePresence>
                {showCardMenu && (
                  <Modal
                    variants={menu}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.2 }}
                  >
                    {showPublished && (
                      <IconContainer>
                        <MdUnpublished
                          size={22}
                          onClick={() => handleUnpublish(post._id)}
                        />
                        <AiOutlineDelete size={22} />
                      </IconContainer>
                    )}
                    {showUnpublished && (
                      <MdPublishedWithChanges
                        size={22}
                        onClick={() => handlePublish(post._id)}
                      />
                    )}
                  </Modal>
                )}
              </AnimatePresence>
            </ButtonOverlay>
          )}
        </PostHeaderContainer>
        <PostFooterContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostAuthor>
            By {post.user.username} / {dateFormat(post.date)}
          </PostAuthor>
        </PostFooterContainer>
      </OverlayContainer>
    </PostContainer>
  );
};

export default Card;

const Modal = styled(motion.div)``;

const PostNumber = styled.span``;

const PostTitle = styled.h4`
  font-size: 1.5rem;
`;

const PostImage = styled.img``;

const PostHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  & > * {
    gap: 0.1rem;
    padding: 0.3rem 0.3rem 0 0.3rem;
  }
`;

const PostFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
`;

const PostContainer = styled.div`
  position: relative;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
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
  opacity: 0;
  transition: opacity 0.25s;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const PostIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

const PostViews = styled.span``;

const PostLikes = styled.span``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostAuthor = styled.p``;

const ButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;

const IconOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-start;
`;
