import { ChargeGroupRepository } from "../../domain/chargeGroupRepository";
import { IChargeGroup, IChargeGroupRequest, IGroupConnector } from "../../domain/IChargeGroup";
import { IPowerLimit } from "../../domain/IPowerLimit";
import { PowerLimitRepository } from "../../domain/powerLimitRepository";

export class ChargeGroupManagement {

    constructor(
      private readonly chargeGroupRepository: ChargeGroupRepository,
      private readonly powerLimitRepository: PowerLimitRepository
    ) {}

    async saveNewChargeGroup(chargeGroup: IChargeGroup): Promise<{ success: boolean; chargeGroup: IChargeGroup | null}> {
      let chargeGroupRequest = this.createRequest(chargeGroup);
      const response = await this.chargeGroupRepository.saveNewChargeGroup(chargeGroupRequest);
      if (response) {
        return { success: true, chargeGroup: response }
      } else {
        return { success: false, chargeGroup: null }
      }
    }

    async editNewChargeGroup(chargeGroup: IChargeGroup): Promise<{ success: boolean; chargeGroup: IChargeGroup | null}> {
      console.log("Selected connectors", chargeGroup);
      let chargeGroupRequest = this.createRequest(chargeGroup);
      const response = await this.chargeGroupRepository.editChargeGroup(chargeGroupRequest);
      console.log("Response");
      if (response) {
        return { success: true, chargeGroup: response }
      } else {
        return { success: false, chargeGroup: null }
      }
    }

    async getChargeGroupById(chargeGroupId: string): Promise<{ success: boolean; chargeGroup: IChargeGroup}> {
      const response = await this.chargeGroupRepository.getAllChargeGroups();
      let chargeGroupResponse: IChargeGroup;
      response.forEach(chargeGroup => {
        if (chargeGroup.fuun_id?.toString() === chargeGroupId) {
          chargeGroupResponse = chargeGroup;
        }
      });
      return { success: true, chargeGroup: chargeGroupResponse! };
    }

    async getAvailableConnetors(): Promise<{ success: boolean; availableConnectors: IGroupConnector[]}> {
      const response = await this.chargeGroupRepository.getAllAvailableConnectors();
      if (!response) {
        return { success: false, availableConnectors: [] as IGroupConnector[]};
      } else {
        return { success: true, availableConnectors: response};
      }
    }

    async savePowerLimits(powerLimits: IPowerLimit[], functionalUnitId: number): Promise<{ success: boolean; limits: IPowerLimit[] }> {
      const response = await this.powerLimitRepository.setPowerLimits(powerLimits, functionalUnitId);
      if (!response) {
        return { success: false, limits: [] as IPowerLimit[]};
      } else {
        return { success: true, limits: response };
      }
      
    }

    async deletePowerLimits(functionalUnitId: number): Promise<{success: boolean; response: string}> {
      const response = await this.powerLimitRepository.deletePowerLimits(functionalUnitId);
      if (!response) {
        return { success: false, response: response };
      } else {
        return { success: true, response: response };
      }
    }

    createRequest(chargeGroup: IChargeGroup): IChargeGroupRequest {
      let chargeGroupRequest: IChargeGroupRequest = {
        fuun_id: chargeGroup.fuun_id,
        fuun_name: chargeGroup.fuun_name,
        fuun_algorithm: chargeGroup.fuun_algorithm,
        fuun_allocpower: chargeGroup.fuun_allocpower,
        fuun_chargerpklist: this.createChargersPKList(chargeGroup.fuun_chargers),
      };
      return chargeGroupRequest;
    }

    createChargersPKList(chargers: IGroupConnector[]): string[] {
      let chargersPkList: string[] = [];
      chargers.forEach(charge => {
        chargersPkList = [... chargersPkList, charge.charge_box_pk!];
      });
      return chargersPkList;
    }

  }