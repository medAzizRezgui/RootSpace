import { Link, Outlet } from "react-router-dom";
import { AiFillBell, AiFillHome, AiFillMessage } from "react-icons/ai";
import useGetUserAvatar from "../../hooks/useGetUserAvatar.ts";
const Header = () => {
  const url = useGetUserAvatar();
  return (
    <>
      <div
        className={
          "absolute left-0 top-0 flex w-full  items-center justify-between bg-mainDark px-12 py-2"
        }
      >
        <Link to={"/"}>
          <div className={"flex items-center gap-[4px] text-lg text-white"}>
            <AiFillHome />
            <h1>Home</h1>
          </div>
        </Link>
        <div className={"flex flex-row-reverse items-center gap-x-4"}>
          <Link to={"/account"}>
            <img src={url} className={"w-[40px] rounded-full"} />
          </Link>
          <div
            className={
              "flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-gray-500 bg-mainGray"
            }
          >
            <AiFillBell className={"text-xl text-white "} />
          </div>
          <div
            className={
              "flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-gray-500 bg-mainGray"
            }
          >
            <AiFillMessage className={"text-xl text-white "} />
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Header;
