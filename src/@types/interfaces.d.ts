import { Timestamp } from "firebase/firestore";

export interface FipeApi {
  nome: string;
  codigo: string | number;
}

export interface FIPE {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: string | number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
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

interface Row {
  fullName: string;
  cellPhone: string;
  status: "Iniciado" | "Aprovado" | "Cancelado" | "Expirado" | "Aguardando";
  photoURL: string;
  createdAt: Timestamp;
  expiresIn: Timestamp;
  id: string;
}
