export const Friend = () => {
  return (
    <div className={"my-4 flex items-center gap-x-2"}>
      {/*    AVATAR*/}
      <div className={"h-[35px] w-[35px] rounded-full bg-blue-500"}></div>
      {/*    Details*/}
      <div>
        <p className={"font-medium text-white"}>Patrick Bateman</p>
        <p className={"text-sm leading-none text-textGray"}>
          Last active today
        </p>
      </div>
    </div>
  );
};
