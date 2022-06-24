import { Base } from "../Base.models";
import { Estados } from "../enum/states.enum";

export interface Bearer extends Base {
  name: string;
  state: Estados;
}
