import { IFunctionalUnit } from "../domain/IFunctionalUnit";
import { FunctionalUnitRepository } from "../domain/FunctionalUnitRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class FunctionalUnitService implements FunctionalUnitRepository {
  private apiBasePath = process.env.BASEPATH_API_FUNCTIONALUNIT;
  private apiPowerLimitBase = process.env.BASEPATH_API_POWERLIMIT;

  constructor() {}

  async deleteFunctionalUnit(id: number): Promise<string> {
    const resp = await fetch(this.apiPowerLimitBase + "/power/del-charge-group/" + id, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        mode: "cors",
    });
      //console.log(resp);        
    if (resp.status == 204){
        return Promise.resolve("success");
    }else{
        const error = await resp.json();
        throw new Error(error.message);
    }
  }

  async getFunctionalUnit(): Promise<IFunctionalUnit[]> {
    const resp = await fetch(
      `${this.apiBasePath}/functional-unit`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    return Promise.resolve(await resp.json());
  }
}
