import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import addIcon from "/public/static/icons/add.png";
import NextImage from "next/image";
import NextLink from "next/link";
import moment from "moment";
import SignupForm from "../Forms/SignupForm/SignupForm"

const Dashboard = ({ user, posts }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false)
  const [showPublished, setShowPublished] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);

  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);

  const publishedPosts = filteredMyPosts.filter(
    (post) => post.published === true
  );
  const unPublishedPosts = filteredMyPosts.filter(
    (post) => post.published === false
  );

  const handleEditMode = () => {
    setEditMode(true);
  }

  const handleShowPublished = () => {
    setShowPublished(true);
    setShowUnpublished(false);
  };

  const handleShowUnpublished = () => {
    setShowUnpublished(true);
    setShowPublished(false);
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

  useEffect(() => {
    setShowPublished(true);
  }, []);

  return (
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
                <Underline hidden={showPublished ? false : true}></Underline>
              </PublishedContainer>
              <UnpublishedContainer>
                <ViewUnpublished onClick={handleShowUnpublished}>
                  Unpublished
                </ViewUnpublished>
                <Underline hidden={showUnpublished ? false : true}></Underline>
              </UnpublishedContainer>
            </ViewContainer>
          </HeaderContainer>
          <MenuContainer>
            <Select></Select>

            <NextLink href={"/post"}>
              <CreatePostIcon>
                <NextImage src={addIcon} alt="" />
              </CreatePostIcon>
            </NextLink>
          </MenuContainer>
          {showPublished && (
            <MasonryContainer>
              {publishedPosts.map((posts) => {
                const {
                  title,
                  date,
                  _id,
                  imageUrl,
                  user: { username },
                } = posts;
                return (
                  <NextLink href={`/post/${_id}`} key={_id}>
                    <PostsContainer>
                      <PostTitle>{title}</PostTitle>
                      <PostImageWrapper>
                        <PostImage
                          src={
                            imageUrl ||
                            "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                          }
                        />
                      </PostImageWrapper>
                      <PostAuthor>
                        By {username} / {dateFormat(date)}
                      </PostAuthor>
                      <UnpublishButton onClick={() => handleUnpublish(_id)}>
                        Unpublish
                      </UnpublishButton>
                    </PostsContainer>
                  </NextLink>
                );
              })}
            </MasonryContainer>
          )}
          {showUnpublished && (
            <MasonryContainer>
              {unPublishedPosts.map((posts) => {
                const {
                  title,
                  date,
                  _id,
                  imageUrl,
                  user: { username },
                } = posts;
                return (
                  <NextLink href={`/post/${_id}`} key={_id}>
                    <PostsContainer>
                      <PostTitle>{title}</PostTitle>
                      <PostImageWrapper>
                        <PostImage
                          src={
                            imageUrl ||
                            "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                          }
                        />
                      </PostImageWrapper>
                      <PostAuthor>
                        By {username} / {dateFormat(date)}
                      </PostAuthor>
                      <PublishButton onClick={() => handlePublish(_id)}>
                        Publish
                      </PublishButton>
                    </PostsContainer>
                  </NextLink>
                );
              })}
            </MasonryContainer>
          )}
        </DashContainer>
      )}
    </>
  );
};

export default Dashboard;

const EditContainer = styled.main``;

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
  width: 7rem;
  line-height: 7rem;
  border-radius: 50%;
  font-size: 5rem;
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
  margin: 2rem;
`;

const CreatePostIcon = styled.a`
  display: block;
  width: 1.7rem;

  &:hover {
    transform: scale(1.1, 1.1);
    cursor: pointer;
  }
`;

const Select = styled.select``;

const MasonryContainer = styled.div`
  --masonry-gap: 0.5rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 1rem;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: 0.1rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  cursor: pointer;
`;

const PostTitle = styled.h4``;

const PostImageWrapper = styled.div`
  width: 100%;
`;

const PostImage = styled.img``;

const PostAuthor = styled.h4`
  font-weight: 100;
  padding: 0.5rem;
`;

const PublishButton = styled.button`
  margin-bottom: 0.5rem;

  border-radius: 0.25rem;
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const UnpublishButton = styled.button`
  margin-bottom: 0.5rem;

  border-radius: 0.25rem;
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
