declare module "react-firebase-hooks/auth" {
  import { User } from "firebase/auth";

  export const useAuthState: (auth) => [User | null | undefined, boolean, Error | undefined];
}
