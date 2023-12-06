import { url } from "inspector";
import { IChargeboxKPI } from "../domain/IChargeboxKPI";
import { IConnectorKPI } from "../domain/IConnectorKPI";
import { DashboardRepository } from "../domain/dashboardRepository";
import { IAllConnectorChargebox } from "../domain/IAllConnectorChargebox";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class DashboardService implements DashboardRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {}

  async getConnectorAvailable(): Promise<{}> {
    const resp = await fetch(
      `${this.apiBasePath}/dashboard/connector-available`,
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

  async getAllConnectorChargebox(
    order?: string,
    env?: string,
    fuunit?: string,
    chgr?: string
  ): Promise<IAllConnectorChargebox> {
    let url = `${this.apiBasePath}/dashboard/all-connector-chargebox`;
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

  async getChargeboxKPI(idFunctionalUnit: number): Promise<IChargeboxKPI> {
    const resp = await fetch(
      `${this.apiBasePath}/dashboard/chargebox-kpi/${idFunctionalUnit}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const respJson = await resp.json();
    const kpi: IChargeboxKPI = {
      total: parseInt(respJson.total),
      available: parseInt(respJson.available),
      unavailable: respJson.unavailable,
    };
    return Promise.resolve(kpi);
  }

  async getConnectorsKPI(idFunctionalUnit: number): Promise<IConnectorKPI> {
    const resp = await fetch(
      `${this.apiBasePath}/dashboard/connectors-kpi/${idFunctionalUnit}`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const respJson = await resp.json();
    const kpi: IConnectorKPI = {
      total: parseInt(respJson.total),
      available: parseInt(respJson.available),
      charging: parseInt(respJson.charging),
      error: parseInt(respJson.error),
      offline: parseInt(respJson.offline),
      inactive: parseInt(respJson.inactive),
    };

    return Promise.resolve(kpi);
  }
}
