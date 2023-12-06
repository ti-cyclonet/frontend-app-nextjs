import { IFunctionalUnit } from "./IFunctionalUnit";

export interface FunctionalUnitRepository {

  getFunctionalUnit(): Promise<IFunctionalUnit[]>;

  deleteFunctionalUnit(id: number): Promise<string>;

}
