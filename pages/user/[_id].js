import {  getSession } from "next-auth/react";
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

export const getServerSideProps = async (context) => {
  const _id = context.params._id;
  const res = await fetch(`https://www.etechblog.io/api/user/${_id}`);
  if (res.status !==200) {
    throw String(`Error, ${res.status}, ${res.statusText}`);
  }
  const data = await res.json();

  const resPost = await fetch(`https://www.etechblog.io/api/post`);
  if (resPost.status !== 200) {
    throw String(`Error, ${res.status}, ${res.statusText}`);
  }
  const postData = await resPost.json();

  const session = await getSession(context);

  
  if (session) {
    return {
      props: { user: data, posts: postData },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
};

const DashboardContainer = styled.main`
  padding-top: 4rem;
  width: 100%;
`;
