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

export const getStaticPaths = async () => {
  const res = await fetch("https://mern-blog-jet.vercel.app/api/post", {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 200) {
    return res.status(400).json({ message: "INVALID SERVER RESPONSE" });
  }
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: { _id: post._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const _id = context.params._id;

  const res = await fetch(`https://mern-blog-jet.vercel.app/api/post/${_id}`);
  const data = await res.json();

  return {
    props: { post: data },
  };
};

const PostContainer = styled.main``;
