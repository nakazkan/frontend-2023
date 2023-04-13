import { useEffect, useState } from "react";
import { getComments } from "../services/get-comments-by-article";
import { Comment } from "../Comment/Comment";
import classnames from "classnames/bind";
import styles from "./Post.module.scss";

const cn = classnames.bind(styles);

export function Post(props) {
  const { post } = props;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [likeStr, setLikeStr] = useState("Лайкнуть");
  const [commentStr, setCommentStr] = useState("Показать комментарии");
  const [sortField, setSortField] = useState("creationDate");
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [isEditText, setIsEditText] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [editTextStr, setEditTextStr] = useState("Изменить текст");
  const [editTitleStr, setEditTitleStr] = useState("Изменить заголовок");

  const onSubmitText = (event) => {
    post.text = text;
    setIsEditText(false);
    setEditTextStr("Изменить текст");
    event.preventDefault();
  };
  const onSubmitTitle = (event) => {  
    post.title = title;
    setIsEditTitle(false);
    setEditTitleStr("Изменить комментарий");
    event.preventDefault();
  };

  const changeEditText = () => {
    if (isEditText) {
      setIsEditText(false);
      setEditTextStr("Изменить текст");
    } else {
      setIsEditText(true);
      setEditTextStr("Отменить изменения");
    }
  };
  const changeEditTitle = () => {
    if (isEditTitle) {
      setIsEditTitle(false);
      setEditTitleStr("Изменить текст");
    } else {
      setIsEditTitle(true);
      setEditTitleStr("Отменить изменения");
    }
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

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
    <div className={styles.item}>
      <div className={styles.creation_date}>{post.creationDate}</div>
      
      <div className={styles.edit}>
        {!isEditTitle ? (
          <div>{post.title}</div>
        ) : (
          <form>
            <div className={styles.comment_edit}>
              <input
                className={styles.comment_edit}
                value={title}
                placeholder="Текст"
                onChange={handleChangeTitle}
              ></input>
            </div>
            <button
              type="submit"
              onClick={onSubmitTitle}
            >
              Сохранить изменения
            </button>
          </form>
        )}
        <button className={styles.edit_button} onClick={changeEditTitle}>{editTitleStr}</button>
      </div>

      <div className={styles.edit}>
        {!isEditText ? (
          <div>{post.text}</div>
        ) : (
          <form>
            <div className={styles.comment_edit}>
              <input
                className={styles.comment_edit}
                value={text}
                placeholder="Текст"
                onChange={handleChangeText}
              ></input>
            </div>
            <button
              
              type="submit"
              onClick={onSubmitText}
            >
              Сохранить изменения
            </button>
          </form>
        )}
        <button className={styles.edit_button} onClick={changeEditText}>{editTextStr}</button>
      </div>


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
            Сортировать по:{" "}
            <button onClick={changeSortFieldLikes}>Лайкам</button>{" "}
            <button onClick={changeSortFieldDate}>Дате</button>
          </div>
        )}
      </div>
      <button onClick={showComments}>{commentStr}</button>
    </div>
  );
}
