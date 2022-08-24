import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  FormContainer,
  FieldContainer,
  StyledField,
  StyledForm,
  SubmitButton,
  ExitButton,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import { toast } from "react-toastify";

const CommentForm = ({
  setCommentReply,
  replyMode,
  replyToComment,
  setReplyMode,
  setReplyToComment,
  commentId,
  setInfinite,
  
}) => {
  const { query } = useRouter();

  const contentType = "application/json";
  const [commentValue, setCommentValue] = useState({
    user: "",
    content: "",
    postId: query._id,
    commentId: commentId,
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

  const handleReplyMode = () => {
    setReplyMode(false);
  };

  const handleReplyToComment = () => {
    setReplyToComment(false);
  }



  const handleCommentSubmit = () => {
    if (replyMode || replyToComment) {
      fetch(`/api/comment/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: JSON.stringify(commentValue),
      })
        .then((response) => {
          console.log(response)
          return response.json();
        })
        .then((data) => {
         
          const mostRecent = data.slice(-1)[0];
          setCommentReply((prevState) => [...prevState, mostRecent]);
          setCommentValue({
            user: "",
            content: "",
            postId: query._id,
            commentId: commentId,
          });
          toast.success("Comment Reply Successful");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server Error Occured.");
        });
    } else {
      fetch("/api/comment", {
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
          
          setInfinite((prevState) => [...prevState, data])
          setCommentValue({
            user: "",
            content: "",
            postId: query._id,
          });
          toast.success("Comment Successful");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Server Error Occured");
        });
    }
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
            <StyledField
              placeholder="Username"
              type="text"
              name="user"
              value={commentValue.user}
              onChange={(e) => handleCommentChange(e)}
            />
            <ErrorMessage name="user" render={renderError} />
          </FieldContainer>
          <FieldContainer commentform="true">
            {replyMode && (
              <Editor
                id="POST_COMMENT"
                name="content"
                apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
                value={commentValue.content}
                init={{
                  forced_root_block: "false",
                  height: 500,
                  width: "100%",
                  menubar: false,
                  plugins: "autoresize emoticons",
                  max_height: 500,
                  toolbar_location: "bottom",
                  toolbar: "emoticons",
                }}
                onEditorChange={handleEditorChange}
              />
            )}
            {replyToComment && (
              <Editor
                id="COMMENT_REPLY"
                name="content"
                apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
                value={commentValue.content}
                init={{
                  forced_root_block: "false",
                  height: 500,
                  width: "100%",
                  menubar: false,
                  plugins: "autoresize emoticons",
                  max_height: 500,
                  toolbar_location: "bottom",
                  toolbar: "emoticons",
                }}
                onEditorChange={handleEditorChange}
              />
            )}
            {!replyMode && !replyToComment && 
            (
            <Editor
              id="COMMENT_MODE"
              name="content"
              apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
              value={commentValue.content}
              init={{
                forced_root_block: "false",
                height: 500,
                width: "100%",
                menubar: false,
                statusbar: false,
                plugins: "autoresize link lists emoticons image",
                max_height: 500,
                toolbar_location: "bottom",
                toolbar:
                  "bold italic strikethrough link numlist bullist blockquote emoticons image",
              }}
              onEditorChange={handleEditorChange}
            />
            )}
            <ErrorMessage name="content" render={renderError} />
          </FieldContainer>

          <SubmitButton type="submit" commentform="true">
            {replyMode || replyToComment ? "Reply" : "Comment"}
          </SubmitButton>
          {replyMode && (
            <ExitButton commentform="true" onClick={handleReplyMode}>
              Close
            </ExitButton>
          )}
          {replyToComment && (
            <ExitButton
              commentform="true"
              onClick={handleReplyToComment}
            >Close</ExitButton>
          )}
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default CommentForm;
