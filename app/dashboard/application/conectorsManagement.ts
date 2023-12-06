import { ICountConectors } from "@dashboard/domain/ICountConectors";
import { CountConectorsRepository } from "@dashboard/domain/countConectorsRepository";

export class CountConectorsManagement {

  constructor(
    private readonly countConectorsRepository: CountConectorsRepository) {
    this.countConectorsRepository = countConectorsRepository;
  }

  async getCountConectors(): Promise<{
    success: boolean;
    countConectors: ICountConectors | null;
  }> {
    const responseCountConectors = await this.countConectorsRepository.getCountConectors();
    return { success: true, countConectors: responseCountConectors };
  }

}
