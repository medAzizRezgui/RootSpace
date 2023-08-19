import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IconProps {
  icon: IconType;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ icon: I, className, onClick }) => {
  return (
    <I
      onClick={onClick}
      className={twMerge(
        "cursor-pointer transition hover:scale-105 active:opacity-50",
        className
      )}
    />
  );
};
