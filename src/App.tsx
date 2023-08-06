import AddPost from "./components/AddPost/AddPost.tsx";
import Post from "./components/Post/Post.tsx";

function App() {
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <Post />
    </div>
  );
}

export default App;
