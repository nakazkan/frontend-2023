import { useEffect, useState } from "react";
import { getComments } from "../services/get-comments-by-article";
import { Comment } from "../Comment/Comment";
import classnames from 'classnames/bind'
import styles from "./Post.module.scss";

const cn = classnames.bind(styles)

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
  }, [post]);

  useEffect(() => {
    getComments(post.articleId).then((fetchedData) => {
      setComments(fetchedData);
    });
  }, [post]);

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
    <div className={styles.item}>
      <div>{post.title}</div>
      <div>{post.text}</div>
      <div>Лайки : {likes}</div>
      <button className={cn('item', [`has_like-${isLiked}`])} onClick={changeLikes}>{likeStr}</button>
      <div>{!isLiked || "Лайк поставлен"}</div>
      <div>Комментарии : {post.commentsCount}</div>
      <div>
        {comments &&
          isShowComments &&
          comments.map((comment, id) => (
            <Comment comment={comment} key={id}></Comment>
          ))}
      </div>
      <button onClick={showComments}>{commentStr}</button>
    </div>
  );
}
