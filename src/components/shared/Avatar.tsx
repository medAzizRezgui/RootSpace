import { twMerge } from "tailwind-merge";

interface AvatarProps {
  url: string;
  size: string;
}
export const Avatar = ({ url, size }: AvatarProps) => {
  return (
    <img
      src={url}
      alt={"user-image"}
      className={twMerge(
        ` rounded-full object-cover ${
          url ? "opacity-100 transition" : "opacity-50 transition "
        }`,
        `h-[${size}px]  w-[${size}px]`
      )}
    />
  );
};
