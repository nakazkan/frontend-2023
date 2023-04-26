import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./Article.module.scss";

const cn = classnames.bind(styles);

const mapStateToProps = (state) => ({
  theme: state.themeReducer.theme,
  data: state.dataReducer.data,
});

export function Article({ post, theme, data, changeData, changeTheme }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeStr, setLikeStr] = useState("Лайкнуть");

  useEffect(() => {
    setLikes(post.currentLikes);
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

  return (
    <div className={cn("item", [`item-${theme}`])}>
      <div className={styles.creation_date}>{post.creationDate}</div>
      <div>{post.title}</div>
      <div>
        {post.text.length < 100 ? post.text : post.text.substr(0, 100) + "..."}
      </div>
      <div>Лайки : {likes}</div>
      <button
        className={cn("item", [`has_like-${isLiked}`])}
        onClick={changeLikes}
      >
        {likeStr}
      </button>
      <div>Комментарии : {post.commentsCount}</div>
      <Link
        className={styles.link}
        to={`${post.articleId}`}
        key={post.articleId}
      >
        Перейти к содержанию
      </Link>
    </div>
  );
}

export default connect(mapStateToProps)(Article);
