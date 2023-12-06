import { IError, emptyError } from '@errors/domain/IError'
import { ErrorQuery } from "@errors/domain/errorQuery";
var  moment = require("moment-timezone");
moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);


const getErrorObj = (trx: IError) => {
    console.log('WWWWWWWWWWWWWWWWWW');
    console.log(  moment((new Date(trx.errorTimestamp))).format('YYYY-MM-DDTHH:mm:ss') );
    if (trx.errorTimestamp) {
        let json = {
            ...trx,
            errorTimestamp:new Date(trx.errorTimestamp),
        } as IError;
        return json;
    }
}

export class ErrorService implements ErrorQuery {

    private apiBasePath = process.env.BASEPATH_API_ERRORs;

    constructor() { }

    async getAllByChargebox(chargebox_id: string, startdate?: Date, enddate?: Date): Promise<IError[]> {
        //console.log(startdate, enddate);
        let URL = this.apiBasePath + '/error/chargebox/' + chargebox_id + '';
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
        const respText = resp.clone();
        if (resp.status == 200) {
            try {
                let respJson: IError[] = await resp.json();
                console.log(respJson);

                respJson = respJson.map(trx => {
                    return getErrorObj(trx) as IError;
                });
                return Promise.resolve(respJson);
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
                errorTxt = await resp.text();
            } finally {
                throw new Error(errorTxt);
            }

        }

    }

    async getAllByConnector(connector_id: string, startdate?: Date, enddate?: Date): Promise<IError[]> {
        //console.log(startdate, enddate);
        let URL = this.apiBasePath + '/error/connector/' + connector_id + '';
        if (startdate && enddate) {
            URL = URL + '?startdate=' + startdate + "&enddate=" + enddate;
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
        const respText = resp.clone();
        if (resp.status == 200) {
            try {
                let respJson: IError[] = await resp.json();

                respJson = respJson.map(trx => {
                    return getErrorObj(trx) as IError;
                });

                //console.log(respJson);
                return Promise.resolve(respJson);
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
                errorTxt = await resp.text();
            } finally {
                throw new Error(errorTxt);
            }

        }

    }

/*
    private formatDate(date: Date): string {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateInGmtTimeZone = utcToZonedTime(date, timeZone);
        return formatTz(dateInGmtTimeZone, "dd/MM/yyyy'T'HH:mm:ss", {
            timeZone: timeZone,
        });
    }
*/
    async getAll(startdate?: Date, enddate?: Date): Promise<IError[]> {

        console.log(startdate, enddate);
        let URL = this.apiBasePath + '/error';
        if (startdate && enddate) {
            URL = URL + '?startdate=' + moment(startdate).format('YYYY-MM-DDTHH:mm:ss')  + "&enddate=" + moment(enddate).format('YYYY-MM-DDTHH:mm:ss');
        }

        const resp = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log('XXXX');                
        //console.log(resp);        
        const respText = resp.clone();
        if (resp.status == 200) {
            
            try {
                let respJson: IError[] = await resp.json();
                console.log(respJson);
                respJson = respJson.map(trx => {
                    return getErrorObj(trx) as IError;
                });

                //console.log(respJson);
                console.log(respJson);
                
                return Promise.resolve(respJson);
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
                errorTxt = await resp.text();
            } finally {
                throw new Error(errorTxt);
            }

        }

    }

    async getAllByTransaction(transactionId: string): Promise<IError[]>{
        let URL = this.apiBasePath + '/error/transaction/'+transactionId;
        const resp = await fetch(URL, {
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
                let respJson: IError[] = await resp.json();

                respJson = respJson.map(trx => {
                    return getErrorObj(trx) as IError;
                });

                //console.log(respJson);
                return Promise.resolve(respJson);
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
                errorTxt = await resp.text();
            } finally {
                throw new Error(errorTxt);
            }

        }

    }

    getById(id: string): Promise<IError> {
        throw new Error("Method not implemented.");
    }

    
}