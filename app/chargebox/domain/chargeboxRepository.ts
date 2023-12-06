import { IRepository } from "@/app/core/domain/IRepository";
import { IChargeBox } from "./IChargebox";
import { IChargeboxInfo } from "./IChargeInfo";
import { IFunctionalUnit } from "./IFunctionalUnit";

export interface ChargeBoxRepository extends IRepository<IChargeBox | IChargeboxInfo | string> {
    getAllFunctionalUnits(): Promise<IFunctionalUnit[]>;
}