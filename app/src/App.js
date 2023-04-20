import Post from "./components/Post/Post";
import { getArticles } from "./components/services/get-articles";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { actionFireLogger } from "./common/store/actions/middleware/logger";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./common/store/reducers/root-reducer";
import styles from "./App.module.scss";

const store = createStore(rootReducer, applyMiddleware(actionFireLogger));

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
