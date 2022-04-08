import { useRouter } from "next/router";
import { DefaultAuthProps } from "../@types/interfaces";
import Loading from "../components/Loading/Loading";
import useAuth from "./useAuth";

export const withPublic = (Component: ({}: DefaultAuthProps) => JSX.Element) => {
  return function WithPublic(props: JSX.IntrinsicAttributes) {
    const auth = useAuth();
    const router = useRouter();

    if (auth && auth.user) {
      console.log(auth.user);
      router.replace("/master/dashboard");
      return <Loading />;
    }

    return <Component auth={auth} {...props} />;
  };
};

export const withProtected = (Component: ({}: DefaultAuthProps) => JSX.Element) => {
  return function WithProtected(props: JSX.IntrinsicAttributes) {
    const auth = useAuth();
    const router = useRouter();

    if (auth && !auth.user) {
      router.replace("/login");
      return <Loading />;
    }

    return <Component auth={auth} {...props} />;
  };
};
