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
  AiOutlineEdit,
} from "react-icons/ai";
import { MdPublishedWithChanges, MdUnpublished } from "react-icons/md";
import moment from "moment";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const menu = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Card = ({
  post,
  user,
  index,
  showPublished,
  showUnpublished,
  getPostParam,
  setPostEditMode,
  
}) => {
  const router = useRouter();
  const [showCardMenu, setShowCardMenu] = useState(false);

  const toggleCardMenu = () => {
    setShowCardMenu(!showCardMenu);
  };

  const handleEdit = (_id) => {
    getPostParam(_id);
    setPostEditMode(true);
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
        toast.success("Unpublished Post");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server Error Occured");
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
        toast.success("Published Post");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server Error Occured");
      });
  };

  const handleDelete = (_id) => {
    fetch(`/api/post/${_id}/delete`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        router.push(`/user/${user._id}`);
        toast.success("Post Deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server Error Occured");
      });
  };
  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  return (
    <CardContainer>
      <ImageContainer>
        <CardImage src={post.imageUrl || "/static/images/default.png"} />

        <OverlayContainer dashboard={user}>
          <CardHeaderContainer>
            <IconOverlay>
              <CardIconWrapper>
                <AiOutlineFieldNumber size={20} />
                <CardNumber>{index + 1}</CardNumber>
              </CardIconWrapper>
              <CardIconWrapper>
                <AiOutlineLike size={20} />
                <CardLikes>{post.likes.length}</CardLikes>
              </CardIconWrapper>
              <CardIconWrapper>
                <AiOutlineEye size={20} />
                <CardViews>{post.viewCounter}</CardViews>
              </CardIconWrapper>
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
                          <AiOutlineDelete
                            size={22}
                            onClick={() => handleDelete(post._id)}
                          />
                          <AiOutlineEdit
                            size={22}
                            onClick={() => handleEdit(post._id)}
                          />
                        </IconContainer>
                      )}
                      {showUnpublished && (
                        <IconContainer>
                          <MdPublishedWithChanges
                            size={22}
                            onClick={() => handlePublish(post._id)}
                          />
                          <AiOutlineDelete
                            size={22}
                            onClick={() => handleDelete(post._id)}
                          />
                          <AiOutlineEdit
                            size={22}
                            onClick={() => handleEdit(post._id)}
                          />
                        </IconContainer>
                      )}
                    </Modal>
                  )}
                </AnimatePresence>
              </ButtonOverlay>
            )}
          </CardHeaderContainer>
          <CardFooterContainer>
            <CardTitle>{post.title}</CardTitle>
            <CardAuthor>
              By {post.user.username} / {dateFormat(post.date)}
            </CardAuthor>
          </CardFooterContainer>
        </OverlayContainer>
      </ImageContainer>
      <ViewPostContainer>
        <NextLink href={`/post/${post._id}`}>
          <ViewPost>{user ? "View Post" : "Read More"}</ViewPost>
        </NextLink>
      </ViewPostContainer>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  break-inside: avoid;
  margin-bottom: 1.3rem;
`;

const Modal = styled(motion.div)``;

const CardNumber = styled.span``;

const CardTitle = styled.h4`
  
`;

const CardImage = styled.img``;

const CardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  & > * {
    gap: 0.1rem;
    padding: 0.3rem 0.3rem 0 0.3rem;
  }
`;

const CardFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 2;
  padding: 0 1.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
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

  opacity: ${(props) => (props.dashboard ? "1" : "0")};
  transition: opacity 0.25s;
  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const CardIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

const CardViews = styled.span``;

const CardLikes = styled.span``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewPostContainer = styled.div`
  background-color: ${(props) => props.theme.body};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  padding: 1rem;
  cursor: pointer;
`;

const ViewPost = styled.div`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 1rem;
`;

const CardAuthor = styled.p``;

const ButtonOverlay = styled.div`
  position: absolute;
  cursor: pointer;
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
