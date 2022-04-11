export const isDev =
  typeof process.env.NODE_ENV !== "undefined"
    ? process.env.NODE_ENV
    : process.env.NODE_ENV === "development";
