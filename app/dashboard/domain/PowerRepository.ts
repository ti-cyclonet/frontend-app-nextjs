import { IPower } from "./IPower";
import { IFunctionalunits } from "./IFunctionalunits";
import { IDashboardData } from "./IDashboardData";

export interface PowerRepository {
  getPower(idFunctionalUnit: number): Promise<IPower>;
  getFunctionalunits(): Promise<IFunctionalunits[]>;
  getDashboardData(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<IDashboardData>;
}
