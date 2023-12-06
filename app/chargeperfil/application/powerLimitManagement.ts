import { ChargeGroupRepository } from "../domain/chargeGroupRepository";
import { IChargeGroup } from "../domain/IChargeGroup";
import { IPowerLimit } from "../domain/IPowerLimit";
import { PowerLimitRepository } from "../domain/powerLimitRepository";

export class PowerLimitManagement {
  constructor(
    private readonly powerLimitRepository: PowerLimitRepository,
    private readonly chargeGroupRepository: ChargeGroupRepository
  ) {}

  async getAllChargeGroups(): Promise<{ success: boolean; chargeGroups: IChargeGroup[]}> {
      const response = await this.chargeGroupRepository.getAllChargeGroups();
      return { success: true, chargeGroups: response };
  }

}
