import { Base } from "./Base.models";

export interface Representatives extends Base {
  name: string;
  email: string;
  cellPhone: string;
  city: string;
  state: string;
}
