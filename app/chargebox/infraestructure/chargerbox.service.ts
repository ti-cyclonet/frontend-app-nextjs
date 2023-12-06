import { IChargeboxInfo } from "../domain/IChargeInfo";
import { IChargeBox } from "../domain/IChargebox";
import { IFunctionalUnit } from "../domain/IFunctionalUnit";
import { ChargeBoxRepository } from "../domain/chargeboxRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class ChargeBoxService implements ChargeBoxRepository {
  
  private apiBasePath = process.env.BASEPATH_API_CHARGEBOX;
  private apiDashboardBasePath = process.env.BASEPATH_API_DASHBOARD;

  async getAll(): Promise<IChargeBox[]> {
    const resp = await fetch(`${this.apiBasePath}/chargebox`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(await resp.json());
  }

  async getById(id: string): Promise<IChargeBox | null> {
    const resp = await fetch(`${this.apiBasePath}/chargebox/${id}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    let respJson = await resp.json();
    const lastHeartbeat = new Date(respJson.last_heartbeat_timestamp);
    const old = new Date();
    let status = "Available";
    old.setHours(old.getHours() - 4);
    if (lastHeartbeat < old) {
      status = "Offline";
    }
    //console.log(respJson);

    respJson = {
      ...respJson,
      status: status,
    };

    //console.log(respJson);

    return Promise.resolve(respJson);
  }

  
  add(entity: IChargeBox): Promise<IChargeBox> {
    throw new Error("Method not implemented.");
  }
  async update(entity: IChargeboxInfo): Promise<string> {
    const resp = await fetch(`${this.apiBasePath}/chargebox/upd-charge-info`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
    const respText = resp.clone();
    if (respText.status == 200) {
      return "Actualizado correctamente"
    } else {
      throw new Error("No fue posible actualizar");
    }
  }

  async getAllFunctionalUnits(): Promise<IFunctionalUnit[]> {
    const resp = await fetch(`${this.apiDashboardBasePath}/dashboard/all-functional-units`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(await resp.json());
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
