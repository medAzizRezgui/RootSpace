import React, { useEffect } from "react";
import Input from "./Input.tsx";

interface ImageUploadProps {
  selectedFile: File | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const ImageUpload = ({
  selectedFile,
  setSelectedFile,

  setPreview,
}: ImageUploadProps) => {
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <Input
        className={
          "absolute left-0 top-0  z-[100]  cursor-pointer select-none rounded-full opacity-0"
        }
        onChange={onSelectFile}
        id={"image"}
        type={"file"}
        disabled={false}
        accept={"image/*"}
      />
    </div>
  );
};
