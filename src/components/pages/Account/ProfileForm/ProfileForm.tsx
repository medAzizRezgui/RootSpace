import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../shared/Input.tsx";
import { useState } from "react";
import Button from "../../../shared/Button.tsx";
import { useUser } from "../../../../hooks/useUser.ts";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
interface formDefaultValues {
  firstName: string;
  lastName: string;
  email: string;
  avatar: null;
}
export const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm<formDefaultValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: null,
    },
  });
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const onSubmit: SubmitHandler<formDefaultValues> = async (
    values: formDefaultValues
  ) => {
    try {
      setIsLoading(true);
      const avatarFile = values.avatar?.[0];

      if (!avatarFile || !values || !user) {
        return;
      }

      // Avatar Upload
      const uniqueID = uniqid();
      const { data: avatarData, error: avatarError } =
        await supabaseClient.storage
          .from("avatars")
          .upload(`avatar-${values.firstName}-${uniqueID}`, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (avatarError) {
        setIsLoading(false);
        return;
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
          <p className={"pb-1"}>Select an image</p>
          <Input
            id={"image"}
            type={"file"}
            disabled={isLoading}
            accept={"image/*"}
            {...register("avatar", { required: true })}
          />
        </div>
        <Input
          disabled={isLoading}
          id={"firstName"}
          {...register("firstName", { required: true })}
          placeholder={"First name..."}
        />
        <Input
          disabled={isLoading}
          id={"lastName"}
          {...register("lastName", { required: true })}
          placeholder={"last name..."}
        />

        <Button disabled={isLoading} type="submit">
          CLICK
        </Button>
      </form>
    </div>
  );
};
