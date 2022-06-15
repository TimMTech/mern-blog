import styled from "styled-components";
import DashMenu from "./DashMenu";

import { motion, AnimatePresence, useCycle } from "framer-motion";
import moment from "moment";

const MainDash = ({ user, posts }) => {
  const [open, cycleOpen] = useCycle(false, true);

  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);

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
              <MotionA
                whileHover={{scale: 1.1}}
                variants={itemVariants}
              >
                <DashMenu />
              </MotionA>
            </MotionDiv>
          </MotionAside>
        )}
      </AnimatePresence>

      <>
        <RightPanelWrapper>
          <OpenMenuButton onClick={cycleOpen}>{open ? "Close" : "Open"}</OpenMenuButton>
          <Welcome>Welcome to your dashboard, {user.username}</Welcome>
          <ScrollBar>
            {filteredMyPosts.map((posts) => {
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
  background-color: rgb(52, 97, 235);
  width: 20rem;
  height: 100vh;
`;

const MotionDiv = styled(motion.div)`
  
`

const MotionA = styled(motion.a)``

const RightPanelWrapper = styled.section`
  padding-top: 3rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  width: 100%;
`;

const Welcome = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const Published = styled.p``;

const ScrollBar = styled.section`
  padding: 4rem;
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
   margin-left: 3rem;
   margin-bottom: 3rem;
   width: 15%;
  background-color: rgb(255, 255, 255);
  color: rgb(52, 97, 235);
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  cursor: pointer;
`;
   
