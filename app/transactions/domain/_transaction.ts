import {ITransaction, emptyTransaction} from '@transactions/domain/ITransaction'

export class Transaction implements ITransaction{

	id: string = '';
	connectorId?: string = '';
	idTag?: string = '';
	startEventTimestamp?: Date;
    startTimestamp?: Date;
	startValue?: number;
	stopEventActor?: string = '';
	stopEventTimestamp?: Date;
	stopTimestamp?: Date;
    stopValue?: number;
    stopReason?: string = '';
	totalValue?:number;

	constructor();
	constructor(id:string, connectorId: string, idTag: string, startEventTimestamp: string, startTimestamp: string, startValue: string,
		stopEventActor: string, stopEventTimestamp: string, stopTimestamp: string, stopValue: string, stopReason: string, totalValue:number );
	constructor(...params: any[]) {

		if (params.length === 0) {
			return;
		}

		if (params.length === 11) {

			this.id = params[0];
			this.connectorId = params[1];
			this.idTag = params[2];
			this.startEventTimestamp = params[3];
			this.startTimestamp = params[4];
			this.startValue  = params[5];
			this.stopEventActor = params[6];
			this.stopEventTimestamp = params[7];
			this.stopTimestamp = params[8];
			this.stopValue = params[9];
			this.stopReason = params[10];
			this.totalValue = params[11];
			return;
		}
	}	

}
