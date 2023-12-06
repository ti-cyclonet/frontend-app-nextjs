import { IChargeboxInfo } from "../domain/IChargeInfo";
import { IChargeBox } from "../domain/IChargebox";
import { IFunctionalUnit } from "../domain/IFunctionalUnit";
import { ChargeBoxRepository } from "../domain/chargeboxRepository";

export class ChargeBoxManagement {
    constructor(private readonly chargeBoxRepository: ChargeBoxRepository) {
        this.chargeBoxRepository = chargeBoxRepository;
    }

    async getAllChargers(): Promise<{success: boolean; chargerbox: IChargeBox[]|null}> {
        const responseCharger = await this.chargeBoxRepository.getAll();
        return {success: true, chargerbox: responseCharger as IChargeBox[]};
    }

    async getChargerById(id: string): Promise<{success: boolean; chargerbox: IChargeBox|null}> {
        const responseCharger = await this.chargeBoxRepository.getById(id);
        return {success: true, chargerbox: responseCharger as IChargeBox};
    }

    async updateChargeboxInfo(entity: IChargeboxInfo): Promise<{success: boolean; message: string}> {
        const responseCharger = await this.chargeBoxRepository.update(entity);
        return {success: true, message: responseCharger as string};
    }

    async getAllFunctionalUnits(): Promise<{success: boolean; functionalUnit: IFunctionalUnit[]}> {
        const responseFunctionalUnit = await this.chargeBoxRepository.getAllFunctionalUnits();
        return {success: true, functionalUnit: responseFunctionalUnit};
    }

}