import React from 'react'
import styles from "./Comment.module.scss";
import { useState } from "react";
import classnames from "classnames/bind";

const cn = classnames.bind(styles);

export function Comment({comment}) {

  const [likeStr, setLikeStr] = useState("Лайкнуть");
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(comment.text);
  const [editStr, setEditStr] = useState("Изменить комментарий");

  const changeLikes = () => {
    if (comment.isLiked) {
      comment.currentLikes -= 1;
      comment.isLiked = false;
      setLikeStr("Лайкнуть");
    } else {
      comment.currentLikes += 1;
      comment.isLiked = true;
      setLikeStr("Убрать Лайк");
    }
  
  };
  const changeEditText = () => {
    if (isEdit) {
      setIsEdit(false);
      setEditStr("Изменить комментарий");
    } else {
      setIsEdit(true);
      setEditStr("Отменить изменения");
    }
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    comment.text = text;
    setIsEdit(false);
    setEditStr("Изменить комментарий");
    event.preventDefault();
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment_name}>
        {comment.author} {comment.creationDate}
      </div>
      {!isEdit ? (
        comment.text
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
          <button className={styles.button} type="submit" onClick={onSubmit}>
            Сохранить изменения
          </button>
        </form>
      )}
      <div>Лайки : {comment.currentLikes} </div>
      <div>
        <button
          className={cn("item", [`has_like-${comment.isLiked}`])}
          onClick={changeLikes}
        >
          {likeStr}
        </button>
        <button onClick={changeEditText}>{editStr}</button>
      </div>
    </div>
  );
}