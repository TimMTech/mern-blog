
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
            <StyledField
              
              component="textarea"
              type="text"
              name="content"
              value={commentValue.content}
              onChange={(e) => handleCommentChange(e)}
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


