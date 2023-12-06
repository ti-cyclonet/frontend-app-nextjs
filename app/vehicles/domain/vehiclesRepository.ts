import { IRepository } from "@core/domain/IRepository";
import { IVehicle } from "@/app/vehicles/domain/IVehicle";

export interface VehiclesRepository extends IRepository<IVehicle> {}