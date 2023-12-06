import { ICountChargerBoxOnline } from "@dashboard/domain/ICountChargerBoxOnline";

export interface CountChargerBoxOnlineRepository {
    getCountChargerBoxOnline(): Promise<ICountChargerBoxOnline>;
}