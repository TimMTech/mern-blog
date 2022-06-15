import styled from "styled-components";
import { useState } from "react";

const PostForm = () => {
  const contentType = "application/json";

  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data && data.error) {
          console.log("FAILED POST");
          
        }
        if (data && data.token) {
          console.log("Success");
          
        }
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  return (
    <FormWrapper>
      <Form method="POST">
        <Input
          value={post.title}
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => handlePostChange(e)}
        />
        <TextArea
          value={post.content}
          type="text"
          name="content"
          placeholder="Content"
          onChange={(e) => handlePostChange(e)}
        />
        <Input
          value={post.imageUrl}
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={(e) => handlePostChange(e)}
        />
        <CreatePost type="button" onClick={handleSubmitPost}>
          Create Post
        </CreatePost>
      </Form>
    </FormWrapper>
  );
};

export default PostForm;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1rem rgba(39, 37, 37, 1);
  width: 50%;
  height: 40em;
  gap: 3rem;
`;

const Input = styled.input`
  width: 75%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.5rem;
  height: 3rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
    display: flex;
    font-family: "Prompt", sans-serif;
    font-weight: 200;
  }
`;

const TextArea = styled.textarea`
  width: 75%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  border-radius: 0.5rem;
  height: 10rem;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
    display: flex;
    font-family: "Prompt", sans-serif;
    font-weight: 200;
  }
`;

const CreatePost = styled.button`
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
