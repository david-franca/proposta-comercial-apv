export const capitalizeWords = (fullName: string): string => {
  const nameArray = fullName.toLowerCase().split(" ");

  return nameArray
    .map((name) => {
      if (name) {
        return name[0].toUpperCase() + name.substring(1);
      }
    })
    .join(" ");
};
