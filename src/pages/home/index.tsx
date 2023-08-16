import { AddPost } from "../../components/pages/Home/AddPost";

import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";

function Home() {
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <div className={"w-full max-w-[800px] mx-auto"}>
        <AddPost />
        <Posts />
      </div>
    </div>
  );
}

export default Home;
