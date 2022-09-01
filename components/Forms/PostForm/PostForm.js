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
  EditTitle,
  SubmitButton,
  ButtonContainer,
  ExitButton,
  DropDownButton,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const PostForm = ({ postEditMode, postId, setPostEditMode }) => {
  const contentType = "application/json";
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    twitterLink: "",
    facebookLink: "",
    instagramLink: "",
    userId: session.user._id,
  });
  const [socialLinkDropDown, setSocialLinkDropDown] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("*Required").min(1, "*Please Provide A Title"),
    content: Yup.string()
      .required("*Required")
      .min(1, "*Please Provide Content"),
    imageUrl: Yup.string(),
    twitterLink: Yup.string(),
    facebookLink: Yup.string(),
    instagramLink: Yup.string()
  });

  const handleSocialLinkDropDown = () => {
    setSocialLinkDropDown(!socialLinkDropDown)
  }

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
            toast.error("Server Error Occured.");
          }
          if (data) {
            router.push(`/post/${data._id}`);
            setPostEditMode(false);
            console.log("POST EDITED");
            toast.success("Post Edited! Redirecting....");
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
            toast.error("Server Error Occured.");
          }
          if (data && data.token) {
            router.push(`/post/${data.postData._id}`);
            console.log("Success");
            toast.success("Post Created! Redirecting....");
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
      validateOnBlur={false}
      validateOnChange={false}
    >
      <FormContainer>
        <StyledForm method="POST">
          {postEditMode && <EditTitle>Edit</EditTitle>}
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
                height: 400,
                width: "100%",
                resize: true,
                menubar: false,
                plugins: "autoresize link lists emoticons image preview",
                paste_as_text: true,
                min_height: 400,
                toolbar_location: "top",
                toolbar:
                  "bold italic strikethrough link numlist bullist blockquote emoticons image preview outdent indent",
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

          {socialLinkDropDown && (
            <>
              <FieldContainer postform="true">
                <StyledLabel>Twitter</StyledLabel>
                <StyledField
                  value={post.twitterLink}
                  type="text"
                  name="twitterLink"
                  onChange={(e) => handlePostChange(e)}
                />
              </FieldContainer>
              <FieldContainer postform="true">
                <StyledLabel>Facebook</StyledLabel>
                <StyledField
                  value={post.facebookLink}
                  type="text"
                  name="facebookLink"
                  onChange={(e) => handlePostChange(e)}
                />
              </FieldContainer>
              <FieldContainer postform="true">
                <StyledLabel>Instagram</StyledLabel>
                <StyledField
                  value={post.instagramLink}
                  type="text"
                  name="instagramLink"
                  onChange={(e) => handlePostChange(e)}
                />
              </FieldContainer>
            </>
          )}

          <ButtonContainer>
            <DropDownButton type="button" onClick={handleSocialLinkDropDown}>
              {socialLinkDropDown ? "Hide" : "Add Social Media Links"}
            </DropDownButton>
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
