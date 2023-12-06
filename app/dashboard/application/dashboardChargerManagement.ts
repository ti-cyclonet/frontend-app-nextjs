import { DashboardChargerRepository } from "@dashboard/domain/dashboardChargerRepository";

export class DashboardChargerManagement {
    constructor(private readonly dashboardChargerRepository: DashboardChargerRepository) {
        this.dashboardChargerRepository = dashboardChargerRepository;
    }

    async getAllChargerBox(): Promise<{ success: boolean, chargerBoxDashboard: [] }> {
        const responseChargerBox = await this.dashboardChargerRepository.getAllChargerBox();
        return { success: true, chargerBoxDashboard: responseChargerBox }
    }

    async getChargerBoxAvailable(): Promise<{ success: boolean, chargerBoxAvailable: {} }> {
        const responseChargebox = await this.dashboardChargerRepository.getChargerBoxAvailable();
        return { success: true, chargerBoxAvailable: responseChargebox }
    }
}