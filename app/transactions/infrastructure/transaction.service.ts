import { ITransaction, emptyTransaction } from '@transactions/domain/ITransaction'
import { TransactionQuery } from "@transactions/domain/transactionQuery";

var moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);
//const gmtTimeZone = 'Etc/GMT';
import Cryptr from "cryptr";
import { IMeterValue } from '../domain/IMeterValue';
//import { id } from 'date-fns/locale';


const getTransactionObj = (trx: ITransaction): ITransaction | undefined => {
    const requiredFieldsExist =
      trx.startEventTimestamp !== undefined &&
      trx.startTimestamp !== undefined &&
      //trx.stopEventTimestamp !== undefined &&
      //trx.stopTimestamp !== undefined &&
      trx.startValue !== undefined 
      //&& trx.stopValue !== undefined 
      //&&trx.totalValue !== undefined
      ;
      
  
    if (requiredFieldsExist) {
      const json: Partial<ITransaction> = {
        ...trx,
        startValue: parseInt("" + trx.startValue),
        stopValue: trx.stopValue? parseInt("" + trx.stopValue): 0,
        startEventTimestamp: trx.startEventTimestamp ? new Date(trx.startEventTimestamp) : undefined,
        startTimestamp: trx.startTimestamp ? new Date(trx.startTimestamp) : undefined,
        stopEventTimestamp: trx.stopEventTimestamp ? new Date(trx.stopEventTimestamp) : undefined,
        stopTimestamp: trx.stopTimestamp ? new Date(trx.stopTimestamp) : undefined,
      };
  
      json.id = '' + json.id;
      return json as ITransaction;
    }
  
    return undefined;
  };
  
export class TransactionService implements TransactionQuery {

    private cryptr = new Cryptr(process.env.APP_CRYPT_PHRASE ?? '');
    private apiBasePath = process.env.BASEPATH_API_TRANSACTIONS;

    constructor() { }

    async getTemperatureByConnectorId(connector_pk: string): Promise<string> {
        const resp = await fetch(this.apiBasePath + '/transaction/' + connector_pk + "/connector" , {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            let respJson: string = await resp.json();
            //console.log(respJson);
            return Promise.resolve(respJson);
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

    async getAllByChargebox(chargebox_id: string, startdate?: Date, enddate?: Date): Promise<ITransaction[]> {
        //console.log(startdate, enddate);
        let URL = this.apiBasePath + '/transaction/chargebox/' + chargebox_id + '';
        if (startdate && enddate) {
            URL = URL + '?startdate=' + moment(startdate).format('YYYY-MM-DDTHH:mm:ss')  + "&enddate=" + moment(enddate).format('YYYY-MM-DDTHH:mm:ss');
        }
        //console.log(URL);
        const resp = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        //console.log(resp);
        if (resp.status == 200) {
            let respJson: ITransaction[] = await resp.json();
            
            //console.log(JSON.stringify(respJson));
            respJson = respJson.map(trx => {
                return getTransactionObj(trx) as ITransaction;
            });
            //console.log(JSON.stringify(respJson));
            // console.log(respJson);
            return Promise.resolve(respJson);
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

    async getAllByConnector(connector_id: string, startdate?: Date, enddate?: Date): Promise<ITransaction[]> {
        //console.log(startdate, enddate);
        let URL = this.apiBasePath + '/transaction/connector/' + connector_id + '';
        if (startdate && enddate) {
            URL = URL + '?startdate=' + moment(startdate).format('YYYY-MM-DDTHH:mm:ss')  + "&enddate=" + moment(enddate).format('YYYY-MM-DDTHH:mm:ss');
        }
        //console.log(URL);
        const resp = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            let respJson: ITransaction[] = await resp.json();

            respJson = respJson.map(trx => {
                return getTransactionObj(trx) as ITransaction;
            });

            //console.log(respJson);
            return Promise.resolve(respJson);
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
/*
    // Formatea la fecha en la zona horaria GMT.
    private formatDate(date: Date): string {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateInGmtTimeZone = utcToZonedTime(date, timeZone);
        return formatTz(dateInGmtTimeZone, "yyyy-MM-dd'T'HH:mm:ss", {
            timeZone: timeZone,
        });
    }
    */
    async getAll(startdate?: Date, enddate?: Date): Promise<ITransaction[]> {

        //console.log(startdate, enddate);
        let URL = this.apiBasePath + '/transaction';
        if (startdate && enddate) {
            URL = URL + '?startdate=' + moment(startdate).format('YYYY-MM-DDTHH:mm:ss')  + "&enddate=" + moment(enddate).format('YYYY-MM-DDTHH:mm:ss');
        }
        //console.log(URL);


        const resp = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            let respJson: ITransaction[] = await resp.json();            
//            console.log(respJson);
            respJson = respJson.map(trx => {
                return getTransactionObj(trx) as ITransaction;
            });
            // console.log(respJson);
            return Promise.resolve(respJson);
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

    getById(id: string): Promise<ITransaction> {
        throw new Error("Method not implemented.");
    }

    getTransactionMeterValues(id: string): Promise<IMeterValue[]> {
        throw new Error('Method not implemented.');
    }

    async getTransactionMeterValuesByType(id: string, type: string): Promise<IMeterValue[]> {
        const resp = await fetch(this.apiBasePath + '/transaction/' + id + '/metervalues/' + type, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            let respJson: IMeterValue[] = await resp.json();

            respJson = respJson.map(mtr => {
                if (mtr.valueTimestamp) {
                    return {
                        ...mtr,
                        valueTimestamp: new Date(mtr.valueTimestamp),
                    } as IMeterValue;
                }
                return mtr;
            });

            //console.log(respJson);
            return Promise.resolve(respJson);


            //console.log(respJson);
            return Promise.resolve(respJson as IMeterValue[]);
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

    async getTransactionByConnectorByDate(connectorPk: string, date: string): Promise<ITransaction[]> {
        const resp = await fetch(`${this.apiBasePath}/transaction/connector/${connectorPk}/date/${date}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            const respJson = await resp.json();
            return Promise.resolve(respJson as ITransaction[])
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


    async getCurrentTransactionByConnector(connector_pk: string): Promise<ITransaction> {

        let URL = this.apiBasePath + '/transaction/connector/' + connector_pk + '/current';
        //console.log(URL);
        const resp = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        if (resp.status == 200) {
            let respJson: ITransaction = await resp.json();
            respJson = getTransactionObj(respJson) as ITransaction;
            return Promise.resolve(respJson);
        } if (resp.status == 204) {
            return Promise.resolve(emptyTransaction);
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