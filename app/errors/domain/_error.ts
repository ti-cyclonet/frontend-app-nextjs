import { IError, emptyError } from '@errors/domain/IError';

export class Error implements IError {

	id: string = '';
	errorTimestamp: Date = new Date();
	chargeboxId: string = '';
	connectorId: string = '';
	transactionId?: string = '';
	errorCode: string = '';
	errorDescription?: string = '';
	chargeboxStatus: string = '';
	vendorId?: string = '';
	vendorErrorCode?: string = '';

	constructor();
	constructor(id: string, errorTimestamp: Date, chargeboxId: string, connectorId: string, transactionId: string, errorCode: string,
		errorDescription: string, chargeboxStatus: string, vendorId: string, vendorErrorCode: string);
	constructor(...params: any[]) {

		if (params.length === 0) {
			return;
		}

		if (params.length === 10) {

			this.id = params[0];
			this.errorTimestamp = params[1];
			this.chargeboxId = params[2];
			this.connectorId = params[3];
			this.transactionId = params[4];
			this.errorCode = params[5];
			this.errorDescription = params[6];
			this.chargeboxStatus = params[7];
			this.vendorId = params[8];
			this.vendorErrorCode = params[9];
			return;
		}
	}

}
