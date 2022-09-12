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
  const res = await fetch(`https:/mern-blog-jet.vercel.app/api/user/${_id}`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 200) {
    throw String(
      `Invalid Server Response, ${res.status}, ${res.statusText} `
    );
  };
  const data = await res.json();

  const resPost = await fetch(`https://mern-blog-jet.vercel.app/api/post`, {
    method: "GET",
    headers: {
      // update with your user-agent
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
  });
  if (resPost.status !== 200) {
    throw String(`Invalid Server Response, ${resPost.status}, ${resPost.statusText} `)
  };
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
