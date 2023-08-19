import { BiX } from "react-icons/bi";

interface ImagePreviewProps {
  preview: string | undefined;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
export const ImagePreview = ({
  preview,
  setPreview,
  setSelectedFile,
}: ImagePreviewProps) => {
  return (
    <div className={"group relative"}>
      <img
        alt={"pic"}
        className={"mx-auto my-2 w-[40%] rounded-md group-hover:opacity-40"}
        src={preview}
      />
      <BiX
        onClick={() => {
          setPreview(undefined);
          setSelectedFile(undefined);
        }}
        className={
          "absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-gray-600 text-3xl text-white opacity-0 group-hover:opacity-100"
        }
      />
    </div>
  );
};
