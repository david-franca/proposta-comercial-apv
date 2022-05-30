import { Base } from "./Base.models";

export interface CustomersModel extends Base {
  fullName: string;
  cellPhone: string;
  email: string;
  userId?: string;
}
