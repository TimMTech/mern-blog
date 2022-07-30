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
  SubmitButton
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";

const CommentForm = ({ setPostComments }) => {
  const { query } = useRouter();

  const contentType = "application/json";
  const [commentValue, setCommentValue] = useState({
    user: "",
    content: "",
    postId: query._id,
  });


  const validationSchema = Yup.object({
    user: Yup.string()
      .required("*Required")
      .min(1, "*Please Provide A Username"),
    content: Yup.string().required("*Required").min(1, "*Please Enter Comment"),
  });

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setCommentValue((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const handleCommentSubmit = () => {
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
        setCommentValue({
          user: "",
          content: "",
          postId: query._id,
        });
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={commentValue}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleCommentSubmit}
    >
      <FormContainer>
        <StyledForm method="POST" commentform="true">
          <FieldContainer commentform="true">
            <StyledLabel>Username</StyledLabel>
            <StyledField
              type="text"
              name="user"
              value={commentValue.user}
              onChange={(e) => handleCommentChange(e)}
            />
            <ErrorMessage name="user" render={renderError} />
          </FieldContainer>
          <FieldContainer commentform="true">
            <StyledLabel>Content</StyledLabel>
            <Editor
              name="content"
              id="FIXED_ID"
              apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
              value={commentValue.content}
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
          <SubmitButton type="submit">Comment</SubmitButton>
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default CommentForm;


