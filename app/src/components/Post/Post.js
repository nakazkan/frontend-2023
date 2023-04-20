import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getComments } from "../services/get-comments-by-article";
import { Comment } from "../Comment/Comment";
import EditForm from "../EditForm/EditForm";

import classnames from "classnames/bind";
import styles from "./Post.module.scss";

const cn = classnames.bind(styles);

const mapStateToProps = (state) => ({
  theme: state.themeReducer.theme,
  data: state.dataReducer.data,
});

export function Post({ post, theme, data, changeData, changeTheme }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [likeStr, setLikeStr] = useState("Лайкнуть");
  const [commentStr, setCommentStr] = useState("Показать комментарии");
  const [sortField, setSortField] = useState("creationDate");

  useEffect(() => {
    setLikes(post.currentLikes);
  }, [post]);

  useEffect(() => {
    getComments(post.articleId).then((fetchedData) => {
      setComments(fetchedData);
    });
  }, [post]);

  const changeLikes = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      setLikeStr("Лайкнуть");
    } else {
      setIsLiked(true);
      setLikes(likes + 1);
      setLikeStr("Убрать Лайк");
    }
  };

  const changeSortFieldLikes = () => {
    setSortField("currentLikes");
  };
  const changeSortFieldDate = () => {
    setSortField("creationDate");
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

  function byFieldSort(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  return (
    <div className={cn('item', [`item-${theme}`])}>
      <div className={styles.creation_date}>{post.creationDate}</div>
      <EditForm post={post} fieldName={"заголовок"}></EditForm>
      <EditForm post={post} fieldName={"текст"}></EditForm>
      <div>Лайки : {likes}</div>
      <button
        className={cn("item", [`has_like-${isLiked}`])}
        onClick={changeLikes}
      >
        {likeStr}
      </button>
      <div>Комментарии : {post.commentsCount}</div>
      <div>
        {comments &&
          isShowComments &&
          comments
            .sort(byFieldSort(sortField))
            .map((comment, id) => (
              <Comment comment={comment} key={id}></Comment>
            ))}
      </div>
      <div>
        {comments && isShowComments && (
          <div>
            Сортировать по:
            <button onClick={changeSortFieldLikes}>Лайкам</button>
            <button onClick={changeSortFieldDate}>Дате</button>
          </div>
        )}
      </div>
      <button onClick={showComments}>{commentStr}</button>
    </div>
  );
}

export default connect(mapStateToProps)(Post);
