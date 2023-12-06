import { ICountChargerBoxOnline } from "@dashboard/domain/ICountChargerBoxOnline";
import { CountChargerBoxOnlineRepository } from "@dashboard/domain/countChargerBoxOnlineRepository";

export class CountChargerBoxOnlineManagement {

  constructor(
    private readonly countChargerBoxOnlineRepository: CountChargerBoxOnlineRepository) {
    this.countChargerBoxOnlineRepository = countChargerBoxOnlineRepository;
  }

  async getCountChargerBoxOnline(): Promise<{
    success: boolean;
    countChargerBoxOnline: ICountChargerBoxOnline | null;
  }> {
    const responseCountChargerBoxOnline = await this.countChargerBoxOnlineRepository.getCountChargerBoxOnline();
    return { success: true, countChargerBoxOnline: responseCountChargerBoxOnline };
  }

}
