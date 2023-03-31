import "./Post.css";
import { useEffect, useState } from "react";
import { getComments } from "./get-comments-by-article";
import { Comment } from "./Comment";

export function Post(props) {
  const { post } = props;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [likeStr, setLikeStr] = useState("Лайкнуть");
  const [commentStr, setCommentStr] = useState("Показать комментарии");

  useEffect(() => {
    setLikes(post.currentLikes);
  }, []);

  useEffect(() => {
    getComments(post.articleId).then((fetchedData) => {
      setComments(fetchedData);
      console.log(fetchedData);
    });
  }, []);

  const changeLikes = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);
      setLikeStr("Убрать Лайк");
    }
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      setLikeStr("Лайкнуть");
    }
  };
  const showComments = () => {
    if (!isShowComments) {
      setIsShowComments(true);
      setCommentStr("Скрыть комментарии");
    } else {
      setIsShowComments(false);
      setCommentStr("Показать комментарии");
    }
  };

  return (
    <div className="item">
      <div>{post.title}</div>
      <div>{post.text}</div>
      <div>Лайки : {likes}</div>
      <button onClick={changeLikes}>{likeStr}</button>
      <div>{!isLiked || "Лайк поставлен"}</div>
      <div>Комментарии : {post.commentsCount}</div>
      <div className="commennts">
        {comments &&
          isShowComments &&
          comments.map((comment) => <Comment comment={comment}></Comment>)}
      </div>
      <button className="check_comments" onClick={showComments}>
        {commentStr}
      </button>
      <div>{!isLiked || "Лайк поставлен"}</div>
    </div>
  );
}
