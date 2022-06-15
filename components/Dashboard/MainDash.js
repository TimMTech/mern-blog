import styled from "styled-components";
import DashMenu from "./DashMenu";

import { motion, AnimatePresence, useCycle } from "framer-motion";
import moment from "moment";

const MainDash = ({ user, posts }) => {
  const [open, cycleOpen] = useCycle(false, true);

  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);

  const publishedPosts = filteredMyPosts.filter(
    (post) => post.published === true
  );
  const unPublishedPosts = filteredMyPosts.filter(
    (post) => post.published === false
  );

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  const itemVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -2,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const handleUnpublish = (_id) => {
    fetch(`/api/post/${_id}/unpublish`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <MotionAside
            initial={{ width: 0 }}
            animate={{ width: 500 }}
            exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
          >
            <MotionDiv
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <MotionA whileHover={{ scale: 1.1 }} variants={itemVariants}>
                <DashMenu />
              </MotionA>
            </MotionDiv>
          </MotionAside>
        )}
      </AnimatePresence>
      <>
        <RightPanelWrapper>
          <OpenMenuButton onClick={cycleOpen}>
            {open ? "Close" : "Open"}
          </OpenMenuButton>
          <Welcome>Welcome to your dashboard, {user.username}</Welcome>
          <Published>Published Posts</Published>
          <ScrollBar>
            {publishedPosts.map((posts) => {
              const {
                title,
                date,
                _id,
                imageUrl,
                user: { username },
              } = posts;
              return (
                <MyPostsWrapper key={_id}>
                  <Post>
                    <PostTitle>{title}</PostTitle>
                    <PostImageWrapper>
                      <PostImage src={imageUrl} />
                    </PostImageWrapper>
                    <PostAuthor>
                      By {username} / <PostDate>{dateFormat(date)}</PostDate>
                    </PostAuthor>
                    <UnpublishButton onClick={() => handleUnpublish(_id)}>
                      Unpublish
                    </UnpublishButton>
                  </Post>
                </MyPostsWrapper>
              );
            })}
          </ScrollBar>
          <Unpublished>Unpublished Posts</Unpublished>
          <ScrollBar>
            {unPublishedPosts.map((posts) => {
              const {
                title,
                date,
                _id,
                imageUrl,
                user: { username },
              } = posts;
              return (
                <MyPostsWrapper key={_id}>
                  <Post>
                    <PostTitle>{title}</PostTitle>
                    <PostImageWrapper>
                      <PostImage src={imageUrl} />
                    </PostImageWrapper>
                    <PostAuthor>
                      By {username} / <PostDate>{dateFormat(date)}</PostDate>
                    </PostAuthor>
                    <PublishButton onClick={() => handlePublish(_id)}>
                      Publish
                    </PublishButton>
                  </Post>
                </MyPostsWrapper>
              );
            })}
          </ScrollBar>
        </RightPanelWrapper>
      </>
    </>
  );
};

export default MainDash;

const MotionAside = styled(motion.aside)`
  background-color: rgb(52, 60, 85);
  width: 20rem;
  min-height: 100vh;
  box-shadow: inset 0 0 10rem rgba(255, 255, 255, 0.5);
`;

const MotionDiv = styled(motion.div)``;

const MotionA = styled(motion.a)``;

const RightPanelWrapper = styled.section`
  padding-top: 3rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  width: 100%;
`;

const Welcome = styled.h1`
  font-size: 3vw;
  text-align: center;
`;

const Published = styled.p`
  font-size: 2rem;
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
  margin: 1.5rem;
  padding: 1.5rem;
  width: 100%;
`;

const Unpublished = styled.p`
  font-size: 2rem;
  border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
  margin: 1.5rem;
  padding: 1.5rem;
  width: 100%;
`;

const ScrollBar = styled.section`
  padding: 2rem;
  display: flex;
  overflow: scroll;
`;

const MyPostsWrapper = styled.div`
  padding: 1rem;
`;

const Post = styled.a`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 1.5rem;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  border-radius: 1rem;
  width: 20rem;
  cursor: pointer;
  transition: 200ms;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const PostTitle = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
`;

const PostImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: 10rem;
`;

const PostAuthor = styled.p`
  font-size: 1rem;
  font-weight: 100;
  padding: 0.5rem;
`;

const PostDate = styled.span``;

const OpenMenuButton = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 0 1.5rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;

const PublishButton = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;

const UnpublishButton = styled.button`
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;
