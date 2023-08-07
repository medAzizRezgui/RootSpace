import AddPost from "./components/AddPost/AddPost.tsx";
import Post from "./components/Post/Post.tsx";
import AuthModal from "./features/user/AuthModal.tsx";
import { useAppDispatch } from "./app/hooks.ts";
import { openModal } from "./features/user/authModalSlice.ts";
import { useUser } from "./features/user/useUser.tsx";

function App() {
  const { userDetails } = useUser();

  console.log(userDetails);
  const dispatch = useAppDispatch();
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <Post />
      <button
        onClick={() => dispatch(openModal())}
        className={"rounded-md bg-green-800 p-4 font-medium text-white"}
      >
        Open Modal
      </button>
      <AuthModal />
    </div>
  );
}

export default App;
