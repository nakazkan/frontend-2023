import styles from "./Comment.module.scss";

export function Comment(props) {
  const { comment } = props;

  return (
    <div className={styles.comment}>
      <div className={styles.comment_name}>{comment.author}</div>
      <div>{comment.text}</div>
    </div>
  );
}
