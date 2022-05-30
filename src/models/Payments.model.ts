import { Base } from "./Base.models";
import { Status } from "./enum/status.enum";

export interface Payments extends Base {
  amount: number;
  pixKey: string;
  pixType: string;
  status: Status;
  userId: string;
  operatorId?: string;
  receipt?: string;
  note?: string;
}
