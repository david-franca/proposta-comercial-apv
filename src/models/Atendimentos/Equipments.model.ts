import { Base } from "../Base.models";
import { Installation } from "./Installation.model";

export type Model = "BT" | "TC" | "S" | "MEC" | "SAT";
export type Status = "Removido" | "Instalado" | "Devolvido" | "Estoque";

export interface Equipments extends Base {
  number: number;
  isInstalled: boolean;
  history: Array<Installation>;
  model: Model;
  status: Status;
  observations?: string;
}
