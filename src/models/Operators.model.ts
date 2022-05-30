import { Base } from "./Base.models";
import { Role } from "./enum/role.enum";

export interface Operators extends Base {
  email: string;
  name: string;
  role: Role;
}
