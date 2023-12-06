import { IAllConnectorChargebox } from "../domain/IAllConnectorChargebox";
import { IChargeboxKPI } from "../domain/IChargeboxKPI";
import { IConnectorKPI } from "../domain/IConnectorKPI";
import { DashboardRepository } from "../domain/dashboardRepository";

export class DashboardManagement {
  constructor(private readonly dashboardRepository: DashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async getAllConnectorChargebox(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<{ success: boolean; connectorDashboard: IAllConnectorChargebox }> {
    const responseConnectorChargebox =
      await this.dashboardRepository.getAllConnectorChargebox(
        order,
        env,
        fuunit,
        chgr
      );
    return { success: true, connectorDashboard: responseConnectorChargebox };
  }

  async getConnectorAvailable(): Promise<{
    success: boolean;
    connectorAvailable: {};
  }> {
    const responseConnectorChargebox =
      await this.dashboardRepository.getConnectorAvailable();
    return { success: true, connectorAvailable: responseConnectorChargebox };
  }

  async getChargeboxKPI(
    idFunctionalUnit: number
  ): Promise<{ success: boolean; kpi: IChargeboxKPI }> {
    const resp = await this.dashboardRepository.getChargeboxKPI(
      idFunctionalUnit
    );
    return { success: true, kpi: resp };
  }

  async getConnectorsKPI(
    idFunctionalUnit: number
  ): Promise<{ success: boolean; kpi: IConnectorKPI }> {
    const resp = await this.dashboardRepository.getConnectorsKPI(
      idFunctionalUnit
    );
    return { success: true, kpi: resp };
  }
}
