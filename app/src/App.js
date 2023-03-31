import "./App.css";

import { Post } from "./components/Post";
import { getArticles } from "./components/get-articles";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getArticles().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  return (
    <>
      {data &&
        data.map((post) => <Post post={post} key={post.articleId}></Post>)}
    </>
  );
}

export default App;
