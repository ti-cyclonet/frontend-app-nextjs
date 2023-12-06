import { ICountVehicle } from "@dashboard/domain/ICountVehicle";

export interface CountVehicleRepository {
    getCountVehicle(): Promise<ICountVehicle>;
}