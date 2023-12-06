import { IUser } from "@/app/core/domain/IUser";
import { UserRepository } from "@users/domain/userRepository";
var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);


export class UserService implements UserRepository {

    private apiBasePath = process.env.BASEPATH_API_USERS;

    constructor() {
        //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);        
    }

    async getAllRoles(): Promise<string[]> {
        //console.log("BASEPATH_API_USERS: "+process.env.BASEPATH_API_USERS);        
        const resp = await fetch(this.apiBasePath + '/users/roles', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                //console.log("error: " + e);
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
    async getAll(): Promise<IUser[]> {
        const resp = await fetch(this.apiBasePath + '/users', {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                //console.log("error: " + e);
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

    getById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }

    async add(entity: IUser): Promise<IUser> {
        //console.log(entity);
        const resp = await fetch(this.apiBasePath + "/users", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(entity),
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                //console.log("error: " + e);
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
    async update(entity: IUser): Promise<IUser> {
        const resp = await fetch(this.apiBasePath + "/users", {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ user: entity, email: entity.email }),
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            try {                
                return Promise.resolve(await resp.json());
              } catch (e) {
                //console.log("error: " + e);
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
    async delete(id: string): Promise<void> {
        const resp = await fetch(this.apiBasePath + "/users/" + id, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });
        //console.log(resp);
        const respText = resp.clone();
        if (resp.status == 200) {
            return Promise.resolve();
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
}