import { AddPost } from "../../components/pages/Home/AddPost";

import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";

function Home() {
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <Posts />
    </div>
  );
}

export default Home;
