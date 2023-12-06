import { IChargeboxResetMsg } from "@ocppserver/domain/IChargeboxResetMsg";
import { OCPPServerClient } from "@ocppserver/domain/ocppserverClient";
import { IRemoteStartTrxMsg } from "@ocppserver/domain/IRemoteStartTrxMsg";
import { IRemoteStopTrxMsg } from "@ocppserver/domain/IRemoteStopTrxMsg";

export class OCPPServerClientManagement {

  constructor(
    private readonly client: OCPPServerClient) {
    this.client = client;
  }

  async doReset(msg: IChargeboxResetMsg): Promise<boolean> {

    try{
      const resp = await this.client.doReset(msg);
      return resp;
    }catch(e:any){
      return false;
    }
  }

  async doRemoteStopTrx(msg: IRemoteStopTrxMsg): Promise<boolean> {

    try{
      const resp = await this.client.doRemoteStopTrx(msg);
      return resp;
    }catch(e:any){
      return false;
    }
  }

  async doRemoteStartTrx(msg: IRemoteStartTrxMsg): Promise<boolean> {

    try{
      const resp = await this.client.doRemoteStartTrx(msg);
      return resp;
    }catch(e:any){
      return false;
    }
  }

}
