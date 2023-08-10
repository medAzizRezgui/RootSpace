import { AddPost } from "../../components/pages/Home/AddPost";
import { SinglePost } from "../../components/pages/Home/SinglePost";

function Home() {
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <SinglePost />
    </div>
  );
}

export default Home;
