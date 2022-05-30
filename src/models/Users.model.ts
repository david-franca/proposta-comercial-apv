import { Base } from "./Base.models";
import { PixKeyType } from "./enum/pixType.enum";

export interface Users extends Base {
  code: string;
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  pixKeyType?: PixKeyType;
  pixKey?: string;
}
