import { Base } from "./Base.models";

export interface VehiclesModels extends Base {
  brand: string;
  model: string;
  year: number;
  referenceMonth: string;
  vehicleType: number;
  fipePrice: number;
  bodywork: number;
  licensePlate: string;
  discount: number;
  protected: number;
  admin: number;
  cotas: number;
  monthlyPayment: number;
  total: number;
  rateio: number;
  expiresIn: Date;
  customerId: string;
  operatorId: string;
}
