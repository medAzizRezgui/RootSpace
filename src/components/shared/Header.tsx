import { Link, Outlet } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div
        className={
          "absolute left-0 top-0 flex w-full  items-center justify-between bg-mainGray px-12 py-2"
        }
      >
        <Link to={"/"}>
          <div className={"h-[40px] w-[40px] rounded-full bg-blue-500"}></div>
        </Link>

        <input type="text" name="" id="" />
        <Link to={"/account"}>
          <div className={"h-[40px] w-[40px] rounded-full bg-green-400"}></div>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Header;
