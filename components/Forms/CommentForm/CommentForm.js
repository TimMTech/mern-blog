import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

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
        setPostComments((prevState) => [...prevState, data]);
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
        <CommentButton type="submit">Comment</CommentButton>
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
  font-family: "Prompt", sans-serif;
  font-weight: 900;
  font-size: 1.5em;
  border: 0.05rem solid rgb(0, 0, 0);
  padding-left: 2rem;
  padding-right: 2rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(33, 37, 41);
  border-radius: 0.25rem;
`;
