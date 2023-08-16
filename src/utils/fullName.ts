function capitalizeFirstLetter(word: string) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else return word;
}

export const fullName = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  return (
    capitalizeFirstLetter(lastName) + " " + capitalizeFirstLetter(firstName)
  );
};
