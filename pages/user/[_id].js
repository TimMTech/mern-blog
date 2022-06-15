import styled from "styled-components";

import RightPanel from "../../components/Dashboard/MainDash";

const dashboard = ({ user, posts }) => {
  const { data } = user;
  
  
  return (
    <DashBoardWrapper>
    <Dashboard>
      <RightPanel user={data} posts={posts}/>
    </Dashboard>
    </DashBoardWrapper>
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

  const resPost = await fetch(`http://localhost:3000/api/post`)
  const postData = await resPost.json()

  return {
    props: { user: data, posts: postData  },
  };
};

const DashBoardWrapper = styled.main`
  padding-top:7.5rem;
  
`


const Dashboard = styled.div`
  display: flex;
  
  
`;


