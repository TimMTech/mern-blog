import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
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
      <PostWrapper key={post._id}>
        <Link href={`/post/${post._id}`}>
          <Post>
            <PostHeader>
              <PostNumber>{index + 1}</PostNumber>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostImageContainer>
              <PostImage
                src={
                  post.imageUrl ||
                  "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                }
              />
            </PostImageContainer>
            <PostFooter>
              <PostAuthor>
                By {post.user.username} /{" "}
                <PostDate>{dateFormat(post.date)}</PostDate>
              </PostAuthor>
              <PostViewImageWrap>
                <Image src={viewIcon} alt="" />
                <PostViews>{post.viewCounter}</PostViews>
              </PostViewImageWrap>
            </PostFooter>
          </Post>
        </Link>
      </PostWrapper>
    ));

  const mostRecent = filteredPosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse()
    .map((post, index) => (
      <PostWrapper key={post._id}>
        <Link href={`/post/${post._id}`}>
          <Post>
            <PostHeader>
              <PostNumber>{index + 1}</PostNumber>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostImageContainer>
              <PostImage
                src={
                  post.imageUrl ||
                  "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                }
              />
            </PostImageContainer>
            <PostFooter>
              <PostAuthor>
                By {post.user.username} /{" "}
                <PostDate>{dateFormat(post.date)}</PostDate>
              </PostAuthor>
              <PostViewImageWrap>
                <Image src={viewIcon} alt="" />
                <PostViews>{post.viewCounter}</PostViews>
              </PostViewImageWrap>
            </PostFooter>
          </Post>
        </Link>
      </PostWrapper>
    ));

  const mostLikes = filteredPosts
    .sort((a, b) => a.likes.length - b.likes.length)
    .reverse()
    .map((post, index) => (
      <PostWrapper key={post._id}>
        <Link href={`/post/${post._id}`}>
          <Post>
            <PostHeader>
              <PostNumber>{index + 1}</PostNumber>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostImageContainer>
              <PostImage
                src={
                  post.imageUrl ||
                  "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                }
              />
            </PostImageContainer>
            <PostFooter>
              <PostAuthor>
                By {post.user.username} /{" "}
                <PostDate>{dateFormat(post.date)}</PostDate>
              </PostAuthor>
              <PostViewImageWrap>
                <Image src={viewIcon} alt="" />
                <PostViews>{post.viewCounter}</PostViews>
              </PostViewImageWrap>
            </PostFooter>
          </Post>
        </Link>
      </PostWrapper>
    ));

  const newPost = filteredPosts
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((post, index) => (
      <PostWrapper key={post._id}>
        <Link href={`/post/${post._id}`}>
          <Post>
            <PostHeader>
              <PostNumber>{index + 1}</PostNumber>
              <PostTitle>{post.title}</PostTitle>
            </PostHeader>
            <PostImageContainer>
              <PostImage
                src={
                  post.imageUrl ||
                  "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
                }
              />
            </PostImageContainer>
            <PostFooter>
              <PostAuthor>
                By {post.user.username} /{" "}
                <PostDate>{dateFormat(post.date)}</PostDate>
              </PostAuthor>
              <PostViewImageWrap>
                <Image src={viewIcon} alt="" />
                <PostViews>{post.viewCounter}</PostViews>
              </PostViewImageWrap>
            </PostFooter>
          </Post>
        </Link>
      </PostWrapper>
    ));

  return (
    <>
      <PostAmount>Posts ({posts.length})</PostAmount>
      <Select value={option} onChange={(e) => handleBlogOptions(e)}>
        <Option value="mostRecentDefault">Most Recent</Option>
        <Option value="mostLiked">Most Liked</Option>
        <Option value="mostViewed">Most Viewed</Option>
      </Select>
      {mostRecentDefaultVisible && <BlogWrapper>{mostRecent}</BlogWrapper>}
      {mostLikedVisible && <BlogWrapper>{mostLikes}</BlogWrapper>}
      {mostViewedVisible && <BlogWrapper>{mostViewed}</BlogWrapper>}
    </>
  );
};

export default Blog;

const BlogWrapper = styled.section`
  --masonry-gap: 0.5rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 0 0.5rem;
`;

const PostAmount = styled.h4`
  width: 100%;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
`

const PostWrapper = styled.div`
  padding: 0.3rem;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
 
`;

const Post = styled.a`
  display: flex;
  flex-direction: column;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  border-radius: 0.15rem;
  cursor: pointer;
`;

const PostHeader = styled.div`
  text-align: center;
  position: relative;
`;

const PostNumber = styled.span`
  font-weight: 600;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.5rem;
  color: rgba(0, 0, 0, 0.2);
`;

const PostTitle = styled.p`
  font-weight: 700;
  width: 100%;
`;

const PostImageContainer = styled.div`
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  display: block;
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5rem;
`;

const PostViewImageWrap = styled.span`
  display: flex;
  align-items: center;
  width: 2rem;
  height: 1rem;
  max-width: 100%;
  gap: 0.2rem;
  color: rgba(0, 0, 0, 0.3);
`;

const PostViews = styled.span`
  font-weight: 600;
`;

const PostAuthor = styled.p`
  text-align: center;
  width: 100%;
  font-weight: 100;
`;

const PostDate = styled.span``;

const Select = styled.select`
  width: 10rem;
  text-align: center;
  margin: 1.5rem;
  font-weight: 700;
  border: 0.1rem solid rgb(0, 0, 0);
`;

const Option = styled.option``;
