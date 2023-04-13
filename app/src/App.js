//import "./App.css";
import styles from "./App.module.scss";
import { Post } from "./components/Post/Post";
import { getArticles } from "./components/services/get-articles";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [sortField, setSortField] = useState("creationDate");

  useEffect(() => {
    getArticles().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  const changeSortFieldLikes = () => {
    setSortField("currentLikes");
  };
  const changeSortFieldDate = () => {
    setSortField("creationDate");
  };

  function byFieldSort(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  return (
    <div className={styles.items}>
      <div>
        Сортировать по: <button onClick={changeSortFieldLikes}>Лайкам</button>{" "}
        <button onClick={changeSortFieldDate}>Дате</button>
      </div>
      {data &&
        data
          .sort(byFieldSort(sortField))
          .map((post) => <Post post={post} key={post.articleId}></Post>)}
    </div>
  );
}

export default App;
