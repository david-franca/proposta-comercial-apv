import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface FipeApi {
  name: string;
  code: string;
}

export interface FIPE {
  price: string;
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  vehicleType: number;
  fuelAcronym: string;
}

export interface Models {
  anos: FipeApi[];
  modelos: FipeApi[];
}

export interface Routes {
  category?: string;
  path?: string;
  state?: string;
  name: string;
  icon?: JSX.Element;
  component: string;
  layout?: string;
}

export type Status = "Iniciado" | "Aprovado" | "Cancelado" | "Expirado" | "Aguardando";

export interface Row {
  fullName: string;
  cellPhone: string;
  status: Status;
  photoURL: string;
  createdAt: Date;
  expiresIn: Date;
  id: string;
}

export interface AppContextInterface {
  user: User | null;
  error: string;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export interface DefaultAuthProps {
  auth: AppContextInterface;
}

export interface Proposal {
  fullName: string;
  cellPhone: string;
  status?: Status;
  photoURL?: string;
  code?: string;
  createdAt?: Date;
  updatedAt?: Date;
  accession?: number;
  admin?: number;
  bodywork?: number;
  brand?: string;
  cotas?: number;
  discount?: number;
  email?: string;
  expiresIn?: Date;
  fipe?: number;
  inspection?: number;
  installation?: number;
  licensePlate?: string;
  model?: string;
  protected?: number;
  theft?: number;
  total?: number;
  year?: string;
}

export interface FormValues {
  fullName: string;
  cellPhone: string;
  email: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  fipe: number;
  bodywork: number;
  protected: number;
  discount: number;
  admin: number;
  theft: number;
  total: number;
  accession: number;
  inspection: number;
  installation: number;
  cotas: number;
  mensal: number;
}

export type StatusPayment =
  | "Pending"
  | "Complete"
  | "Refunded"
  | "Failed"
  | "Abandoned"
  | "Revoked"
  | "Preapproved"
  | "Cancelled";

export interface Withdrawals {
  createdAt: Date;
  uid: string;
  name: string;
  pix: string;
  request: string;
  status: StatusPayment;
}

export interface Users {
  code: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  wallet: number;
  createdAt?: Date;
}

export interface Transaction {
  amount: string;
  approvedBy: string;
  createdAt: Date;
  to: string;
  type: string;
}
