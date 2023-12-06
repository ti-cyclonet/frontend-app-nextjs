import { IChargeboxResetMsg } from '@ocppserver/domain/IChargeboxResetMsg'
import { OCPPServerClient } from "@ocppserver/domain/ocppserverClient";
import { IRemoteStartTrxMsg } from '@ocppserver/domain/IRemoteStartTrxMsg';
import { IRemoteStopTrxMsg } from '@ocppserver/domain/IRemoteStopTrxMsg';
var moment = require("moment-timezone");
moment.tz.setDefault("Etc/GMT");


export class OCPPServerClientService implements OCPPServerClient {

    private apiBasePath = process.env.BASEPATH_API_OCPPSERVER;

    constructor() { }

    async doReset(msg: IChargeboxResetMsg): Promise<boolean> {
        const resp = await fetch(this.apiBasePath + '/charge-point/reset', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'OCPPSERVER-API-KEY': '123'
            },
            body: JSON.stringify(msg),            
            signal: AbortSignal.timeout( 10000 ),
        });
        
        //console.log(resp);        
        if (resp.status == 200) {
            return Promise.resolve(true);
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    }

    async doRemoteStopTrx(msg: IRemoteStopTrxMsg): Promise<boolean> {
        const resp = await fetch(this.apiBasePath + '/remote-transactions/stopTransaction', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'OCPPSERVER-API-KEY': '123'
            },
            body: JSON.stringify(msg),
        });
        
        //console.log(resp);        
        if (resp.status == 200) {
            return Promise.resolve(true);
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    }

    async doRemoteStartTrx(msg: IRemoteStartTrxMsg): Promise<boolean> {
        const resp = await fetch(this.apiBasePath + '/remote-transactions/startTransaction', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'OCPPSERVER-API-KEY': '123'
            },
            body: JSON.stringify(msg),
        });
        
        //console.log(resp);        
        if (resp.status == 200) {
            return Promise.resolve(true);
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    }

}