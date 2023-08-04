import { IconType } from "react-icons";

interface IconProps {
  icon: IconType;
}

export const Icon: React.FC<IconProps> = ({ icon: I }) => {
  return (
    <I
      className={"cursor-pointer transition hover:scale-105 active:opacity-50"}
    />
  );
};
