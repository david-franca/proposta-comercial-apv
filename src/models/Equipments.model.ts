import { Base } from "./Base.models";
import { Instalation } from "./Instalation.model";

type Model = "BT" | "TC" | "S" | "MEC" | "SAT";

export interface Equipments extends Base {
  id: string;
  number: number;
  installed: boolean;
  history: Array<Instalation>;
  model: Model;
  status?: "Removido" | "Instalado" | "Devolvido" | "Estoque";
}
