import { PowerRepository } from "../domain/PowerRepository";
import { IPower } from "../domain/IPower";
import { IFunctionalunits } from "../domain/IFunctionalunits";
import { IDashboardData } from "../domain/IDashboardData";

export class PowerManagement {
  constructor(private readonly powerRepository: PowerRepository) {
    this.powerRepository = powerRepository;
  }

  async getPower(
    idFunctionalUnit: number
  ): Promise<{ success: boolean; power: IPower }> {
    const resp = await this.powerRepository.getPower(idFunctionalUnit);
    return { success: true, power: resp };
  }

  async getFunctionalunits(): Promise<{
    success: boolean;
    fuuns: IFunctionalunits[];
  }> {
    const resp = await this.powerRepository.getFunctionalunits();
    return { success: true, fuuns: resp };
  }

  async getDashboardData(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<{
    success: boolean;
    fuuns: IDashboardData;
  }> {
    const resp = await this.powerRepository.getDashboardData(
      order,
      env,
      fuunit,
      chgr
    );
    return { success: true, fuuns: resp };
  }
}
