import { FunctionalUnitRepository } from "../domain/FunctionalUnitRepository";
import { IFunctionalUnit } from "../domain/IFunctionalUnit";

export class FunctionalUnitManagement {
  constructor(
    private readonly functionalUnitRepository: FunctionalUnitRepository
  ) {
    this.functionalUnitRepository = functionalUnitRepository;
  }

  async getFunctionalUnit(): Promise<{ success: boolean, functionalUnits: IFunctionalUnit[] }> {
    const resp = await this.functionalUnitRepository.getFunctionalUnit();
    return { success: true, functionalUnits: resp };
  }

  async deleteFunctionaUnit(id: number): Promise<{ success: boolean, response: string }> {
    const resp = await this.functionalUnitRepository.deleteFunctionalUnit(id);
    return { success: true, response: resp };
  }

}
