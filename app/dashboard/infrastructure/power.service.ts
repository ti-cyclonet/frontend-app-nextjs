import { PowerRepository } from "../domain/PowerRepository";
import { IPower } from "../domain/IPower";
import { IFunctionalunits } from "../domain/IFunctionalunits";
import { IDashboardData } from "../domain/IDashboardData";

var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class PowerService implements PowerRepository {
  private apiBasePath = process.env.BASEPATH_API_POWERLIMIT;

  constructor() {}

  async getPower(idFunctionalUnit: number): Promise<IPower> {
    const resp = await fetch(`${this.apiBasePath}/power/${idFunctionalUnit}`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(await resp.json());
  }

  async getFunctionalunits(): Promise<IFunctionalunits[]> {
    const resp = await fetch(`${this.apiBasePath}/power/functionalunits`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(await resp.json());
  }

  async getDashboardData(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<IDashboardData> {
    let url = `${this.apiBasePath}/power/functional-units-dashboard`;
    if (order || env || fuunit || chgr) {
      url = url + "?";
      url = order ? `${url}order=${order}` : `${url}order=-`;
      url = env ? `${url}&env=${env}` : `${url}&env=-`;
      url = fuunit ? `${url}&fuunit=${fuunit}` : `${url}&fuunit=-`;
      url = chgr ? `${url}&chgr=${chgr}` : `${url}&chgr=-`;
    }
    const resp = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(await resp.json());
  }
}
