import { IAllConnectorChargebox } from "./IAllConnectorChargebox";
import { IChargeboxKPI } from "./IChargeboxKPI";
import { IConnectorKPI } from "./IConnectorKPI";

export interface DashboardRepository {
  getAllConnectorChargebox(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<IAllConnectorChargebox>;
  getConnectorAvailable(): Promise<{}>;
  getChargeboxKPI(idFunctionalUnit: number): Promise<IChargeboxKPI>;
  getConnectorsKPI(idFunctionalUnit: number): Promise<IConnectorKPI>;
}
