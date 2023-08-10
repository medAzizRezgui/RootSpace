import { AddPost } from "../../components/pages/Home/AddPost";
import { SinglePost } from "../../components/pages/Home/SinglePost";
import AuthModal from "../../features/user/AuthModal.tsx";
import { useAppDispatch } from "../../app/hooks.ts";
import { openModal } from "../../features/user/authModalSlice.ts";

function Home() {
  const dispatch = useAppDispatch();
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <SinglePost />
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

export default Home;
