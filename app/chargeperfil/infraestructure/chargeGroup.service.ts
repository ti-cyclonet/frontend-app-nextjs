import { ChargeGroupRepository } from "../domain/chargeGroupRepository";
import { IChargeGroup, IChargeGroupRequest, IGroupConnector } from "../domain/IChargeGroup";

export class ChargeGroupService implements ChargeGroupRepository {

    private apiBasePath = process.env.BASEPATH_API_POWERLIMIT;

    constructor() {
        //Nothing to do       
    }

    async getAllAvailableConnectors(): Promise<IGroupConnector[]> {
        const resp = await fetch(this.apiBasePath + '/power/get-available-charger', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
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

    async getAllChargeGroups(): Promise<IChargeGroup[]> {
        const resp = await fetch(this.apiBasePath + '/power/get-charge-groups', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
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

    async saveNewChargeGroup(chargeGroup: IChargeGroupRequest): Promise<IChargeGroup> {
        const resp = await fetch(this.apiBasePath + "/power/set-charge-group", {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
        },
            mode: "cors",
            body: JSON.stringify(chargeGroup),
        });       
        if (resp.status == 200){
            return Promise.resolve(await resp.json());
        }else{
            const error = await resp.json();
            throw new Error(error.message);
        }   
    }

    async editChargeGroup(chargeGroup: IChargeGroupRequest): Promise<IChargeGroup> {
        const resp = await fetch(this.apiBasePath + "/power/upd-charge-group", {
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json",
        },
            mode: "cors",
            body: JSON.stringify(chargeGroup),
        });
        //console.log(resp);        
        if (resp.status == 200){
            return Promise.resolve(await resp.json());
        }else{
            const error = await resp.json();
            throw new Error(error.message);
        }   
    }

    getAll(): Promise<IChargeGroup[]> {
        throw new Error("Method not implemented.");
    }
    
    async getById(id: string): Promise<IChargeGroup | null> {
        const resp = await fetch(this.apiBasePath + "/power/chargegroup/" + id, {
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
        //console.log(resp);
        return Promise.resolve(await resp.json());
    }

    add(entity: IChargeGroup): Promise<IChargeGroup> {
        throw new Error("Method not implemented.");
    }

    update(entity: IChargeGroup): Promise<IChargeGroup> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        const resp = await fetch(this.apiBasePath + "/power/del-charge-group/" + id, {
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