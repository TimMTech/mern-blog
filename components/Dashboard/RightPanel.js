import styled from "styled-components";
import { useState } from "react";
import moment from "moment";

const RightPanel = ({ user, posts }) => {
  const filteredMyPosts = posts.filter((post) => post.user._id === user._id);
  
  const dateFormat = (date) => {
    return moment(date).format("lll");
  };

  return (
    <RightPanelWrapper>
      <Welcome>Welcome to your dashboard, {user.username}</Welcome>
      <ScrollBar>
        {filteredMyPosts.map((posts) => {
          const {
            title,
            date,
            _id,
            imageUrl,
            user: { username },
          } = posts;
          return (
            <MyPostsWrapper key={_id}>
              <Post>
                <PostTitle>{title}</PostTitle>
                <PostImageWrapper>
                  <PostImage src={imageUrl} />
                </PostImageWrapper>
                <PostAuthor>
                  By {username} / <PostDate>{dateFormat(date)}</PostDate>
                </PostAuthor>
              </Post>
            </MyPostsWrapper>
          );
        })}
      </ScrollBar>
    </RightPanelWrapper>
  );
};

export default RightPanel;

const RightPanelWrapper = styled.section`
  padding-top: 3rem;
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  width: 80%;
`;

const Welcome = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const Published = styled.p``;

const ScrollBar = styled.section`
  padding: 1.5rem;
  display: flex;
  overflow: scroll;
`;

const MyPostsWrapper = styled.div`
  padding: 1rem;
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
  width: 20rem;
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
