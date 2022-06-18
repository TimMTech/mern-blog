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
          <PostImageWrapper>
            <PostImage
              src={
                post.imageUrl ||
                "https://blog.codeminer42.com/wp-content/uploads/2021/02/nextjs-cover.jpg"
              }
            />
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.8rem;
  padding: 2em;
`;

const PostWrapper = styled.div`
  width: 100%;
  
`;

const Post = styled.a`

  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  border-radius: 1rem;
  cursor: pointer;
  transition: 200ms;
  &: hover {
    transform: scale(1.1, 1.1);
  }
`;

const PostTitle = styled.p`
  font-weight: 500;
  font-size: 1.9vw;
  
`;

const PostImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostAuthor = styled.p`
  font-size: 1.5vw;
  font-weight: 100;
  padding: 0.5rem;
  
  
`;

const PostDate = styled.span``;
