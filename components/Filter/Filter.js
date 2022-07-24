import styled from "styled-components"


const Filter = ({value, handleBlogOptions}) => {
    
    return (
      <Select value={value} onChange={(e) => handleBlogOptions(e)}>
        <Option value="mostRecentDefault">Most Recent</Option>
        <Option value="mostLiked">Most Liked</Option>
        <Option value="mostViewed">Most Viewed</Option>
      </Select>
    );
}

export default Filter;

const Select = styled.select`
  width: 8rem;
  height: 1.5rem;
  text-align: center;

  border-radius: 0.2rem;
`;

const Option = styled.option``;