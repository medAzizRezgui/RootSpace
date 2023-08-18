import { Like } from "./types/types.ts";

export function isIdInArray<T extends Like>(
  idToCheck: string | undefined,
  array: T[]
): boolean {
  return array?.some((obj) => obj.user_id === idToCheck);
}
function capitalizeFirstLetter(word: string | undefined) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else return "";
}

export const fullName = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  return (
    capitalizeFirstLetter(lastName) + " " + capitalizeFirstLetter(firstName)
  );
};
