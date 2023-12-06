import { IRepository } from "@core/domain/IRepository";
import { IModule } from "@vehicles/domain/IModule";

export interface ModulesRepository {
    add(vehicleId:string, entity: IModule): Promise<IModule>;
    update(vehicleId: string, entity: IModule): Promise<IModule>;
    deleteModule(vehicleId: string, id: string): Promise<boolean>;
    inactivateModule(vehicleId: string, id: string): Promise<boolean>;
    activateModule(vehicleId: string, id: string): Promise<boolean>;
}