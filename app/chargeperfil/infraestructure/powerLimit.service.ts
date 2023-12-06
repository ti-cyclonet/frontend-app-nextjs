import { IPowerLimit } from "../domain/IPowerLimit";
import { PowerLimitRepository } from "../domain/powerLimitRepository";

export class PowerLimitService implements PowerLimitRepository {
 
  private apiBasePath = process.env.BASEPATH_API_POWERLIMIT;

    constructor() {
      //Nothing to do       
    }

    async getAll(): Promise<IPowerLimit[]> {
        const resp = await fetch(`${this.apiBasePath}/powerlimits`, {
            mode: "cors",
            method: "get",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
          return Promise.resolve(await resp.json());
    }

    async setPowerLimits(days: IPowerLimit[], functionalUnitId: number): Promise<IPowerLimit[]> {
      console.log("DAYS",days, functionalUnitId);
      const resp = await fetch(this.apiBasePath + '/power/set-charge-profile/' + functionalUnitId, {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(days),
      });
      const respText = resp.clone();
      if (resp.status == 200) {
          try {                
              return Promise.resolve(await resp.json());
            } catch (e) {
              const errorTxt = await respText.text();
              throw new Error(errorTxt);
            }
      } else {
          let errorTxt = '';
          try{
              let errorJson = await resp.json();
              if (errorJson.hasOwnProperty('message')) {
                  errorTxt = errorJson.message;
              }else{
                  errorTxt = 'Unexpected error';
              }
          }catch(e:any){
              errorTxt = await resp.text();
          }finally{
              throw new Error(errorTxt);
          }
      }
    }

    async deletePowerLimits(functionalUnitId: number): Promise<string> {
      const resp = await fetch(this.apiBasePath + "/power/del-charge-profile/" + functionalUnitId, {
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          mode: "cors",
      });
        //console.log(resp);        
      if (resp.status == 200){
          return Promise.resolve("Exito al eliminar Perfiles de carga");
      }else{
          const error = await resp.json();
          throw new Error(error.message);
      }
    }
    
}