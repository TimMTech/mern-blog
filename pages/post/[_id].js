import styled from "styled-components";
import Post from "../../components/Post/Post";

const post = ({ post }) => {
  return (
    <PostContainer>
      <Post post={post} />
    </PostContainer>
  );
};

export default post;

export const getServerSideProps = async (context) => {
  const _id = context.params._id;
  const res = await fetch(`http://mern-blog-five.vercel.app/api/post/${_id}`);

  if (res.status !== 200) {
    throw String("ERROR");
  }

  const data = await res.json();

  return {
    props: { post: data },
  };
};

const PostContainer = styled.main``;
