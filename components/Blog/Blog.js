import styled from "styled-components";
import moment from "moment";
import NextLink from "next/link";
import NextImage from "next/image";
import { useState, useEffect } from "react";
import viewIcon from "/public/static/icons/view.png";

const Blog = ({ posts }) => {
  const [option, setOption] = useState("mostRecentDefault");
  const [mostLikedVisible, setMostLikedVisible] = useState(false);
  const [mostRecentDefaultVisible, setMostRecentDefaultVisible] =
    useState(false);
  const [mostViewedVisible, setMostViewedVisible] = useState(false);

  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  const handleBlogOptions = (e) => {
    setOption(e.target.value);
  };

  const filteredPosts = posts.filter((post) => post.published === true);

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

  const mostViewed = filteredPosts
    .sort((a, b) => a.viewCounter - b.viewCounter)
    .reverse()
    .map((post, index) => (
      <NextLink href={`/post/${post._id}`} key={post._id}>
        <PostContainer>
          <PostHeaderContainer>
            <PostNumber>{index + 1}</PostNumber>
            <PostTitle>{post.title}</PostTitle>
          </PostHeaderContainer>
          <PostImageWrapper>
            <PostImage
              src={
                post.imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
          </PostImageWrapper>
          <PostFooterContainer>
            <PostAuthor>
              By {post.user.username} / {dateFormat(post.date)}
            </PostAuthor>
            <PostIconContainer>
              <PostIconWrapper>
                <NextImage src={viewIcon} alt="" />
              </PostIconWrapper>
              <PostViews>{post.viewCounter}</PostViews>
            </PostIconContainer>
          </PostFooterContainer>
        </PostContainer>
      </NextLink>
    ));

  const mostRecent = filteredPosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse()
    .map((post, index) => (
      <NextLink href={`/post/${post._id}`} key={post._id}>
        <PostContainer>
          <PostHeaderContainer>
            <PostNumber>{index + 1}</PostNumber>
            <PostTitle>{post.title}</PostTitle>
          </PostHeaderContainer>
          <PostImageWrapper>
            <PostImage
              src={
                post.imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
          </PostImageWrapper>
          <PostFooterContainer>
            <PostAuthor>
              By {post.user.username} / {dateFormat(post.date)}
            </PostAuthor>
            <PostIconContainer>
              <PostIconWrapper>
                <NextImage src={viewIcon} alt="" />
              </PostIconWrapper>
              <PostViews>{post.viewCounter}</PostViews>
            </PostIconContainer>
          </PostFooterContainer>
        </PostContainer>
      </NextLink>
    ));

  const mostLikes = filteredPosts
    .sort((a, b) => a.likes.length - b.likes.length)
    .reverse()
    .map((post, index) => (
      <NextLink href={`/post/${post._id}`} key={post._id}>
        <PostContainer key={post._id}>
          <PostHeaderContainer>
            <PostNumber>{index + 1}</PostNumber>
            <PostTitle>{post.title}</PostTitle>
          </PostHeaderContainer>
          <PostImageWrapper>
            <PostImage
              src={
                post.imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
          </PostImageWrapper>
          <PostFooterContainer>
            <PostAuthor>
              By {post.user.username} / {dateFormat(post.date)}
            </PostAuthor>
            <PostIconContainer>
              <PostIconWrapper>
                <NextImage src={viewIcon} alt="" />
              </PostIconWrapper>
              <PostViews>{post.viewCounter}</PostViews>
            </PostIconContainer>
          </PostFooterContainer>
        </PostContainer>
      </NextLink>
    ));

  return (
    <>
      <OptionContainer>
        <Select value={option} onChange={(e) => handleBlogOptions(e)}>
          <Option value="mostRecentDefault">Most Recent</Option>
          <Option value="mostLiked">Most Liked</Option>
          <Option value="mostViewed">Most Viewed</Option>
        </Select>
      </OptionContainer>
      {mostRecentDefaultVisible && <BlogContainer>{mostRecent}</BlogContainer>}
      {mostLikedVisible && <BlogContainer>{mostLikes}</BlogContainer>}
      {mostViewedVisible && <BlogContainer>{mostViewed}</BlogContainer>}
    </>
  );
};

export default Blog;

const BlogContainer = styled.section`
  --masonry-gap: 0.7rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 1rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.2rem;
  cursor: pointer;
`;

const PostHeaderContainer = styled.div`
  text-align: center;
  position: relative;
`;



const PostNumber = styled.span`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.5rem;
  
`;

const PostTitle = styled.h4``;

const PostImageWrapper = styled.div`
  width: 100%;
`;

const PostImage = styled.img`
  
`;

const PostFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostIconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
  color: rgba(0, 0, 0, 0.3);
`;

const PostIconWrapper = styled.div`
  width: 1.2rem;
`;

const PostViews = styled.span``;

const PostAuthor = styled.p`
  text-align: center;
  font-weight: 100;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`


const Select = styled.select`
  width: 8rem;
  height: 1.5rem;
  text-align: center;

  border-radius: 0.2rem;
`;

const Option = styled.option``;
