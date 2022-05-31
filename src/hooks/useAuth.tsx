import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";
import { createContext, ProviderProps, useContext, useState } from "react";

import { AppContextInterface } from "../@types/interfaces";
import { useDocument } from "../lib";
import { Configurations } from "../models";
import AuthService from "../service/auth.service";

const AuthContext = createContext<AppContextInterface>({} as AppContextInterface);

export default function useAuth() {
  return useContext<AppContextInterface>(AuthContext);
}

export const AuthProvider = (
  props: JSX.IntrinsicAttributes & ProviderProps<AppContextInterface>
) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const { data: configurations, update: updateConfigurations } =
    useDocument<Configurations>("Configurations/default");

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await AuthService.signInWithEmailAndPassword(email, password);
    setUser(user ?? null);
    setError(error ?? "");
  };

  const handleConfigurations = async (data: {
    cellPhone?: string | FieldValue | undefined;
    cotaValue?: number | FieldValue | undefined;
    rules?: FieldValue | (string | FieldValue | undefined)[] | undefined;
  }) => {
    if (configurations && configurations.exists) {
      await updateConfigurations(data);
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const value = {
    user,
    error,
    signInWithEmailAndPassword,
    logout,
    setUser,
    handleConfigurations,
    configurations,
  };

  return <AuthContext.Provider {...props} value={value} />;
};
