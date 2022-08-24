import styled from "styled-components";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Filter from "../Filter/Filter";


const Blog = ({ posts }) => {
  const [option, setOption] = useState("mostRecentDefault");
  const [mostLikedVisible, setMostLikedVisible] = useState(false);
  const [mostRecentDefaultVisible, setMostRecentDefaultVisible] =
    useState(false);
  const [mostViewedVisible, setMostViewedVisible] = useState(false);

  const filteredPosts = posts.filter((post) => post.published === true);

  const mostViewed = filteredPosts
    .sort((a, b) => a.viewCounter - b.viewCounter)
    .reverse()
    .map((post, index) => <Card key={post._id} post={post} index={index} />);

  const mostRecent = filteredPosts
    .sort((a, b) => a.date.localeCompare(b.date))
    .reverse()
    .map((post, index) => <Card key={post._id} post={post} index={index} />);

  const mostLikes = filteredPosts
    .sort((a, b) => a.likes.length - b.likes.length)
    .reverse()
    .map((post, index) => <Card key={post._id} post={post} index={index} />);

  const handleBlogOptions = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    option === "mostRecentDefault"
      ? setMostRecentDefaultVisible(true)
      : setMostRecentDefaultVisible(false);
    option === "mostLiked"
      ? setMostLikedVisible(true)
      : setMostLikedVisible(false);

    option === "mostViewed"
      ? setMostViewedVisible(true)
      : setMostViewedVisible(false);
  }, [option]);

  return (
    <>
      <OptionContainer>
        <Filter value={option} handleBlogOptions={handleBlogOptions} />
        
      </OptionContainer>
      <MasonryContainer>
        {mostRecentDefaultVisible && mostRecent}
        {mostLikedVisible && mostLikes}
        {mostViewedVisible && mostViewed}
      </MasonryContainer>
    </>
  );
};

export default Blog;

const MasonryContainer = styled.div`
  --masonry-gap: 1.2rem;
  --masonry-brick-width: 300px;
  column-gap: var(--masonry-gap);
  column-fill: initial;
  column-width: var(--masonry-brick-width);
  padding: 0 1rem 1rem 1rem;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
`;



