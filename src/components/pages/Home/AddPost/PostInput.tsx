import { twMerge } from "tailwind-merge";
import { useState } from "react";

interface PostInputProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
export const PostInput = ({ setContent, content }: PostInputProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(0);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharactersLeft(e.target.value.length);
  };
  return (
    <div className={"relative w-full"}>
      <textarea
        maxLength={240}
        onBlur={() => setInputFocus(false)}
        onFocus={() => setInputFocus(true)}
        placeholder={"What's on your mind?"}
        value={content}
        onChange={(e) => onContentChanged(e)}
        className={twMerge(
          "flex-1 w-full select-none max-h-[200px] rounded-[10px] bg-mainGray transition-all px-4 py-2 text-white  placeholder:text-textGray focus:outline-none",
          inputFocus ? "h-[150px] " : "h-[40px]"
        )}
      />
      <p
        className={
          inputFocus ? "block text-sm font-medium text-textGray" : "hidden"
        }
      >
        Characters Left : {240 - charactersLeft}
      </p>
    </div>
  );
};
