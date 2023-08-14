import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../shared/Input.tsx";
import { useState } from "react";
import Button from "../../../shared/Button.tsx";
import { useUser } from "../../../../hooks/useUser.ts";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useLoadImage from "../../../../hooks/useLoadImage.ts";
import { Icon } from "../../../shared/Icon.tsx";
import { BiCamera } from "react-icons/bi";
interface formDefaultValues {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string[] | null;
  edit: boolean;
}
export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, userDetails } = useUser();
  const { register, reset, handleSubmit } = useForm<formDefaultValues>({
    defaultValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      email: "",
      avatar: [userDetails?.avatar_url] || null,
      edit: !!userDetails?.firstName,
    },
  });
  const supabaseClient = useSupabaseClient();
  const avatarUrl = useLoadImage(userDetails);
  const onSubmit: SubmitHandler<formDefaultValues> = async (
    values: formDefaultValues
  ) => {
    try {
      setIsLoading(true);
      const avatarFile = values.avatar?.[0];
      console.log(values);
      if (!user) {
        return;
      }
      // // Only when using for the first time
      // if (values.edit) {
      //   return;
      // }
      //
      // Avatar Upload

      const { data: avatarData, error: avatarError } =
        await supabaseClient.storage
          .from("avatars")
          .upload(`avatar--${user?.id}`, values.avatar?.[0], {
            cacheControl: "3600",
            upsert: true,
          });

      if (avatarError) {
        console.log("ERROR", avatarError.message);
        setIsLoading(false);
      }

      // User Data
      const { error: supabaseError } = await supabaseClient
        .from("users")
        .update({
          email: user.email,
          firstName: values.firstName,
          lastName: values.lastName,
          avatar_url: avatarData?.path,
        })
        .eq("id", user.id);

      if (supabaseError) {
        setIsLoading(false);
        console.log("ERROR", supabaseError.message);
        return;
      }
      // After everything is done
      setIsLoading(false);
      reset();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"p-12"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className={"pb-1 text-2xl font-medium text-white"}>
            Profile Picture
          </p>
          <div
            className={
              "relative mx-auto my-8 h-[150px] w-[150px] cursor-pointer rounded-full bg-green-400 transition hover:scale-105"
            }
          >
            <img
              alt={"profile-img"}
              src={avatarUrl || ""}
              className={"h-[150px] w-[150px] rounded-full object-cover"}
            />
            <Icon
              icon={BiCamera}
              className={
                "absolute bottom-[15%] right-[-5%] rounded-full bg-bgDark p-2 text-4xl text-white"
              }
            />
            <Input
              className={
                "absolute top-0  h-[160px] w-[160px] cursor-pointer select-none rounded-full opacity-0"
              }
              id={"image"}
              type={"file"}
              disabled={isLoading}
              accept={"image/*"}
              {...register("avatar")}
            />
          </div>
        </div>
        <p className={"pb-1 text-lg font-medium text-white"}>First Name</p>
        <Input
          disabled={isLoading}
          id={"firstName"}
          {...register("firstName", { required: true })}
          placeholder={"First name..."}
        />
        <p className={"pb-1 text-lg font-medium text-white"}>Last Name</p>
        <Input
          disabled={isLoading}
          id={"lastName"}
          {...register("lastName", { required: true })}
          placeholder={"Last name..."}
        />

        <Button
          className={"w-full border-blue-500 bg-blue-500"}
          disabled={isLoading}
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
};
