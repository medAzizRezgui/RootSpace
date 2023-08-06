import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IconProps {
  icon: IconType;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: I, className }) => {
  return (
    <I
      className={twMerge(
        "cursor-pointer transition hover:scale-105 active:opacity-50",
        className
      )}
    />
  );
};
