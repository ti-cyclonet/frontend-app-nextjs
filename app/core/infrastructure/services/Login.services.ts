import { ILoginService } from "@app/core/domain/ILoginService";
import { ISessionUser } from "@app/core/domain/ISessionUser";

import Cryptr from "cryptr";


export class LoginService implements ILoginService<ISessionUser> {

  private cryptr = new Cryptr(process.env.APP_CRYPT_PHRASE ?? '');
  private apiBasePath = process.env.BASEPATH_API_AUTH;

  constructor() {
    //console.log("BASEPATH_API_AUTH" + process.env.BASEPATH_API_AUTH);
  }

  async getUserRoles(username: string): Promise<string[]> {
    //console.log("*********************" + username);
    const resp = await fetch(this.apiBasePath + "/auth/roles/" + username, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
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
      try {
        let errorJson = await resp.json();
        if (errorJson.hasOwnProperty('message')) {
          errorTxt = errorJson.message;
        } else {
          errorTxt = 'Unexpected error ('+JSON.stringify(errorJson)+')';
        }
      } catch (e: any) {
        errorTxt = await respText.text();
      } finally {
        throw new Error(errorTxt);
      }

    }

  }

  async logIn(username: string, password: string): Promise<ISessionUser | null> {

    //console.log("username: " + username);
    //console.log("password: " + password);

    const resp = await fetch(this.apiBasePath + "/auth/login", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ username, password }),
    });

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
      try {
        let errorJson = await resp.json();
        if (errorJson.hasOwnProperty('message')) {
          errorTxt = errorJson.message;
        } else {
          errorTxt = 'Unexpected error';
        }
      } catch (e: any) {
        errorTxt = await respText.text();
      } finally {
        throw new Error(errorTxt);
      }

    }

  };

  async logOut(token: String): Promise<void> {
    const resp = await fetch(this.apiBasePath + "/auth/logout", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ token: token }),
    });
  }



}


