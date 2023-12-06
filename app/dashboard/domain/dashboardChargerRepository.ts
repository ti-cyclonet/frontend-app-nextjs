export interface DashboardChargerRepository {
    getAllChargerBox(): Promise<[]>;
    getChargerBoxAvailable(): Promise<{}>;
}