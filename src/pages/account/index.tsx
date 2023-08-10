import { useUser } from "../../hooks/useUser.ts";
import { supabase } from "../../libs/supabaseClient.ts";

const Account = () => {
  const { userDetails, isLoading } = useUser();

  const updateDetails = async () => {
    await supabase
      .from("profiles")
      .update({ full_name: "Rezgui med Aziz", username: "Rez99" })
      .eq("id", userDetails?.id)
      .select();
  };
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display text-white"}>
      <h1>Account Details :</h1>
      <p>FullName: {userDetails?.full_name}</p>
      <p>Username: {userDetails?.username}</p>

      <button onClick={() => updateDetails()}>Update</button>
    </div>
  );
};

export default Account;
