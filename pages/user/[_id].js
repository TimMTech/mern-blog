import styled from "styled-components";
import DashBoard from "../../components/Dashboard/Dashboard";


const dashboard = ({ user, posts }) => {
  const { data } = user;
  

  return (
    <DashboardContainer>
      <DashBoard user={data} posts={posts} />
    </DashboardContainer>
  );
};

export default dashboard;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();

  const paths = data.map((user) => {
    return {
      params: { _id: user._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const _id = context.params._id;
  const res = await fetch(`http://localhost:3000/api/user/${_id}`);
  const data = await res.json();

  const resPost = await fetch(`http://localhost:3000/api/post`);
  const postData = await resPost.json();

  return {
    props: { user: data, posts: postData },
  };
};

const DashboardContainer = styled.main`
  padding-top: 4rem;
  width: 100%;
`;
