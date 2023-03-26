import "./Post.css";
import { useEffect, useState } from "react";

export function Post(props) {
  const { item } = props;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeStr, setLikeStr] = useState("Лайкнуть");
  useEffect(() => {
    setLikes(item.currentLikes);
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

  return (
    <div className="item">
      <div className="items">{item.title}</div>
      <div className="items">{item.text}</div>
      <div className="items">Лайки : {likes}</div>
      <button className="items" onClick={changeLikes}>
        {likeStr}
      </button>
      <div>{!isLiked || "Лайк поставлен"}</div>
    </div>
  );
}
