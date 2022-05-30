import { Base } from "./Base.models";

export interface VehiclesModels extends Base {
  accession: boolean;
  admin: number;
  bodywork: number;
  brand: string;
  cotas: number;
  discount: number;
  expiresIn: Date;
  fipe: number;
  inspection: boolean;
  installation: boolean;
  licensePlate: string;
  model: string;
  protected: number;
  theft: number;
  total: number;
  year: string;
  customerId: string;
  operatorId: string;
  monthlyPayment: number;
}
