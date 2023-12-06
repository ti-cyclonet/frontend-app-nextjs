import { IModule } from "@vehicles/domain/IModule";
import { ModulesRepository } from "@vehicles/domain/modulesRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export class ModulesService implements ModulesRepository {
  private apiBasePath = process.env.BASEPATH_API_VEHICLES;

  constructor() {
    //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);
  }
  
  async add(vehicleId: string, entity: IModule): Promise<IModule> {
    //console.log(entity);
    const resp = await fetch(this.apiBasePath + "/vehicles/" + vehicleId + "/modules", {
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
  async update(vehicleId: string, entity: IModule): Promise<IModule> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + vehicleId + "/modules", {
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
  

  async inactivateModule(vehicleId: string, id: string): Promise<boolean> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + vehicleId + "/modules/" + id + "/inactivate", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    //console.log(resp);        
    if (resp.status == 200){
      return Promise.resolve(true);
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }
  }

  async  activateModule(vehicleId: string, id: string): Promise<boolean> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + vehicleId + "/modules/" + id + "/activate", {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });    
    //console.log(resp);        
    if (resp.status == 200){
      return Promise.resolve(true);
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }
  }

  async deleteModule(vehicleId: string, id: string): Promise<boolean> {
    const resp = await fetch(this.apiBasePath + "/vehicles/" + vehicleId + "/modules/" + id, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });    
    //console.log(resp);        
    if (resp.status == 204){
      return Promise.resolve(true);
    }else{
      const error = await resp.json();
      throw new Error(error.message);
    }
  }
}
