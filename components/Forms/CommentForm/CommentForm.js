import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  FormContainer,
  FieldContainer,
  StyledForm,
  SubmitButton,
  ExitButton,
} from "../GlobalFormStyle";
import { renderError } from "../../Validations/FormError";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CommentForm = ({
  setCommentReply,
  replyMode,
  setReplyMode,
  commentId,
  setInfinite,
}) => {
  const { query } = useRouter();
  const { data: session } = useSession();
  const contentType = "application/json";
  const [commentValue, setCommentValue] = useState({
    user: session.user?.username,
    content: "",
    postId: query._id,
    commentId: commentId,
    userId: session.user?._id,
  });

  const validationSchema = Yup.object({
    content: Yup.string().required("*Required").min(1, "*Please Enter Comment"),
  });

  const handleEditorChange = (content) => {
    setCommentValue((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const handleReplyMode = () => {
    setReplyMode(false);
  };

  const handleCommentSubmit = () => {
    if (replyMode) {
      fetch(`/api/comment/${commentId}`, {
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
          console.log(data)
          const mostRecent = data.slice(-1)[0];

          setCommentReply((prevState) => [...prevState, mostRecent]);
          setCommentValue({
            content: "",
            postId: query._id,
            commentId: commentId,
            userId: session.user?._id
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
          setInfinite((prevState) => [...prevState, data]);
          setCommentValue({
            content: "",
            postId: query._id,
            commentId: commentId,
            userId: session.user?._id
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
            {replyMode && (
              <Editor
                id="POST_COMMENT"
                name="content"
                apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
                value={commentValue.content}
                init={{
                  height: 500,
                  width: "100%",
                  menubar: false,
                  plugins: "autoresize link emoticons preview",
                  paste_as_text: true,
                  max_height: 500,
                  toolbar_location: "top",
                  toolbar: "emoticons preview",
                }}
                onEditorChange={handleEditorChange}
              />
            )}

            {!replyMode && (
              <Editor
                id="COMMENT_MODE"
                name="content"
                apiKey={process.env.NEXT_PUBLIC_TINYMCU_API_KEY}
                value={commentValue.content}
                init={{
                  height: 500,
                  width: "100%",
                  menubar: false,
                  plugins: "autoresize link emoticons preview",
                  paste_as_text: true,
                  max_height: 500,
                  toolbar_location: "top",
                  toolbar: "emoticons preview",
                }}
                onEditorChange={handleEditorChange}
              />
            )}
            <ErrorMessage name="content" render={renderError} />
          </FieldContainer>

          <SubmitButton type="submit" commentform="true">
            {replyMode ? "Reply" : "Comment"}
          </SubmitButton>
          {replyMode && (
            <ExitButton commentform="true" onClick={handleReplyMode}>
              Close
            </ExitButton>
          )}
        </StyledForm>
      </FormContainer>
    </Formik>
  );
};

export default CommentForm;
