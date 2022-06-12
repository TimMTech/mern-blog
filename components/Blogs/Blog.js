import styled from "styled-components";
import moment from "moment";
import Link from "next/link";


const Blog = ({ posts }) => {
  const dateFormat = (date) => {
    return moment(date).format("lll");
  };
  const newPost = posts.map((post) => (
    <PostWrapper key={post._id}>
      <Link href={`/post/${post._id}`}>
        <Post>
          <PostTitle>{post.title}</PostTitle>
          <PostImageWrapper>
            <PostImage src={post.imageUrl} />
          </PostImageWrapper>
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
  display: flex;
  flex-wrap: wrap;
  width: 100% !important;
  padding-left: 1rem;
`;
const PostWrapper = styled.div`
  padding: 1rem;
  width: 33%;
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
  width: 100%;
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
