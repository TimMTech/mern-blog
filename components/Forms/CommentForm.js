import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranspileTemplateLiterals } from "babel-plugin-styled-components/lib/utils/options";

const CommentForm = ({ setPostComments }) => {
  const { query } = useRouter();

  const contentType = "application/json";
  const [commentValue, setCommentValue] = useState({
    user: "",
    content: "",
    postId: query._id,
  });


  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/comment/${query._id}`, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: JSON.stringify(commentValue),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        setPostComments((prevState) => [...prevState, data])
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormWrapper>
      <Form method="POST" onSubmit={handleCommentSubmit}>
        <Input
          placeholder="Username"
          type="text"
          name="user"
          value={commentValue.user}
          onChange={(e) => handleCommentChange(e)}
        />
        <TextArea
          placeholder="Comment"
          type="text"
          name="content"
          value={commentValue.content}
          onChange={(e) => handleCommentChange(e)}
        />
        <CommentButton>Comment</CommentButton>
      </Form>
    </FormWrapper>
  );
};

export default CommentForm;

const FormWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 50%;
  font-size: 1.5rem;
  height: 3rem;
  ::placeholder {
    font-size: 1.5rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  width: 100%;
  font-size: 1.5rem;
  height: 10rem;
  ::placeholder {
    font-size: 1.5rem;
  }
`;

const CommentButton = styled.button`
  width: 33%;
  background-color: rgb(255, 255, 255);
  color: rgb(52, 97, 235);
  height: 3rem;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  cursor: pointer;
`;
