import { Friend } from "./Friend.tsx";

export const Friends = () => {
  return (
    <div
      className={
        "w-full max-w-[20%] cursor-pointer rounded-md border border-borderGray bg-mainDark p-4"
      }
    >
      <h1 className={" text-white"}>My Friends</h1>

      {/*    ONE FRIEND*/}
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </div>
  );
};
