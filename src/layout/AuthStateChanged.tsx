import { useEffect, useState } from "react";
import { Loading } from "../components";

import useAuth from "../hooks/useAuth";
import AuthService from "../service/auth.service";

type Props = {
  children: JSX.Element;
};

const AuthStateChanged = ({ children }: Props) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.waitForUser((userCred) => {
      auth.setUser(userCred);
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default AuthStateChanged;
