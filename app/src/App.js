import { Provider } from "react-redux";
import { actionFireLogger } from "./common/store/actions/middleware/logger";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./common/store/reducers/root-reducer";
import { Routes, Route, Navigate } from "react-router-dom";
import Articles from "./components/Articles/Articles";
import Post from "./components/Post/Post";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";

const store = createStore(rootReducer, applyMiddleware(actionFireLogger));

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route>
          <Route index path="/" element={<HomePage />} />
          <Route path="/articles/:articleId" element={<Post />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/404" element={<Error404Page />} />
          <Route path="*" element={<Navigate to='404'/>} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
