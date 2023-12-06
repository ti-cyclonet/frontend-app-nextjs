import { IRepository } from "@/app/core/domain/IRepository";
import { IChargeGroup, IChargeGroupRequest, IGroupConnector } from "./IChargeGroup";

export interface ChargeGroupRepository extends IRepository<IChargeGroup> {

    getAllChargeGroups(): Promise<IChargeGroup[]>;

    saveNewChargeGroup(chargeGroup: IChargeGroupRequest): Promise<IChargeGroup>;

    editChargeGroup(chargeGroup: IChargeGroupRequest): Promise<IChargeGroup>;

    getAllAvailableConnectors(): Promise<IGroupConnector[]>;


}