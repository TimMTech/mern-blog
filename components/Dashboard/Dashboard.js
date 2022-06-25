import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import addIcon from "/public/static/icons/add.png";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const MainDash = ({ user, posts }) => {
  const router = useRouter();

  const [showPublished, setShowPublished] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);

  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);

  const publishedPosts = filteredMyPosts.filter(
    (post) => post.published === true
  );
  const unPublishedPosts = filteredMyPosts.filter(
    (post) => post.published === false
  );

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
    <UserDashWrapper>
      <UserHeader>
        <UserLogo variant={/[A-Ma-m]/}>{user.username.slice(0, 1)}</UserLogo>

        <Username>{user.username}</Username>
        <UserEmail>{user.email}</UserEmail>
        <TotalPosts>{filteredMyPosts.length} Posts</TotalPosts>
        <UserOptionsWrapper>
          <HomeNav href={"/"}>
            <Home>Home</Home>
          </HomeNav>
          <EditProfile>Edit Profile</EditProfile>
        </UserOptionsWrapper>
        <ViewPostsWrapper>
          <ViewPublishedWrapper>
            <ViewPublished onClick={handleShowPublished}>
              Published
            </ViewPublished>
            <ViewPublishedUnderline
              hidden={showPublished ? false : true}
            ></ViewPublishedUnderline>
          </ViewPublishedWrapper>
          <ViewUnpublishedWrapper>
            <ViewUnpublished onClick={handleShowUnpublished}>
              Unpublished
            </ViewUnpublished>
            <ViewUnpublishedUnderline
              hidden={showUnpublished ? false : true}
            ></ViewUnpublishedUnderline>
          </ViewUnpublishedWrapper>
        </ViewPostsWrapper>
      </UserHeader>
      <MenuWrapper>
        <Select></Select>

        <CreatePost href={"/post"}>
          <CreatePostIcon>
            <Image src={addIcon} alt="" />
          </CreatePostIcon>
        </CreatePost>
      </MenuWrapper>
      {showPublished && (
        <PublishedPostsWrapper>
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
                  <PostImageContainer>
                    <Link href={`/post/${_id}`}>
                      <PostImage
                        src={
                          imageUrl ||
                          "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                        }
                      />
                    </Link>
                  </PostImageContainer>
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
        </PublishedPostsWrapper>
      )}
      {showUnpublished && (
        <UnpublishedPostsWrapper>
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
                  <PostImageContainer>
                    <Link href={`/post/${_id}`}>
                      <PostImage
                        src={
                          imageUrl ||
                          "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                        }
                      />
                    </Link>
                  </PostImageContainer>
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
        </UnpublishedPostsWrapper>
      )}
    </UserDashWrapper>
  );
};

export default MainDash;

const UserDashWrapper = styled.section`
  overflow: hidden;
  width: 100%;
  padding: 0.5rem;
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserLogo = styled.span`
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  border-radius: 50%;
  font-size: 50px;
  color: rgb(255, 255, 255);
  text-align: center;
  background: ${(props) =>
    props.variant.test(props.children) ? "blue" : "red"};
`;

const Username = styled.h1`
  text-align: center;
  font-size: 4rem;
`;

const UserEmail = styled.span`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const TotalPosts = styled.span``;

const UserOptionsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const HomeNav = styled(Link)`
`;

const Home = styled.button`
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-weight: 800;
  font-size: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const EditProfile = styled.button`
  border: none;
  border-radius: 2rem;
  font-weight: 800;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const ViewPostsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ViewPublishedWrapper = styled.div``;
const ViewPublished = styled.button`
  border: none;
  background: transparent;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
`;

const ViewPublishedUnderline = styled.div`
  border: 0.1rem solid rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
`;

const ViewUnpublishedWrapper = styled.div``;
const ViewUnpublished = styled.button`
  border: none;
  background: transparent;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
`;

const ViewUnpublishedUnderline = styled.div`
  border: 0.1rem solid rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
`;

const CreatePost = styled(Link)``;

const CreatePostIcon = styled.a`
  display: block;
  width: 1.7rem;
  height: 1.7rem;
  &:hover{
    transform: scale(1.1,1.1);
    cursor: pointer;
  }
`;

const Select = styled.select``;

const PublishedPostsWrapper = styled.div`
  --masonry-gap: 0.5rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 0.5rem 0.5rem;
`;

const MyPostsWrapper = styled.div`
  padding: 0.3rem;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
`;

const Post = styled.a`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 0.15rem;
`;

const PostTitle = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
`;

const PostImageContainer = styled.div`
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  display: block;
`;

const PostAuthor = styled.p`
  font-size: 1rem;
  font-weight: 100;
  padding: 0.5rem;
`;

const PostDate = styled.span``;

const UnpublishedPostsWrapper = styled.div`
  --masonry-gap: 0.5rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 0.5rem 0.5rem;
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
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
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
  transition: 500ms;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
