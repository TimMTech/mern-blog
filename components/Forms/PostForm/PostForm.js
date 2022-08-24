import { Editor } from "@tinymce/tinymce-react";
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
  ExitButton,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import { useSession } from "next-auth/react";
import {toast} from "react-toastify"

const PostForm = ({ postEditMode, postId, setPostEditMode }) => {
  const contentType = "application/json";
  const router = useRouter();
  const { data: session, status } = useSession();
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    userId: session.user._id
  });

  console.log(status)

  const validationSchema = Yup.object({
    title: Yup.string().required("*Required").min(1, "*Please Provide A Title"),
    content: Yup.string()
      .required("*Required")
      .min(1, "*Please Provide Content"),
    imageUrl: Yup.string(),
  });

  const handleExitEdit = () => {
    setPostEditMode(false);
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setPost((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const handleSubmitPost = () => {
    if (postEditMode) {
      fetch(`/api/post/${postId}/edit`, {
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
            toast.error("Server Error Occured.")

          }
          if (data) {
            router.push(`/post/${data._id}`);
            setPostEditMode(false);
            console.log("POST EDITED");
            toast.success("Post Edited! Redirecting....")
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
          console.log(data);
          if (data && data.error) {
            console.log("FAILED POST");
            toast.error("Server Error Occured.")
          }
          if (data && data.token) {
            router.push(`/post/${data.postData._id}`);
            console.log("Success");
            toast.success("Post Created! Redirecting....")
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
          {postEditMode ? (
            <EditTitle>Edit</EditTitle>
          ) : (
            <FormTitle>What is on your mind....</FormTitle>
          )}
          <FieldContainer postform="true">
            <StyledLabel>Title</StyledLabel>
            <StyledField
              value={post.title}
              type="text"
              name="title"
              onChange={(e) => handlePostChange(e)}
            />
            <ErrorMessage name="title" render={renderError} />
          </FieldContainer>
          <FieldContainer postform="true">
            <StyledLabel>Content</StyledLabel>
            <Editor
              name="content"
              id="FIXED_ID"
              apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
              value={post.content}
              init={{
                forced_root_block: "false",
                height: 500,
                width: "100%",
                menubar: false,
                plugins: "autoresize link lists emoticons image",
                max_height: 500,
                toolbar_location: "bottom",
                toolbar:
                  "bold italic strikethrough link numlist bullist blockquote emoticons image",
              }}
              onEditorChange={handleEditorChange}
            />
            <ErrorMessage name="content" render={renderError} />
          </FieldContainer>
          <FieldContainer postform="true">
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
              {postEditMode ? "Save" : "Create Post"}
            </SubmitButton>
            {postEditMode && (
              <ExitButton onClick={handleExitEdit}>Exit</ExitButton>
            )}
          </ButtonContainer>
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default PostForm;
