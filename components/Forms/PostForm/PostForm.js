
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  FormContainer,
  FieldContainer,
  StyledLabel,
  StyledField,
  StyledForm,
  FormTitle,
  EditTitle,
  SubmitButton,
  ButtonContainer,
  ExitButton
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";

const PostForm = ({ editMode, postId, setEditMode }) => {
  const contentType = "application/json";
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("*Required").min(1, "*Please Provide A Title"),
    content: Yup.string()
      .required("*Required")
      .min(1, "*Please Provide Content"),
    imageUrl: Yup.string(),
  });

  const handleExitEdit = () => {
    setEditMode(false)
  }

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitPost = () => {
  
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
    <Formik
      initialValues={post}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmitPost}
    >
      <FormContainer>
        <StyledForm method="POST">
          {editMode ? (
            <EditTitle>Edit</EditTitle>
          ) : (
            <FormTitle>What is on your mind....</FormTitle>
          )}
          <FieldContainer>
            <StyledLabel>Title</StyledLabel>
            <StyledField
              value={post.title}
              type="text"
              name="title"
              onChange={(e) => handlePostChange(e)}
            />
            <ErrorMessage name="title" render={renderError} />
          </FieldContainer>
          <FieldContainer>
            <StyledLabel>Content</StyledLabel>
            <StyledField
              component="textarea"
              value={post.content}
              type="text"
              name="content"
              onChange={(e) => handlePostChange(e)}
            />
            <ErrorMessage name="content" render={renderError} />
          </FieldContainer>
          <FieldContainer>
            <StyledLabel>Image (Optional)</StyledLabel>
            <StyledField
              value={post.imageUrl}
              type="text"
              name="imageUrl"
              onChange={(e) => handlePostChange(e)}
            />
            <ErrorMessage name="imageUrl" render={renderError} />
          </FieldContainer>
          <ButtonContainer>
            <SubmitButton type="submit">
              {editMode ? "Save" : "Create Post"}
            </SubmitButton>
            {editMode && <ExitButton onClick={handleExitEdit}>Exit</ExitButton>}
          </ButtonContainer>
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default PostForm;



