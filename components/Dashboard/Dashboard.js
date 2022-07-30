import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import SignupForm from "../Forms/SignupForm/SignupForm";
import Cookies from "js-cookie";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import {AiOutlinePlus} from "react-icons/ai"

const Dashboard = ({ user, posts }) => {
  const session = Cookies.get("token");
  const router = useRouter();
  
  const [option, setOption] = useState("mostRecentDefault");
  const [mostLikedVisible, setMostLikedVisible] = useState(false);
  const [mostRecentDefaultVisible, setMostRecentDefaultVisible] =
    useState(false);
  const [mostViewedVisible, setMostViewedVisible] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);

  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);

  const publishedPosts = filteredMyPosts.filter(
    (post) => post.published === true
  );
  const unPublishedPosts = filteredMyPosts.filter(
    (post) => post.published === false
  );

  const mostViewedPublished = publishedPosts
    .sort((a, b) => a.viewCounter - b.viewCounter)
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showPublished={showPublished}
      />
    ));

  const mostRecentPublished = publishedPosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showPublished={showPublished}
      />
    ));

  const mostLikesPublished = publishedPosts
    .sort((a, b) => a.likes.length - b.likes.length)
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showPublished={showPublished}
      />
    ));

  const mostViewedUnpublished = unPublishedPosts
    .sort((a, b) => a.viewCounter - b.viewCounter)
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showUnpublished={showUnpublished}
      />
    ));

  const mostRecentUnpublished = unPublishedPosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showUnpublished={showUnpublished}
      />
    ));

  const mostLikesUnpublished = unPublishedPosts
    .sort((a, b) => a.likes.length - b.likes.length)
    .reverse()
    .map((post, index) => (
      <Card
        key={post._id}
        post={post}
        index={index}
        user={user}
        showUnpublished={showUnpublished}
      />
    ));

  const handleBlogOptions = (e) => {
    setOption(e.target.value);
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleShowPublished = () => {
    setShowPublished(true);
    setShowUnpublished(false);
  };

  const handleShowUnpublished = () => {
    setShowUnpublished(true);
    setShowPublished(false);
  };

  useEffect(() => {
    setShowPublished(true);
  }, []);

  useEffect(() => {
    if (session) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      router.push("/404");
    }
  }, [session, router]);

  useEffect(() => {
    option === "mostRecentDefault"
      ? setMostRecentDefaultVisible(true)
      : setMostRecentDefaultVisible(false);
    option === "mostLiked"
      ? setMostLikedVisible(true)
      : setMostLikedVisible(false);

    option === "mostViewed"
      ? setMostViewedVisible(true)
      : setMostViewedVisible(false);
  }, [option]);

  return (
    <>
      {isAuth && (
        <>
          {editMode ? (
            <EditContainer>
              <SignupForm
                editMode={editMode}
                userId={user._id}
                setEditMode={setEditMode}
              />
            </EditContainer>
          ) : (
            <DashContainer>
              <HeaderContainer>
                <UserLogo variant={/[A-Ma-m]/}>
                  {user.username.slice(0, 1)}
                </UserLogo>

                <Username>{user.username}</Username>
                <UserEmail>{user.email}</UserEmail>
                <UserPosts>{filteredMyPosts.length} Posts</UserPosts>
                <OptionsContainer>
                  <NextLink href={"/"}>
                    <HomeButton>Home</HomeButton>
                  </NextLink>
                  <EditButton onClick={handleEditMode}>Edit Profile</EditButton>
                </OptionsContainer>
                <ViewContainer>
                  <PublishedContainer>
                    <ViewPublished onClick={handleShowPublished}>
                      Published
                    </ViewPublished>
                    <Underline
                      hidden={showPublished ? false : true}
                    ></Underline>
                  </PublishedContainer>
                  <UnpublishedContainer>
                    <ViewUnpublished onClick={handleShowUnpublished}>
                      Unpublished
                    </ViewUnpublished>
                    <Underline
                      hidden={showUnpublished ? false : true}
                    ></Underline>
                  </UnpublishedContainer>
                </ViewContainer>
              </HeaderContainer>
              <MenuContainer>
                <Filter value={option} handleBlogOptions={handleBlogOptions} />
                <NextLink href={"/post"}>
                  <CreatePostIcon>
                    <AiOutlinePlus size={35}/>
                  </CreatePostIcon>
                </NextLink>
              </MenuContainer>
              {showPublished && (
                <MasonryContainer>
                  {mostRecentDefaultVisible && mostRecentPublished}
                  {mostLikedVisible && mostLikesPublished}
                  {mostViewedVisible && mostViewedPublished}
                </MasonryContainer>
              )}
              {showUnpublished && (
                <MasonryContainer>
                  {mostRecentDefaultVisible && mostRecentUnpublished}
                  {mostLikedVisible && mostLikesUnpublished}
                  {mostViewedVisible && mostViewedUnpublished}
                </MasonryContainer>
              )}
            </DashContainer>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;

const EditContainer = styled.div``;

const DashContainer = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserLogo = styled.span`
  padding: 2rem;
  line-height: 50%;
  border-radius: 50%;
  font-size: 4rem;
  color: rgb(255, 255, 255);
  text-align: center;
  background: ${(props) =>
    props.variant.test(props.children) ? "blue" : "red"};
`;

const Username = styled.h1``;

const UserEmail = styled.h2`
  opacity: 0.5;
`;

const UserPosts = styled.h2``;

const OptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const HomeButton = styled.button`
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const EditButton = styled.button`
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ViewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const PublishedContainer = styled.div``;
const ViewPublished = styled.button`
  border: none;
  color: ${(props) => props.theme.text};
  background: transparent;
  padding: 0;
`;

const UnpublishedContainer = styled.div``;
const ViewUnpublished = styled.button`
  border: none;
  color: ${(props) => props.theme.text};
  background: transparent;
  padding: 0;
`;

const Underline = styled.div`
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.borderBackground};
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
`;

const CreatePostIcon = styled.a`
  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

const MasonryContainer = styled.div`
  --masonry-gap: 0.5rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 1rem;
`;
