import { DashboardChargerRepository } from "@dashboard/domain/dashboardChargerRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class DashboardChargerService implements DashboardChargerRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {}

  async getChargerBoxAvailable(): Promise<{}> {
    const resp = await fetch(
      `${this.apiBasePath}/dashboard/charger-box-available`,
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

  async getAllChargerBox(): Promise<[]> {
    const resp = await fetch(
      `${this.apiBasePath}/dashboard/all-charger-box`,
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
