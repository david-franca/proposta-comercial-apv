import { User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  ProviderProps,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContextInterface } from "../@types/interfaces";
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

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await AuthService.signInWithEmailAndPassword(email, password);
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const value = { user, error, signInWithEmailAndPassword, logout, setUser };

  return <AuthContext.Provider {...props} value={value} />;
};
