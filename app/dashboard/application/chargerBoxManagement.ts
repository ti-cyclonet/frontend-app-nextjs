import { ICountChargerBox } from "@dashboard/domain/ICountChargerBox";
import { CountChargerBoxRepository } from "@dashboard/domain/countChargerBoxRepository";

export class CountChargerBoxManagement {

  constructor(
    private readonly countChargerBoxRepository: CountChargerBoxRepository) {
    this.countChargerBoxRepository = countChargerBoxRepository;
  }

  async getCountChargerBox(): Promise<{
    success: boolean;
    countChargerBox: ICountChargerBox | null;
  }> {
    const responseCountChargerBox = await this.countChargerBoxRepository.getCountChargerBox();
    return { success: true, countChargerBox: responseCountChargerBox };
  }

}
