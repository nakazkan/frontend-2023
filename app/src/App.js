import "./App.css";
import data from "./assets/mock-data.json";
import { Post } from "./components/Post";

function App() {
  let array = data;
 // console.log(data);

  return <Post item={array[1]}></Post>;
}

export default App;
