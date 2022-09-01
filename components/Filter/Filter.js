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
  height: 2rem;
  text-align: center;
  border-radius: 0.2rem;
  border: 0.15rem solid rgb(0,0,0);
  margin: 1rem;
  
  @media (max-width: 750px) {
    width: 100%;
    margin: 1rem;
    font-size: 1.2rem;
  }
`;

const Option = styled.option`
  
`;