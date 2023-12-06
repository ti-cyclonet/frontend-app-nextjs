import { IVehicle } from "@/app/vehicles/domain/IVehicle";
import { VehiclesRepository } from "@vehicles/domain/vehiclesRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class VehiclesService implements VehiclesRepository {
  private apiBasePath = process.env.BASEPATH_API_VEHICLES;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }

  async getAll(): Promise<IVehicle[]> {
    const resp = await fetch(this.apiBasePath + "/vehicles", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    let respJson: IVehicle[] = await resp.json();

    respJson = respJson.map(e => {
      if (e.batery_max_cap && e.charge_max_cap) {
        return {
          ...e,
          batery_max_cap: parseInt("" + e.batery_max_cap),
          charge_max_cap: parseInt("" + e.charge_max_cap),
        } as IVehicle;
      }
      return e;
    });

    //console.log(respJson);
    return Promise.resolve(respJson);
  }
  async getById(id: string): Promise<IVehicle | null> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + id, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    //console.log(resp);
    return Promise.resolve(await resp.json());
  }
  async add(entity: IVehicle): Promise<IVehicle> {
    //console.log(entity);
    const resp = await fetch(this.apiBasePath + "/vehicles", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(entity),
    });
    //console.log(resp);        
    if (resp.status == 200){
      return Promise.resolve(await resp.json());
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }    
  }
  async update(entity: IVehicle): Promise<IVehicle> {
    const resp = await fetch(this.apiBasePath + "/vehicles", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(entity),
    });
    //console.log(resp);        
    if (resp.status == 200){
      return Promise.resolve(await resp.json());
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }    
  }
  async delete(id: string): Promise<void> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + id, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    //console.log(resp);        
    if (resp.status == 204){
      return Promise.resolve();
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }    
  }
}
