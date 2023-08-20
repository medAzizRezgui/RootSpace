import { AddPost } from "../../components/pages/Home/AddPost";

import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";

function Home() {
  return (
    <div
      className={
        "flex h-full items-start justify-between bg-bgDark p-24 font-display"
      }
    >
      <div className={"mx-auto w-full max-w-[800px]"}>
        <AddPost />
        <Posts />
      </div>
    </div>
  );
}

export default Home;
