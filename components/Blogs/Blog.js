import styled from "styled-components";
import moment from "moment";
import Link from "next/link";

const Blog = ({ posts }) => {
  const dateFormat = (date) => {
    return moment(date).format("lll");
  };
  const filteredPosts = posts.filter((post) => post.published === true);

  const newPost = filteredPosts.map((post) => (
    <PostWrapper key={post._id}>
      <Link href={`/post/${post._id}`}>
        <Post>
          <PostTitle>{post.title}</PostTitle>
          <PostImageContainer>
            <PostImage
              src={
                post.imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
          </PostImageContainer>
          <PostAuthor>
            By {post.user.username} /{" "}
            <PostDate>{dateFormat(post.date)}</PostDate>
          </PostAuthor>
        </Post>
      </Link>
    </PostWrapper>
  ));

  return <BlogWrapper>{newPost}</BlogWrapper>;
};

export default Blog;

const BlogWrapper = styled.section`
--masonry-gap: 0.3rem;
--masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 0 1.5rem;
`;

const PostWrapper = styled.div`
  padding: 0.3rem;
  break-inside: avoid;
  margin-bottom: var(--masonry-gap);
`;

const Post = styled.a`
  display: flex;
  flex-direction: column;
  justify-self: start;
  align-items: center;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  border-radius: 0.15rem;
  cursor: pointer;
  transition: 200ms;
`;

const PostTitle = styled.p`
  font-weight: 500;
  font-size: 1.6vw;
  text-align: center;
`;

const PostImageContainer = styled.div`
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  display: block;
`;

const PostAuthor = styled.p`
  text-align: center;
  font-size: 1.5vw;
  font-weight: 100;
  padding: 0.5rem;
`;

const PostDate = styled.span``;
