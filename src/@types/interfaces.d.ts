import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

import { Document } from "../lib";
import { Configurations } from "../models";

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
  handleConfigurations: (data: {
    cellPhone?: string | FieldValue | undefined;
    cotaValue?: number | FieldValue | undefined;
    rules?: FieldValue | (string | FieldValue | undefined)[] | undefined;
  }) => Promise<void>;
  configurations: Document<Configurations> | null | undefined;
}

export interface DefaultAuthProps {
  auth: AppContextInterface;
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
  accession: boolean;
  inspection: boolean;
  installation: boolean;
  cotas: number;
  monthlyPayment: number;
}

type AssociateValues = Pick<FormValues, "fullName" | "cellPhone" | "email">;

type VehicleValues = Pick<
  FormValues,
  "licensePlate" | "brand" | "model" | "year" | "fipe" | "bodywork"
>;

export type StatusPayment =
  | "Pending"
  | "Complete"
  | "Refunded"
  | "Failed"
  | "Abandoned"
  | "Revoked"
  | "Preapproved"
  | "Cancelled";
