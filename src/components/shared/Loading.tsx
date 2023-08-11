import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className={"flex h-[100vh] w-full items-center justify-center bg-bgDark"}
    >
      <BounceLoader color={"#2F89FF"} size={40} />
    </div>
  );
};

export default Loading;
