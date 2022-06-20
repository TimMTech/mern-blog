import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";

const PostForm = ({ editMode, postId, setEditMode }) => {
  const contentType = "application/json";
  const router = useRouter();
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
    if (editMode) {
      fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: JSON.stringify(post),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data && data.error) {
            console.log("FAILED EDIT");
          }
          if (data) {
            setEditMode(false);
            router.push(`/post/${data._id}`);
            console.log("POST EDITED");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
          if (data && data.error) {
            console.log("FAILED POST");
          }
          if (data && data.token) {
            router.push(`/post/${data.postData._id}`);
            console.log("Success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <FormWrapper>
        <Form method="POST" onSubmit={handleSubmitPost}>
          {editMode ? <EditTitle>Edit</EditTitle> : null}
          <FieldWrapper>
            <StyledLabel>Title</StyledLabel>
            <Input
              value={post.title}
              type="text"
              name="title"
              onChange={(e) => handlePostChange(e)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <StyledLabel>Content</StyledLabel>
            <TextArea
              value={post.content}
              type="text"
              name="content"
              onChange={(e) => handlePostChange(e)}
            />
          </FieldWrapper>
          <FieldWrapper>
            <StyledLabel>Image (Optional)</StyledLabel>
            <Input
              value={post.imageUrl}
              type="text"
              name="imageUrl"
              onChange={(e) => handlePostChange(e)}
            />
          </FieldWrapper>
          <CreatePost type="submit">
            {editMode ? "Save" : "Create Post"}
          </CreatePost>
        </Form>
      </FormWrapper>
    </>
  );
};

export default PostForm;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const StyledLabel = styled.label`
  width: 100%;
`;

const EditTitle = styled.p`
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  padding-top: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  height: 3rem;
  font-size: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 0.05rem solid rgb(0, 0, 0);
  height: 10rem;
  font-size: 1.5rem;
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
