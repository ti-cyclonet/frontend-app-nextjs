export interface IError {
	rownum?: number,
	id: string,
	errorTimestamp: Date,
	chargeboxId: string,
	chargeboxAlias?: string,
	connectorId: string,
	transactionId?: string,
	errorCode: string,
	errorDescription?: string,
	chargeboxStatus: string,
	vendorId?: string,
	vendorErrorCode?: string,
};

export const emptyError: IError = {
	id: "",
	errorTimestamp: new Date(),
	chargeboxId: "",
	connectorId: "",
	transactionId: "",
	errorCode: "",	
	errorDescription: "",
	chargeboxStatus: "",
};

