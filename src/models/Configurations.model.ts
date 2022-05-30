import { Base } from "./Base.models";

export interface Configurations extends Base {
  cellPhone: string;
  cotaValue: number;
  rules: Array<string>;
}
