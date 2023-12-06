import { ICountChargerBox } from "@dashboard/domain/ICountChargerBox";

export interface CountChargerBoxRepository {
    getCountChargerBox(): Promise<ICountChargerBox>;
}