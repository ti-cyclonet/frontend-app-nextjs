import { ICountVehicle } from "@dashboard/domain/ICountVehicle";
import { CountVehicleRepository } from "@dashboard/domain/countVehicleRepository";

export class CountVehicleManagement {

  constructor(
    private readonly countVehicleRepository: CountVehicleRepository) {
    this.countVehicleRepository = countVehicleRepository;
  }

  async getCountVehicle(): Promise<{
    success: boolean;
    countVehicle: ICountVehicle | null;
  }> {
    const responseCountVehicles = await this.countVehicleRepository.getCountVehicle();
    return { success: true, countVehicle: responseCountVehicles };
  }

}
