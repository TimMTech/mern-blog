import styled from "styled-components";
import CommentForm from "../Forms/CommentForm/CommentForm";
import Replies from "../Replies/Replies";
import moment from "moment";
import { useRef, useEffect } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../InfiniteScroll/Loader/Loader";
import End from "../InfiniteScroll/End/End";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import ToastReplyInfo from "../CustomToasts/ToastReplyInfo";

const Comment = ({ post }) => {
  const [commentId, setCommentId] = useState("");
  const [replyMode, setReplyMode] = useState(false);
  const [viewReplies, setViewReplies] = useState(false);
  const [commentReply, setCommentReply] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [infinite, setInfinite] = useState([]);
  const [lastObjectPosition, setLastObjectPosition] = useState(0);

  const { data: session } = useSession();

  const ref = useRef(null);

  const fetchInfiniteData = () => {
    const limit = 3;
    setInfinite((prevState) => [
      ...prevState,
      ...postComments.slice(lastObjectPosition, lastObjectPosition + limit),
    ]);
    setLastObjectPosition((prevState) => prevState + limit);
  };

  const dateFormat = (date) => {
    return moment(date).fromNow()
  };

  const toggleScrollUp = (ref) => {
    ref.current.scrollIntoView();
  };

  const handleViewRepliesClose = (_id) => {
    setViewReplies(false);
  };

  const handleViewReplies = (_id) => {
    setCommentId(_id);
    
    fetch(`/api/comment/${_id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setViewReplies(true);
        setCommentReply(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReply = (_id) => {
    if (!session) toast.info(ToastReplyInfo);
    setCommentId(_id);
    setReplyMode(!replyMode);
  };

  const handleDeleteComment = (_id) => {
    fetch(`/api/comment/${_id}/delete`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Comment deleted!");
        const filteredInfinite = infinite.filter(
          (comment) => comment._id !== _id
        );
        setInfinite(filteredInfinite);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getComments = () => {
      fetch(`/api/comment`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const filtered = data
            .filter((comment) => comment.postId === post._id)
            .map((filtered) => filtered);
          setPostComments(filtered);
        })

        .catch((error) => {
          setHasMore(false);
          console.log(error);
        });
    };
    getComments();
  }, []);

  return (
    <CommentContainer>
      <OptionContainer>
        <CommentAmount ref={ref}>
          {postComments.length}{" "}
          {postComments.length === 1 ? "Comment" : "Comments"}
        </CommentAmount>
      </OptionContainer>
      {session && <CommentForm setInfinite={setInfinite} />}

      <ScrollContainer>
        <InfiniteScroll
          dataLength={infinite.length}
          next={fetchInfiniteData}
          hasMore={lastObjectPosition < postComments.length}
          loader={<Loader />}
          endMessage={
            <End
              toggleScrollUp={() => toggleScrollUp(ref)}
              infinite={infinite}
            />
          }
        >
          {infinite
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((comments) => {
              const { _id, user, userId, content, date, commentReplies } =
                comments;
              return (
                <CommentWrapper key={_id}>
                  <CommentUser>
                    {user} / <CommentDate>{dateFormat(date)}</CommentDate>
                  </CommentUser>
                  <CommentContent>{ReactHtmlParser(content)}</CommentContent>

                  <RepliesContainer>
                    <ReplyLikeContainer>
                      <ReplyButton onClick={() => handleReply(_id)}>
                        Reply
                      </ReplyButton>
                      {session && (
                        <>
                          {userId === session.user._id && (
                            <DeleteButton
                              onClick={() => handleDeleteComment(_id)}
                            >
                              Delete
                            </DeleteButton>
                          )}
                        </>
                      )}
                    </ReplyLikeContainer>
                    {replyMode && session && (
                      <>
                        {commentId === _id && (
                          <>
                            <CommentForm
                              replyMode={replyMode}
                              commentId={commentId}
                              setCommentReply={setCommentReply}
                              setReplyMode={setReplyMode}
                            />
                          </>
                        )}
                      </>
                    )}
                    <>
                      <>
                        {commentId === _id && viewReplies ? (
                          <ViewButton
                            onClick={() => handleViewRepliesClose(_id)}
                          >
                            <MdOutlineArrowDropUp
                              size={28}
                              style={{ color: "rgb(62,166,255)" }}
                            />
                            {commentReplies.length} REPLIES
                          </ViewButton>
                        ) : (
                          <ViewButton onClick={() => handleViewReplies(_id)}>
                            <MdOutlineArrowDropDown
                              size={28}
                              style={{ color: "rgb(62,166,255)" }}
                            />
                            {commentReplies.length} REPLIES
                          </ViewButton>
                        )}
                      </>
                    </>
                    <>
                      {viewReplies && (
                        <Replies
                          _id={_id}
                          commentReply={commentReply}
                          setCommentReply={setCommentReply}
                        />
                      )}
                    </>
                  </RepliesContainer>
                </CommentWrapper>
              );
            })}
        </InfiniteScroll>
      </ScrollContainer>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.section`
  width: 100%;
`;

const CommentAmount = styled.h4`
  width: 100%;
  font-size: 1.5rem;
`;

const ScrollContainer = styled.div``;

const CommentWrapper = styled.div`
  margin: 1rem 0;
  position: relative;
`;

const CommentUser = styled.h4`
  padding-bottom: 0.5rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  opacity: 0.5;
`;

const CommentContent = styled.div``;

const RepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReplyLikeContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem 0;
  gap: 0.5rem;
  width: 100%;
`;

const ReplyButton = styled.button`
  padding: 0;
  opacity: 0.5;
  border: none;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const DeleteButton = styled.button`
  padding: 0;
  opacity: 0.5;
  border: none;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const ViewButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.body};
  color: rgb(62, 166, 255);
  font-size: 0.8rem;
  margin-left: -0.5rem;
  border: none;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  border-bottom: ${(props) => props.theme.borderColor};
  padding: 1rem 0;
`;

const NoComments = styled.h3`
  width: 100%;
  text-align: center;
  padding: 1rem;
`;
