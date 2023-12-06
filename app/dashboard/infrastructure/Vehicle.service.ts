import { ICountVehicle } from "@dashboard/domain/ICountVehicle";
import { ICountConectors } from "@dashboard/domain/ICountConectors";
import { ICountChargerBox } from "@dashboard/domain/ICountChargerBox";
import { ICountChargerBoxOnline } from "@dashboard/domain/ICountChargerBoxOnline";
import { CountVehicleRepository } from "@dashboard/domain/countVehicleRepository";
import { CountConectorsRepository } from "@dashboard/domain/countConectorsRepository";
import { CountChargerBoxRepository } from "@dashboard/domain/countChargerBoxRepository";
import { CountChargerBoxOnlineRepository } from "@dashboard/domain/countChargerBoxOnlineRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class CountVehicleService implements CountVehicleRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }

  
  async getCountVehicle(): Promise<ICountVehicle> {
    const resp = await fetch(this.apiBasePath + "/dashboard/countVehicles", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    //console.log(resp);
    return Promise.resolve(await resp.json());
  }

}

export class CountConectorsService implements CountConectorsRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }

  
  async getCountConectors(): Promise<ICountConectors> {
    const resp = await fetch(this.apiBasePath + "/dashboard/countConectors", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    //console.log(resp);
    return Promise.resolve(await resp.json());
  }

  
}



export class CountChargerBoxService implements CountChargerBoxRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }
  
  async getCountChargerBox(): Promise<ICountChargerBox> {
    const resp = await fetch(this.apiBasePath + "/dashboard/countChargerBox", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    //console.log(resp);
    return Promise.resolve(await resp.json());
  }
}

export class CountChargerBoxOnlineService implements CountChargerBoxOnlineRepository {
  private apiBasePath = process.env.BASEPATH_API_DASHBOARD;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }
  
  async getCountChargerBoxOnline(): Promise<ICountChargerBoxOnline> {
    const resp = await fetch(this.apiBasePath + "/dashboard/countChargerBoxActive", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    //console.log(resp);
    return Promise.resolve(await resp.json());
  }
}
